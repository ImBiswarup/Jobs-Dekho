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
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">My Profile</h1>

            {tokenData && (
                <div>
                    <h2 className="text-xl font-semibold">Welcome, {tokenData.name}</h2>
                </div>
            )}

            <h2 className="text-2xl font-semibold mb-4 mt-8">
                {isRecruiter === "recruiter" ? "Added Jobs:" : "Applied Jobs:"}
            </h2>
            <ul>
                {isRecruiter === "recruiter" ? (
                    jobs.length > 0 ? (
                        jobs.map((job) => (
                            <li key={job._id} className="mb-4">
                                <Link href={`/work/jobs/${job._id}`}>
                                    <p className="text-blue-600 hover:underline">{job.name}</p>
                                </Link>
                                <p className="text-gray-600">{job.description}</p>
                            </li>
                        ))
                    ) : (
                        <p>No jobs added yet.</p>
                    )
                ) : (
                    user?.applied && user.applied.length > 0 ? (
                        user.applied.map((job) => (
                            <li key={job._id} className="mb-4">
                                <Link href={`/work/jobs/${job._id}`}>
                                    <p className="text-blue-600 hover:underline">{job.name}</p>
                                </Link>
                                <p className="text-gray-600">{job.description}</p>
                            </li>
                        ))
                    ) : (
                        <p>No jobs applied yet.</p>
                    )
                )}
            </ul>
            <button onClick={handleLogout} className='p-2 hover:bg-red-500 rounded'>
                Log out
            </button>
        </div>
    );
};

export default UserProfile;
