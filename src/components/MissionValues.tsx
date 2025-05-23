import { Trophy, Target, Users, Sparkles } from "lucide-react";
const MissionValues = () => {
  const values = [{
    icon: <Target className="w-12 h-12 text-gowith-light-blue" />,
    title: "Mission",
    description: "To empower businesses through technology solutions that enhance performance, security, and growth potential."
  }, {
    icon: <Trophy className="w-12 h-12 text-gowith-light-blue" />,
    title: "Excellence",
    description: "We're committed to delivering the highest quality in everything we do, from strategic planning to technical implementation."
  }, {
    icon: <Users className="w-12 h-12 text-gowith-light-blue" />,
    title: "Partnership",
    description: "We build lasting relationships with our clients, becoming trusted advisors in their technology decisions."
  }, {
    icon: <Sparkles className="w-12 h-12 text-gowith-light-blue" />,
    title: "Innovation",
    description: "We continuously explore emerging technologies to provide our clients with forward-thinking solutions."
  }];
  return <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gowith-dark-blue mb-4">
            Our Mission and Values
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">At CloudMor, we're guided by a set of core principles that inform everything we do. These values shape our approach to client relationships, technology solutions, and business growth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center border-t-4 border-gowith-medium-blue">
              <div className="flex justify-center mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gowith-dark-blue mb-4">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default MissionValues;