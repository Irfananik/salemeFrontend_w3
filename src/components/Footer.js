import React from 'react';


const Footer = () => (
  <footer style={{
    width: '100%',
    textAlign: 'center',
    padding: '1.2rem 0',
    background: 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)',
    color: '#fff',
    fontWeight: 500,
    fontSize: '1.1rem',
    letterSpacing: '0.5px',
    position: 'fixed',
    left: 0,
    bottom: 0,
    zIndex: 100,
    boxShadow: '0 -2px 12px rgba(25, 118, 210, 0.08)'
  }}>
    &copy; {new Date().getFullYear()} Reverse Job Portal &nbsp;|&nbsp; <span style={{ fontWeight: 700, color: '#fff' }}>@saleme</span>
  </footer>
);

export default Footer;
