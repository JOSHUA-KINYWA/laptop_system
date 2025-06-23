import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function AvailableLaptops() {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (!storedRole || storedRole !== 'student') {
      setAuthorized(false);
      navigate(storedRole ? '/' : '/login');
      return;
    }

    setAuthorized(true);
    api.get('/laptops')
      .then(res => {
        setLaptops(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLaptops([]);
        setLoading(false);
      });
  }, [navigate]);

  const handleApply = (laptopId) => {
    navigate(`/applications/${laptopId}`);
    
  };

  if (authorized === false) return null;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      padding: '2rem 1rem',
      fontFamily: 'Segoe UI, sans-serif',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        {/* Title Box */}
        <div style={{
          background: '#dbeafe',
          padding: '1.2rem',
          borderRadius: '10px',
          textAlign: 'center',
          marginBottom: '2rem',
          border: '2px solid #1e3a8a',
        }}>
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#1e3a8a',
          }}>
             Available Laptops for Rent
          </h1>
        </div>

        {/* Loader / No Data */}
        {loading ? (
          <p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#475569' }}>
            ⏳ Loading laptops...
          </p>
        ) : laptops.length === 0 ? (
          <div style={{
            background: '#fff7ed',
            color: '#b45309',
            border: '1px solid #fdba74',
            padding: '1rem',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            🚫 No laptops available at the moment.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gap: '1.2rem',
            gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))'
          }}>
            {laptops.map((laptop, index) => (
              <div
                key={index}
                style={{
                  background: '#ffffff',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease',
                }}
              >
                {/* Laptop Image */}
                <div style={{
                  height: '160px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: '#f1f5f9',
                  borderBottom: '1px solid #e2e8f0'
                }}>
                  <img
                    src={laptop.image || 'https://via.placeholder.com/200x120?text=Laptop'}
                    alt={laptop.model}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '150px',
                      objectFit: 'contain',
                    }}
                  />
                </div>

                {/* Laptop Info */}
                <div style={{ padding: '0.9rem' }}>
                  <h2 style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#1d4ed8',
                    marginBottom: 4,
                    lineHeight: 1.3
                  }}>
                    {laptop.brand} {laptop.model}
                  </h2>
                  <p style={{ color: '#475569', fontSize: '0.85rem' }}>
                    🖥️ {laptop.size} | 💼 {laptop.subscriptionType}
                  </p>
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#334155',
                    marginTop: 6,
                    minHeight: '2.2rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    <strong>🧩 Features:</strong> {laptop.features}
                  </p>
                  <p style={{
                    color: '#059669',
                    fontWeight: 700,
                    fontSize: '1rem',
                    marginTop: 8
                  }}>
                    KES {laptop.price}
                  </p>

                  <button
                    onClick={() => handleApply(laptop._id)}
                    style={{
                      marginTop: 12,
                      background: '#10b981',
                      color: '#ffffff',
                      padding: '0.55rem',
                      borderRadius: 8,
                      border: 'none',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseOver={e => e.currentTarget.style.background = '#059669'}
                    onMouseOut={e => e.currentTarget.style.background = '#10b981'}
                  >
                    ✅ Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
