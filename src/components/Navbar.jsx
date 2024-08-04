"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const router = useRouter();

  const handleSearch = () => {
    const query = search.trim();
    router.push(`/work${filter === "all" ? '' : `/${filter}`}${query ? `?search=${encodeURIComponent(query)}` : ''}`);
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-white text-2xl font-bold ml-2">
            <Link href="/" className="sm:hidden block">JD</Link>
            <Link href="/" className="hidden sm:block">Jobs Dekhoo</Link>
          </div>
        </div>

        <div className="flex items-center w-full max-w-lg mx-4 border-2 rounded overflow-hidden">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 text-black"
          >
            <option value="all">All</option>
            <option value="internship">Internship</option>
            <option value="jobs">Job</option>
          </select>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-2 text-black text-center"
          />
          <button
            onClick={handleSearch}
            className="p-2 bg-blue-500 text-white"
          >
            Search
          </button>
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="text-white hover:text-gray-300 transition duration-200">Home</Link>
          <Link href="/about" className="text-white hover:text-gray-300 transition duration-200">About</Link>
          <Link href="/services" className="text-white hover:text-gray-300 transition duration-200">Services</Link>
          <Link href="/contact" className="text-white hover:text-gray-300 transition duration-200">Contact</Link>
          <Link href="/create-account" className="text-white hover:text-gray-300 transition duration-200">Create Account</Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-2">
          <div className="bg-blue-700 py-2 rounded-lg shadow-md">
            <Link href="/" className="block px-4 py-2 text-white hover:bg-blue-800 transition duration-200">Home</Link>
            <Link href="/about" className="block px-4 py-2 text-white hover:bg-blue-800 transition duration-200">About</Link>
            <Link href="/services" className="block px-4 py-2 text-white hover:bg-blue-800 transition duration-200">Services</Link>
            <Link href="/contact" className="block px-4 py-2 text-white hover:bg-blue-800 transition duration-200">Contact</Link>
            <Link href="/get-started" className="block px-4 py-2 text-white hover:bg-blue-800 transition duration-200">Get started</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
