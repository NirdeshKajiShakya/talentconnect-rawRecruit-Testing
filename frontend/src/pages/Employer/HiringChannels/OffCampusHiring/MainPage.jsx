import ServiceCard from './ServiceCard';

const serviceData = [
  {
    id: 1,
    title: "Skill-Based",
    description: "Prioritize what matters most-skills. Identify the right candidates through assessments , portfolio, or hands-on challenges, not just resumes and academic scors.",
    icon: "/images/custom-modules-icon.png"
  },
  {
    id: 2,
    title: "Intern-to-Hire",
    description: "Run Internship programs designed to convert top performers into full-time employees. Reduce hiring risks and build a strong talent pipeline with real time evaluation.",
    icon: "/images/onboarding-icon.png"
  },
  {
    id: 3,
    title: "Targeted Outreach ",
    description: "Launch focused hirng campaigns based on job roles experiences or location. Get curated candidates pools and personalized engagement strategies that align with your goals.",
    icon: "/images/campus-enablement-icon.png"
  }
];

export default function MainPage({ onRegisterClick, onRequestInfoClick }) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
           <div className="flex flex-col md:flex-row justify-between mb-8">
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">OffCampus Access:</h1>
          <h2 className="text-3xl font-bold mb-4">Hire Beyond Boundaries</h2>
        </div>
        <div className="md:w-1/2">
          <p className="text-sm">
            Reach top talent across cities, domains, and institutions—without stepping on campus. 
            OffCampus Access helps companies connect with graduates and job seekers outside the traditional 
            college setting. Whether you're hiring based on skills, offering internships, or launching a targeted 
            campaign, OffCampus Access gives you flexibility, reach, and efficiency.
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