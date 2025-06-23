// src/pages/notfound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1 style={{ fontSize: '3rem', color: '#e74c3c' }}>404</h1>
      <p style={{ fontSize: '1.2rem' }}>Oops! Page not found.</p>
      <Link to="/" style={{ color: '#3498db', textDecoration: 'underline' }}>
        Go back home
      </Link>
    </div>
  );
}
