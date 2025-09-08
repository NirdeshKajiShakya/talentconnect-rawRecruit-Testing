import { useState } from 'react';
import { FiUpload, FiShare2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import PageHeader from "@/components/dashboard/PageHeader"

function RefPostingPage() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleShareJobDetails = () => {
    // Here you would handle the file upload process
    if (file) {
      console.log('File uploaded:', file);
      // Then navigate to manage referrals
      navigate('/professional/service-request/referral');
    } else {
      alert('Please upload a file first');
    }
  };
  
  const handlePostYourself = () => {
    navigate('/professional/service-request/post');
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader 
        title="Send the Job details to us to post on behalf of you"
      />
      
      <p className="text-gray-600 mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
      </p>
      
      <div className="bg-white border border-gray-200 rounded-md p-6 mb-10">
        <h2 className="text-lg font-medium mb-4">Upload job details</h2>
        
        <p className="text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
        </p>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="w-full">
            <label 
              htmlFor="jobDetails" 
              className="flex items-center justify-between w-full px-4 py-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-50"
            >
              <span className="text-gray-500">{file ? file.name : 'Upload Job details'}</span>
              <FiUpload className="text-gray-400" />
            </label>
            <input
              id="jobDetails"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          
          <button 
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors flex items-center"
            onClick={handleShareJobDetails}
          >
            <FiShare2 className="mr-2" />
            Share Job Details
          </button>
        </div>
      </div>
      
      <h2 className="text-xl font-medium mb-4">Or Post it yourself</h2>
      
      <p className="text-gray-600 mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
      </p>
      
      <button 
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
        onClick={handlePostYourself}
      >
        Post Referral Job
      </button>
    </div>
  );
}

export default RefPostingPage;