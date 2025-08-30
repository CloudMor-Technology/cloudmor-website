import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Client {
  id: string;
  company_name: string;
  contact_email: string;
}

interface SupportDocument {
  id: string;
  client_id: string;
  title: string;
  url: string;
  description: string;
  created_at: string;
  clients?: {
    company_name: string;
  };
}

export const SupportDocuments = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [documents, setDocuments] = useState<SupportDocument[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDocument, setEditingDocument] = useState<SupportDocument | null>(null);
  const [formData, setFormData] = useState({
    client_id: '',
    title: '',
    url: '',
    description: ''
  });

  useEffect(() => {
    fetchClients();
    fetchDocuments();
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('id, company_name, contact_email')
        .order('company_name', { ascending: true });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Failed to fetch clients');
    }
  };

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('support_documents')
        .select(`
          *,
          clients:client_id (
            company_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('Failed to fetch documents');
    }
  };

  const handleCreateDocument = async () => {
    try {
      const { error } = await supabase
        .from('support_documents')
        .insert({
          client_id: formData.client_id,
          title: formData.title,
          url: formData.url,
          description: formData.description
        });

      if (error) throw error;

      toast.success('Support document created successfully');
      fetchDocuments();
      resetForm();
    } catch (error) {
      console.error('Error creating document:', error);
      toast.error('Failed to create document');
    }
  };

  const handleUpdateDocument = async () => {
    if (!editingDocument) return;

    try {
      const { error } = await supabase
        .from('support_documents')
        .update({
          client_id: formData.client_id,
          title: formData.title,
          url: formData.url,
          description: formData.description
        })
        .eq('id', editingDocument.id);

      if (error) throw error;

      toast.success('Support document updated successfully');
      fetchDocuments();
      resetForm();
    } catch (error) {
      console.error('Error updating document:', error);
      toast.error('Failed to update document');
    }
  };

  const handleDeleteDocument = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;

    try {
      const { error } = await supabase
        .from('support_documents')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Support document deleted successfully');
      fetchDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('Failed to delete document');
    }
  };

  const resetForm = () => {
    setFormData({
      client_id: '',
      title: '',
      url: '',
      description: ''
    });
    setShowForm(false);
    setEditingDocument(null);
  };

  const startEdit = (document: SupportDocument) => {
    setEditingDocument(document);
    setFormData({
      client_id: document.client_id,
      title: document.title,
      url: document.url,
      description: document.description || ''
    });
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-green-600" />
            Support Documents
          </h3>
          <p className="text-gray-600">Manage client-specific support resources and tools</p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Document
        </Button>
      </div>

      {showForm && (
        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-xl text-green-800">
              {editingDocument ? 'Edit Support Document' : 'Create Support Document'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="client_id">Client *</Label>
              <Select value={formData.client_id} onValueChange={(value) => setFormData({...formData, client_id: value})}>
                <SelectTrigger className="border-green-300 focus:border-green-500">
                  <SelectValue placeholder="Select a client..." />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.company_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Document Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Network Setup Guide"
                  className="border-green-300 focus:border-green-500"
                />
              </div>
              <div>
                <Label htmlFor="url">Document URL *</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  placeholder="https://..."
                  className="border-green-300 focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Brief description of what this document contains..."
                className="border-green-300 focus:border-green-500"
                rows={3}
              />
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={editingDocument ? handleUpdateDocument : handleCreateDocument}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                {editingDocument ? 'Update Document' : 'Create Document'}
              </Button>
              <Button onClick={resetForm} variant="outline">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-gradient-to-br from-gray-50 to-green-50">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-600" />
            Support Documents ({documents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {documents.map((document) => (
                <Card key={document.id} className="border border-green-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1">
                        <h4 className="font-bold text-lg text-green-800">{document.title}</h4>
                        <p className="text-gray-600">
                          Client: {document.clients?.company_name}
                        </p>
                        {document.description && (
                          <p className="text-gray-600 text-sm">{document.description}</p>
                        )}
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-blue-600" />
                          <a 
                            href={document.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            {document.url}
                          </a>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => startEdit(document)}
                          size="sm"
                          variant="outline"
                          className="text-blue-600 border-blue-600 hover:bg-blue-50"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteDocument(document.id)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {documents.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No support documents created yet. Add your first document above.
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};