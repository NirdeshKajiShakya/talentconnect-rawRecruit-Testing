// ...all imports remain unchanged
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
function FresherCareerCraft() {
    const [features, setFeatures] = useState([
      {
        id: 1,
        title: "Long heading is what you see here in this feature section",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      },
      {
        id: 2,
        title: "Long heading is what you see here in this feature section",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      },
      {
        id: 3,
        title: "Long heading is what you see here in this feature section",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      },
    ]);
  
    const addFeature = () => {
      const newFeature = {
        id: features.length + 1,
        title: 'New Feature Section',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
      };
      setFeatures([...features, newFeature]);
    };
  
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
          {/* Hero Section */}
          <section className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2 space-y-4">
                <h1 className="text-4xl font-bold leading-snug">
                  Long heading is what you see here in this feature section
                </h1>
              </div>
              <div className="md:w-1/2">
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
                  Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.
                </p>
              </div>
            </div>
          </section>
  
          {/* Feature Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.id} className="bg-white shadow-md rounded-xl p-6">
                <div className="bg-gray-100 h-40 mb-4 flex items-center justify-center rounded">
                  <span className="text-gray-400 text-4xl">📷</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <button className="text-blue-600 font-medium hover:underline">Button</button>
              </div>
            ))}
          </section>
  
          {/* Add Feature Button */}
          <div className="text-center">
            <button
              onClick={addFeature}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Add More Features
            </button>
          </div>
  
          {/* Contact Section */}
          <section className="text-center py-20 bg-white shadow-md rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button className="border border-black text-black px-6 py-2 rounded hover:bg-black hover:text-white transition">
              Contact Us
            </button>
          </section>
        </div>
      </div>
    );
  }
  
  export default FresherCareerCraft;
  