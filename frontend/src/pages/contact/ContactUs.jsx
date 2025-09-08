import { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    message: '',
    acceptTerms: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      setSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', formData);
        setSubmitting(false);
        setFormData({ message: '', acceptTerms: false });
      }, 1000);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.message.trim()) errors.message = 'Message is required';
    if (!formData.acceptTerms) errors.acceptTerms = 'You must accept the terms';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows="4"
                  placeholder="Type your message..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  I accept the Terms
                </label>
              </div>
              {errors.acceptTerms && (
                <p className="text-red-500 text-sm">{errors.acceptTerms}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Email</h2>
              <a
                href="mailto:contact-us@talentconnectes.com"
                className="text-blue-600 hover:text-blue-800"
              >
                contact-us@talentconnectes.com
              </a>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Phone</h2>
              <a
                href="tel:+917979863193"
                className="text-blue-600 hover:text-blue-800"
              >
                +91-7979863193
              </a>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Office</h2>
              <p className="text-gray-600">Bengaluru, Karnataka, India</p>
              <a
                href="https://maps.google.com/?q=Bengaluru, Karnataka, India"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;