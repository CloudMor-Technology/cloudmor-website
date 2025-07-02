import { Button } from "./ui/button";
import { CheckCircle } from "lucide-react";
const IndustryDetail = ({
  industry
}) => {
  return <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Overview Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6">Overview</h2>
          <p className="text-gray-700 text-lg mb-6">{industry.overview}</p>
        </section>

        {/* Industry Challenges Section */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6">Industry Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industry.challenges.map((challenge, idx) => <div key={idx} className="bg-white p-6 rounded-md shadow-sm">
                <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">{challenge.title}</h3>
                <p className="text-gray-700">{challenge.description}</p>
              </div>)}
          </div>
        </section>

        {/* Our Solutions Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6">Our Solutions</h2>
          
          {industry.solutions.map((solution, idx) => <div key={idx} className="mb-8">
              <h3 className="text-2xl font-bold text-gowith-medium-blue mb-4">{solution.title}</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {solution.items.map((item, itemIdx) => <li key={itemIdx} className="flex items-start">
                    <CheckCircle className="text-gowith-light-blue mt-1 mr-2 flex-shrink-0" size={18} />
                    <span className="text-gray-700">{item}</span>
                  </li>)}
              </ul>
            </div>)}
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gowith-dark-blue mb-6">Why Choose GowithSupport</h2>
          <p className="text-gray-700 text-lg mb-8">{industry.whyChooseUs}</p>
        </section>

        {/* Case Study Preview Section */}
        {industry.caseStudy && <section className="mb-16 bg-gowith-dark-blue bg-opacity-5 p-8 rounded-lg border-l-4 border-gowith-medium-blue">
            <h2 className="text-2xl font-bold text-gowith-dark-blue mb-4">Case Study</h2>
            <p className="text-gray-700 mb-6">{industry.caseStudy}</p>
            <a href="/insights/case-studies" className="inline-flex items-center text-gowith-medium-blue hover:text-gowith-dark-blue font-medium">
              <span>View all case studies</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </section>}

        {/* CTA Button */}
        <div className="text-center mt-8">
          <h3 className="text-2xl font-bold text-gowith-dark-blue mb-4">{industry.ctaHeadline}</h3>
          <Button className="bg-gowith-orange hover:bg-gowith-orange-hover text-white py-2 h-auto w-64 px-[180px]">
            {industry.ctaButtonText}
          </Button>
        </div>
      </div>
    </div>;
};
export default IndustryDetail;