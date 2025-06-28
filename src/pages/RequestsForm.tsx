
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
              <div className="cognito-form-container">
                <script src="https://www.cognitoforms.com/f/seamless.js" data-key="l70xnNH5hUGhN-ww4M78Xg" data-form="4"></script>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RequestsForm;
