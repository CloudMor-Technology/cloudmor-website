
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const RequestsForm = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 text-gowith-dark-blue">
              Requests Form
            </h1>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <iframe 
                className="clickup-embed clickup-dynamic-height" 
                src="https://forms.clickup.com/90131765044/f/2ky4b5tm-553/327M1C3WST6X3R4VFO" 
                width="100%" 
                height="1200px" 
                style={{ background: 'transparent', border: '1px solid #ccc' }}
                title="ClickUp Requests Form"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      <script async src="https://app-cdn.clickup.com/assets/js/forms-embed/v1.js"></script>
    </div>
  );
};

export default RequestsForm;
