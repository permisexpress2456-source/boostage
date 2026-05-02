'use client';

import './dashboard.css';
import { useState } from 'react';
import Link from 'next/link';

interface Order {
  id: number;
  service: string;
  link: string;
  quantity: number;
  status: string;
  date: string;
}

interface Service {
  id: number;
  name: string;
  price: number;
  category: string;
}

const recentOrders: Order[] = [
  { id: 12345, service: 'Instagram Followers', link: 'https://instagram.com/user', quantity: 1000, status: 'Completed', date: '2026-04-25' },
  { id: 12344, service: 'Facebook Likes', link: 'https://facebook.com/post', quantity: 500, status: 'In Progress', date: '2026-04-24' },
  { id: 12343, service: 'YouTube Views', link: 'https://youtube.com/watch', quantity: 5000, status: 'Pending', date: '2026-04-24' },
  { id: 12342, service: 'TikTok Followers', link: 'https://tiktok.com/@user', quantity: 2000, status: 'Completed', date: '2026-04-23' },
  { id: 12341, service: 'Twitter Retweets', link: 'https://twitter.com/status', quantity: 300, status: 'Completed', date: '2026-04-22' },
];

const popularServices: Service[] = [
  { id: 102, name: 'Instagram Followers [Real HQ]', price: 0.50, category: 'Instagram' },
  { id: 205, name: 'Facebook Page Likes', price: 3.50, category: 'Facebook' },
  { id: 308, name: 'YouTube Subscribers', price: 5.00, category: 'YouTube' },
  { id: 410, name: 'TikTok Followers', price: 1.20, category: 'TikTok' },
];

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [newOrder, setNewOrder] = useState({
    service: '',
    link: '',
    quantity: '',
  });

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    balance: 1250.50,
    totalOrders: 156,
    spent: 3420.75,
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <Link href="/" className="logo">
            <img src="/logo.png" alt="FLASH BOOSTAGE" />
          </Link>
          <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <i className="fas fa-bars"></i>
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>
                <i className="fas fa-home"></i>
                <span>Overview</span>
              </button>
            </li>
            <li>
              <button className={activeTab === 'new-order' ? 'active' : ''} onClick={() => setActiveTab('new-order')}>
                <i className="fas fa-shopping-cart"></i>
                <span>New Order</span>
              </button>
            </li>
            <li>
              <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
                <i className="fas fa-list"></i>
                <span>Orders</span>
              </button>
            </li>
            <li>
              <button className={activeTab === 'services' ? 'active' : ''} onClick={() => setActiveTab('services')}>
                <i className="fas fa-th-large"></i>
                <span>Services</span>
              </button>
            </li>
            <li>
              <button className={activeTab === 'add-funds' ? 'active' : ''} onClick={() => setActiveTab('add-funds')}>
                <i className="fas fa-wallet"></i>
                <span>Add Funds</span>
              </button>
            </li>
            <li>
              <button className={activeTab === 'support' ? 'active' : ''} onClick={() => setActiveTab('support')}>
                <i className="fas fa-headset"></i>
                <span>Support</span>
              </button>
            </li>
            <li>
              <button className={activeTab === 'api' ? 'active' : ''} onClick={() => setActiveTab('api')}>
                <i className="fas fa-code"></i>
                <span>API</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <Link href="/login" className="logout-btn">
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <div className="top-bar-left">
            <button className="mobile-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <i className="fas fa-bars"></i>
            </button>
            <h1 className="page-title">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'new-order' && 'New Order'}
              {activeTab === 'orders' && 'Order History'}
              {activeTab === 'services' && 'Services List'}
              {activeTab === 'add-funds' && 'Add Funds'}
              {activeTab === 'support' && 'Support Center'}
              {activeTab === 'api' && 'API Documentation'}
            </h1>
          </div>
          <div className="top-bar-right">
            <div className="user-balance">
              <i className="fas fa-wallet"></i>
              <span>${user.balance.toFixed(2)}</span>
            </div>
            <div className="user-info">
              <div className="user-avatar">
                <i className="fas fa-user"></i>
              </div>
              <div className="user-details">
                <span className="user-name">{user.name}</span>
                <span className="user-email">{user.email}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              {/* Stats Cards */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon balance">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <div className="stat-info">
                    <h3>${user.balance.toFixed(2)}</h3>
                    <p>Current Balance</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon orders">
                    <i className="fas fa-shopping-cart"></i>
                  </div>
                  <div className="stat-info">
                    <h3>{user.totalOrders}</h3>
                    <p>Total Orders</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon spent">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <div className="stat-info">
                    <h3>${user.spent.toFixed(2)}</h3>
                    <p>Total Spent</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon pending">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="stat-info">
                    <h3>3</h3>
                    <p>Pending Orders</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Orders */}
              <div className="dashboard-grid">
                {/* Quick Actions */}
                <div className="dashboard-card">
                  <div className="card-header">
                    <h3>Quick Actions</h3>
                  </div>
                  <div className="card-body">
                    <div className="quick-actions">
                      <button className="quick-action-btn" onClick={() => setActiveTab('new-order')}>
                        <i className="fas fa-plus-circle"></i>
                        <span>New Order</span>
                      </button>
                      <button className="quick-action-btn" onClick={() => setActiveTab('add-funds')}>
                        <i className="fas fa-plus"></i>
                        <span>Add Funds</span>
                      </button>
                      <button className="quick-action-btn" onClick={() => setActiveTab('support')}>
                        <i className="fas fa-headset"></i>
                        <span>Support</span>
                      </button>
                      <button className="quick-action-btn" onClick={() => setActiveTab('services')}>
                        <i className="fas fa-th-large"></i>
                        <span>Services</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Popular Services */}
                <div className="dashboard-card">
                  <div className="card-header">
                    <h3>Popular Services</h3>
                    <Link href="/services" className="view-all">View All</Link>
                  </div>
                  <div className="card-body">
                    <div className="services-list">
                      {popularServices.map(service => (
                        <div key={service.id} className="service-item">
                          <div className="service-info">
                            <span className="service-name">{service.name}</span>
                            <span className="service-category">{service.category}</span>
                          </div>
                          <div className="service-price">
                            <span className="price">${service.price.toFixed(2)}</span>
                            <span className="per">/1K</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Orders Table */}
              <div className="dashboard-card">
                <div className="card-header">
                  <h3>Recent Orders</h3>
                  <Link href="/dashboard?tab=orders" className="view-all">View All</Link>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="orders-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Service</th>
                          <th>Link</th>
                          <th>Quantity</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map(order => (
                          <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{order.service}</td>
                            <td className="link-cell">
                              <a href={order.link} target="_blank" rel="noopener noreferrer">
                                {order.link.substring(0, 30)}...
                              </a>
                            </td>
                            <td>{order.quantity.toLocaleString('en-US')}</td>
                            <td>
                              <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                                {order.status}
                              </span>
                            </td>
                            <td>{order.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* New Order Tab */}
          {activeTab === 'new-order' && (
            <div className="dashboard-card max-width-card">
              <div className="card-header">
                <h3>Place New Order</h3>
              </div>
              <div className="card-body">
                <form className="order-form">
                  <div className="form-group">
                    <label>Category</label>
                    <select className="form-control">
                      <option>Select Category</option>
                      <option>Instagram</option>
                      <option>Facebook</option>
                      <option>YouTube</option>
                      <option>TikTok</option>
                      <option>Twitter</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Service</label>
                    <select className="form-control">
                      <option>Select Service</option>
                      {popularServices.map(service => (
                        <option key={service.id} value={service.id}>
                          {service.name} - ${service.price.toFixed(2)}/1K
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Link</label>
                    <input
                      type="url"
                      className="form-control"
                      placeholder="https://..."
                      value={newOrder.link}
                      onChange={(e) => setNewOrder({ ...newOrder, link: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Min: 100 - Max: 10000"
                      value={newOrder.quantity}
                      onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Total Charge</label>
                    <div className="total-charge">
                      <span className="amount">$0.00</span>
                    </div>
                  </div>
                  <button type="submit" className="btn custom_btn w-100">
                    <i className="fas fa-shopping-cart me-2"></i>
                    Submit Order
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Other tabs placeholder */}
          {['orders', 'services', 'add-funds', 'support', 'api'].includes(activeTab) && (
            <div className="dashboard-card">
              <div className="card-header">
                <h3>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
              </div>
              <div className="card-body text-center py-5">
                <i className="fas fa-tools fa-3x text-muted mb-3"></i>
                <h4>Coming Soon</h4>
                <p className="text-muted">This feature is under development.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}


