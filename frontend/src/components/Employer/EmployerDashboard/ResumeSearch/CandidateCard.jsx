

function CandidateCard({ candidate, onShortlist }) {
    return (
      <div className="bg-white rounded shadow p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
              {/* Placeholder for profile image */}
              <span className="text-gray-500">DP</span>
            </div>
            <div>
              <h3 className="font-semibold">{candidate.name}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {candidate.location}
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500">Last active Today</div>
        </div>
  
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center text-sm">
            💰 Current Salary: ${candidate.currentSalary}
          </div>
          <div className="flex items-center text-sm">
            💸 Expected Salary: ${candidate.expectedSalary}
          </div>
          <div className="flex items-center text-sm">
            📧 {candidate.email}
          </div>
          <div className="flex items-center text-sm">
            📞 {candidate.phone}
          </div>
        </div>
  
        <div className="flex flex-wrap gap-1 mb-2">
          {candidate.linkedin && (
            <a href={candidate.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded">
              <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zm-11 19H5V8h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764S5.034 3.204 6 3.204s1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765C14.396 7.179 20 7.37 20 12.623V19z" />
              </svg>
            </a>
          )}
          {candidate.github && (
            <a href={candidate.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234C5.662 20.476 5 18.07 5 18.07c-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.562 21.8 24 17.302 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}
          {candidate.portfolio && (
            <a href={candidate.portfolio} target="_blank" rel="noopener noreferrer" className="inline-block px-2 py-0.5 text-xs bg-gray-100 hover:bg-gray-200 rounded">
              Portfolio
            </a>
          )}
          {candidate.cv && (
            <a href={candidate.cv} target="_blank" rel="noopener noreferrer" className="inline-block px-2 py-0.5 text-xs bg-gray-100 hover:bg-gray-200 rounded">
              CV
            </a>
          )}
        </div>
  
        <div className="border-t pt-3 mt-2">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <h4 className="text-sm font-medium mb-1">Key info:</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-xs">🎓 {candidate.education}</div>
                <div className="text-xs">⏳ {candidate.experience} years</div>
                <div className="text-xs">🗣 {candidate.languages?.join(', ')}</div>
                <div className="text-xs">👤 {candidate.gender}, {candidate.age}</div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Designation:</h4>
              <p className="text-sm">{candidate.designation}</p>
              <h4 className="text-sm font-medium mt-2 mb-1">Industry:</h4>
              <p className="text-sm">{candidate.industry}</p>
              <h4 className="text-sm font-medium mt-2 mb-1">Languages:</h4>
              <p className="text-sm">{candidate.languages?.join(', ')}</p>
            </div>
          </div>
  
          <div>
            <h4 className="text-sm font-medium mb-2">Skills:</h4>
            <div className="flex flex-wrap gap-1">
              {candidate.skills?.map((skill, index) => (
                <span key={index} className="px-2 py-0.5 bg-gray-100 text-xs rounded">{skill}</span>
              ))}
            </div>
          </div>
  
          <div className="flex justify-end gap-2 mt-4">
            <button className="px-4 py-1 border border-gray-300 text-sm rounded hover:bg-gray-50">
              Chat
            </button>
            <button
              onClick={() => onShortlist(candidate)}
              className={`px-4 py-1 text-sm rounded ${candidate.shortlisted ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-teal-600 text-white hover:bg-teal-700'}`}
            >
              {candidate.shortlisted ? 'Shortlisted' : 'Shortlist Candidate'}
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default CandidateCard;
  