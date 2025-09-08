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
          Revolutionizing Campus Recruitment
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Our Solutions include a network connecting colleges with skilled employers, a recruitment platform with tools for targeted training programs to bridge skill gaps, and data driven insights for refining career services and recruitment strategies
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
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={onRequestInfoClick}
        >
          Request Info
        </button>
        <button
          onClick={onRegisterClick}
          className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors"
        >
          Register Now
        </button>
      </section>
    </div>
  );
}