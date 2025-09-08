import { useState } from "react";
import { parseResume } from "@/constants/parser";

function ResumeParser() {
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState(null);
    const [parsedData, setParsedData] = useState(null);
    const [error, setError] = useState(null);
  
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setError(null);
    };
  
    const handleUpload = async () => {
      if (!file) {
        setError("Please select a file to upload");
        return;
      }
  
      setUploading(true);
      setError(null);
  
      try {
        // In a real application, you would send the file to a server
        // Here, we're simulating the parsing with a timeout
        setTimeout(() => {
          const data = parseResume(file);
          setParsedData(data);
          setUploading(false);
        }, 1500);
      } catch (err) {
        setError("Error parsing resume: " + err.message);
        setUploading(false);
      }
    };
  
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Resume Parser</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Resume
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        
        <button
          onClick={handleUpload}
          disabled={uploading || !file}
          className={`w-full py-2 px-4 rounded ${
            uploading || !file
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700 text-white"
          }`}
        >
          {uploading ? "Parsing..." : "Parse Resume"}
        </button>
        
        {error && (
          <div className="mt-4 text-red-600 text-sm">{error}</div>
        )}
        
        {parsedData && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Parsed Data:</h3>
            <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
              {JSON.stringify(parsedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  }