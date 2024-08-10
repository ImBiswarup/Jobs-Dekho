"use client";

import axios from 'axios';
import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const AddJob = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);

    const submitData = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            const tagsArray = tags.split(',').map(tag => tag.trim());

            const response = await axios.post('/api/jobs/add', {
                name, type, duration, description, tags: tagsArray,
            });

            console.log(response.data);

            setName('');
            setType('');
            setDuration('');
            setDescription('');
            setTags('');

            setIsModalOpen(true);

        } catch (error) {
            console.error('Error submitting data:', error);
            setError('Failed to submit job. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add a New Job</h2>

            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Job Name</label>
                    <input
                        type="text"
                        id="first_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter job name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900">Type</label>
                    <input
                        type="text"
                        id="company"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter job type"
                        required
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Duration</label>
                    <input
                        type="text"
                        id="phone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter duration"
                        required
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                    <input
                        type="text"
                        id="website"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter description"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900">Tags (comma separated)</label>
                    <input
                        type="text"
                        id="visitors"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="e.g. web dev, frontend dev, developer"
                        required
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>
            </div>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <button
                onClick={submitData}
                disabled={isSubmitting}
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-50"
            >
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>

            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                        Job Added Successfully
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            The job has been added to the database successfully.
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default AddJob;
