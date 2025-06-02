
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
    <section className={`pt-32 pb-24 min-h-[60vh] bg-gradient-to-r ${backgroundClass} flex items-center`}>
      <div className="container mx-auto px-4 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-gowith-light-blue mb-8">
            {subtitle}
          </p>
          {description && (
            <p className="text-lg md:text-xl text-white mb-10 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
