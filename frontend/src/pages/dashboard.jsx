import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';
import { Chart, ArcElement, Tooltip as ChartTooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, ChartTooltip);

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444'];

const styles = {
  layout: { display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #f0f4f8, #e2e8f0)', fontFamily: 'Segoe UI, sans-serif', overflow: 'hidden' },
  sidebar: { width: '220px', backgroundColor: '#1e3a8a', padding: '2rem 1.5rem', color: '#fff', display: 'flex', flexDirection: 'column', boxShadow: '2px 0 12px rgba(0,0,0,0.1)', left: 0, zIndex: 100 },
  branding: { fontSize: '2rem', fontWeight: 700 },
  userInfo: { marginTop: '1rem', fontSize: '0.9rem', color: '#cbd5e1' },
  nav: { marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' },
  navLink: { padding: '0.6rem 1rem', borderRadius: '8px', backgroundColor: '#2563eb', color: '#fff', textAlign: 'center', fontWeight: 500, textDecoration: 'none', transition: 'background 0.3s' },
  contentArea: { flex: 1, padding: '2rem 2rem', overflowY: 'auto' },
  header: { backgroundColor: '#fff', borderRadius: '1rem', padding: '1.2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', textAlign: 'center', marginBottom: '1.5rem' },
  headerTitle: { fontSize: '2rem', fontWeight: 700, margin: 0, color: '#1e3a8a' },
  adminGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' },
  card: { backgroundColor: '#fff', borderRadius: '1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  cardTitle: { fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' },
  statsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '100%' },
  statBox: { borderRadius: '1rem', padding: '1rem', textAlign: 'center' },
  statLabel: { fontSize: '1rem', fontWeight: 600 },
  statValue: { fontSize: '1.75rem', fontWeight: 'bold' },
  userGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' },
  userCard: { borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  userCardLink: { marginTop: '1rem', padding: '0.6rem 1.2rem', borderRadius: '8px', color: '#fff', fontWeight: 600, textDecoration: 'none', backgroundColor: 'rgba(30,64,175,0.9)' },
};

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [stats, setStats] = useState(null);
  const [paymentProgress, setPaymentProgress] = useState(0);
  const [clearanceStatus, setClearanceStatus] = useState('Pending');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/dashboard/summary')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setClearanceStatus(data.clearanceStatus || 'In Progress');

        // Simulate dynamic payment status info
        const paymentMade = data.paymentMade || 0; // Amount paid so far
        const subscription = data.subscription || 'pending';
        const totalPrice = data.totalPrice || 0; // Total price of the laptop;
        const deposit = totalPrice * 0.4;
        const remaining = totalPrice - deposit - paymentMade;
        const monthlyInstallment = (remaining / 36).toFixed(2);
        const progress = ((deposit + paymentMade) / totalPrice) * 100;

        setPaymentStatus({
          subscription,
          paid: deposit + paymentMade,
          remaining,
          monthly: monthlyInstallment,
        });

        setPaymentProgress(progress);
      })
      .catch(console.error);
  }, []);

  if (!user) return <Navigate to="/" />;

  const doughnutData = {
    labels: ['Daily', 'Weekly', 'Monthly', 'Rented'],
    datasets: [
      {
        data: stats
          ? [
              stats.subscriptions.daily,
              stats.subscriptions.weekly,
              stats.subscriptions.monthly,
              stats.subscriptions.rented,
            ]
          : [],
        backgroundColor: COLORS,
        hoverOffset: 6,
      },
    ],
  };

  const laptopStatsData = {
    labels: ['Total Laptops', 'Available', 'Rented'],
    datasets: [
      {
        label: 'Laptop Stats',
        data: stats
          ? [stats.totalLaptops, stats.availableLaptops, stats.rentedLaptops]
          : [],
        backgroundColor: ['#2563eb', '#10b981', '#ef4444'],
        hoverOffset: 6,
      },
    ],
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={styles.layout}>
      <aside style={styles.sidebar}>
        <h1 style={styles.branding}>💻 SLFS</h1>
        <div style={styles.userInfo}>
          <p><strong>👤</strong> {user.email}</p>
          <p><strong>🛡</strong> {user.role}</p>
        </div>
        <nav style={styles.nav}>
          {isAdmin && (
            <>
              <Link to="/add-laptop" style={styles.navLink}>➕ Add Laptop</Link>
              <Link to="/Manage-Inventory" style={styles.navLink}>📦 Manage Inventory</Link>
            </>
          )}
        </nav>
      </aside>

      <main style={styles.contentArea}>
        <header style={styles.header}>
          <h1 style={styles.headerTitle}>Dashboard Overview</h1>
        </header>

        {isAdmin ? (
          <section style={styles.adminGrid}>
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Subscription Stats</h2>
              <Doughnut data={doughnutData} />
            </div>

            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Laptop Stats</h2>
              <Doughnut data={laptopStatsData} />
            </div>

            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Summary Stats</h2>
              <div style={styles.statsGrid}>
                <div style={{ ...styles.statBox, backgroundColor: '#dbf3ff' }}>
                  <p style={styles.statLabel}>💻 Laptops</p>
                  <p style={styles.statValue}>{stats?.totalLaptops ?? '--'}</p>
                </div>
                <div style={{ ...styles.statBox, backgroundColor: '#e6ffed' }}>
                  <p style={styles.statLabel}>Applications</p>
                  <p style={styles.statValue}>{stats?.applications ?? '--'}</p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section style={styles.userGrid}>
            <div style={{ ...styles.userCard, backgroundColor: '#2563eb', color: '#fff' }}>
              <h2>📱 Available Laptops</h2>
              <Link to="/available-laptops" style={styles.userCardLink}>Browse →</Link>
            </div>

            <div style={{ ...styles.userCard, backgroundColor: '#10b981', color: '#fff' }}>
              <h2>📝 Apply for a Laptop</h2>
              <Link to="/available-laptops" style={styles.userCardLink}>Apply →</Link>
            </div>

            <div style={{ ...styles.userCard, backgroundColor: '#4b5563', color: '#fff' }}>
              <h2>✅ Apply for Clearance</h2>
              <Link to="/clearance" style={styles.userCardLink}>Apply →</Link>
            </div>

            <div style={{ ...styles.userCard, backgroundColor: '#f59e0b', color: '#fff' }}>
              <h2>📄 Clearance Status</h2>
              <p>{clearanceStatus}</p>
              <div style={{ width: '100%', height: '10px', background: '#fff', borderRadius: '5px', marginTop: '0.5rem' }}>
                <div style={{ width: `${paymentProgress}%`, height: '100%', background: '#2563eb', borderRadius: '5px' }}></div>
              </div>
            </div>

            <div style={{ ...styles.userCard, backgroundColor: '#ef4444', color: '#fff' }}>
              <h2>💰 Payment Status</h2>
              {paymentStatus ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li>Subscription: {paymentStatus.subscription}</li>
                  <li>Total Paid: ksh{paymentStatus.paid.toFixed(2)}</li>
                  <li>Remaining: ksh{paymentStatus.remaining.toFixed(2)}</li>
                  <li>Monthly: ksh{paymentStatus.monthly}</li>
                </ul>
              ) : (
                <p>Loading payment info...</p>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
