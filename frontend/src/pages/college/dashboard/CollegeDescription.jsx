
import React from 'react';
export default function CollegeDescription({ onboardingData }) {
  // Destructure relevant data with default empty objects/arrays
  const collegeUniversityDetails = onboardingData?.collegeUniversityDetails || {};
  const placementCoordinatorDetails = onboardingData?.placementCoordinatorDetails || {};
  const placementRecruitmentDetails = onboardingData?.placementRecruitmentDetails || {};
  const profileAchievements = onboardingData?.profileAchievements || {};

  const formatProgramsOffered = (programs) => {
    return programs && programs.length > 0 ? programs.join(', ') : 'Not Set';
  };

  const formatPreferredHiringCompanies = (companies) => {
    return companies && companies.length > 0 ? companies.join(', ') : 'Not Set';
  };

  const formatRecruitmentServices = (services) => {
    return services && services.length > 0 ? services.join(', ') : 'Not Set';
  };

  return (
    <div className="font-sans w-full ">
      {/* College Description Header */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold mb-1">College Description</h1>
        <p className="text-gray-600 text-sm">
          Detailed overview of your college/university's information.
        </p>
      </div>

      {/* Main Content Card */}
      <div className="border border-gray-300 rounded bg-white shadow-sm">
        {/* Section 1: College/University Details */}
        <div className="flex flex-wrap border-b border-gray-300 p-4">
          {/* Left Column - Title and Description */}
          <div className="w-full md:w-1/2 pr-4 mb-4 md:mb-0">
            <h2 className="font-semibold mb-2">College/University Details</h2>
            <p className="text-sm text-gray-600">
              Information about your institution, its location, and contact details.
            </p>
          </div>

          {/* Right Column - Details */}
          <div className="w-full md:w-1/2">
            <div className="space-y-2">
              <div className="flex">
                <div className="w-1/2 text-right pr-2 text-sm font-semibold">College/University Name :</div>
                <div className="w-1/2 text-sm">{collegeUniversityDetails.collegeName || 'Not Set'}</div>
              </div>

              <div className="flex">
                <div className="w-1/2 text-right pr-2 text-sm font-semibold">Established Year :</div>
                <div className="w-1/2 text-sm">
                  {collegeUniversityDetails.establishedYear ?
                    new Date(collegeUniversityDetails.establishedYear).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not Set'}
                </div>
              </div>

              <div className="flex">
                <div className="w-1/2 text-right pr-2 text-sm font-semibold">College Website URL :</div>
                <div className="w-1/2 text-sm">
                  {profileAchievements.collegeWebsite ?
                    <a href={profileAchievements.collegeWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{profileAchievements.collegeWebsite}</a>
                    : 'Not Set'}
                </div>
              </div>

              <div className="flex">
                <div className="w-1/2 text-right pr-2 text-sm font-semibold">Phone Number :</div>
                <div className="w-1/2 text-sm">{collegeUniversityDetails.phoneNumber || 'Not Set'}</div>
              </div>

              <div className="flex">
                <div className="w-1/2 text-right pr-2 text-sm font-semibold">Alternate Phone Number :</div>
                <div className="w-1/2 text-sm">{collegeUniversityDetails.alternatePhoneNumber || 'Not Set'}</div>
              </div>

              <div className="flex">
                <div className="w-1/2 text-right pr-2 text-sm font-semibold">College Location :</div>
                <div className="w-1/2 text-sm">
                  {[collegeUniversityDetails.collegeLocation, collegeUniversityDetails.city, collegeUniversityDetails.state, collegeUniversityDetails.country]
                    .filter(Boolean).join(', ') || 'Not Set'}
                </div>
              </div>

              <div className="flex">
                <div className="w-1/2 text-right pr-2 text-sm font-semibold">Pincode :</div>
                <div className="w-1/2 text-sm">{collegeUniversityDetails.pincode || 'Not Set'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Placement Coordinator Details */}
        <div className="flex flex-wrap border-b border-gray-300 p-4">
          {/* Left Column - Title and Description */}
          <div className="w-full md:w-1/2 pr-4 mb-4 md:mb-0">
            <h2 className="font-semibold mb-2">Placement Coordinator Details</h2>
            <p className="text-sm text-gray-600">
              Key contact information for the college's placement and recruitment activities.
            </p>
          </div>

          {/* Right Column - Details */}
          <div className="w-full md:w-1/2">
            <div className="space-y-2">
              <div className="flex">
                <div className="w-1/2 text-right pr-2 text-sm font-semibold">Coordinator Name :</div>
                <div className="w-1/2 text-sm">{placementCoordinatorDetails.coordinatorName || 'Not Set'}</div>
              </div>

              <div className="flex">
                <div className="w-1/2 text-right pr-2 text-sm font-semibold">Designation :</div>
                <div className="w-1/2 text-sm">{placementCoordinatorDetails.designation || 'Not Set'}</div>
              </div>

              <div className="flex">
                <div className="w-1/2 text-right pr-2 text-sm font-semibold">Official Email ID :</div>
                <div className="w-1/2 text-sm">
                  {placementCoordinatorDetails.officialEmail ?
                    <a href={`mailto:${placementCoordinatorDetails.officialEmail}`} className="text-blue-600 hover:underline">{placementCoordinatorDetails.officialEmail}</a>
                    : 'Not Set'}
                </div>
              </div>

              <div className="flex">
                <div className="w-1/2 text-right pr-2 text-sm font-semibold">Official Contact Number :</div>
                <div className="w-1/2 text-sm">{placementCoordinatorDetails.officialMobile || 'Not Set'}</div>
              </div>

              <div className="flex">
                <div className="w-1/2 text-right pr-2 text-sm font-semibold">LinkedIn Profile :</div>
                <div className="w-1/2 text-sm">
                  {placementCoordinatorDetails.linkedinUrl ?
                    <a href={placementCoordinatorDetails.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{placementCoordinatorDetails.linkedinUrl}</a>
                    : 'Not Set'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Placement & Recruitment Details */}
        <div className="flex flex-wrap p-4">
          {/* Left Column - Title and Description */}
          <div className="w-full md:w-1/2 pr-4 mb-4 md:mb-0">
            <h2 className="font-semibold mb-2">Placement & Recruitment Details</h2>
            <p className="text-sm text-gray-600">
              Information regarding academic programs, recruitment preferences, and services.
            </p>
          </div>

          {/* Right Column - Details */}
          <div className="w-full md:w-1/2">
            <div className="space-y-2">
              <div className="flex">
                <div className="w-1/2 text-right pr-2 text-sm font-semibold">Programs Offered :</div>
                <div className="w-1/2 text-sm">{formatProgramsOffered(placementRecruitmentDetails.programsOffered)}</div>
              </div>

              <div className="flex">
                <div className="w-1/2 text-right pr-2 text-sm font-semibold">Preferred Hiring Companies :</div>
                <div className="w-1/2 text-sm">{formatPreferredHiringCompanies(placementRecruitmentDetails.preferredHiringCompanies)}</div>
              </div>

              <div className="flex">
                <div className="w-1/2 text-right pr-2 text-sm font-semibold">Recruitment Services Required :</div>
                <div className="w-1/2 text-sm">{formatRecruitmentServices(placementRecruitmentDetails.recruitmentServicesRequired)}</div>
              </div>

              <div className="flex">
                <div className="w-1/2 text-right pr-2 text-sm font-semibold">College Brochure :</div>
                <div className="w-1/2 text-sm">
                  {placementRecruitmentDetails.collegeBrochureUrl ?
                    <a href={placementRecruitmentDetails.collegeBrochureUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Brochure</a>
                    : 'No Brochure Uploaded'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}