
import React from 'react';

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description?: string;
  backgroundClass?: string;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({
  title,
  subtitle,
  description,
  backgroundClass = "from-gowith-dark-blue to-gowith-medium-blue"
}) => {
  return (
    <section className={`pt-32 pb-20 bg-gradient-to-r ${backgroundClass}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {title}
          </h1>
          <p className="text-xl text-gowith-light-blue mb-8">
            {subtitle}
          </p>
          {description && (
            <p className="text-lg text-white mb-10 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
