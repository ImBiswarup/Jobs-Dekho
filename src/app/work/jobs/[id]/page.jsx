import React from 'react';
import { Data } from '../../../../../public/data';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

const singleJob = ({ params }) => {
    const job = Data.find((job) => job.id === params.id);
    const relatedJobs = Data.filter((relatedJob) => relatedJob.type === job.type && relatedJob.id !== job.id).slice(0, 10);

    return (
        <>
            <Navbar />
            <div className="container mx-auto py-18 px-6 mt-8">
                <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden mb-12">
                    <Image
                        alt="job image"
                        className="w-full h-64 object-cover"
                        src='https://res.cloudinary.com/djrdw0sqz/image/upload/v1722104929/yt_v9ab9c.jpg'
                        width={1200}
                        height={400}
                    />
                    <div className="p-8">
                        <h2 className="text-4xl font-bold mb-6 text-gray-900">{job.name}</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">{job.description}</p>
                        <div className="mb-6">
                            <span className="text-xl font-medium text-gray-900">Duration: {job.duration}</span>
                        </div>
                        <div className="mb-6">
                            <span className="text-xl font-medium text-gray-900">Type: {job.type}</span>
                        </div>
                        <a href={job.link} className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-6 py-3 transition duration-200">
                            Apply Now
                        </a>
                    </div>
                </div>

                <div className="related-jobs">
                    <h2 className="text-3xl font-semibold mb-8 text-gray-900">Related Jobs</h2>
                    <div className="flex flex-wrap -m-4">
                        {relatedJobs.map((relatedJob) => (
                            <div key={relatedJob.id} className="lg:w-1/3 sm:w-1/2 p-4">
                                <Link href={relatedJob.type === "Internship" ? `/work/internship/${relatedJob.id}` : `/work/jobs/${relatedJob.id}`} passHref>
                                    <div className="relative rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer transform hover:scale-105 transition-transform duration-300">
                                        <Image
                                            alt="related job image"
                                            className="w-full h-48 object-cover"
                                            src='https://res.cloudinary.com/djrdw0sqz/image/upload/v1722104929/yt_v9ab9c.jpg'
                                            width={600}
                                            height={360}
                                        />
                                        <div className="px-6 py-8 bg-gradient-to-t from-black via-transparent to-transparent absolute inset-0 flex flex-col justify-end">
                                            <h2 className="tracking-widest text-sm font-medium text-indigo-400 mb-1">{relatedJob.type}</h2>
                                            <h1 className="text-xl font-semibold text-white mb-2">{relatedJob.name}</h1>
                                            <p className="text-white">{relatedJob.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default singleJob;
