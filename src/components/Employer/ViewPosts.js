
import React, { useState, useEffect, useContext } from 'react';
import postService from '../../services/postService';
import { AuthContext } from '../../App';
import './ViewPosts.css';


const ViewPosts = () => {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likedPosts, setLikedPosts] = useState({}); // { [postId]: true/false }


    useEffect(() => {
        fetchAllPosts();
    }, []);

    const fetchAllPosts = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await postService.getPosts();
            console.log('ViewPosts API Response:', res);
            
            // Handle different response structures
            let postsData = [];
            if (res.data && Array.isArray(res.data)) {
                postsData = res.data;
            } else if (Array.isArray(res.data?.posts)) {
                postsData = res.data.posts;
            } else if (res.data?.data && Array.isArray(res.data.data)) {
                postsData = res.data.data;
            }
            
            console.log('Posts Data:', postsData);
            setPosts(postsData);
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError('Failed to load posts. Please try again.');
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };


    const handleLike = async (postId) => {
        try {
            await postService.likePost(postId, user.name, user.email);
            setLikedPosts((prev) => ({ ...prev, [postId]: true }));
            // No need to send notification from frontend, backend will handle it!
        } catch (err) {
            alert('Failed to like post');
        }
    };

    const handleDislike = async (postId) => {
        try {
            await postService.dislikePost(postId);
            setLikedPosts((prev) => ({ ...prev, [postId]: false }));
        } catch (err) {
            alert('Failed to dislike post');
        }
    };

    return (
        <div className="view-posts-container">
            <h2>All Employee Posts</h2>
            {loading ? (
                <p className="loading-message">Loading posts...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : posts.length === 0 ? (
                <p className="no-posts">No posts available yet.</p>
            ) : (
                <div className="posts-grid">
                    {posts.map((post) => {
                        const postId = post._id || post.id;
                        const liked = likedPosts[postId] === true;
                        return (
                            <div key={postId} className="post-card">
                                <div className="post-header">
                                    <h3>{post.title}</h3>
                                </div>
                                <div className="post-body">
                                    <p><strong>Posted by:</strong> {post.authorName || post.name}</p>
                                    {post.skills && (
                                        <p><strong>Skills Required:</strong> <span className="skills">{post.skills}</span></p>
                                    )}
                                    {post.experience && (
                                        <p><strong>Experience:</strong> {post.experience}</p>
                                    )}
                                </div>
                                <div className="post-footer">
                                    {post.cv && (
                                        <a href={post.cv} target="_blank" rel="noopener noreferrer" className="cv-link">
                                            View CV
                                        </a>
                                    )}
                                    <div className="like-dislike-btns" style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                                        <button
                                            className={liked ? 'like-btn active' : 'like-btn'}
                                            onClick={() => handleLike(postId)}
                                            style={{ color: liked ? '#1976d2' : '#333', fontWeight: liked ? 'bold' : 'normal' }}
                                        >
                                            👍 Like
                                        </button>
                                        <button
                                            className={!liked && likedPosts[postId] === false ? 'dislike-btn active' : 'dislike-btn'}
                                            onClick={() => handleDislike(postId)}
                                            style={{ color: !liked && likedPosts[postId] === false ? '#d32f2f' : '#333', fontWeight: !liked && likedPosts[postId] === false ? 'bold' : 'normal' }}
                                        >
                                            👎 Dislike
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ViewPosts;