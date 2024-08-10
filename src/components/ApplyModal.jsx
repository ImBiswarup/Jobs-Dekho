import axios from 'axios';
import React, { useState } from 'react';
import { Data } from '../../public/data';


const ApplyModal = ({ isOpen, onClose, job, params }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [resume, setResume] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    console.log(params.id)

    const handleApply = async () => {

        const filteredJob = Data.find((job) => job.id === params.id);
        console.log(filteredJob);

        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('jobId', job.id);

            if (resume) {
                formData.append('resume', resume);
            }

            const response = await axios.post('/api/apply', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);

            setName('');
            setEmail('');
            setResume(null);

            console.log(name, email, resume);
        } catch (error) {
            console.error('Error applying for job:', error);
        } finally {
            setIsSubmitting(false);
        }
    };



    return isOpen ? (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-25">
            <div className="relative w-full max-w-md p-6 bg-white rounded-2xl shadow-xl transform transition-all">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Apply for Job
                </h3>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        Fill out the form below to apply for the job.
                    </p>
                </div>

                <div className="mt-4">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-black">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume</label>
                        <input
                            type="file"
                            id="resume"
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            onChange={(e) => setResume(e.target.files[0])}
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50"
                            onClick={handleApply}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Applying...' : 'Apply'}
                        </button>
                        <button
                            type="button"
                            className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default ApplyModal;
