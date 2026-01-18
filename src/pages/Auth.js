import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import authService from '../services/authService';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Employee');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isLogin) {
        const res = await authService.login({ email, password });
        console.log('login success', res.data);
        // Store token and user info
        if (res.data.token && res.data.user) {
          login(res.data.user, res.data.token);
          alert('Login successful!');
          navigate('/');
        }
      } else {
        const res = await authService.register({ name, email, password, role });
        console.log('register success', res.data);
        alert('Registration successful! Please login.');
        setIsLogin(true);
        setName('');
        setEmail('');
        setPassword('');
        setRole('Employee');
      }
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || (isLogin ? 'Login failed.' : 'Registration failed.');
      alert(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-tabs">
        <button
          className={`tab ${isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`tab ${!isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>

      <div className="auth-container">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label>Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
              />
            </div>
          )}

          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          {!isLogin && (
            <div>
              <label>Select Role</label>
              <div className="role-options">
                <label className="role-label">
                  <input
                    type="radio"
                    value="Employee"
                    checked={role === 'Employee'}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  Employee
                </label>
                <label className="role-label">
                  <input
                    type="radio"
                    value="Employer"
                    checked={role === 'Employer'}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  Employer
                </label>
              </div>
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? (isLogin ? 'Logging in...' : 'Registering...') : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
