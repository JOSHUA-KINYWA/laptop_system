import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import api from '../services/api';
import Layout from '../components/layout';
import { useAuth } from '../context/authcontext';

export default function Login() {
  const [role, setRole] = useState('student'); // 'student' or 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const { user, login, logout } = useAuth();

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setError('');
    setSuccess('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('❌ Invalid credentials. Try again.');
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirmPassword) {
      setError('❌ Passwords do not match.');
      return;
    }
    try {
      await api.post('/auth/register', { email, password, role });
      setSuccess('✅ Registration successful! Please login.');
      setShowRegister(false);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setRole('student');
    } catch (err) {
      setError('❌ Registration failed. Email may already be in use.');
    }
  };

  // If already logged in, redirect to dashboard
  if (user) return <Navigate to="/dashboard" />;

  return (
    <Layout>
      <main
        style={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          boxSizing: 'border-box',
          width: '100%',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '3rem 2.5rem',
            borderRadius: '12px',
            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '420px',
          }}
        >
          {!showRegister ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <button
                  onClick={() => handleRoleChange('student')}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    fontWeight: '600',
                    backgroundColor: role === 'student' ? '#2563eb' : '#e5e7eb',
                    color: role === 'student' ? 'white' : '#4b5563',
                    border: 'none',
                    borderRadius: '8px 0 0 8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  Student Login
                </button>
                <button
                  onClick={() => handleRoleChange('admin')}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    fontWeight: '600',
                    backgroundColor: role === 'admin' ? '#2563eb' : '#e5e7eb',
                    color: role === 'admin' ? 'white' : '#4b5563',
                    border: 'none',
                    borderRadius: '0 8px 8px 0',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  Admin Login
                </button>
              </div>

              <h2
                style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  color: '#2c3e50',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                }}
              >
                {role === 'admin' ? 'Admin' : 'Student'} Login
              </h2>

              {error && (
                <div
                  style={{
                    backgroundColor: '#fee2e2',
                    color: '#b91c1c',
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    marginBottom: '1rem',
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    border: '1px solid #fca5a5',
                  }}
                >
                  {error}
                </div>
              )}

              {success && (
                <div
                  style={{
                    backgroundColor: '#d1fae5',
                    color: '#065f46',
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    marginBottom: '1rem',
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    border: '1px solid #34d399',
                  }}
                >
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmitLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ marginBottom: '0.5rem', fontWeight: '600', color: '#4b5563' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder={`${role}@example.com`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#2563eb')}
                    onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ marginBottom: '0.5rem', fontWeight: '600', color: '#4b5563' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#2563eb')}
                    onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '1rem',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#1e40af')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#2563eb')}
                >
                  Log In
                </button>
              </form>

              <p
                onClick={() => {
                  setShowRegister(true);
                  setError('');
                  setSuccess('');
                  setEmail('');
                  setPassword('');
                  setConfirmPassword('');
                  setRole('student');
                }}
                style={{
                  marginTop: '2rem',
                  color: '#2563eb',
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontWeight: '600',
                }}
              >
                Don't have an account? Register here
              </p>
            </>
          ) : (
            <>
              <h2
                style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  color: '#2c3e50',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                }}
              >
                Register Account
              </h2>

              {error && (
                <div
                  style={{
                    backgroundColor: '#fee2e2',
                    color: '#b91c1c',
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    marginBottom: '1rem',
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    border: '1px solid #fca5a5',
                  }}
                >
                  {error}
                </div>
              )}

              {success && (
                <div
                  style={{
                    backgroundColor: '#d1fae5',
                    color: '#065f46',
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    marginBottom: '1rem',
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    border: '1px solid #34d399',
                  }}
                >
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmitRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ marginBottom: '0.5rem', fontWeight: '600', color: '#4b5563' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#2563eb')}
                    onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ marginBottom: '0.5rem', fontWeight: '600', color: '#4b5563' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#2563eb')}
                    onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ marginBottom: '0.5rem', fontWeight: '600', color: '#4b5563' }}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#2563eb')}
                    onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ marginBottom: '0.5rem', fontWeight: '600', color: '#4b5563' }}>
                    Select Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#2563eb')}
                    onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '1rem',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#1e40af')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#2563eb')}
                >
                  Register
                </button>
              </form>

              <p
                onClick={() => {
                  setShowRegister(false);
                  setError('');
                  setSuccess('');
                  setEmail('');
                  setPassword('');
                  setConfirmPassword('');
                  setRole('student');
                }}
                style={{
                  marginTop: '2rem',
                  color: '#2563eb',
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontWeight: '600',
                }}
              >
                Already have an account? Log in here
              </p>
            </>
          )}
        </div>
      </main>
    </Layout>
  );
}