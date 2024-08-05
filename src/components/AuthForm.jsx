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
        <div className="space-y-4 md:space-y-6 p-6 bg-gray-800 text-white rounded-lg shadow dark:border dark:border-gray-700">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-white">
                {isSignup ? 'Create an account' : 'Login to your account'}
            </h1>
            <form className="space-y-4 md:space-y-6">
                {isSignup && (
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">
                            Your name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                )}
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                        Your email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <button
                    type="button"
                    onClick={handleAuth}
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                    {isSignup ? 'Create an account' : 'Login'}
                </button>
                <p className="text-sm font-light text-gray-400">
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}
                    <a
                        href="#"
                        onClick={toggleAuthMode}
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                        {isSignup ? ' Login here' : ' Create an account'}
                    </a>
                </p>
            </form>
        </div>
    );
};

export default AuthForm;
