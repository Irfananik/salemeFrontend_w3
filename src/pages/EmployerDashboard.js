import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../App';
import ViewPosts from '../components/Employer/ViewPosts';
import SearchProfiles from '../components/Employer/SearchProfiles';
import postService from '../services/postService';

const EmployerDashboard = () => {
    const { user } = useContext(AuthContext);
    const [postCount, setPostCount] = useState(0);

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const res = await postService.getPosts();
                let postsData = [];
                if (res.data && Array.isArray(res.data)) {
                    postsData = res.data;
                } else if (Array.isArray(res.data?.posts)) {
                    postsData = res.data.posts;
                } else if (res.data?.data && Array.isArray(res.data.data)) {
                    postsData = res.data.data;
                }
                setPostCount(postsData.length);
            } catch (err) {
                setPostCount(0);
            }
        };
        fetchAllPosts();
    }, []);

    return (
        <div className="dashboard-container">
            <h1>Employer Dashboard</h1>
            {user && (
                <div className="user-details-card">
                    <h2>Your Profile</h2>
                    <div className="user-info">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <p><strong>Total posts:</strong> {postCount}</p>
                    </div>
                </div>
            )}
            <div className="dashboard-section">
                <ViewPosts />
            </div>
            <div className="dashboard-section">
                <h2>Search Profiles</h2>
                <SearchProfiles />
            </div>
        </div>
    );
};

export default EmployerDashboard;