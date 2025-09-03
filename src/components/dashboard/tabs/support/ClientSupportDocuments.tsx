import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ExternalLink, Folder } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface SupportDocument {
  id: string;
  title: string;
  url: string;
  description: string;
  created_at: string;
}

export const ClientSupportDocuments = () => {
  const [documents, setDocuments] = useState<SupportDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  useEffect(() => {
    fetchSupportDocuments();
  }, [profile]);

  const fetchSupportDocuments = async () => {
    if (!profile?.email) return;

    try {
      setLoading(true);
      
      // Check if user is impersonating a client
      const impersonationData = localStorage.getItem('impersonating_client');
      let clientEmail = profile.email;
      
      if (impersonationData && profile.role === 'admin') {
        const impersonatedClient = JSON.parse(impersonationData);
        clientEmail = impersonatedClient.contact_email;
      }

      // First get the client ID
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('id')
        .eq('contact_email', clientEmail)
        .single();

      if (clientError || !clientData) {
        console.log('No client found for email:', clientEmail);
        // Still fetch global documents even if no client found
        const { data: globalDocs, error: globalError } = await supabase
          .from('support_documents')
          .select('*')
          .is('client_id', null)
          .order('created_at', { ascending: false });

        if (!globalError) {
          setDocuments(globalDocs || []);
        }
        return;
      }

      // Get documents assigned to this client
      const { data: assignments, error: assignedError } = await supabase
        .from('client_support_document_assignments')
        .select('document_id')
        .eq('client_id', clientData.id);

      if (assignedError) throw assignedError;

      const assignedDocumentIds = assignments?.map(a => a.document_id) || [];

      // Get assigned documents
      let assignedDocuments: SupportDocument[] = [];
      if (assignedDocumentIds.length > 0) {
        const { data: assignedDocs, error: assignedDocsError } = await supabase
          .from('support_documents')
          .select('*')
          .in('id', assignedDocumentIds);

        if (assignedDocsError) throw assignedDocsError;
        assignedDocuments = assignedDocs || [];
      }

      // Get global documents (not assigned to any specific client)
      const { data: globalDocs, error: globalError } = await supabase
        .from('support_documents')
        .select('*')
        .is('client_id', null)
        .order('created_at', { ascending: false });

      if (globalError) throw globalError;

      // Combine assigned and global documents
      const allDocuments = [...assignedDocuments, ...(globalDocs || [])];
      
      // Remove duplicates by ID and sort by created_at
      const uniqueDocuments = allDocuments.filter((doc, index, self) => 
        index === self.findIndex(d => d.id === doc.id)
      ).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setDocuments(uniqueDocuments);
    } catch (error) {
      console.error('Error fetching support documents:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <Card className="bg-gradient-to-br from-green-50 to-blue-50">
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Don't show the section if there are no documents
  if (documents.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {documents.map((document) => (
        <div key={document.id} className="bg-white/10 rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-colors">
          <h4 className="text-blue-900 font-bold text-xl mb-3 flex items-center gap-3">
            <FileText className="w-4 h-4 text-blue-400" />
            {document.title}
          </h4>
          {document.description && (
            <div className="text-white/80 text-sm space-y-2 mb-4">
              {document.description.split('\n').map((line, index) => (
                <p key={index}>
                  {line.trim().startsWith('•') ? (
                    <>
                      <span className="mr-2 text-orange-300 font-bold">•</span>
                      {line.replace('•', '').trim()}
                    </>
                  ) : line.trim().startsWith('-') ? (
                    <>
                      <span className="mr-2 text-orange-300 font-bold">•</span>
                      {line.replace('-', '').trim()}
                    </>
                  ) : (
                    line
                  )}
                </p>
              ))}
            </div>
          )}
          <Button 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium border-0"
            onClick={() => window.open(document.url, '_blank')}
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            View Resource
          </Button>
        </div>
      ))}
    </div>
  );
};