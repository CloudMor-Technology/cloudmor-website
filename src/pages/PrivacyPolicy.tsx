
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-20 bg-gradient-to-r from-gowith-dark-blue to-gowith-medium-blue">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Privacy Policy
              </h1>
              <p className="text-xl text-gowith-light-blue mb-8">
                How we collect, use, and protect your information
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <h2>Who We Are and the Scope of this Privacy Policy</h2>
              
              <h3>Privacy Policy for CloudMor Phone System App</h3>
              
              <p><strong>Effective Date: 01/01/2023</strong></p>
              
              <h2>1. Introduction</h2>
              <p>
                Welcome to CloudMor's Phone System App! At CloudMor, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our phone system app, whether a customer or a user of our services.
              </p>
              
              <h2>2. Information We Collect</h2>
              <p><strong>a. Personal Information:</strong> When you use our app, we may collect the following types of personal information:</p>
              <ul>
                <li><strong>Contact Information:</strong> This may include your name, email address, phone number, and company information.</li>
                <li><strong>Device Information:</strong> We may collect information about your device to access our app, including device type, operating system, and unique device identifiers.</li>
                <li><strong>Call Data:</strong> We may collect information about your calls, such as call duration, time and date of the call, and call participants.</li>
              </ul>
              
              <p><strong>b. Usage Information:</strong> We may collect information about how you use our app, such as the features you access and your interactions with our services.</p>
              
              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect for the following purposes:</p>
              <ul>
                <li>To provide and maintain our phone system services.</li>
                <li>To communicate with you, including sending service-related notifications and updates.</li>
                <li>To improve our app and services.</li>
                <li>To analyze usage patterns and trends.</li>
                <li>To comply with legal obligations.</li>
              </ul>
              
              <h2>4. Data Security</h2>
              <p>
                We take reasonable steps to protect your personal information from unauthorized access, use, or disclosure. However, no data transmission over the internet or storage system is completely secure. Please take precautions to protect your personal information.
              </p>
              
              <h2>5. Your Choices</h2>
              <p>You have the following rights regarding your personal information:</p>
              <ul>
                <li><strong>Access:</strong> You can request access to your personal information.</li>
                <li><strong>Correction:</strong> You can request corrections to inaccurate or incomplete information.</li>
                <li><strong>Deletion:</strong> You can request the deletion of your personal information.</li>
              </ul>
              
              <h2>7. Contact Us</h2>
              <p>
                If you have questions, concerns, or requests regarding this Privacy Policy or your personal information, please get in touch with us at <a href="mailto:privacy@cloudmor.com">privacy@cloudmor.com</a>
              </p>
              
              <h2>8. Changes to this Privacy Policy</h2>
              <p>
                We may update this Privacy Policy to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the revised Privacy Policy on our website or through other means.
              </p>
              
              <p>
                By using our phone system app, you agree to the terms of this Privacy Policy.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
