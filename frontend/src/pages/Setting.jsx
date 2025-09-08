import PageHeader from '../components/dashboard/PageHeader'

function Settings() {
  return (
    <div>
      <PageHeader 
        title="Settings"
      />
      
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h2 className="mb-4 text-lg font-medium text-gray-900">User Settings</h2>
        <p className="text-gray-600">
          Your settings options would be displayed here.
        </p>
      </div>
    </div>
  )
}

export default Settings