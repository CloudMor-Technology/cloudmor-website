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
        setDocuments([]);
        return;
      }

      // Then get their support documents
      const { data: documentsData, error: documentsError } = await supabase
        .from('support_documents')
        .select('*')
        .eq('client_id', clientData.id)
        .order('created_at', { ascending: false });

      if (documentsError) throw documentsError;

      setDocuments(documentsData || []);
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
    <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
      <CardHeader>
        <CardTitle className="text-2xl text-green-800 flex items-center gap-2">
          <Folder className="w-6 h-6" />
          Useful Tools & Resources
        </CardTitle>
        <p className="text-green-600 text-lg">Documents and tools specific to your account</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((document) => (
            <Card key={document.id} className="border border-green-200 hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-green-600" />
                      <h4 className="font-bold text-lg text-green-800">{document.title}</h4>
                    </div>
                    {document.description && (
                      <p className="text-gray-600 text-sm">{document.description}</p>
                    )}
                    <p className="text-gray-500 text-xs">
                      Added: {new Date(document.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    onClick={() => window.open(document.url, '_blank')}
                    size="sm"
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white ml-4"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};