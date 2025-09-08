export default function RegisterPage({ onBackClick, formData={}, handleInputChange, handleSubmit }) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header Section */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Campus Branding: Make Your Campus the Talent Hub
          </h1>
          <p className="text-xl text-gray-600 mb-8">
          Attract, engage and retain top talent right from the source. <br/>
          Campus Branding helps your company build a lasting relationship with students, showcasing your brand and opportinities early on. Connect with the next generation of talent ans establish a presence that resonates with future leaders.
          </p>
        </header>

        {/* Registration Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Request info for Campus Branding
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Time</label>
                <select 
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3"
                >
                  <option value="">Select Time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-3 h-32" 
                placeholder="Type your message..."
              />
            </div>

            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                className="w-5 h-5 mr-2"
              />
              <label htmlFor="acceptTerms" className="text-gray-700">
                I accept the Terms
              </label>
            </div>

            <div className="flex justify-between items-center pt-6">
              <button 
                type="button"
                onClick={onBackClick}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Home
              </button>
              <button 
                type="button"
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}