
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative bg-transparent min-h-[80vh] flex items-end justify-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/c61c7476-bc00-4462-acbb-f8d72f7ecac3.png" 
          alt="CloudMor Business Meeting" 
          className="w-full h-full object-cover" 
          style={{
            filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))',
            backgroundColor: 'transparent'
          }} 
        />
      </div>
      <div className="container mx-auto px-4 relative z-10 pb-16">
        <div className="max-w-4xl mx-auto bg-transparent backdrop-blur-sm p-8 rounded-lg text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Transforming Business Through Strategic IT Solutions
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-md">
            Enterprise-level technology and security solutions tailored for growing businesses
          </p>
          <p className="text-lg text-white mb-10 max-w-2xl mx-auto drop-shadow-md">
            Partner with CloudMor to secure your data, optimize your infrastructure, and accelerate your growth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gowith-orange hover:bg-gowith-orange-hover text-white px-8 py-6 text-lg">
              <Link to="/contact">Schedule Your Free IT Consultation</Link>
            </Button>
            <Button variant="outline" className="border-white hover:bg-white hover:bg-opacity-20 px-8 py-6 text-lg text-sky-900">
              <Link to="/services">Explore Our Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
