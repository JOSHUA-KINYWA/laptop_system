import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';

export default function MpesaPayment() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!phoneNumber) {
      toast.error('Phone number is required.');
      return;
    }
    if (!/^2547\d{8}$/.test(phoneNumber)) {
      toast.error('📱 Enter a valid phone number (e.g., 254712345678)');
      return;
    }

    try {
      toast.loading('⏳ Sending STK push to your phone...');
      const res = await api.post('/stkpush', { phoneNumber });

      toast.dismiss();

      if (res.data.success) {
        toast.success('✅ STK Push sent! Check your phone and enter M-Pesa PIN');
        setTimeout(() => navigate('/dashboard'), 4000);
      } else {
        toast.error('❌ STK push failed. Try again.');
      }
    } catch (err) {
      toast.dismiss();
      toast.error('🚫 Error initiating payment.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f0f4f8',
      padding: '2rem'
    }}>
      <form
        onSubmit={handlePayment}
        style={{
          background: '#ffffff',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '500px'
        }}
      >
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          color: '#2563eb',
          textAlign: 'center'
        }}>
          M-Pesa Payment
        </h2>

        <label style={{ fontWeight: '600', marginBottom: '0.5rem', display: 'block', color: '#1e293b' }}>
          Enter Phone Number (e.g., 254712345678)
        </label>
        <input
          type="text"
          placeholder="2547XXXXXXXX"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{
            width: '100%',
            padding: '0.8rem',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            fontSize: '1rem',
            marginBottom: '1.2rem'
          }}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.9rem',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background 0.3s'
          }}
        >
          Pay with M-Pesa
        </button>
      </form>
    </div>
  );
}