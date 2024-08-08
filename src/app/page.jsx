"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { Data } from '../../public/data';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

const HomePage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const result = Data
      .filter(job => job.type !== "Internship")
      .filter(job => job.name.toLowerCase().includes(searchQuery.toLowerCase()) || job.description.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(5, 25);

    setFilteredData(result);
  }, [searchQuery]);

  const token = Cookies.get('token')

  console.log('cookies: ', token)

  return (
    <>
      <Navbar />
      <div className='flex flex-col items-center w-full justify-center gap-6 p-4 mt-[7.5rem] md:mt-[5.2rem]'>
        {
          filteredData.map((job) => (
            <Link
              href={job.type === "Internship" ? `/work/internship/${job.id}` : `/work/jobs/${job.id}`}
              key={job.id}
              passHref
            >
              <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer dark:bg-gray-800 dark:border-gray-700 mt-2">
                <Image width={100} height={100} className="w-full h-48 object-cover" src='https://res.cloudinary.com/djrdw0sqz/image/upload/v1722104929/yt_v9ab9c.jpg' alt="job image" />
                <div className="p-6">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {job.name}
                  </h5>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {job.description}
                  </p>
                  <div className="flex items-center mt-4 space-x-4">
                    <span className="text-lg font-medium text-gray-900 dark:text-white">{job.duration}</span>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <Link href='#' className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                      Apply
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </>
  );
};

export default HomePage;
