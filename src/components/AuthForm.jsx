"use client";

import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import Cookies from 'js-cookie';

const AuthForm = ({ isSignup, toggleAuthMode, closeModal }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("client");

    const handleAuth = async () => {
        try {
            if (!email || !password || !role || (isSignup && !name)) {
                alert("Please provide all valid information");
                return;
            }

            const url = isSignup ? '/api/user/signup' : '/api/user/login';
            const data = isSignup ? { name, email, password, role } : { email, password };
            const response = await axios.post(url, data);

            if (response.data.status) {
                if (isSignup) {
                    alert(response.data.msg);
                    toggleAuthMode(); // Switch to login screen after signup
                } else {
                    Cookies.set('token', response.data.token, { path: '/' });
                    alert(response.data.msg);
                    closeModal(); // Close the modal after login
                }
            } else {
                alert(response.data.msg);
            }
        } catch (error) {
            alert("Error:", error.message);
        }
    };


    return (
        <div className="space-y-6 p-8 bg-gray-800 text-white rounded-lg shadow-lg max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-4">
                {isSignup ? 'Create an account' : 'Login to your account'}
            </h1>
            <form className="space-y-6">
                {isSignup && (
                    <>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-200">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-200">
                                Select Role
                            </label>
                            <div className="flex items-center space-x-4">
                                <div>
                                    <input
                                        type="radio"
                                        id="client"
                                        name="role"
                                        value="client"
                                        checked={role === "client"}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    <label htmlFor="client" className="ml-2 text-sm font-medium text-gray-200">
                                        Client
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="recruiter"
                                        name="role"
                                        value="recruiter"
                                        checked={role === "recruiter"}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    <label htmlFor="recruiter" className="ml-2 text-sm font-medium text-gray-200">
                                        Recruiter
                                    </label>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-200">
                        Your Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-200">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                </div>
                <button
                    type="button"
                    onClick={handleAuth}
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    {isSignup ? 'Create an account' : 'Login'}
                </button>
                <p className="text-sm font-light text-gray-400">
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}
                    <Link
                        href="/"
                        onClick={toggleAuthMode}
                        className="font-medium text-blue-500 hover:underline ml-1"
                    >
                        {isSignup ? 'Login here' : 'Create an account'}
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default AuthForm;
