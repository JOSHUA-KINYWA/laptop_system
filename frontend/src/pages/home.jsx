import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout';

export default function Home() {
  const styles = {
    outer: {
      Height: '100%', // header/footer height if any
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(120deg,rgb(87, 94, 121) 0%,rgb(181, 212, 243) 100%)',
      flex: 2,
    },
    container: {
      width: '100%',
      maxWidth: '700px',
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderRadius: '16px',
      padding: '3rem 2.5rem',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.10)',
      textAlign: 'center',
      margin: '0 auto',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    heading: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '1.5rem',
      letterSpacing: '-0.03em',
      lineHeight: 1.2,
    },
    subHeading: {
      fontSize: '1.15rem',
      color: '#4b5563',
      marginBottom: '2.5rem',
      lineHeight: 1.6,
    },
    button: {
      background: 'linear-gradient(90deg, #2563eb, #1d4ed8)',
      color: '#ffffff',
      padding: '1rem 2.5rem',
      fontSize: '1.1rem',
      fontWeight: '600',
      borderRadius: '10px',
      textDecoration: 'none',
      display: 'inline-block',
      boxShadow: '0 6px 20px rgba(37, 99, 235, 0.4)',
      transition: 'transform 0.2s ease, box-shadow 0.3s ease',
    },
    buttonHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 8px 24px rgba(37, 99, 235, 0.6)',
    },
  };

  const [hover, setHover] = React.useState(false);

  return (
    <Layout>
      <div style={styles.outer}>
        <div style={styles.container}>
          <h1 style={styles.heading}>Welcome to Smart Laptop Finance System</h1>
          <p style={styles.subHeading}>
            Your all-in-one solution for managing laptops, applications, and payments—securely and efficiently.
          </p>
          <Link
            to="/login"
            style={{ ...styles.button, ...(hover ? styles.buttonHover : {}) }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Get Started
          </Link>
        </div>
      </div>
    </Layout>
  );
}