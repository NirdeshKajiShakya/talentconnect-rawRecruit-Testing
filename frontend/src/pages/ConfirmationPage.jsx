import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiCheckCircle, FiBriefcase, FiUsers, FiEye } from 'react-icons/fi';

function ConfirmationPage() {
    const location = useLocation();
    const companyName = location.state?.companyName || 'the';

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 text-center bg-white border border-gray-200 rounded-xl shadow-lg">
                <div className="flex justify-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-black rounded-full">
                        <FiCheckCircle className="w-10 h-10 text-white" />
                    </div>
                </div>
                <h1 className="mt-6 text-3xl font-bold text-gray-900">You're In!</h1>
                <p className="mt-2 text-lg text-gray-600">
                    You've successfully joined {companyName}'s Employer Dashboard.
                </p>
                <div className="my-6 border-t border-gray-200"></div>
                <p className="text-gray-500">
                    You can now manage job postings, view candidates, and collaborate with your team.
                </p>
                <div className="flex justify-center my-6 space-x-4 text-gray-400">
                    <FiBriefcase size={24} />
                    <FiUsers size={24} />
                    <FiEye size={24} />
                </div>
                <Link
                    to="/home" // Adjust this link to your employer dashboard route
                    className="inline-block w-full px-6 py-3 mt-4 font-semibold text-white bg-black rounded-lg hover:bg-gray-800"
                >
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
}

export default ConfirmationPage;