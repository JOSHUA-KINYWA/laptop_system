import React from 'react';
import { useAuth } from '../context/authcontext';
import { useNavigate } from 'react-router-dom';

const styles = {
  layout: {
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#f9fafb',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    boxSizing: 'border-box',
    maxWidth: '100vw',
  },
  contentArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    minHeight: 0,
    background: '#f9fafb',
    overflow: 'auto',
    boxSizing: 'border-box',
    maxWidth: '100vw',
  },
  header: {
    width: '100%',
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '1rem 2vw',
    fontSize: '1.6rem',
    fontWeight: '600',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxSizing: 'border-box',
    maxWidth: '100vw',
  },
  main: {
    flex: 1,
    padding: '2rem 3vw',
    paddingBottom: '70px', // enough space for footer
    overflowY: 'auto',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    maxWidth: '100vw',
  },
  footer: {
    width: '100%',
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    textAlign: 'center',
    lineHeight: '60px',
    fontSize: '0.9rem',
    height: '60px',
    position: 'fixed',
    left: 0,
    bottom: 0,
    zIndex: 1200,
    boxSizing: 'border-box',
    maxWidth: '100vw',
  },
  logoutButton: {
    backgroundColor: '#34495e',
    color: 'white',
    padding: '0.5rem 1.2rem',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
    fontWeight: 600,
    fontSize: '1rem',
    letterSpacing: '0.5px',
    transition: 'background 0.2s',
  },
};

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={styles.layout}>
      <div style={styles.contentArea}>
        {/* Header */}
        <header style={styles.header}>
          <span style={{ fontWeight: 600, fontSize: '1.6rem' }}>
            SLFS System
          </span>
          {user && (
            <button
              style={styles.logoutButton}
              onMouseOver={e => (e.currentTarget.style.background = '#22313a')}
              onMouseOut={e => (e.currentTarget.style.background = '#34495e')}
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </header>

        {/* Main Content */}
        <main style={styles.main}>
          {children}
        </main>

        {/* Footer */}
        <footer style={styles.footer}>
          &copy; {new Date().getFullYear()} SLFS System. All rights reserved.
        </footer>
      </div>
    </div>
  );
}