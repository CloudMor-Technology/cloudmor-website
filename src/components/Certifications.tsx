
const Certifications = () => {
  const certifications = [
    {
      name: "Microsoft Gold Partner",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png"
    },
    {
      name: "Cisco Premier Partner",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1200px-Cisco_logo_blue_2016.svg.png"
    },
    {
      name: "AWS Solution Architect",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1024px-Amazon_Web_Services_Logo.svg.png"
    },
    {
      name: "CISSP",
      logo: "/lovable-uploads/6acdc8cf-6fe6-4297-b70e-1d19a4ef31f0.png"
    },
    {
      name: "Google Cloud Partner",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
    },
    {
      name: "Azure Solution Architect",
      logo: "/lovable-uploads/c98e8d7b-612c-4375-b9d1-af212401e6dc.png"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gowith-dark-blue mb-4">
            Certifications & Partnerships
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our team maintains industry-leading certifications and strategic partnerships with major technology providers, ensuring we deliver best-in-class solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-32">
              <img 
                src={cert.logo} 
                alt={cert.name} 
                className="max-h-12 max-w-full mb-4"
              />
              <p className="text-sm font-medium text-gray-600 text-center">{cert.name}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600">
            Our team holds numerous individual certifications in networking, security, cloud technologies, and project management.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
