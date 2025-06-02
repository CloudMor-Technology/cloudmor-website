import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The True Cost of IT Downtime: More Than Just Lost Revenue",
      excerpt: "When business technology fails, the impact extends far beyond the immediate frustration. While lost revenue is often the most visible consequence, IT downtime creates a cascade of costs that can affect your business for weeks or even months.",
      date: "May 15, 2025",
      author: "Sarah Johnson",
      category: "IT Strategy",
      image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 2,
      title: "5 Cybersecurity Myths That Put Your Business at Risk",
      excerpt: "In an age where cyber threats are constantly evolving, businesses need accurate information to protect their valuable data. Unfortunately, many organizations operate under misconceptions that leave them vulnerable to attacks.",
      date: "May 8, 2025",
      author: "Michael Chen",
      category: "Cybersecurity",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 3,
      title: "Cloud Migration: Strategic Planning for a Successful Transition",
      excerpt: "Cloud computing offers businesses unprecedented flexibility, scalability, and cost efficiencies. However, moving to the cloud is more than a technical undertaking—it's a strategic business decision that requires careful planning and execution.",
      date: "May 1, 2025",
      author: "Jennifer Patel",
      category: "Cloud Solutions",
      image: "https://images.unsplash.com/photo-1603695576504-b2b722009054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        <section className="h-[35vh] bg-gradient-to-r from-gowith-dark-blue to-gowith-medium-blue flex items-center justify-center">
          <div className="container mx-auto px-[16px] my-[50px]">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Insights Blog
              </h1>
              <p className="text-lg md:text-xl text-gowith-light-blue mb-6">
                Expert guidance on IT strategy, cybersecurity, and technology trends
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
                  <h2 className="text-xl font-bold text-gowith-dark-blue mb-4">Categories</h2>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gowith-medium-blue hover:underline">Cybersecurity</a></li>
                    <li><a href="#" className="text-gowith-medium-blue hover:underline">Cloud Solutions</a></li>
                    <li><a href="#" className="text-gowith-medium-blue hover:underline">IT Strategy</a></li>
                    <li><a href="#" className="text-gowith-medium-blue hover:underline">Managed Services</a></li>
                    <li><a href="#" className="text-gowith-medium-blue hover:underline">Technology Trends</a></li>
                    <li><a href="#" className="text-gowith-medium-blue hover:underline">Business Continuity</a></li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold text-gowith-dark-blue mb-4">Subscribe</h2>
                  <p className="text-gray-600 mb-4">Stay updated with our latest insights and industry news</p>
                  <form>
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:ring-gowith-medium-blue focus:border-gowith-medium-blue"
                      required 
                    />
                    <button 
                      type="submit" 
                      className="w-full py-2 bg-gowith-orange hover:bg-gowith-orange-hover text-white rounded-md transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
              
              {/* Blog Posts */}
              <div className="lg:col-span-2">
                <div className="space-y-12">
                  {blogPosts.map(post => (
                    <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg">
                      <div className="h-64 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <span>{post.category}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gowith-dark-blue mb-3">{post.title}</h2>
                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">By {post.author}</span>
                          <a 
                            href={`/insights/blog/${post.id}`} 
                            className="text-gowith-medium-blue hover:text-gowith-dark-blue font-medium inline-flex items-center"
                          >
                            Read more
                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 flex justify-center">
                  <nav className="inline-flex rounded-md shadow">
                    <a href="#" className="py-2 px-4 bg-white border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Previous
                    </a>
                    <a href="#" className="py-2 px-4 bg-gowith-light-blue border border-gowith-light-blue text-sm font-medium text-white">
                      1
                    </a>
                    <a href="#" className="py-2 px-4 bg-white border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50">
                      2
                    </a>
                    <a href="#" className="py-2 px-4 bg-white border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50">
                      3
                    </a>
                    <a href="#" className="py-2 px-4 bg-white border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Next
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
