import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageInventory = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appsRes, clearanceRes, laptopsRes] = await Promise.all([
          axios.get('/api/application'),
          axios.get('/api/clearance'),
          axios.get('/api/available-laptops')
        ]);

        const applications = appsRes.data;
        const clearance = clearanceRes.data;
        const laptops = laptopsRes.data;

        // Combine records based on email
        const combined = applications.map(app => {
          const clearanceRecord = clearance.find(c => c.email === app.email);
          const laptopRecord = laptops.find(l => l.email === app.email);
          return {
            id: app.id,
            name: app.name,
            email: app.email,
            laptopBrand: laptopRecord?.brand || 'Not Assigned',
            applicationStatus: app.status || 'Pending',
            clearanceStatus: clearanceRecord?.status || 'Not Cleared',
            paymentStatus: 'Unpaid',
            remainingBalance: 50000 // default or fetched later
          };
        });

        setInventory(combined);
      } catch (error) {
        console.error('Error loading inventory dependencies:', error);
      }
    };

    fetchData();
  }, []);

  const handlePayment = (id) => {
    axios.post(`/api/inventory/pay/${id}`)
      .then(res => alert(res.data.message))
      .catch(err => console.error('Payment error:', err));
  };

  // Inline styles (same as earlier response)
  const containerStyle = { minHeight: '100vh', background: 'linear-gradient(to top right, #f8fafc, #e2e8f0)', padding: '40px', fontFamily: 'Arial, sans-serif' };
  const cardStyle = { maxWidth: '1200px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)', padding: '30px' };
  const headingStyle = { fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', color: '#333' };
  const tableStyle = { width: '100%', borderCollapse: 'collapse' };
  const thStyle = { border: '1px solid #ccc', padding: '12px', backgroundColor: '#f3f4f6', textAlign: 'left', fontWeight: 'bold', color: '#222' };
  const tdStyle = { border: '1px solid #ddd', padding: '10px', textAlign: 'left', color: '#333' };
  const buttonStyle = { padding: '8px 16px', borderRadius: '6px', fontSize: '14px', cursor: 'pointer', backgroundColor: '#2563eb', color: '#fff', border: 'none', transition: 'background-color 0.3s ease' };
  const buttonDisabledStyle = { ...buttonStyle, backgroundColor: '#9ca3af', cursor: 'not-allowed' };
  const rowHoverStyle = { backgroundColor: '#f9fafb' };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={headingStyle}>Manage Inventory</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Laptop Brand</th>
                <th style={thStyle}>Application Status</th>
                <th style={thStyle}>Clearance Status</th>
                <th style={thStyle}>Payment</th>
                <th style={thStyle}>Remaining</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ ...tdStyle, textAlign: 'center', padding: '20px', color: '#888' }}>
                    No inventory records found.
                  </td>
                </tr>
              ) : (
                inventory.map((item) => (
                  <tr key={item.id} style={rowHoverStyle}>
                    <td style={tdStyle}>{item.name}</td>
                    <td style={tdStyle}>{item.email}</td>
                    <td style={tdStyle}>{item.laptopBrand}</td>
                    <td style={tdStyle}>{item.applicationStatus}</td>
                    <td style={tdStyle}>{item.clearanceStatus}</td>
                    <td style={tdStyle}>{item.paymentStatus}</td>
                    <td style={tdStyle}>₦{item.remainingBalance}</td>
                    <td style={tdStyle}>
                      <button
                        onClick={() => handlePayment(item.id)}
                        style={item.paymentStatus === 'Paid' ? buttonDisabledStyle : buttonStyle}
                        disabled={item.paymentStatus === 'Paid'}
                      >
                        {item.paymentStatus === 'Paid' ? 'Paid' : 'Make Payment'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageInventory;
