import PageHeader from '@/components/dashboard/PageHeader'
import Button from '@/components/ui/Button'
import { FiMessageSquare, FiDownload, FiUserCheck } from 'react-icons/fi'

function OffCampusApplicant() {
  const applicant = {
    id: '123456',
    name: 'Name Surname',
    gender: 'Male',
    dob: '1998',
    location: 'Noida, Delhi',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.',
    email: 'mail@example.co',
    phone: '1234567890',
    education: {
      degree: 'Bachelor of Technology, Computer Science',
      college: 'College of Engineering, Delhi',
      year: '2020',
      cgpa: '8.5 CGPA'
    },
    skills: [
      'Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5', 'Skill 6', 'Skill 7', 'Skill 8',
      'Skill 9', 'Skill 10', 'Skill 11', 'Skill 12', 'Skill 13'
    ],
    interestedIndustry: ['IT Industry'],
    interestedJobRoles: ['Software Engineer', 'Data Analyst'],
    preferredLocations: ['Noida', 'Delhi', 'Gurgaon', 'Bangalore', 'Pune', 'Mumbai', 'Hyderabad'],
    lookingFor: ['Internship'],
    employmentType: ['Full-time', 'Remote'],
    language: ['English']
  }

  return (
    <div>
      <PageHeader 
        title="Off-Campus Applicant"
        status="Active"
        createdAt="May 15, 2025"
      />
      
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* Applicant Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 mr-4 overflow-hidden bg-gray-200 rounded-full">
                <div className="flex items-center justify-center w-full h-full text-gray-500 text-xl">
                  {applicant.name.charAt(0)}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{applicant.name}</h2>
                <p className="text-sm text-gray-600">{applicant.gender} • {applicant.dob}</p>
                <p className="text-sm text-gray-600">{applicant.location}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <Button size="sm" variant="outline" className="flex items-center">
                <FiMessageSquare className="w-4 h-4 mr-2" />
                Chat
              </Button>
              <Button size="sm" variant="outline" className="flex items-center">
                <FiDownload className="w-4 h-4 mr-2" />
                View Resume
              </Button>
              <Button size="sm" variant="primary" className="flex items-center">
                <FiUserCheck className="w-4 h-4 mr-2" />
                Shortlist Candidate
              </Button>
            </div>
          </div>
        </div>

        {/* Applicant Details */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="mb-2 text-md font-medium text-gray-900">About</h3>
            <p className="text-gray-600">{applicant.about}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">
            <div>
              <h3 className="mb-2 text-md font-medium text-gray-900">Email address</h3>
              <p className="text-gray-600">{applicant.email}</p>
            </div>
            <div>
              <h3 className="mb-2 text-md font-medium text-gray-900">Mobile Number</h3>
              <p className="text-gray-600">{applicant.phone}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-md font-medium text-gray-900">Education</h3>
            <p className="text-gray-600">{applicant.education.degree}</p>
            <p className="text-gray-600">{applicant.education.college} • {applicant.education.year}</p>
            <p className="text-gray-600">{applicant.education.cgpa}</p>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-md font-medium text-gray-900">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {applicant.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-md font-medium text-gray-900">Interested Industry Type</h3>
            <div className="flex flex-wrap gap-2">
              {applicant.interestedIndustry.map((industry, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-md font-medium text-gray-900">Interested Job Roles</h3>
            <div className="flex flex-wrap gap-2">
              {applicant.interestedJobRoles.map((role, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-md font-medium text-gray-900">Preferred Job Locations</h3>
            <div className="flex flex-wrap gap-2">
              {applicant.preferredLocations.map((location, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full"
                >
                  {location}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-md font-medium text-gray-900">Looking for</h3>
            <div className="flex flex-wrap gap-2">
              {applicant.lookingFor.map((item, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-md font-medium text-gray-900">Employment Type</h3>
            <div className="flex flex-wrap gap-2">
              {applicant.employmentType.map((type, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-md font-medium text-gray-900">Language</h3>
            <div className="flex flex-wrap gap-2">
              {applicant.language.map((lang, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <div className="flex gap-2">
            <Button size="md" variant="outline">
              Report Applicant
            </Button>
            <Button size="md" variant="primary">
              Shortlist Candidate
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OffCampusApplicant