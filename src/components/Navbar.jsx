"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Modal from "../components/modal";
import AuthForm from "../components/AuthForm";
import axios from 'axios';

export default function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [tokenData, setTokenData] = useState('');

    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const getToken = async () => {
            try {
                const response = await axios.get('/api/user/getuser');
                setTokenData(response.data.token);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        getToken();
    }, []);

    const handleSearch = () => {
        const query = search.trim();
        router.push(`/work${filter === "all" ? '' : `/${filter}`}${query ? `?search=${encodeURIComponent(query)}` : ''}`);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    const toggleModal = (signup = false) => {
        setIsSignup(signup);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        router.push('/user-profile')
    };

    const toggleAuthMode = () => {
        setIsSignup((prev) => !prev);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    if (!mounted) return null;

    const isLoggedIn = !!tokenData;

    return (
        <>
            <nav className="bg-blue-600 p-4 shadow-lg fixed w-full z-50 top-0">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="text-white text-2xl font-bold">
                            <Link href="/">Jobs Dekhoooo</Link>
                        </div>
                        <div className="hidden md:flex flex-1 justify-center items-center">
                            <div className="flex rounded-lg overflow-hidden shadow-md bg-white w-full max-w-3xl">
                                <select
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="text-black border-none outline-none p-2.5 focus:outline-none bg-gray-100 transition duration-200"
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
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-x-4">
                        <Link href="/" className="text-white hover:text-gray-300 transition duration-200">Home</Link>
                        <Link href="/about" className="text-white hover:text-gray-300 transition duration-200">About</Link>
                        <Link href="/services" className="text-white hover:text-gray-300 transition duration-200">Services</Link>
                        <Link href="/contact" className="text-white hover:text-gray-300 transition duration-200">Contact</Link>

                        {isLoggedIn ? (
                            <Link href="/user-profile" className="text-white hover:text-gray-300 transition duration-200">
                                {tokenData?.name}
                            </Link>
                        ) : (
                            <button
                                onClick={() => toggleModal(true)}
                                className="text-white hover:text-gray-300 transition duration-200"
                            >
                                Register
                            </button>
                        )}
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

                            {isLoggedIn ? (
                                <Link href="/user-profile" className="block px-4 py-2 text-white hover:bg-blue-800 transition duration-200 w-full text-left">
                                    {tokenData.name}
                                </Link>
                            ) : (
                                <button
                                    onClick={() => toggleModal(true)}
                                    className="block px-4 py-2 text-white hover:bg-blue-800 transition duration-200 w-full text-left"
                                >
                                    Register
                                </button>
                            )}
                        </div>
                    </div>
                )}

                <div className="md:hidden mt-4 flex justify-center items-center w-full px-4">
                    <div className="flex rounded-lg overflow-hidden shadow-md bg-white w-full">
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
                            className="p-2 bg-blue-500 md:hidden block text-white border-none outline-none focus:outline-none hover:bg-blue-700 transition duration-200"
                        >
                            &#x3F;
                        </button>
                        <button
                            onClick={handleSearch}
                            className="p-2 bg-blue-500 md:block hidden text-white border-none outline-none focus:outline-none hover:bg-blue-700 transition duration-200"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </nav>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <AuthForm
                    isSignup={isSignup}
                    toggleAuthMode={toggleAuthMode}
                    closeModal={closeModal}
                />
            </Modal>

        </>
    );
}
