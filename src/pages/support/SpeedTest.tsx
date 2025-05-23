
import React, { useEffect } from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Helmet } from 'react-helmet';

const SpeedTest = () => {
  useEffect(() => {
    // Create and inject the speed test script
    const script = document.createElement('script');
    script.src = 'https://cloudmor.dualstack.speedtestcustom.com/speedtest/api/js/embed.js';
    script.async = true;
    
    document.body.appendChild(script);
    
    // Cleanup function to remove the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Internet Speed Test | CloudMor</title>
        <meta name="description" content="Check your internet connection speed with CloudMor's reliable speed test tool. Measure your download and upload speeds in seconds." />
      </Helmet>
      
      <Navbar />
      
      <div className="pt-32 pb-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gowith-dark-blue mb-4">
              Internet Speed Test
            </h1>
            <p className="text-xl text-gowith-medium-blue max-w-3xl mx-auto">
              Test your internet connection speed with our reliable speed test tool. 
              Get accurate measurements of your download and upload speeds in seconds.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 mb-12">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold text-gowith-dark-blue">
                Start Your Speed Test
              </h2>
              <p className="text-gowith-medium-blue mt-2">
                Click the button below to begin testing your connection speed.
              </p>
            </div>
            
            {/* Speed Test Container */}
            <div className="flex justify-center">
              <div id="speedtest" data-src="https://cloudmor.dualstack.speedtestcustom.com" style={{minHeight: '650px', width: '100%'}}></div>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-gowith-dark-blue mb-4">
              Understanding Your Speed Test Results
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-xl text-gowith-dark-blue mb-2">Download Speed</h4>
                <p className="text-gray-700">
                  Measures how quickly data is transferred from the internet to your device. 
                  Higher download speeds allow for faster web browsing and smoother streaming.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-xl text-gowith-dark-blue mb-2">Upload Speed</h4>
                <p className="text-gray-700">
                  Measures how quickly data is transferred from your device to the internet.
                  Important for video calls, sending large files, and cloud backups.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-xl text-gowith-dark-blue mb-2">Ping/Latency</h4>
                <p className="text-gray-700">
                  Measures the time it takes for data to travel between your device and our servers.
                  Lower ping values mean more responsive connections for gaming and video calls.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default SpeedTest;
