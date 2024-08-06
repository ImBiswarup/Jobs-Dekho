"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import AuthForm from './AuthForm';

export default function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const router = useRouter();

    const handleSearch = () => {
        const query = search.trim();
        router.push(`/work${filter === "all" ? '' : `/${filter}`}${query ? `?search=${encodeURIComponent(query)}` : ''}`);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const toggleAuthMode = () => {
        setIsSignup(!isSignup);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className="bg-blue-600 p-4 shadow-lg fixed w-full z-50 top-0">
                <div className="container flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="text-white text-2xl font-bold ml-2">
                            <Link href="/" className="sm:hidden block">JD</Link>
                            <Link href="/" className="hidden sm:block">Jobs Dekhoo</Link>
                        </div>
                    </div>

                    <div className="hidden md:flex rounded w-full overflow-hidden bg-white">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="p-2.5 text-black border-none outline-none focus:outline-none bg-gray-100 transition duration-200"
                        >
                            <option value="all">All</option>
                            <option value="internship">Intern</option>
                            <option value="jobs">Job</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="flex-1 text-black p-2 border-none outline-none focus:outline-none bg-gray-100 transition duration-200"
                        />
                        <button
                            onClick={handleSearch}
                            className="p-2 bg-blue-500 text-white border-none outline-none focus:outline-none hover:bg-blue-700 transition duration-200"
                        >
                            Search
                        </button>
                    </div>

                    <div className="hidden md:flex space-x-6 items-center">
                        <Link href="/" className="text-white hover:text-gray-300 transition duration-200">Home</Link>
                        <Link href="/about" className="text-white hover:text-gray-300 transition duration-200">About</Link>
                        <Link href="/services" className="text-white hover:text-gray-300 transition duration-200">Services</Link>
                        <Link href="/contact" className="text-white hover:text-gray-300 transition duration-200">Contact</Link>
                        <button
                            onClick={toggleModal}
                            className="text-white hover:text-gray-300 transition duration-200"
                        >
                            Create Account
                        </button>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
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
                                    d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden mt-2">
                        <div className="bg-blue-700 py-2 rounded-lg shadow-md">
                            <Link href="/" className="block px-4 py-2 text-white hover:bg-blue-800 transition duration-200">Home</Link>
                            <Link href="/about" className="block px-4 py-2 text-white hover:bg-blue-800 transition duration-200">About</Link>
                            <Link href="/services" className="block px-4 py-2 text-white hover:bg-blue-800 transition duration-200">Services</Link>
                            <Link href="/contact" className="block px-4 py-2 text-white hover:bg-blue-800 transition duration-200">Contact</Link>
                            <button
                                onClick={toggleModal}
                                className="block px-4 py-2 text-white hover:bg-blue-800 transition duration-200 w-full text-left"
                            >
                                Create Account
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            <div className="md:hidden mt-16 flex justify-center items-center w-full border-2 rounded overflow-hidden bg-gray-200">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-2 text-black border-none outline-none focus:outline-none bg-gray-100 hover:bg-gray-200 transition duration-200"
                >
                    <option value="all">All</option>
                    <option value="internship">Intern</option>
                    <option value="jobs">Job</option>
                </select>
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 p-2 text-black border-none outline-none focus:outline-none bg-gray-100 hover:bg-gray-200 transition duration-200"
                />
                <button
                    onClick={handleSearch}
                    className="p-2 bg-blue-500 text-white border-none outline-none focus:outline-none hover:bg-blue-700 transition duration-200"
                >
                    Search
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={toggleModal}>
                <AuthForm isSignup={isSignup} toggleAuthMode={toggleAuthMode} closeModal={toggleModal} />
            </Modal>
        </>
    );
}
