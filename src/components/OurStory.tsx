import React from 'react';
const OurStory = () => {
  return <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
          <div className="md:w-1/2">
            <div className="relative">
              <div className="bg-gowith-medium-blue w-full h-full absolute top-4 left-4 rounded-lg"></div>
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="Team collaboration" className="rounded-lg shadow-md relative z-10 w-full" />
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gowith-dark-blue mb-6">
              Our Story
            </h2>
            <p className="text-lg text-gray-700 mb-4">Founded in 2019, CloudMor began with a simple mission: to provide businesses with the strategic IT guidance and support they need to thrive in an increasingly digital world.</p>
            <p className="text-lg text-gray-700 mb-4">
              Our journey has been driven by a commitment to excellence and a deep understanding that technology should serve business objectives, not the other way around. As we've grown, we've expanded our team of professional IT specialists to serve clients globally.
            </p>
            <p className="text-lg text-gray-700">
              We specialize in all technologies that support business growth and innovation. From cybersecurity to cloud services, from IT strategy to managed services, our team brings expertise and dedication to every client relationship.
            </p>
            <div className="mt-8">
              
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default OurStory;