import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiCheck, FiX } from 'react-icons/fi';
import AcceptInvitationModal from '../components/layout/AcceptInvitationalModal'

function InvitationsPage() {
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedInvitation, setSelectedInvitation] = useState(null);
    const [isDeclining, setIsDeclining] = useState(null);

    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(
                    `${import.meta.env.VITE_Backend_URL}/api/team-member/pending-invitations`,
                    { withCredentials: true }
                );
                setInvitations(data);
            } catch (err) {
                setError('Failed to load invitations. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchInvitations();
    }, []);
    
    // Function to remove invitation from list after decision
    const handleInvitationAccepted = (invitationId) => {
        setInvitations(prev => prev.filter(inv => inv._id !== invitationId));
        setSelectedInvitation(null);
    };

     const handleDecline = async (invitationId) => {
        setIsDeclining(invitationId); // Set loading state for this specific button
        try {
            await axios.post(
                `${import.meta.env.VITE_Backend_URL}/api/team-member/invitations/${invitationId}/decline`,
                {},
                { withCredentials: true }
            );
            // On success, remove the invitation from the list
            setInvitations(prev => prev.filter(inv => inv._id !== invitationId));
        } catch (err) {
            console.error("Failed to decline invitation:", err);
            alert('Could not decline the invitation. Please try again.');
        } finally {
            setIsDeclining(null); // Reset loading state
        }
    };


    if (loading) return <div className="p-8 text-center">Loading invitations...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <h1 className="text-2xl font-bold text-gray-800">Invitations</h1>
            <p className="mt-2 text-gray-600">You've been invited by the following companies. Review and accept to manage hiring on their behalf.</p>

            <div className="mt-8 space-y-4">
                {invitations.length > 0 ? (
                    invitations.map(inv => (
                        <div key={inv._id} className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center">
                                <img src={inv.companyLogo || 'https://via.placeholder.com/60'} alt={`${inv.companyName} logo`} className="w-16 h-16 mr-6 border rounded-md"/>
                                <div className="flex-1 mt-4 sm:mt-0">
                                    <h2 className="text-xl font-semibold text-gray-900">{inv.companyName}</h2>
                                    <p className="text-gray-600">Hiring Manager</p> {/* This can be replaced with inv.role */}
                                    <p className="text-sm text-gray-400">Invited on {new Date(inv.invitedOn).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center mt-4 sm:mt-0 space-x-2">
                                    <button
                                        onClick={() => setSelectedInvitation(inv)}
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none"
                                    >
                                        <FiCheck className="w-4 h-4 mr-2" />
                                        Accept Invitation
                                    </button>
                                    <button
                                        onClick={() => handleDecline(inv._id)}
                                        disabled={selectedInvitation || isDeclining} // Disable while another action is in progress
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none disabled:opacity-50"
                                    >
                                        <FiX className="w-4 h-4 mr-2" />
                                        {isDeclining === inv._id ? 'Declining...' : 'Decline'}
                                    </button>
                                </div>
                            </div>
                            <p className="mt-4 text-gray-700">{inv.companyDescription || 'No description provided.'}</p>
                        </div>
                    ))
                ) : (
                    <div className="py-12 text-center text-gray-500">You have no pending invitations.</div>
                )}
            </div>

            {selectedInvitation && (
                <AcceptInvitationModal 
                    invitation={selectedInvitation}
                    onClose={() => setSelectedInvitation(null)}
                    onSuccess={handleInvitationAccepted}
                />
            )}
        </div>
    );
}

export default InvitationsPage;