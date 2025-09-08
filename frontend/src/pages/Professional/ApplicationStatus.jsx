import PageHeader from "@/components/dashboard/PageHeader"

function ProfApplicationStatus() {
  return (
    <div>
      <PageHeader 
        title="Application Status"
        label="Applications"
        status="Active"
      />
      
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h2 className="mb-4 text-lg font-medium text-gray-900">Application Status</h2>
        <p className="text-gray-600">
          Your application statuses would be displayed here.
        </p>
      </div>
    </div>
  )
}

export default ProfApplicationStatus