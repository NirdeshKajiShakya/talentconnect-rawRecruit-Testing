import { getHackathonDetail } from '@/lib/User_AxiosInstance';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
// import { hackathons } from '@/constants/hackthonData';

const HackathonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const hackathon = hackathons.find(h => h.id === parseInt(id));
  const [hackathon, setHackathon] = useState();

  const getHackathon = async () => {
    try {
      const response = await getHackathonDetail(id);
      setHackathon(response.data.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {
    getHackathon();
  }, [])

  const [expandedFaq, setExpandedFaq] = useState(null);

  if (!hackathon) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Hackathon not found </h2>
        <button
          onClick={() => navigate('/student-dashboard/hackathon')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Back to Hackathons
        </button>
      </div>
    );
  }

  const toggleFaq = (index) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <p className="text-sm text-gray-600 mb-2">Registrations Open</p>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{hackathon.title}</h1>
            <p className="text-lg mb-4">{hackathon.description}</p>
          </div>
          <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">
            Register Now
          </button>
          <button className="border border-gray-300 px-6 py-2 rounded-md flex items-center hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            Save
          </button>
          <button className="border border-gray-300 px-6 py-2 rounded-md flex items-center hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
        </div>

        <div className="flex items-center mt-6 text-gray-600">
          <div className="flex items-center mr-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(hackathon.startDate).toLocaleDateString()} - {new Date(hackathon.endDate).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {hackathon.hackathonType ? hackathon.hackathonType : hackathon.venue}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">About the Hackathon</h2>
        <p className="text-gray-700">
          {/* {hackathon.shortDescription} This is your chance to showcase your innovation and technical skills while solving real-world problems. */}
          {hackathon.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="border border-gray-200 rounded-md p-4">
            <div className="flex justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-center font-semibold">Team Size</h3>
            <p className="text-center">{hackathon.maxTeamSize}</p>
          </div>

          <div className="border border-gray-200 rounded-md p-4">
            <div className="flex justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
            <h3 className="text-center font-semibold">Eligibility</h3>
            <p className="text-center">{hackathon.eligibility || "All"}</p>
          </div>

          <div className="border border-gray-200 rounded-md p-4">
            <div className="flex justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h3 className="text-center font-semibold">Domains</h3>
            <p className="text-center">{hackathon.domains?.join(', ') || "Not Specified"}</p>
          </div>

          <div className="border border-gray-200 rounded-md p-4">
            <div className="flex justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-center font-semibold">Location</h3>
            <p className="text-center">{hackathon.venue ? hackathon.venue : hackathon.hackathonType}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Hackathon Rounds</h2>
        <div className="relative border-l-2 border-gray-200 pl-6 ml-4">
          {hackathon.rounds?.map((round, index) => (
            <div key={index} className="mb-8 relative">
              <div
                className="absolute w-8 h-8 bg-black text-white rounded-full flex items-center justify-center -left-10"
                style={{ top: '-4px' }}
              >
                {round.id}
              </div>
              <div className="mb-1">{round.date}</div>
              <h3 className="text-lg font-semibold">{round.name}</h3>
              <p className="text-gray-700">{round.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Problem Statements</h2>
        {hackathon.problemStatements?.map((problem, index) => (
          <div key={index} className="border border-gray-200 rounded-md p-4 mb-4">
            <div className="flex justify-between">
              <h3 className="font-semibold">{problem.title}</h3>
              <div className="flex space-x-2">
                {problem.tags?.map((tag, tagIndex) => (
                  <span key={tagIndex} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-700 mt-2">{problem.description}</p>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hackathon.rewards?.map((reward, index) => (
            <div key={index} className="border border-gray-200 rounded-md p-4 text-center">
              <div className="flex justify-center mb-4">
                {index === 0 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                )}
              </div>
              <h3 className="font-semibold text-lg">{reward.title}</h3>
              <p className="text-xl font-bold my-2">{reward.amount}</p>
              <p className="text-sm text-gray-600">{reward.perks}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {hackathon.faqs?.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
              <button
                className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-medium">{faq.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transition-transform ${expandedFaq === index ? 'transform rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedFaq === index && (
                <div className="p-4 pt-0 border-t border-gray-200">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="border border-gray-200 rounded-md p-4">
          <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
          <p className="mb-4">Contact us at support@talentconnect.com</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonDetail;