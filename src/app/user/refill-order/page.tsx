'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Order {
  id: number;
  service: string;
  link: string;
  quantity: number;
  remaining: number;
  status: string;
  date: string;
}

const refillOrders: Order[] = [
  { id: 12345, service: 'Instagram Followers [30 Days]', link: 'https://instagram.com/user', quantity: 1000, remaining: 850, status: 'Active', date: '2026-04-25' },
  { id: 12340, service: 'Instagram Followers [30 Days]', link: 'https://instagram.com/user2', quantity: 500, remaining: 0, status: 'Completed', date: '2026-04-15' },
  { id: 12335, service: 'Instagram Followers [Guaranteed]', link: 'https://instagram.com/user3', quantity: 2000, remaining: 1500, status: 'Active', date: '2026-04-10' },
];

export default function RefillOrderPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [refillQuantity, setRefillQuantity] = useState('');

  return (
    <div className="user-services-page">
      <nav className="user-nav">
        <div className="container">
          <div className="nav-content">
            <Link href="/dashboard" className="logo">
              <img src="https://boostsmm.ng/assets/uploads/logo/logo.png" alt="FLASH BOOSTAGE" />
            </Link>
            <ul className="nav-links">
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li className="dropdown">
                <span>Order <i className="fas fa-chevron-down"></i></span>
                <div className="dropdown-menu">
                  <Link href="/user/new-order">New Order</Link>
                  <Link href="/user/mass-order">Mass Order</Link>
                  <Link href="/user/all-order">All Order</Link>
                  <Link href="/user/refill-order" className="active">Refill Order</Link>
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
            <span className="active">Refill Order</span>
          </div>

          <div className="refill-container">
            <div className="section-header">
              <h2>Refill Order</h2>
              <p>Refill your orders with guarantee. Select an order below to request a refill.</p>
            </div>

            <div className="info-box">
              <i className="fas fa-info-circle"></i>
              <div>
                <strong>Refill Policy:</strong>
                <p>Only orders with guarantee (30 days, 60 days, etc.) are eligible for refill. You can request a refill if your order drops within the guarantee period.</p>
              </div>
            </div>

            <div className="orders-table-wrapper">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Service</th>
                    <th>Link</th>
                    <th>Quantity</th>
                    <th>Remaining</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {refillOrders.map(order => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.service}</td>
                      <td className="link-cell">
                        <a href={order.link} target="_blank" rel="noopener noreferrer">
                          {order.link.substring(0, 35)}...
                        </a>
                      </td>
                      <td>{order.quantity.toLocaleString()}</td>
                      <td>
                        <div className="remaining-bar">
                          <span>{order.remaining.toLocaleString()}</span>
                          <div className="bar">
                            <div 
                              className="fill" 
                              style={{ width: `${(order.remaining / order.quantity) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{order.date}</td>
                      <td>
                        <button 
                          className="refill-btn"
                          onClick={() => setSelectedOrder(order)}
                          disabled={order.remaining === order.quantity}
                        >
                          <i className="fas fa-sync"></i> Refill
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {selectedOrder && (
            <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>Request Refill</h3>
                  <button className="close-modal" onClick={() => setSelectedOrder(null)}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Order ID</label>
                    <div className="form-display">#{selectedOrder.id}</div>
                  </div>
                  <div className="form-group">
                    <label>Service</label>
                    <div className="form-display">{selectedOrder.service}</div>
                  </div>
                  <div className="form-group">
                    <label>Original Quantity</label>
                    <div className="form-display">{selectedOrder.quantity.toLocaleString()}</div>
                  </div>
                  <div className="form-group">
                    <label>Current Count</label>
                    <div className="form-display">{selectedOrder.remaining.toLocaleString()}</div>
                  </div>
                  <div className="form-group">
                    <label>Refill Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder={`Max: ${selectedOrder.quantity - selectedOrder.remaining}`}
                      value={refillQuantity}
                      onChange={(e) => setRefillQuantity(e.target.value)}
                      max={selectedOrder.quantity - selectedOrder.remaining}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="cancel-btn" onClick={() => setSelectedOrder(null)}>Cancel</button>
                  <button className="submit-order-btn">
                    <i className="fas fa-sync"></i> Submit Refill Request
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

