"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/jobs/fetch');
                console.log(response.data)
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, []);

    // if (!user) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">My Profile</h1>

            <h2 className="text-2xl font-semibold mb-4">Applied Jobs</h2>
            <ul>
                {jobs.map((job) => (
                    <li key={job._id} className="mb-4">
                        <Link href={`/work/jobs/${job._id}`}>
                            <p className="text-blue-600 hover:underline">{job.name}</p>
                        </Link>
                        <p className="text-gray-600">{job.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserProfile;
