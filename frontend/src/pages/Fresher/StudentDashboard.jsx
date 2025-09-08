import PageHeader from "@/components/dashboard/PageHeader"


function Fresher_Dashboard() {
  return (
    <div>
      <PageHeader 
        title="Fresher Dashboard"
        assignee="Fresher"
      />
      
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h2 className="mb-4 text-lg font-medium text-gray-900">Student Information</h2>
        <p className="text-gray-600">
          Fresher dashboard information would be displayed here.
        </p>
      </div>
    </div>
  )
}

export default Fresher_Dashboard;