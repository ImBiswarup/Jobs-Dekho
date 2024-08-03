"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/logo.svg" alt="Logo" width={30} height={30} />
          <div className="text-white text-2xl font-bold ml-2">
            <Link href="/">Flowbite</Link>
          </div>
        </div>

        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 rounded border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-black"
          />
        </div>
        
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="text-white hover:text-gray-300 transition duration-200">Home</Link>
          <Link href="/about" className="text-white hover:text-gray-300 transition duration-200">About</Link>
          <Link href="/services" className="text-white hover:text-gray-300 transition duration-200">Services</Link>
          <Link href="/contact" className="text-white hover:text-gray-300 transition duration-200">Contact</Link>
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
