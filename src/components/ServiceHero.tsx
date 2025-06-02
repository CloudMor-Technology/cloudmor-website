
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
    <section className={`h-[30vh] bg-gradient-to-r ${backgroundClass} flex items-center justify-center pt-8`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gowith-light-blue mb-6">
            {subtitle}
          </p>
          {description && (
            <p className="text-base md:text-lg text-white max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
