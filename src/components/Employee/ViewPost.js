import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../App';
import postService from '../../services/postService';
import './ViewPost.css';

const ViewPost = () => {
  const { user } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await postService.getPosts();
        
        console.log('🔍 ViewPost - API Response:', res);
        console.log('🔍 ViewPost - Current User:', user);

        // Handle different response structures
        let postsData = [];
        if (res.data && Array.isArray(res.data)) {
          postsData = res.data;
        } else if (Array.isArray(res.data?.posts)) {
          postsData = res.data.posts;
        } else if (res.data?.data && Array.isArray(res.data.data)) {
          postsData = res.data.data;
        }

        console.log('🔍 ViewPost - Total posts from API:', postsData.length);

        // Filter posts by current user's name
        const myPosts = postsData.filter(post => {
          const authorName = post.authorName || '';
          const userName = user?.name || '';
          const isMatch = authorName.toLowerCase().includes(userName.toLowerCase()) ||
                         userName.toLowerCase().includes(authorName.toLowerCase());
          console.log('🔍 ViewPost - Checking:', authorName, 'vs', userName, 'Match:', isMatch);
          return isMatch;
        });

        console.log('🔍 ViewPost - Filtered user posts:', myPosts.length);
        setUserPosts(myPosts);
      } catch (err) {
        console.error('🔍 ViewPost - Error fetching posts:', err);
        setError('Failed to load your posts. Please try again.');
        setUserPosts([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserPosts();
    }
  }, [user]);

  if (loading) {
    return <div className="view-post-container"><p>Loading your posts...</p></div>;
  }

  if (error) {
    return <div className="view-post-container"><p className="error-message">{error}</p></div>;
  }

  return (
    <div className="view-post-container">
      <h2>Your Posts</h2>
      {userPosts.length === 0 ? (
        <p className="no-posts">You haven't created any posts yet.</p>
      ) : (
        <div className="posts-grid">
          {userPosts.map((post) => (
            <div key={post._id || post.id} className="post-card">
              <div className="post-badge">Your Post</div>
              <h3>{post.title}</h3>
              <p className="post-author">
                <strong>Posted by:</strong> {post.authorName}
              </p>
              {post.skills && (
                <p className="post-field">
                  <strong>Skills:</strong> {post.skills}
                </p>
              )}
              {post.experience && (
                <p className="post-field">
                  <strong>Experience:</strong> {post.experience}
                </p>
              )}
              {post.cvUrl && (
                <p className="post-field">
                  <strong>CV:</strong>{' '}
                  <a href={post.cvUrl} target="_blank" rel="noopener noreferrer">
                    Download
                  </a>
                </p>
              )}
              {Array.isArray(post.likedBy) && post.likedBy.length > 0 && (
                <div className="liked-by-section" style={{ marginTop: 10 }}>
                  <strong>Liked by employers:</strong>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {post.likedBy.map((employer, idx) => (
                      <li key={employer.id || employer._id || idx}>
                        {employer.name} ({employer.email})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewPost;
