import { useState } from 'react';
import { Search, Tag, Calendar, User } from 'lucide-react';

export default function HeaderContentLayout() {
  const [mainContent, setMainContent] = useState('');
  const [secondaryContent, setSecondaryContent] = useState('');

  return (
    <div className="flex flex-col w-full border-t border-gray-300">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-300 p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4">Header Title</h1>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1">
              <Tag size={18} className="text-gray-500" />
              <span className="text-sm">Label</span>
            </div>
            
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-gray-300"></div>
              <span className="text-sm">Status</span>
            </div>
            
            <div className="flex items-center gap-1">
              <User size={18} className="text-gray-500" />
              <span className="text-sm">Assignee</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Calendar size={18} className="text-gray-500" />
              <span className="text-sm">Created: July 1, 2023</span>
            </div>
            
            <div className="ml-auto flex items-center gap-2">
              <div className="relative">
                <Search size={18} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="pl-8 pr-4 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="px-4 py-1 bg-gray-100 text-gray-800 border border-gray-300 rounded hover:bg-gray-200">
                Button
              </button>
              <button className="px-4 py-1 bg-black text-white rounded hover:bg-gray-800">
                Button
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Main Content */}
            <div className="bg-white border border-gray-300 border-dashed rounded p-4 min-h-96 flex items-center justify-center">
              {mainContent ? (
                <div>{mainContent}</div>
              ) : (
                <div 
                  className="text-gray-500 cursor-pointer text-center"
                  onClick={() => {
                    const content = prompt("Enter main content:");
                    if (content) setMainContent(content);
                  }}
                >
                  Click and paste Main Content
                </div>
              )}
            </div>
            
            {/* Secondary Content */}
            <div className="bg-white border border-gray-300 border-dashed rounded p-4 min-h-96 flex items-center justify-center">
              {secondaryContent ? (
                <div>{secondaryContent}</div>
              ) : (
                <div 
                  className="text-gray-500 cursor-pointer text-center"
                  onClick={() => {
                    const content = prompt("Enter secondary content:");
                    if (content) setSecondaryContent(content);
                  }}
                >
                  Click and paste Secondary Content
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}