import ServiceCard from './ServiceCard';

const serviceData = [
  {
    id: 1,
    title: "Resume Building",
    description: "Learn how to optimize your resume to showcase your unique skills, experience, and accomplishments. Our experts will provide personalized feedback to help you stand out to potential employee.",
    icon: "/images/custom-modules-icon.png"
  },
  {
    id: 2,
    title: "Interview Pre[aration",
    description: "Master the art of interviewing through interactive mock session and coaching on proven techniques. Gain the confidence to articulate you value and make a listing impression.",
    icon: "/images/onboarding-icon.png"
  },
  {
    id: 3,
    title: "Personal Branding",
    description: "Develop a compelling personal brand that highlights your strengths and differentiates you from the competition.Leverage digital tools and networking strategies to amplify your visibility.",
    icon: "/images/campus-enablement-icon.png"
  }
];

export default function MainPage({ onRegisterClick, onRequestInfoClick }) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
           Student Training  Programs
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
         offer targeted training programs to bridge skill gaps and ensure graduates are prepared with industry specific skills necessary for their careers.
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