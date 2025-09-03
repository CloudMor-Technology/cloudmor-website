import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Edit, Trash2, ExternalLink, Users, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Client {
  id: string;
  company_name: string;
  contact_email: string;
}

interface ClientSupportDocument {
  id: string;
  title: string;
  description: string | null;
  url: string | null;
  client_id: string | null;
  created_at: string;
  client_support_document_assignments?: Array<{
    client_id: string;
    clients: {
      company_name: string;
    } | null;
  }>;
}

export const ClientSupportDocuments = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [documents, setDocuments] = useState<ClientSupportDocument[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDocument, setEditingDocument] = useState<ClientSupportDocument | null>(null);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    client_id: ''
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
      // Get all documents
      const { data: docs, error: docsError } = await supabase
        .from('support_documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (docsError) throw docsError;

      // Get all assignments with client info
      const { data: assignments, error: assignError } = await supabase
        .from('client_support_document_assignments')
        .select(`
          document_id,
          client_id,
          clients(company_name)
        `);

      if (assignError) throw assignError;

      // Combine documents with their assignments
      const documentsWithAssignments = docs.map(doc => ({
        ...doc,
        client_support_document_assignments: assignments.filter(
          assignment => assignment.document_id === doc.id
        )
      }));

      setDocuments(documentsWithAssignments || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('Failed to fetch documents');
    }
  };

  const handleCreateDocument = async () => {
    try {
      // Create the document once
      const { data: newDoc, error: docError } = await supabase
        .from('support_documents')
        .insert({
          title: formData.title,
          description: formData.description,
          url: formData.url,
          client_id: null // Always null, we use assignments for client access
        })
        .select()
        .single();

      if (docError) throw docError;

      // Create assignments if specific clients are selected
      if (selectedClients.length > 0) {
        const assignments = selectedClients.map(clientId => ({
          document_id: newDoc.id,
          client_id: clientId
        }));

        const { error: assignError } = await supabase
          .from('client_support_document_assignments')
          .insert(assignments);

        if (assignError) throw assignError;
      }
      // If no clients selected, document is global (no assignments needed)

      toast.success('Client support document created successfully');
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
      // Update the document details
      const { error: updateError } = await supabase
        .from('support_documents')
        .update({
          title: formData.title,
          description: formData.description,
          url: formData.url
        })
        .eq('id', editingDocument.id);

      if (updateError) throw updateError;

      // Delete existing assignments
      const { error: deleteAssignError } = await supabase
        .from('client_support_document_assignments')
        .delete()
        .eq('document_id', editingDocument.id);

      if (deleteAssignError) throw deleteAssignError;

      // Create new assignments if specific clients are selected
      if (selectedClients.length > 0) {
        const assignments = selectedClients.map(clientId => ({
          document_id: editingDocument.id,
          client_id: clientId
        }));

        const { error: assignError } = await supabase
          .from('client_support_document_assignments')
          .insert(assignments);

        if (assignError) throw assignError;
      }
      // If no clients selected, document becomes global (no assignments)

      toast.success('Client support document updated successfully');
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

      toast.success('Client support document deleted successfully');
      fetchDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('Failed to delete document');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      url: '',
      client_id: ''
    });
    setSelectedClients([]);
    setShowForm(false);
    setEditingDocument(null);
  };

  const startEdit = async (document: any) => {
    setEditingDocument(document);
    setFormData({
      title: document.title,
      description: document.description || '',
      url: document.url || '',
      client_id: ''
    });

    // Get assigned clients for this document
    try {
      const { data: assignments, error } = await supabase
        .from('client_support_document_assignments')
        .select('client_id')
        .eq('document_id', document.id);

      if (error) throw error;

      const assignedClientIds = assignments.map(assignment => assignment.client_id);
      setSelectedClients(assignedClientIds);
    } catch (error) {
      console.error('Error fetching document assignments:', error);
      setSelectedClients([]);
    }

    setShowForm(true);
  };

  const handleClientToggle = (clientId: string) => {
    setSelectedClients(prev => 
      prev.includes(clientId) 
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-portal-text flex items-center gap-2">
            <FileText className="w-6 h-6 text-portal-accent" />
            Client Support Documents
          </h3>
          <p className="text-portal-text-muted">Manage support resources for all clients or specific client assignments</p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-portal-accent to-portal-secondary hover:opacity-90 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Document
        </Button>
      </div>

      {showForm && (
        <Card className="border-2 border-portal-accent/20 bg-gradient-to-br from-blue-50/50 to-orange-50/50">
          <CardHeader>
            <CardTitle className="text-xl text-portal-text">
              {editingDocument ? 'Edit Client Support Document' : 'Create Client Support Document'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="title">Document Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Phone System Guide"
                  className="border-portal-accent/30 focus:border-portal-accent"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="url">Document URL</Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) => setFormData({...formData, url: e.target.value})}
                placeholder="https://..."
                className="border-portal-accent/30 focus:border-portal-accent"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Brief description of what this document contains..."
                className="border-portal-accent/30 focus:border-portal-accent"
                rows={3}
              />
            </div>

            <div>
              <Label>Client Assignment (Optional)</Label>
              <div className="space-y-2 mt-2">
                <div className="border border-portal-accent/20 rounded-lg p-3 bg-blue-50/30">
                  <Label className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4" />
                    Select client (leave empty for all clients):
                  </Label>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                    {clients.map((client) => (
                      <div key={client.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={client.id}
                          checked={selectedClients.includes(client.id)}
                          onCheckedChange={() => handleClientToggle(client.id)}
                        />
                        <Label htmlFor={client.id} className="text-sm">{client.company_name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={editingDocument ? handleUpdateDocument : handleCreateDocument}
                className="bg-gradient-to-r from-portal-accent to-portal-secondary hover:opacity-90"
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

      <Card className="bg-gradient-to-br from-gray-50/50 to-blue-50/30">
        <CardHeader>
          <CardTitle className="text-xl text-portal-text flex items-center gap-2">
            <FileText className="w-5 h-5 text-portal-accent" />
            Client Support Documents ({documents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {documents.map((document) => (
                <Card key={document.id} className="border border-portal-accent/20 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-lg text-portal-text">{document.title}</h4>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-portal-text-muted">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>
                              {document.client_support_document_assignments?.length > 0 
                                ? `Assigned to ${document.client_support_document_assignments.length} client(s)` 
                                : 'Available to all clients'}
                            </span>
                          </div>
                        </div>
                        
                        {document.client_support_document_assignments?.length > 0 && (
                          <div className="text-sm text-portal-text-muted">
                            <span className="font-medium">Clients: </span>
                            {document.client_support_document_assignments.map((assignment: any, index: number) => (
                              <span key={assignment.client_id}>
                                {assignment.clients?.company_name || 'Unknown'}
                                {index < document.client_support_document_assignments.length - 1 ? ', ' : ''}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {document.description && (
                          <p className="text-portal-text-muted text-sm">{document.description}</p>
                        )}
                        
                        {document.url && (
                          <div className="flex items-center gap-2">
                            <ExternalLink className="w-4 h-4 text-portal-accent" />
                            <a 
                              href={document.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-portal-accent hover:underline text-sm"
                            >
                              View Resource
                            </a>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          onClick={() => startEdit(document)}
                          size="sm"
                          variant="outline"
                          className="text-portal-accent border-portal-accent hover:bg-portal-accent/10"
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
                <div className="text-center py-8 text-portal-text-muted">
                  No client support documents created yet. Add your first document above.
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};