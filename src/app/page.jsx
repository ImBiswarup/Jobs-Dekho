"use client"

import React from 'react';
import Navbar from './components/Navbar';
import Link from 'next/link';
import { Data } from '../../public/data';
import Image from 'next/image';

const HomePage = () => {
  const search = ""

  const filteredData = search.length > 0 ? Data.filter(job => job.name === search) : Data;

  return (
    <>
      <Navbar />
      <div className='flex flex-col items-center w-full justify-center gap-6 p-6'>
        {
          filteredData.map((job) => (
            <Link
              href={job.details === "Internship" ? `/work/internship/${job.id}` : `/work/jobs/${job.id}`}
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
                      <a className="text-gray-800 dark:text-gray-200">{job.details}</a>
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

export default HomePage;
