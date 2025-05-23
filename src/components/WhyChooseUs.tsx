import { Badge, Server, Award } from 'lucide-react';
import { useState } from 'react';
const WhyChooseUs = () => {
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const testimonials = [{
    quote: "GowithSupport transformed our IT infrastructure and gave us the security confidence we needed. Their team is responsive, knowledgeable, and truly cares about our business goals.",
    author: "Sarah Johnson",
    position: "COO, FinTech Solutions Inc.",
    company: "FinTech Solutions Inc."
  }, {
    quote: "We've tried other IT service providers before, but none matched the level of expertise and proactive approach that GowithSupport delivers. They're truly an extension of our team.",
    author: "Michael Chen",
    position: "CTO, Healthcare Innovations",
    company: "Healthcare Innovations"
  }, {
    quote: "Since partnering with GowithSupport, our downtime has been reduced by 98%. Their 24/7 monitoring and quick response to issues has been a game-changer for our operations.",
    author: "David Rodriguez",
    position: "IT Director, Legal Partners LLP",
    company: "Legal Partners LLP"
  }];
  const metrics = [{
    label: "Years Experience",
    value: "15+"
  }, {
    label: "Uptime Guarantee",
    value: "99.9%"
  }, {
    label: "Tickets Resolved",
    value: "50k+"
  }, {
    label: "Certified Experts",
    value: "25+"
  }];
  const nextTestimonial = () => {
    setActiveTestimonialIndex(prevIndex => prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1);
  };
  const prevTestimonial = () => {
    setActiveTestimonialIndex(prevIndex => prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1);
  };
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Stats and Content */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gowith-dark-blue mb-4">Why Choose CloudMor?</h2>
              <p className="text-lg text-gray-600">
                We combine enterprise expertise with personalized service to deliver technology solutions that drive real business results.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {metrics.map((metric, index) => <div key={index} className="bg-gray-50 p-6 rounded-lg border-l-4 border-gowith-light-blue">
                  <p className="text-3xl font-bold text-gowith-dark-blue mb-1">{metric.value}</p>
                  <p className="text-gray-600">{metric.label}</p>
                </div>)}
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 mt-1">
                  <Badge className="text-gowith-medium-blue" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">
                    Personalized Approach
                  </h3>
                  <p className="text-gray-600">
                    We take the time to understand your business needs and tailor our services to meet your specific requirements.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 mt-1">
                  <Server className="text-gowith-medium-blue" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">
                    Advanced Technology
                  </h3>
                  <p className="text-gray-600">
                    We leverage the latest tools and technologies to provide efficient, effective IT solutions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 mt-1">
                  <Award className="text-gowith-medium-blue" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">
                    Certified Expertise
                  </h3>
                  <p className="text-gray-600">
                    Our team holds leading industry certifications and undergoes continuous training to stay ahead of evolving technologies.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Testimonials */}
          <div className="bg-gowith-dark-blue rounded-lg shadow-xl p-8 relative">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">What Our Clients Say</h3>
              <div className="h-1 w-20 bg-gowith-light-blue"></div>
            </div>

            <div className="min-h-[300px] flex flex-col justify-between">
              <div>
                <blockquote className="text-white text-xl mb-6 italic">
                  "{testimonials[activeTestimonialIndex].quote}"
                </blockquote>
                
                <div className="mt-6">
                  <p className="text-gowith-light-blue font-bold">
                    {testimonials[activeTestimonialIndex].author}
                  </p>
                  <p className="text-gray-300">
                    {testimonials[activeTestimonialIndex].position}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-8">
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => <button key={index} onClick={() => setActiveTestimonialIndex(index)} className={`w-3 h-3 rounded-full ${index === activeTestimonialIndex ? 'bg-gowith-light-blue' : 'bg-gray-500'}`} aria-label={`Go to testimonial ${index + 1}`}></button>)}
                </div>

                <div className="flex space-x-4">
                  <button onClick={prevTestimonial} className="p-2 rounded-full bg-gowith-medium-blue hover:bg-gowith-light-blue transition-colors" aria-label="Previous testimonial">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>
                  
                  <button onClick={nextTestimonial} className="p-2 rounded-full bg-gowith-medium-blue hover:bg-gowith-light-blue transition-colors" aria-label="Next testimonial">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default WhyChooseUs;