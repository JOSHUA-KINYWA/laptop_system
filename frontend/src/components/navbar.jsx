
// ===== src/components/Navbar.jsx =====
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold text-lime-400">LaptopSys</h1>
      <div className="space-x-4 text-lg">
        <Link to="/dashboard" className="hover:text-lime-400">Dashboard</Link>
        <Link to="/available-laptops" className="hover:text-lime-400">Laptops</Link>
        {/* <Link to="/applications" className="hover:text-lime-400">Applications</Link> */}
        <Link to="/mpesa" className="hover:text-lime-400">Mpesa</Link>
        <Link to="/" className="hover:text-red-400">Logout</Link>
      </div>
    </nav>
  );
}