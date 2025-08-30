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
    <div className="space-y-4">
      {documents.map((document) => (
        <Button 
          key={document.id}
          onClick={() => window.open(document.url, '_blank')}
          className="w-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 group text-left"
        >
          <div className="flex items-center justify-between w-full">
            <div className="text-left">
              <p className="font-semibold text-lg">{document.title}</p>
              {document.description && (
                <div className="text-sm text-white/90 mt-2">
                  {document.description.split('\n').map((line, index) => (
                    <div key={index} className="flex items-start mb-1">
                      {line.trim().startsWith('•') ? (
                        <>
                          <span className="mr-2 text-orange-300 font-bold">•</span>
                          <span>{line.replace('•', '').trim()}</span>
                        </>
                      ) : line.trim().startsWith('-') ? (
                        <>
                          <span className="mr-2 text-orange-300 font-bold">•</span>
                          <span>{line.replace('-', '').trim()}</span>
                        </>
                      ) : (
                        <span>{line}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-white/70 mt-2">
                Added: {new Date(document.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-white/20 p-2 rounded-full">
              <ExternalLink className="w-5 h-5 text-white" />
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
};