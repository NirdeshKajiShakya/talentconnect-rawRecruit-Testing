import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [profileOpen, setProfileOpen] = useState(false)
  
  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
     
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          profileOpen={profileOpen}
          setProfileOpen={setProfileOpen}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout