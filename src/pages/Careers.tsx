
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Careers = () => {
  return <>
      <Navbar />
      <main>
        <section className="pt-32 pb-20 bg-gradient-to-r from-gowith-dark-blue to-gowith-medium-blue">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Join Our Team
              </h1>
              <p className="text-xl text-gowith-light-blue mb-8">
                Build your career with a leader in IT solutions
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-center mb-16">At CloudMor, we're more than just an IT service provider—we're a team of passionate professionals dedicated to helping businesses succeed through technology.</p>
              
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-8">Current Openings</h2>
              <p className="text-gray-600 mb-8">We're constantly growing and looking for talented individuals to join our team. Please check back soon for open positions.</p>
              
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm mb-12">
                <h2 className="text-2xl font-bold text-gowith-dark-blue mb-6">Why Work With Us</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gowith-medium-blue mb-2">Growth Opportunities</h3>
                    <p className="text-gray-600">
                      We invest in our team members' professional development through training, certification programs, and hands-on experience with cutting-edge technologies. Your growth is our growth.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gowith-medium-blue mb-2">Collaborative Culture</h3>
                    <p className="text-gray-600">
                      We foster a supportive, collaborative environment where knowledge sharing is encouraged and every voice is heard. Our team works together to solve complex challenges and deliver exceptional results.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gowith-medium-blue mb-2">Work-Life Balance</h3>
                    <p className="text-gray-600">
                      We understand that balanced professionals are more creative, productive, and satisfied. We offer flexible work arrangements and policies that support your personal and professional well-being.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gowith-medium-blue mb-2">Meaningful Work</h3>
                    <p className="text-gray-600">
                      Our work directly impacts our clients' success. You'll have the opportunity to solve real business challenges and see the tangible results of your contributions.
                    </p>
                  </div>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6">Interested in joining our team?</h2>
              <p className="text-gray-600 mb-8">
                Even if we don't have any current openings that match your skills, we're always interested in connecting with talented professionals. Send your resume to <a href="mailto:careers@cloudmor.com" className="text-gowith-medium-blue hover:underline">careers@cloudmor.com</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>;
};
export default Careers;
