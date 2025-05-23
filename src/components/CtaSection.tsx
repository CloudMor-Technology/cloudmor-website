
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import PhoneButton from './ui/phone-button';

const CtaSection = () => {
  return (
    <section className="py-20 bg-gowith-dark-blue">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Strengthen Your IT Infrastructure?
          </h2>
          <p className="text-xl text-gowith-light-blue mb-10 max-w-3xl mx-auto">
            Our experts will analyze your current technology environment and identify opportunities for improvement
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Button className="bg-gowith-orange hover:bg-gowith-orange-hover text-white px-8 py-6 text-lg">
              <Link to="/contact">Schedule Your Free IT Consultation</Link>
            </Button>
            
            <PhoneButton phoneNumber="(949) 288-5812" className="text-lg" />
          </div>
          
          <p className="text-white text-opacity-80 mt-8">
            No obligation, no pressure. Just expert guidance to help your business succeed.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
