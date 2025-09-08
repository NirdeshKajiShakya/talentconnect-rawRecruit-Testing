export default function ServiceCard({ title, description, icon }) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
        {/* Image container */}
        <div className="mb-4">
          <img 
            src={icon} 
            alt={title}
            className="w-12 h-12 object-contain"
          />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center ">
          Learn More
          <span className="ml-2">→</span>
        </button>
      </div>
    );
  }
  