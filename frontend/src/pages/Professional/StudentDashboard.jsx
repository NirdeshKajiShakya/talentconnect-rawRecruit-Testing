import PageHeader from "@/components/dashboard/PageHeader"


function ProfStudentDashboard() {
  return (
    <div>
      <PageHeader 
        title="Student Dashboard"
        assignee="Student"
      />
      
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h2 className="mb-4 text-lg font-medium text-gray-900">Student Information</h2>
        <p className="text-gray-600">
          Student dashboard information would be displayed here.
        </p>
      </div>
    </div>
  )
}

export default ProfStudentDashboard