"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [tokenData, setTokenData] = useState(null);
    const [isRecruiter, setIsRecruiter] = useState('');
    const [jobs, setJobs] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/user/getuser');
                setUser(response.data.user);
                setTokenData(response.data.token);
                setIsRecruiter(response.data.user.role);
                setJobs(response.data.user.added);

                console.log(response.data.user.added)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        try {
            Cookies.remove('token', { path: '/' });
            alert("User logged out successfully");
            router.push('/');
        } catch (error) {
            console.error('Error during logout:', error);
            alert('An error occurred while logging out. Please try again.');
        }
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-6 bg-white border border-gray-300 rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-all"
                >
                    Log out
                </button>
            </div>

            {tokenData && (
                <div className="bg-gray-100 p-4 rounded mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">Welcome, {tokenData.name}</h2>
                </div>
            )}

            <div className="bg-white p-4 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                    {isRecruiter === "recruiter" ? "Added Jobs:" : "Applied Jobs:"}
                </h2>
                <ul className="space-y-4">
                    {isRecruiter === "recruiter" ? (
                        jobs.length > 0 ? (
                            jobs.map((job) => (
                                <li key={job._id} className="p-4 bg-gray-50 border border-gray-300 rounded hover:bg-gray-100 transition-all">
                                    <Link href={`/work/${job.type === "Internship" ? "internship" : "jobs"}/${job._id}`}>
                                        <p className="text-blue-700 font-medium hover:underline">{job.name}</p>
                                    </Link>
                                    <p className="text-gray-600 mt-1">{job.description}</p>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-600">No jobs added yet.</p>
                        )
                    ) : (
                        user?.applied && user.applied.length > 0 ? (
                            user.applied.map((job) => (
                                <li key={job._id} className="p-4 bg-gray-50 border border-gray-300 rounded hover:bg-gray-100 transition-all">
                                    <Link href={`/work/${job.type === "Internship" ? "internship" : "jobs"}/${job._id}`}>
                                        <p className="text-blue-700 font-medium hover:underline">{job.name}</p>
                                    </Link>
                                    <p className="text-gray-600 mt-1">{job.description}</p>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-600">No jobs applied yet.</p>
                        )
                    )}
                </ul>
            </div>
        </div>



    );
};

export default UserProfile;
