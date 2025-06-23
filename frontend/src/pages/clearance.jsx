import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const Clearance = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    reason: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      await axios.post('/api/clearance/apply', payload);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to apply. Please try again.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#ffffff',
          color: '#000',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '500px',
          border: '1px solid #e2e8f0',
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#6b21a8', fontWeight: '800', fontSize: '1.75rem', marginBottom: '1.5rem' }}>
          Clearance Application
        </h2>

        {error && (
          <p style={{ color: 'red', fontSize: '0.875rem', marginBottom: '1rem', textAlign: 'center' }}>
            {error}
          </p>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '0.5rem',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Email Address</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '0.5rem',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Department</label>
          <input
            type="text"
            name="department"
            required
            value={formData.department}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '0.5rem',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Reason</label>
          <textarea
            name="reason"
            rows="4"
            required
            value={formData.reason}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '0.5rem',
              outline: 'none',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            backgroundColor: '#6b21a8',
            color: 'white',
            fontWeight: '700',
            padding: '0.75rem',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            transition: 'background 0.3s',
          }}
        >
          Submit Clearance
        </button>
      </form>
    </div>
  );
};

export default Clearance;
