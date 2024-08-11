"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const WorkPage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/jobs/fetch');
        console.log(response.data);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchJobs();
  }, []);

  const filteredData = jobs
    .filter(job => job.type !== "Internship")
    .filter(job => job.name.toLowerCase().includes(searchQuery.toLowerCase()) || job.description.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <Navbar />
      <div className='flex flex-col items-center w-full justify-center gap-6 p-6'>
        {
          filteredData.map((job) => (
            <Link
              href={`/work/jobs/${job._id}`}
              key={job.id}
              passHref
            >
              <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer dark:bg-gray-800 dark:border-gray-700">
                <Image width={100} height={100} className="w-full h-48 object-cover" src='https://res.cloudinary.com/djrdw0sqz/image/upload/v1722104929/yt_v9ab9c.jpg' alt="product image" />
                <div className="p-6">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {job.name}
                  </h5>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {job.description}
                  </p>
                  <div className="flex items-center mt-4">
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-800 dark:text-gray-200">{job.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-lg font-medium text-gray-900 dark:text-white">{job.duration}</span>
                    <span className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                      Apply
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default WorkPage;
