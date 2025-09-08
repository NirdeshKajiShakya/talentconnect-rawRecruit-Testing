import ServiceCard from './ServiceCard';

const serviceData = [
  {
    id: 1,
    title: "Campus Presence",
    description: "Host webinars, workshops and campus talks that put your brand in front of student early. Build trust and familiarity where future talent is being shaped.",
    icon: "/images/custom-modules-icon.png"
  },
  {
    id: 2,
    title: "Enagement Kits",
    description: "Leave a lasting impression with customized merchandise, digital experience and co-branded touchpoints. Make every interaction with your brand memorable.",
    icon: "/images/onboarding-icon.png"
  },
  {
    id: 3,
    title: "Digital Reach",
    description: "Amplify your employer story through curated content, social media campaigns and job spotlight promotions-targeted directly at students and .",
    icon: "/images/campus-enablement-icon.png"
  }
];

export default function MainPage({ onRegisterClick, onRequestInfoClick }) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Employer Branding: <span>Be the brand they want to work for</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Stand out in a competitive hiring market by building strong brand recall among students and early-career professional. <br></br>
          Our Employer Branding solutions help you position your company presence, curated events and digital visibility-making top talent come to you.
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