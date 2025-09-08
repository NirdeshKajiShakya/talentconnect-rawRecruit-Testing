import ServiceCard from "./ServiceCard";

// Main Landing Page Component
export default function MainPage({ onRegisterClick, numCards, addCard }) {
  // Show only the first numCards from serviceData
  const visibleCards = serviceData.slice(0, numCards);
  
  // For demo purposes, add extra cards if needed
  while (visibleCards.length < numCards) {
    visibleCards.push({
      id: visibleCards.length + 1,
      title: `Additional Service ${visibleCards.length + 1}`,
      description: "This is an additional service that can be dynamically added to showcase our expanding capabilities.",
      icon: "🌟"
    });
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header Section */}
      <header className="mb-12 lg:mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6 items-start">
    {/* Left Column - Heading */}
          <div className="lg:pr-8">
            <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Elevate Your Talent Acquisition: Premier Workforce Solutions
            </h1>
    </div>

    {/* Right Column - Description + CTA */}
    <div className="flex flex-col justify-between h-full">
      <p className="text-gray-600 text-base lg:text-lg mb-4 lg:mb-0 lg:leading-relaxed">
        Discover top-tier workforce solutions designed to streamline your hiring process 
        and connect you with exceptional talent.
      </p>
    </div>
  </div>
</header>

      {/* Services Section */}
      <section className="mb-16">
   
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          {visibleCards.map((service) => (
            <ServiceCard 
              key={service.id} 
              title={service.title} 
              description={service.description} 
              icon={service.icon}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex justify-center space-x-4 mb-12">
        <button
           onClick={onRegisterClick}
         className="border border-gray-300 bg-white px-6 py-2 rounded hover:bg-gray-100">
      
          Request Info
        </button>
        <button 
       
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Register Now
        </button>
      </section>
    </div>
  );
}

// Sample service card data
const serviceData = [
  {
    id: 1,
    title: "Recruitment",
    description: "Collaborate with companies and recruit qualified candidates for contract, RPO, and permanent positions.",
    icon: "👥"
  },
  {
    id: 2,
    title: "Staffing",
    description: "Talent Connect is a staffing firm that provides a personalized, results-driven professional service. Its goal is to match skilled candidates with appropriate positions.",
    icon: "🔍"
  },
  {
    id: 3,
    title: "Thorough Candidate Evaluation",
    description: "Our rigorous screening and evaluation processes are designed to identify candidates' qualifications, technical skills, experience, and potential for your roles. This meticulous approach reduces hiring risks and increases the likelihood of successful long-term placements.",
    icon: "✓"
  }
];