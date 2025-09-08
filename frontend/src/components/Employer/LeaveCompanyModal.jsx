import { XCircle } from 'lucide-react';

export default function LeaveCompanyModal({ isOpen, onClose, onConfirm, companyName, isSubmitting }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
                <div className="flex items-start">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <XCircle className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="ml-4 text-left">
                        <h3 className="text-lg font-semibold leading-6 text-gray-900">
                            Leave Company
                        </h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-600">
                                Are you sure you want to leave **{companyName}**?
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                You will lose access to its dashboard and all associated data. This action cannot be undone.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-6 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isSubmitting}
                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-red-400"
                    >
                        {isSubmitting ? 'Leaving...' : 'Confirm Leave'}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="mt-3 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}