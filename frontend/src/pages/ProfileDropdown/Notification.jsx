import { useState } from 'react';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    essential: true,
    marketing: false,
    personalization: false,
    analytics: true
  });

  const notificationCategories = [
    {
      id: 'essential',
      title: 'Essential',
      description: 'These items are required to enable basic website functionality.',
      required: true
    },
    {
      id: 'marketing',
      title: 'Marketing',
      description: 'These items are used to deliver advertising that is more relevant to you and your interests.',
      required: false
    },
    {
      id: 'personalization',
      title: 'Personalization',
      description: 'These items allow the website to remember choices you make and provide enhanced, more personal features.',
      required: false
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'These items help the website operator understand how its website performs and how visitors interact with the site.',
      required: false
    }
  ];

  const handleToggle = (categoryId) => {
    if (!notificationCategories.find(cat => cat.id === categoryId)?.required) {
      setSettings(prev => ({
        ...prev,
        [categoryId]: !prev[categoryId]
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Notifications Settings</h1>

        <div className="space-y-6">
          {notificationCategories.map((category) => (
            <div 
              key={category.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {category.title}
                    {category.required && (
                      <span className="ml-2 text-sm text-gray-500">Required</span>
                    )}
                  </h2>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings[category.id]}
                      onChange={() => handleToggle(category.id)}
                      disabled={category.required}
                      className="sr-only"
                    />
                    <div className={`relative w-11 h-6 rounded-full transition-colors ${
                      settings[category.id] ? 'bg-blue-600' : 'bg-gray-200'
                    } ${category.required ? 'opacity-50' : ''}`}>
                      <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform transform ${
                        settings[category.id] ? 'translate-x-5' : 'translate-x-0'
                      } bg-white shadow-sm`} />
                    </div>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;