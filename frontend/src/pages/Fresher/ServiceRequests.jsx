import PageHeader from "@/components/dashboard/PageHeader"

function Fresher_ServiceRequests() {
  return (
    <div>
      <PageHeader 
        title="Service Requests"
        status="Pending"
      />
      
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h2 className="mb-4 text-lg font-medium text-gray-900">Service Requests</h2>
        <p className="text-gray-600">
          Your service requests would be listed here.
        </p>
      </div>
    </div>
  )
}

export default Fresher_ServiceRequests;