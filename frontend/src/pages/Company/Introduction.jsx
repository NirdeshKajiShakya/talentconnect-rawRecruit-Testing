


import { motion } from 'framer-motion'
import Button from '@/components/company/Button'

const Introduction = ({ nextStep }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-2">Create Company Profile</h1>
        <p className="text-gray-600 mb-8">
          Build your profile to acquire top-notch talents, internships, and campus placements.
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <Button variant="secondary" onClick={() => console.log('Cancel')}>
            Cancel
          </Button>
          <Button variant="primary" onClick={nextStep}>
            Next
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default Introduction