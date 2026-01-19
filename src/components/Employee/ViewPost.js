import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../App';
import postService from '../../services/postService';
import './ViewPost.css';

const ViewPost = () => {
  const { user } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', skills: '', experience: '' });
  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await postService.deletePost(postId);
      setUserPosts((prev) => prev.filter((p) => (p._id || p.id) !== postId));
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  const handleEditClick = (post) => {
    setEditingPost(post._id || post.id);
    setEditForm({
      title: post.title || '',
      skills: post.skills || '',
      experience: post.experience || ''
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await postService.updatePost(editingPost, editForm);
      setUserPosts((prev) => prev.map((p) => {
        if ((p._id || p.id) === editingPost) {
          return { ...p, ...editForm };
        }
        return p;
      }));
      setEditingPost(null);
    } catch (err) {
      alert('Failed to update post');
    }
  };

  const handleEditCancel = () => {
    setEditingPost(null);
  };

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
          {userPosts.map((post) => {
            const postId = post._id || post.id;
            if (editingPost === postId) {
              return (
                <div key={postId} className="post-card">
                  <div className="post-badge">Edit Post</div>
                  <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <label>
                      Title:
                      <input name="title" value={editForm.title} onChange={handleEditChange} required />
                    </label>
                    <label>
                      Skills:
                      <input name="skills" value={editForm.skills} onChange={handleEditChange} required />
                    </label>
                    <label>
                      Experience:
                      <input name="experience" value={editForm.experience} onChange={handleEditChange} required />
                    </label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button type="submit" style={{ background: '#1976d2', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: 4 }}>Save</button>
                      <button type="button" onClick={handleEditCancel} style={{ background: '#bbb', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: 4 }}>Cancel</button>
                    </div>
                  </form>
                </div>
              );
            }
            return (
              <div key={postId} className="post-card">
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
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <button onClick={() => handleEditClick(post)} style={{ background: '#1976d2', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: 4 }}>Update</button>
                  <button onClick={() => handleDelete(postId)} style={{ background: '#d32f2f', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: 4 }}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewPost;
