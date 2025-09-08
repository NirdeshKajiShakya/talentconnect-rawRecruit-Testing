import PageHeader from '@/components/dashboard/PageHeader'
import Button from '@/components/ui/Button'
import { FiPlus } from 'react-icons/fi'

function Home() {
  return (
    <div>
      <PageHeader 
        title="Header Title"
        label="Label"
        status="Active"
        assignee="Assignee"
        createdAt="July 1, 2023"
      />
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h2 className="mb-4 text-lg font-medium text-gray-900">Main Content</h2>
          <p className="text-gray-600">
            This is where your main content would go. You can click and paste content here as needed.
          </p>
          <div className="flex justify-end mt-4">
            <Button
              variant="primary"
              size="md"
              className="flex items-center"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Add New
            </Button>
          </div>
        </div>
        
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h2 className="mb-4 text-lg font-medium text-gray-900">Additional Content</h2>
          <p className="text-gray-600">
            This is a secondary content area that can be used to display related information or additional features.
          </p>
          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              size="md"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home ;