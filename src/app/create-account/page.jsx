"use client";

import axios from 'axios';
import React, { useState } from 'react';

const SignupPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const signupHandler = async () => {
        try {
            setError(null); 
            setSuccess(null); 

            const response = await axios.post('/api/user/signup', {
                name, email, password
            });

            setSuccess("User created successfully");
            console.log(response);

        } catch (error) {
            setError(error.response ? error.response.data.msg : "An error occurred");
            console.error("Error:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-y-3 p-6">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="p-2 text-black border border-gray-300 rounded"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="p-2 text-black border border-gray-300 rounded"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="p-2 text-black border border-gray-300 rounded"
            />
            <button
                onClick={signupHandler}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Create
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}
        </div>
    );
};

export default SignupPage;
