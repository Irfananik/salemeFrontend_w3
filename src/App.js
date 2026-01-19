import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/Layout/NavBar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import EmployeeDashboard from './pages/EmployeeDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import Footer from './components/Footer';

export const AuthContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app load
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      <Router>
        <div className="App">
          <NavBar />
          <main className="App-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/employee" element={<EmployeeDashboard />} />
              <Route path="/employer" element={<EmployerDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
