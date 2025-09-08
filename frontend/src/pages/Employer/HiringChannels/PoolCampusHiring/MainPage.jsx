import ServiceCard from './ServiceCard';

const serviceData = [
  {
    id: 1,
    title: "Unified Access",
    description: "Engage with pre-vetted stduents from multiple colleges in a single hiring event, giving your requirement team access to a wider and more diverse talent pool  without the hassle of coordinating multiple campus visits.",
    icon: "/images/custom-modules-icon.png"
  },
  {
    id: 2,
    title: "Smart Efficiency",
    description: "Save valuable time, effort and costs by consolidating hiring efforts into one well-managed event. Streamline interviews, assessments, and selections while optimizing your recruitment budget."
  },
  {
    id: 3,
    title: "Amplified Branding",
    description: "Strengthen your employer brand by showcasing your company to students across campuses at once. Build recognition, trust and recall among fresh talent through a single impactful engagement.",
    icon: "/images/campus-enablement-icon.png"
  }
];

export default function MainPage({ onRegisterClick, onRequestInfoClick }) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
         <div className="flex flex-col md:flex-row justify-between mb-8">
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">Pool Campus Connect:</h1>
          <h2 className="text-3xl font-bold mb-4">Hire Bigger</h2>
        </div>
        <div className="md:w-1/2">
          <p className="text-sm">
           Tap into diverse talent from multiple insitutions through one powerful drive. <br /> Pool Campus Connect brings students from several colleges together, making it easier for campanies to conduct centralized hiring drive that are time-saving, cost-efficient, and great for brand visibility
          </p>
        </div>
      </div>

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