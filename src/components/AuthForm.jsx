"use client";

import axios from 'axios';
import React, { useState } from 'react';

const AuthForm = ({ isSignup, toggleAuthMode, closeModal }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleAuth = async () => {
        try {
            if (!email || !password || (isSignup && !name)) {
                alert("Please provide all valid information");
                return;
            }

            const url = isSignup ? '/api/user/signup' : '/api/user/login';
            const data = isSignup ? { name, email, password } : { email, password };
            const response = await axios.post(url, data);

            if (response.data.status) {
                if (isSignup) {
                    alert("Signup successful. Please login.");
                    toggleAuthMode();
                } else {
                    alert("Login successful.");
                    closeModal();
                }
            } else {
                alert(response.data.msg);
            }
        } catch (error) {
            console.error("Error:", error.response.data.msg);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="space-y-6 p-8 bg-gray-800 text-white rounded-lg shadow-lg max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-4">
                {isSignup ? 'Create an account' : 'Login to your account'}
            </h1>
            <form className="space-y-6">
                {isSignup && (
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
                    <a
                        href="#"
                        onClick={toggleAuthMode}
                        className="font-medium text-blue-500 hover:underline ml-1"
                    >
                        {isSignup ? 'Login here' : 'Create an account'}
                    </a>
                </p>
            </form>
        </div>
    );
};

export default AuthForm;
