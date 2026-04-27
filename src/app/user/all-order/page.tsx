'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Order {
  id: number;
  service: string;
  link: string;
  quantity: number;
  charge: number;
  status: string;
  date: string;
}

const ordersData: Order[] = [
  { id: 12345, service: 'Instagram Followers', link: 'https://instagram.com/user', quantity: 1000, charge: 2.50, status: 'Completed', date: '2026-04-25' },
  { id: 12344, service: 'Facebook Likes', link: 'https://facebook.com/post', quantity: 500, charge: 0.75, status: 'In Progress', date: '2026-04-24' },
  { id: 12343, service: 'YouTube Views', link: 'https://youtube.com/watch', quantity: 5000, charge: 15.00, status: 'Pending', date: '2026-04-24' },
  { id: 12342, service: 'TikTok Followers', link: 'https://tiktok.com/@user', quantity: 2000, charge: 2.40, status: 'Completed', date: '2026-04-23' },
  { id: 12341, service: 'Twitter Retweets', link: 'https://twitter.com/status', quantity: 300, charge: 0.60, status: 'Completed', date: '2026-04-22' },
  { id: 12340, service: 'Instagram Likes', link: 'https://instagram.com/p/abc', quantity: 5000, charge: 2.50, status: 'Partial', date: '2026-04-21' },
  { id: 12339, service: 'YouTube Subscribers', link: 'https://youtube.com/channel', quantity: 100, charge: 5.00, status: 'Completed', date: '2026-04-20' },
  { id: 12338, service: 'Instagram Followers', link: 'https://instagram.com/user2', quantity: 500, charge: 1.25, status: 'Canceled', date: '2026-04-19' },
];

const statusFilters = ['All', 'Pending', 'In Progress', 'Processing', 'Completed', 'Partial', 'Canceled'];

export default function AllOrderPage() {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = ordersData.filter(order => {
    const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
    const matchesSearch = order.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toString().includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

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
                  <Link href="/user/all-order" className="active">All Order</Link>
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
            <span className="active">All Order</span>
          </div>

          <div className="all-order-container">
            <div className="section-header">
              <h2>All Orders</h2>
              <p>View and manage all your orders</p>
            </div>

            <div className="order-filters">
              <div className="search-box">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Search by Order ID or Service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="status-filters">
                {statusFilters.map(status => (
                  <button
                    key={status}
                    className={`filter-btn ${selectedStatus === status ? 'active' : ''}`}
                    onClick={() => setSelectedStatus(status)}
                  >
                    {status}
                  </button>
                ))}
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
                    <th>Charge</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.service}</td>
                      <td className="link-cell">
                        <a href={order.link} target="_blank" rel="noopener noreferrer">
                          {order.link.substring(0, 35)}...
                        </a>
                      </td>
                      <td>{order.quantity.toLocaleString()}</td>
                      <td className="charge">${order.charge.toFixed(2)}</td>
                      <td>
                        <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{order.date}</td>
                      <td>
                        <button className="action-btn">
                          <i className="fas fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <button className="page-btn"><i className="fas fa-chevron-left"></i></button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <button className="page-btn"><i className="fas fa-chevron-right"></i></button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

