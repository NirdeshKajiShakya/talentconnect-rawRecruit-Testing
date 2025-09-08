
import { Globe, Users, Calendar, Mail, Phone, MapPin, Briefcase } from 'lucide-react';

export default function CompanyOverview({ profileData }) {
  if (!profileData) return <div className="text-center py-8">No profile data available for overview.</div>;

  return (
    <div className="container mx-auto px-4 pb-8">
      {/* Company Description */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Company Description</h2>
        <p className="text-gray-600">
          {profileData.companyDetails.description || 'No description provided'}
        </p>
      </div>

      {/* Main Details Grid */}
      <div className="bg-white border border-gray-200 rounded mb-6">
        <div className="grid md:grid-cols-2 border-b">
          {/* Company Details - Left Side */}
          <div className="p-6 border-r">
            <h3 className="font-bold mb-3">Company Details</h3>
            <p className="text-gray-600 text-sm">
              {profileData.companyDetails.description || 'No additional details provided'}
            </p>
          </div>

          {/* Company Type Info - Right Side */}
          <div className="p-6">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="font-medium">Company Type:</div>
              <div className="col-span-2">{profileData.companyDetails.companyType || '-'}</div>

              <div className="font-medium">Industry Type:</div>
              <div className="col-span-2">{profileData.companyDetails.industryType || '-'}</div>

              <div className="font-medium">Number of Employees:</div>
              <div className="col-span-2">{profileData.companyDetails.numberOfEmployees || '-'}</div>

              <div className="font-medium">Established Year:</div>
              <div className="col-span-2">{profileData.companyDetails.establishedYear || '-'}</div>

              <div className="font-medium">Website URL:</div>
              <div className="col-span-2">{profileData.companyDetails.websiteUrl || '-'}</div>

              <div className="font-medium">Company LinkedIn:</div>
              <div className="col-span-2">{profileData.companyDetails.companyLinkedin || '-'}</div>

              <div className="font-medium">Phone Number:</div>
              <div className="col-span-2">{profileData.companyDetails.phoneNumber || '-'}</div>

              <div className="font-medium">Alternate Phone Number:</div>
              <div className="col-span-2">{profileData.companyDetails.alternatePhoneNumber || '-'}</div>

              <div className="font-medium">Company Location:</div>
              <div className="col-span-2">{profileData.companyDetails.companyLocation || '-'}</div>

              <div className="font-medium">Pincode:</div>
              <div className="col-span-2">{profileData.companyDetails.pincode || '-'}</div>
            </div>
          </div>
        </div>

        {/* Hiring Preferences Section */}
        <div className="grid md:grid-cols-2 border-b">
          {/* Hiring Preferences - Left Side */}
          <div className="p-6 border-r">
            <h3 className="font-bold mb-3">Hiring Preferences</h3>
            <p className="text-gray-600 text-sm">
              {profileData.hiringPreferences.hiringPara || 'No hiring preferences description provided'}
            </p>
          </div>

          {/* Hiring Preferences - Right Side */}
          <div className="p-6">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="font-medium">Job Roles:</div>
              <div className="col-span-2">
                {profileData.hiringPreferences.jobRoles?.join(', ') || '-'}
              </div>

              <div className="font-medium">Hiring Locations:</div>
              <div className="col-span-2">
                {profileData.hiringPreferences.hiringLocations?.join(', ') || '-'}
              </div>

              <div className="font-medium">Looking for:</div>
              <div className="col-span-2">{profileData.hiringPreferences.lookingFor || '-'}</div>

              <div className="font-medium">Employment type:</div>
              <div className="col-span-2">
                {profileData.hiringPreferences.employmentType?.join(', ') || '-'}
              </div>
            </div>
          </div>
        </div>

        {/* KYC Compliance Details Section */}
        <div className="grid md:grid-cols-2">
          {/* KYC Compliance - Left Side */}
          <div className="p-6 border-r">
            <h3 className="font-bold mb-3">KYC Compliance Details</h3>
            <p className="text-gray-600 text-sm">
              {profileData.kycDetails.additionalInfo || 'No KYC details description provided'}
            </p>
          </div>

          {/* KYC Compliance - Right Side */}
          <div className="p-6">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="font-medium">KYC Status:</div>
              <div className="col-span-2">{profileData.kycDetails.kycStatus || '-'}</div>

              <div className="font-medium">Photo Verification Status:</div>
              <div className="col-span-2">{profileData.kycDetails.photoVerificationStatus || '-'}</div>

              <div className="font-medium">Aadhar Number:</div>
              <div className="col-span-2">{profileData.kycDetails.aadharNumber ? 'XXXX-XXXX-XXXX-' + profileData.kycDetails.aadharNumber.slice(-4) : '-'}</div>

              <div className="font-medium">TAN:</div>
              <div className="col-span-2">{profileData.kycDetails.TAN || '-'}</div>

              <div className="font-medium">GST Number:</div>
              <div className="col-span-2">{profileData.kycDetails.GSTNumber || '-'}</div>

              <div className="font-medium">Company Registration Number:</div>
              <div className="col-span-2">{profileData.kycDetails.companyRegistrationNumber || '-'}</div>

              <div className="font-medium">GSTIN:</div>
              <div className="col-span-2">{profileData.kycDetails.GSTIN || '-'}</div>

              <div className="font-medium">KYC Documents:</div>
              <div className="col-span-2">
                {profileData.kycDetails.kycDocuments && profileData.kycDetails.kycDocuments.length > 0 ? (
                  profileData.kycDetails.kycDocuments.map((docUrl, index) => (
                    <a key={index} href={docUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline block">Document {index + 1}</a>
                  ))
                ) : '-'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}