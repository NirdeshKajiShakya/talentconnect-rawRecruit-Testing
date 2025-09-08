import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function FresherCounselling() {
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

  const [formData, setFormData] = useState({
    counsellingType: '',
    date: null,
    time: '',
    message: '',
    agreeToTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
  };

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
              {/* <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
                Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.
              </p> */}
            </div>
            <div className="md:w-1/2">
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
                Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.
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

        {/* Counselling Form */}
        <section className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-2">Schedule a Counselling Session</h2>
          <p className="text-center text-gray-500 mb-8">
            Let us help you with your journey. Book a time that works best for you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">Type of Counselling</label>
              <select
                name="counsellingType"
                value={formData.counsellingType}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select type</option>
                <option value="individual">Individual</option>
                <option value="couples">Couples</option>
                <option value="family">Family</option>
                <option value="career">Career</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Date</label>
                <DatePicker
                  selected={formData.date}
                  onChange={handleDateChange}
                  dateFormat="MMMM d, yyyy"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholderText="Select a date"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Time</label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="w-full p-3 border border-gray-300 rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="terms" className="text-sm">
                I accept the Terms
              </label>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default FresherCounselling;
