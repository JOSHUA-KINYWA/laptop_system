import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Application() {
  const { laptopId } = useParams();
  const [laptop, setLaptop] = useState(null);
  const [error, setError] = useState(null);
  const [year, setYear] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    const storedEmail = localStorage.getItem('email');

    if (!role || role !== 'student') {
      navigate('/login');
      return;
    }

    if (storedEmail) {
      setEmail(storedEmail);
    }

    api.get(`/laptops/${laptopId}`)
      .then(res => setLaptop(res.data))
      .catch(err => {
        console.error(err);
        setLaptop(null);
        setError('❌ Laptop not found or has been removed.');
      });
  }, [laptopId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert('❌ Email is required.');
      return;
    }

    if (!year) {
      alert('❌ Please select your academic year.');
      return;
    }

    if (year === '4') {
      alert('❌ Final year students are not eligible to apply.');
      return;
    }

    const applicationData = {
      laptopId,
      email,
      year,
    };

    api.post('/applications/apply', applicationData)
      .then(() => {
        alert('✅ Application submitted successfully!');
        navigate('/mpesa');
      })
      .catch(err => {
        console.error(err);
        alert('❌ Failed to submit application. Try again later.');
      });
  };

  return (
    <div style={{
      maxWidth: '90%',
      width: '800px',
      margin: '2rem auto',
      padding: '2rem',
      background: '#f8fafc',
      borderRadius: 12,
      border: '1px solid #cbd5e1',
      fontFamily: 'Segoe UI, sans-serif',
      boxShadow: '0 0 12px rgba(0, 0, 0, 0.05)'
    }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1e40af', marginBottom: '1.5rem' }}>
        🎓 Laptop Application Form
      </h2>

      {error && (
        <div style={{
          background: '#fee2e2',
          padding: '0.8rem',
          color: '#b91c1c',
          borderRadius: '6px',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      {laptop && (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem' }}>
              Laptop:
            </label>
            <input
              type="text"
              value={`${laptop.brand} ${laptop.model}`}
              readOnly
              style={{
                width: '100%',
                padding: '0.7rem',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                background: '#f1f5f9'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem' }}>
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.7rem',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                background: '#ffffff'
              }}
              placeholder="Enter your email"
              required
            />
          </div>

          <div style={{ marginBottom: '1.8rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem' }}>
              Select Your Academic Year:
            </label>
            <select
              value={year}
              onChange={e => setYear(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.7rem',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
              }}
            >
              <option value="">-- Select Year --</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year (Not Eligible)</option>
            </select>
          </div>

          <button type="submit" style={{
            background: '#10b981',
            color: '#ffffff',
            padding: '0.75rem 1.2rem',
            fontSize: '1.05rem',
            fontWeight: 600,
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            transition: 'background 0.2s ease'
          }}
            onMouseOver={e => e.currentTarget.style.background = '#059669'}
            onMouseOut={e => e.currentTarget.style.background = '#10b981'}>
            ✅ Submit Application and proceed to payment 
          </button>
        </form>
      )}
    </div>
  );
}
