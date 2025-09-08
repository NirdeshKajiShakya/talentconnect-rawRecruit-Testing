export default function Welcome({ nextStep }) {
    return (
      <div className="fixed inset-0 bg-gray-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4">
          <div className="text-center w-full max-w-lg">
            <h1 className="text-2xl font-bold mb-4">Create Your College Account</h1>
            <p className="mb-8">Build your profile to explore job opportunities, internships, and campus placements.</p>
            
            <div className="flex justify-center gap-4">
              <button className="px-6 py-2 border border-gray-300 rounded-md">Cancel</button>
              <button 
                onClick={nextStep}
                className="px-6 py-2 bg-black text-white rounded-md"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}