import React, { useState } from 'react';
import postService from '../../services/postService';
import './CreateJobPost.css';

const CreateJobPost = () => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !name.trim()) {
      alert('Job title and Name are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('name', name);
    formData.append('skills', skills);
    formData.append('experience', experience);
    if (cvFile) formData.append('cv', cvFile);

    try {
      setLoading(true);
      const res = await postService.createPostMultipart(formData);
      console.log('Create post response', res.data);
      alert('Job post created successfully.');
      // Reset form
      setTitle('');
      setName('');
      setSkills('');
      setExperience('');
      setCvFile(null);
      // Optionally: emit event or refresh lists
    } catch (err) {
      console.error(err);
      alert('Failed to create job post. See console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create Job Post</h2>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <label>Job Title *</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Frontend Engineer" />

        <label>Your Name *</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />

        <label>Skills (comma-separated)</label>
        <input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="React, Node, SQL" />

        <label>Experiences</label>
        <textarea value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Describe experience..." />

        <label>Upload CV (PDF / DOC)</label>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />

        <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Create Post'}</button>
      </form>
    </div>
  );
};

export default CreateJobPost;
