import PageHeader from "@/components/dashboard/PageHeader"

function ProfSavedJobs() {
  return (
    <div>
      <PageHeader 
        title="Saved Jobs/Internships"
        status="Active"
      />
      
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h2 className="mb-4 text-lg font-medium text-gray-900">Saved Jobs</h2>
        <p className="text-gray-600">
          Your saved jobs and internships would appear here.
        </p>
      </div>
    </div>
  )
}

export default ProfSavedJobs