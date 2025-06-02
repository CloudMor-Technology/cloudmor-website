
const IndustriesHero = ({
  industry,
  headline = "Specialized IT Solutions for Every Industry",
  subheadline = "We understand the unique technology challenges across diverse sectors"
}) => {
  return (
    <section className="h-[40vh] bg-gradient-to-r from-gowith-dark-blue to-gowith-medium-blue flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            {industry ? `IT Solutions for ${industry}` : headline}
          </h1>
          <p className="text-lg md:text-xl text-gowith-light-blue mb-6">
            {subheadline}
          </p>
          <p className="text-base md:text-lg text-white max-w-3xl mx-auto leading-relaxed">
            From regulatory compliance to specialized software, we deliver technology solutions tailored to your industry's unique requirements.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndustriesHero;
