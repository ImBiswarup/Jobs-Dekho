"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Cookies from 'js-cookie';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('/api/jobs/fetch');
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs data:', error);
            }
        };

        fetchJobs();
    }, []);

    useEffect(() => {
        const token = Cookies.get('token')
        console.log("token: ",token)
        
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/user/getuser', {
                    headers: {
                        email: 'haha@haha.com', 
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, []);

    if (!jobs.length || !user) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">My Profile</h1>

            {/* <h2 className="text-2xl font-semibold mb-4">Available Jobs</h2>
            <ul>
                {jobs.map((job) => (
                    <li key={job._id} className="mb-4">
                        <Link href={`/work/jobs/${job._id}`}>
                            <p className="text-blue-600 hover:underline">{job.name}</p>
                        </Link>
                        <p className="text-gray-600">{job.description}</p>
                    </li>
                ))}
            </ul> */}

            <h2 className="text-2xl font-semibold mb-4 mt-8">Applied Jobs</h2>
            <ul>
                {user.applied && user.applied.length > 0 ? (
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
                )}
            </ul>
        </div>
    );
};

export default UserProfile;
