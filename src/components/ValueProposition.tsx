import { CheckCircle, Shield, Clock, TrendingUp } from 'lucide-react';
const ValueProposition = () => {
  const values = [{
    icon: <Shield className="w-12 h-12 text-gowith-medium-blue" />,
    title: "Enterprise-Grade Security",
    description: "Multi-layered protection for your critical data and systems, keeping your business secure from evolving threats."
  }, {
    icon: <Clock className="w-12 h-12 text-gowith-medium-blue" />,
    title: "24/7 Proactive Support",
    description: "Around-the-clock monitoring and support to prevent issues before they impact your business operations."
  }, {
    icon: <CheckCircle className="w-12 h-12 text-gowith-medium-blue" />,
    title: "Trusted IT Expertise",
    description: "Certified professionals with extensive experience across industries and technology environments."
  }, {
    icon: <TrendingUp className="w-12 h-12 text-gowith-medium-blue" />,
    title: "Business-Driven Results",
    description: "Technology solutions aligned with your business goals, driving growth and competitive advantage."
  }];
  return <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gowith-dark-blue mb-4">Why Businesses Choose CloudMor</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We deliver reliable, secure, and strategic IT solutions that allow you to focus on growing your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="flex justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gowith-dark-blue mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default ValueProposition;