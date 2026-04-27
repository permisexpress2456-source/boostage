'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MassOrderPage() {
  const [massOrderText, setMassOrderText] = useState('');

  return (
    <div className="user-services-page">
      <nav className="user-nav">
        <div className="container">
          <div className="nav-content">
            <Link href="/dashboard" className="logo">
              <img src="/logo.png" alt="FLASH BOOSTAGE" />
            </Link>
            <ul className="nav-links">
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li className="dropdown">
                <span>Order <i className="fas fa-chevron-down"></i></span>
                <div className="dropdown-menu">
                  <Link href="/user/new-order">New Order</Link>
                  <Link href="/user/mass-order" className="active">Mass Order</Link>
                  <Link href="/user/all-order">All Order</Link>
                  <Link href="/user/refill-order">Refill Order</Link>
                  <Link href="/user/drip-feed">Drip Feed</Link>
                </div>
              </li>
              <li><Link href="/user/services">Services</Link></li>
              <li><Link href="/user/add-funds">Add Funds</Link></li>
              <li><Link href="/user/transactions">Transactions</Link></li>
              <li><Link href="/user/api">API</Link></li>
              <li><a href="https://wa.me/2348131654957" target="_blank">Support</a></li>
            </ul>
            <div className="user-menu">
              <div className="balance-display">
                <i className="fas fa-wallet"></i>
                <span>$1,250.50</span>
              </div>
              <div className="avatar">
                <i className="fas fa-user"></i>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="user-services-content">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/dashboard">Home</Link>
            <span className="separator">/</span>
            <Link href="/user/services">Order</Link>
            <span className="separator">/</span>
            <span className="active">Mass Order</span>
          </div>

          <div className="mass-order-container">
            <div className="section-header">
              <h2>Mass Order</h2>
              <p>Place multiple orders at once. Each line should contain: Service ID | Link | Quantity</p>
            </div>

            <div className="mass-order-form">
              <div className="form-group">
                <label>Order Format Example:</label>
                <div className="format-example">
                  <code>12 | https://instagram.com/p/abc123 | 1000</code><br />
                  <code>15 | https://instagram.com/p/def456 | 5000</code><br />
                  <code>20 | https://instagram.com/p/ghi789 | 2000</code>
                </div>
              </div>

              <div className="form-group">
                <label>Mass Orders (one per line)</label>
                <textarea
                  className="form-control textarea-large"
                  placeholder="Service ID | Link | Quantity&#10;12 | https://... | 1000&#10;15 | https://... | 5000"
                  value={massOrderText}
                  onChange={(e) => setMassOrderText(e.target.value)}
                  rows={15}
                />
              </div>

              <div className="form-group">
                <label>Total Orders</label>
                <div className="form-display">
                  {massOrderText ? massOrderText.split('\n').filter(line => line.trim()).length : 0} orders
                </div>
              </div>

              <button className="submit-order-btn">
                <i className="fas fa-shopping-cart"></i>
                Submit All Orders
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


