import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../App';
import CreateJobPost from '../components/Employee/CreateJobPost';
import ViewPost from '../components/Employee/ViewPost';
import RealTimeNotifications from '../components/Notifications/RealTimeNotifications';
import postService from '../services/postService';

const EmployeeDashboard = () => {
    const { user } = useContext(AuthContext);
    const [postCount, setPostCount] = useState(0);

    useEffect(() => {
        const fetchUserPosts = async () => {
            if (!user) return;
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
                // Filter posts by current user's name
                const myPosts = postsData.filter(post => {
                    const authorName = post.authorName || '';
                    const userName = user?.name || '';
                    return authorName.toLowerCase().includes(userName.toLowerCase()) ||
                        userName.toLowerCase().includes(authorName.toLowerCase());
                });
                setPostCount(myPosts.length);
            } catch (err) {
                setPostCount(0);
            }
        };
        fetchUserPosts();
    }, [user]);

    return (
        <div className="dashboard-container">
            <h1>Employee Dashboard</h1>
            {user && (
                <div className="user-details-card">
                    <h2>Your Profile</h2>
                    <div className="user-info">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <p><strong>Your total post:</strong> {postCount}</p>
                    </div>
                </div>
            )}
            <div className="dashboard-section">
                <h2>Create New Post</h2>
                <CreateJobPost />
            </div>
            <div className="dashboard-section">
                <ViewPost />
            </div>
            <div className="dashboard-section">
                <RealTimeNotifications />
            </div>
        </div>
    );
};

export default EmployeeDashboard;