import ServiceCard from './ServiceCard';

const serviceData = [
  {
    id: 1,
    title: "Partneships",
    description: "At TalentConnect, we offer seamless on-campus hiring solutions in partnership wih universities and colleges providing comprehensive end-to-end recruitment services. Our tailored approach ensures efficient hiring processes, connecting students directly with the top employers. Let us enhance your campus recruitment with our expertise and expensive network .",
    icon: "/images/custom-modules-icon.png"
  },
  {
    id: 2,
    title: "Talent Pipeline",
    description: "At TalentConnect we provide access to a steady pipeline of pre-screened candidates supply of qualified talent. Our rigorous screening process gaurantees that only the best candidatesare presented. Streamline your hiring process. Rely on our expertise to maintain a robust talent pipeline for your organization needs.",
    icon: "/images/onboarding-icon.png"
  },
  {
    id: 3,
    title: "AI Talent Match",
    description: "At TalentConnect AI Talent Match utilizes advanced algorithm to intelligently connect employers with the most suitable candidates, ensuring you have a continous supply of qualified talent. Our AI-driven screening process gaurantees that only the best candidates are presented, streamlining your hiring process. Rely on your pipeline for your organization needs.",
    icon: "/images/campus-enablement-icon.png"
  }
];

export default function MainPage({ onRegisterClick, onRequestInfoClick }) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          OnCampus Connect: <br /> Hire Smarter
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
           Our OnCampus Service brings career opportunities directly to student them eith top employers through campus recruitment drives and job events.
        </p>
      </header>

      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceData.map((service) => (
            <ServiceCard 
              key={service.id} 
              title={service.title} 
              description={service.description} 
              icon={service.icon}
            />
          ))}
        </div>
      </section>

      <section className="flex justify-center space-x-4 mb-12">
        <button 
    
          onClick={onRegisterClick}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Request Info
        </button>
        <button 
            onClick={onRequestInfoClick}
          className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors"
        >
          Register Now
        </button>
      </section>
    </div>
  );
}