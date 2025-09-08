export default function RegistrationPage({ onBackClick, formData, handleInputChange, handleSubmit }) {
    return (
      <div className="container mx-auto px-4 py-8 ">
        {/* Header */}
       <header className="mb-12 lg:mb-20 flex items-stretch justify-items-end">
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
  
        {/* Registration Form */}
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Request Info for Workforce Solutions
          </h2>
          <p className="text-gray-500 mb-6 text-center">
            Complete the form below to learn more about our services.
          </p>
  
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2 bg-white"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Time</label>
                <select 
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2 bg-white"
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
              <label className="block text-gray-700 mb-1">Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2 h-32" 
                placeholder="Type your message..."
              ></textarea>
            </div>
  
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                className="mr-2" 
              />
              <label htmlFor="acceptTerms" className="text-gray-700">I accept the Terms</label>
            </div>
  
            <div className="flex justify-between">
              <button 
                type="button"
                onClick={onBackClick}
                className="text-blue-500 hover:underline"
              >
                ← Back to Home
              </button>
              <button 
                type="button"
                onClick={handleSubmit}
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }