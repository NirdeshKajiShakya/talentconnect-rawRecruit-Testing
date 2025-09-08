import ServiceCard from './ServiceCard';

const serviceData = [
  {
    id: 1,
    title: "Custom Modules",
    description: "Design training programs aligned to your company's exact needs—technical skills, focus areas, or industry-specific know-how. Delivering your way online, hybrid, or in-person.",
    icon: "/images/custom-modules-icon.png"
  },
  {
    id: 2,
    title: "Faster Onboarding",
    description: "Reduce ramp-up time for new hires by preparing them even before Day 1. Build confidence and capability with pre-joining or induction training.",
    icon: "/images/onboarding-icon.png"
  },
  {
    id: 3,
    title: "Campus Enablement",
    description: "Offer colleges value-added programs that get students job ready, improve placement outcomes while aligning candidates to match your hiring standards.",
    icon: "/images/campus-enablement-icon.png"
  }
];

export default function MainPage({ onRegisterClick, onRequestInfoClick }) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          OnDemand Training: <span className="text-blue-600">Upskill with Purpose</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Bridge the gap between potential and performance with tailored training programs. 
          OnDemand Training empowers companies to offer job ready learning experiences for 
          students or newly hired employees.
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