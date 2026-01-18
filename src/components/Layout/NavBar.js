import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import './NavBar.css';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-brand">saleme</Link>
        <div className="nav-links">
          {user?.role === 'Employee' && <Link to="/employee">Employee</Link>}
          {user?.role === 'Employer' && <Link to="/employer">Employer</Link>}
          {user ? (
            <div className="nav-user">
              <span className="user-name">{user.name}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <Link to="/auth">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;