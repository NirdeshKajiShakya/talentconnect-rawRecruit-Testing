import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

// Import all dashboard components
import StudentDashboard from './students/Dashboard'
import FresherDashboard from './fresher/Dashboard'
import ProfessionalDashboard from './professional/Dashboard'
import CompanyHome from './company/dashboard/Home'
import EmployerHome from './employer/dashboard/Home'
import CollegeHome from './college/dashboard/Home'

function UnifiedDashboard() {
  const [selectedRole, setSelectedRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get the selected role from localStorage
    const role = localStorage.getItem('selectedRole')
    setSelectedRole(role)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Route to appropriate dashboard based on role
  switch (selectedRole) {
    case 'student':
      return <StudentDashboard />
    case 'fresher':
      return <FresherDashboard />
    case 'professional':
      return <ProfessionalDashboard />
    case 'company':
      return <CompanyHome />
    case 'employer':
      return <EmployerHome />
    case 'college':
      return <CollegeHome />
    default:
      // If no role is selected, redirect to role selection
      return <Navigate to="/" replace />
  }
}

export default UnifiedDashboard
