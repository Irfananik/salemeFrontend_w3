import React, { useState } from 'react';
import postService from '../../services/postService';
import './SearchProfiles.css';

const SearchProfiles = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    try {
      setLoading(true);
      setSearched(true);
      const res = await postService.searchProfiles(query);
      setResults(res.data || []);
    } catch (err) {
      console.error(err);
      alert('Search failed. See console for details.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-profiles-container">
      <h2>Search Employee Profiles</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search by skills, name, or job title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {searched && (
        <div className="search-results">
          {results.length > 0 ? (
            <ul>
              {results.map((profile, idx) => (
                <li key={idx} className="profile-card">
                  <h3>{profile.name}</h3>
                  <p><strong>Title:</strong> {profile.title}</p>
                  <p><strong>Skills:</strong> {profile.skills}</p>
                  <p><strong>Experience:</strong> {profile.experience}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-results">No profiles found for your search.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchProfiles;