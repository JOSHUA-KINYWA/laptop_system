import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddLaptop() {
  const [form, setForm] = useState({
    brand: '',
    model: '',
    size: '',
    subscriptionType: '',
    features: '',
    price: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Only allow admin
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        // Convert price to number before sending
        const payload = { ...form, price: Number(form.price) };
        const res = await fetch('http://localhost:5000/api/laptops', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          alert('Laptop added successfully!');
          navigate('/available-laptops');
        } else {
          alert('Failed to add laptop.');
        }
      } catch {
        alert('Failed to add laptop.');
      }
      setLoading(false);
    };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
      <h2 style={{ textAlign: 'center', color: '#2563eb', marginBottom: 24 }}>Add New Laptop</h2>
      <form onSubmit={handleSubmit}>
        <label>Brand</label>
        <input
          name="brand"
          value={form.brand}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 12, padding: 8 }}
        />
        <label>Model</label>
        <input
          name="model"
          value={form.model}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 12, padding: 8 }}
        />
        <label>Size</label>
        <input
          name="size"
          value={form.size}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 12, padding: 8 }}
        />
        <label>Subscription Type</label>
        <input
          name="subscriptionType"
          value={form.subscriptionType}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 12, padding: 8 }}
        />
        <label>Features</label>
        <input
          name="features"
          value={form.features}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 12, padding: 8 }}
        />
        <label>Price (KES)</label>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 12, padding: 8 }}
        />
        <label>Picture</label>
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={{ width: '100%', marginBottom: 12, padding: 8 }}
        />
        {form.image && (
          <img src={form.image} alt="Preview" style={{ width: '100%', maxHeight: 200, objectFit: 'cover', marginBottom: 12 }} />
        )}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            background: '#2563eb',
            color: '#fff',
            padding: '0.8rem',
            border: 'none',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 16,
            cursor: 'pointer'
          }}
        >
          {loading ? 'Adding...' : 'Add Laptop'}
        </button>
      </form>
    </div>
  );
}