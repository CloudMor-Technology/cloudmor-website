const AboutHero = () => {
  return <section className="h-[15vh] bg-gradient-to-r from-gowith-dark-blue to-gowith-medium-blue flex items-center justify-center my-[80px]">
      <div className="container mx-auto px-[16px] my-[50px]">
        <div className="-bottom-10 -bottom-1.5 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight lg:text-3xl">
            About CloudMor
          </h1>
          <p className="text-lg md:text-xl text-gowith-light-blue mb-6">
            Your trusted technology partner for over 15 years
          </p>
          <p className="text-base md:text-lg text-white max-w-3xl mx-auto leading-relaxed">
            We combine technical expertise with business acumen to deliver IT solutions that drive real results for organizations of all sizes.
          </p>
        </div>
      </div>
    </section>;
};
export default AboutHero;