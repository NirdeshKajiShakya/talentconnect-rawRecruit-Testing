

import React from 'react';
import { Globe, Users, Calendar } from 'lucide-react';

export default function Overview({ employerData }) {
  if (!employerData) {
    return <div className="p-4 text-center text-gray-600">Loading overview data...</div>;
  }

  const { employerDetails, companyDetails, hiringPreferences } = employerData;

  return (
    <div className="flex flex-col w-full bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 pb-8">
        {/* Company Description - Assuming it will come from companyDetails or a new field */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Company Description</h2>
          <p className="text-gray-600">
            {companyDetails?.description || 'No company description available. You can add one in the Profile section.'}
          </p>
        </div>

        {/* Main Details Grid */}
        <div className="bg-white border border-gray-200 rounded mb-6">

          {/* Employee Details Section (from Introduce Yourself as an Employer!) */}
          <div className="grid md:grid-cols-2 border-b">
            {/* Employee Details - Left Side */}
            <div className="p-6 border-r">
              <h3 className="font-bold mb-3">Your Details</h3>
              <p className="text-gray-600 text-sm">
                This section displays your contact information as the primary recruiter.
              </p>
            </div>
            {/* Employee Details - Right Side */}
            <div className="p-6">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="font-medium">Your Name:</div>
                <div className="col-span-2">{employerDetails?.name || '-'}</div>

                <div className="font-medium">Designation:</div>
                <div className="col-span-2">{employerDetails?.designation || '-'}</div>

                <div className="font-medium">Work Email:</div>
                <div className="col-span-2">{employerDetails?.workEmail || '-'}</div>

                <div className="font-medium">Phone Number:</div>
                <div className="col-span-2">{employerDetails?.mobile || '-'}</div>

                <div className="font-medium">LinkedIn Profile:</div>
                <div className="col-span-2">{employerDetails?.linkedIn ? <a href={employerDetails.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Link</a> : '-'}</div>
              </div>
            </div>
          </div>

          {/* Company Details Section */}
          <div className="grid md:grid-cols-2 border-b">
            {/* Company Details - Left Side */}
            <div className="p-6 border-r">
              <h3 className="font-bold mb-3">Company Details</h3>
              <p className="text-gray-600 text-sm">
                Information about your company, its location, and industry.
              </p>
            </div>
            {/* Company Details - Right Side */}
            <div className="p-6">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="font-medium">Company Name:</div>
                <div className="col-span-2">{companyDetails?.companyName || '-'}</div>

                <div className="font-medium">Company Location:</div>
                <div className="col-span-2">{companyDetails?.location || '-'}</div>

                <div className="font-medium">State:</div>
                <div className="col-span-2">{companyDetails?.state || '-'}</div>

                <div className="font-medium">City:</div>
                <div className="col-span-2">{companyDetails?.city || '-'}</div>

                <div className="font-medium">Country:</div>
                <div className="col-span-2">{companyDetails?.country || '-'}</div>

                <div className="font-medium">Pincode:</div>
                <div className="col-span-2">{companyDetails?.pincode || '-'}</div>

                <div className="font-medium">Company Type:</div>
                <div className="col-span-2">{companyDetails?.companyType || '-'}</div>

                <div className="font-medium">Industry Type:</div>
                <div className="col-span-2">{companyDetails?.industryType || '-'}</div>

                <div className="font-medium">Established Year:</div>
                <div className="col-span-2">{companyDetails?.establishedYear || '-'}</div>

                <div className="font-medium">Contact Number:</div>
                <div className="col-span-2">{companyDetails?.contactNumber || '-'}</div>
              </div>
            </div>
          </div>


          {/* Hiring Preferences Section (from Define Your Hiring Preferences!) */}
          <div className="grid md:grid-cols-2 border-b">
            {/* Hiring Preferences - Left Side */}
            <div className="p-6 border-r">
              <h3 className="font-bold mb-3">Hiring Preferences</h3>
              <p className="text-gray-600 text-sm">
                This section outlines the types of roles and employment your company is seeking.
              </p>
            </div>

            {/* Hiring Preferences - Right Side */}
            <div className="p-6">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="font-medium">Job Roles:</div>
                <div className="col-span-2">{hiringPreferences?.jobRoles?.length > 0 ? hiringPreferences.jobRoles.join(', ') : '-'}</div>

                <div className="font-medium">Hiring Locations:</div>
                <div className="col-span-2">{hiringPreferences?.hiringLocations?.length > 0 ? hiringPreferences.hiringLocations.join(', ') : '-'}</div>

                <div className="font-medium">Looking for:</div>
                <div className="col-span-2">{hiringPreferences?.lookingFor || '-'}</div>

                <div className="font-medium">Employment type:</div>
                <div className="col-span-2">{hiringPreferences?.employmentTypes?.length > 0 ? hiringPreferences.employmentTypes.join(', ') : '-'}</div>
              </div>
            </div>
          </div>
        </div> {/* Closing div for Main Details Grid */}
      </div> {/* Closing div for container */}
    </div> // Closing div for flex flex-col
  );
}