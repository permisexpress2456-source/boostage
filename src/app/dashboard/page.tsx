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

interface FullService {
  id: number;
  name: string;
  rate: number;
  min: number;
  max: number;
  category: string;
  description: string;
}

const servicesData: FullService[] = [
  { id: 1,  name: 'Instagram Likes [Real HQ]',  rate: 0.05, min: 100,  max: 50000,   category: 'Instagram', description: 'High quality real likes' },
  { id: 2,  name: 'Instagram Followers [Real]',  rate: 2.50, min: 100,  max: 100000,  category: 'Instagram', description: 'Real active followers' },
  { id: 3,  name: 'Instagram Views [Instant]',   rate: 0.02, min: 1000, max: 1000000, category: 'Instagram', description: 'Instant views delivery' },
  { id: 4,  name: 'Instagram Comments [Custom]', rate: 5.00, min: 10,   max: 1000,    category: 'Instagram', description: 'Custom comments' },
  { id: 5,  name: 'Facebook Page Likes',         rate: 3.50, min: 100,  max: 50000,   category: 'Facebook',  description: 'Page likes from real users' },
  { id: 6,  name: 'Facebook Post Likes',         rate: 1.50, min: 100,  max: 20000,   category: 'Facebook',  description: 'Post likes with emoji' },
  { id: 7,  name: 'YouTube Subscribers',         rate: 5.00, min: 50,   max: 10000,   category: 'YouTube',   description: 'Real YouTube subscribers' },
  { id: 8,  name: 'YouTube Views [HQ]',          rate: 3.00, min: 500,  max: 100000,  category: 'YouTube',   description: 'High retention views' },
  { id: 9,  name: 'TikTok Followers',            rate: 1.20, min: 100,  max: 50000,   category: 'TikTok',    description: 'Fast delivery followers' },
  { id: 10, name: 'TikTok Likes',                rate: 0.30, min: 50,   max: 50000,   category: 'TikTok',    description: 'TikTok video likes instant' },
  { id: 11, name: 'Twitter/X Followers',         rate: 2.00, min: 100,  max: 20000,   category: 'Twitter',   description: 'Real Twitter followers' },
  { id: 12, name: 'Telegram Members',            rate: 1.80, min: 100,  max: 100000,  category: 'Telegram',  description: 'Telegram channel members' },
];

const SRV_CATEGORIES = ['All', 'Instagram', 'Facebook', 'YouTube', 'TikTok', 'Twitter', 'Telegram'];

const CAT_ICONS: Record<string, string> = {
  Instagram: 'fa-instagram', Facebook: 'fa-facebook-f',
  YouTube: 'fa-youtube', TikTok: 'fa-tiktok',
  Twitter: 'fa-twitter', Telegram: 'fa-telegram',
};

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

  const [srvSearch, setSrvSearch]       = useState('');
  const [srvCat, setSrvCat]             = useState('All');
  const [srvSelected, setSrvSelected]   = useState<FullService | null>(null);
  const [srvLink, setSrvLink]           = useState('');
  const [srvQty, setSrvQty]             = useState('');

  const filteredSrv = servicesData.filter(s =>
    s.name.toLowerCase().includes(srvSearch.toLowerCase()) &&
    (srvCat === 'All' || s.category === srvCat)
  );
  const srvTotal = srvSelected && srvQty
    ? (srvSelected.rate * parseInt(srvQty || '0')) / 1000
    : 0;
  const selectSrv = (s: FullService) => { setSrvSelected(s); setSrvQty(String(s.min)); };

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

          {/* Services Tab */}
          {activeTab === 'services' && (
            <>
              <style>{`
                .srv-search{display:grid;grid-template-columns:1fr 220px;gap:12px;margin-bottom:20px}
                .srv-input-wrap{position:relative}
                .srv-input-wrap i{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:#94a3b8;font-size:.85rem;pointer-events:none}
                .srv-input-wrap input,.srv-input-wrap select{width:100%;background:#0a0f1e;border:1px solid rgba(255,255,255,.07);border-radius:10px;color:#e2e8f0;padding:11px 14px 11px 38px;font-size:.875rem;font-family:inherit;transition:border-color .2s;appearance:none;-webkit-appearance:none}
                .srv-input-wrap input:focus,.srv-input-wrap select:focus{outline:none;border-color:#2563eb;box-shadow:0 0 0 3px rgba(37,99,235,.15)}
                .cat-pills{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}
                .cat-pill{display:inline-flex;align-items:center;gap:6px;padding:7px 16px;border-radius:20px;border:1px solid rgba(255,255,255,.07);background:transparent;color:#94a3b8;font-size:.78rem;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s;white-space:nowrap}
                .cat-pill:hover{border-color:rgba(249,115,22,.4);color:#f97316}
                .cat-pill.active{background:linear-gradient(135deg,#2563eb,#f97316);border-color:transparent;color:#fff;box-shadow:0 4px 14px rgba(37,99,235,.3)}
                .srv-table-wrap{background:#0d1726;border:1px solid rgba(255,255,255,.07);border-radius:16px;overflow:hidden}
                .srv-table{width:100%;border-collapse:collapse}
                .srv-table thead{background:linear-gradient(90deg,#1e40af,#7c3aed,#ea580c)}
                .srv-table th{padding:13px 16px;text-align:left;font-size:.7rem;font-weight:700;color:rgba(255,255,255,.9);text-transform:uppercase;letter-spacing:.8px;white-space:nowrap}
                .srv-table tbody tr{border-bottom:1px solid rgba(255,255,255,.05);transition:background .15s}
                .srv-table tbody tr:last-child{border-bottom:none}
                .srv-table tbody tr:hover{background:rgba(37,99,235,.06)}
                .srv-table td{padding:13px 16px;font-size:.84rem;vertical-align:middle;color:#e2e8f0}
                .srv-id{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:9px;background:rgba(37,99,235,.12);color:#60a5fa;font-size:.72rem;font-weight:700;border:1px solid rgba(37,99,235,.2)}
                .srv-cat-tag{display:inline-flex;align-items:center;gap:5px;background:rgba(249,115,22,.1);border:1px solid rgba(249,115,22,.2);color:#f97316;font-size:.68rem;font-weight:700;padding:2px 8px;border-radius:4px;text-transform:uppercase;letter-spacing:.4px;margin-bottom:3px}
                .srv-name{font-weight:600;color:#f1f5f9;font-size:.84rem}
                .srv-desc{font-size:.75rem;color:#94a3b8;margin-top:2px}
                .srv-price{display:inline-block;padding:5px 12px;border-radius:8px;background:linear-gradient(135deg,rgba(37,99,235,.18),rgba(249,115,22,.18));border:1px solid rgba(249,115,22,.22);color:#f97316;font-size:.82rem;font-weight:700;white-space:nowrap}
                .srv-range{font-size:.8rem;color:#94a3b8;white-space:nowrap}
                .srv-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:8px;background:linear-gradient(135deg,#2563eb,#f97316);color:#fff;border:none;font-size:.78rem;font-weight:600;cursor:pointer;font-family:inherit;white-space:nowrap;transition:opacity .2s,transform .2s,box-shadow .2s}
                .srv-btn:hover{opacity:.9;transform:translateY(-1px);box-shadow:0 6px 16px rgba(249,115,22,.35)}
                .order-panel-wrap{margin-top:24px;background:#0d1726;border:1px solid rgba(249,115,22,.25);border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.4)}
                .order-panel-head{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.07);background:linear-gradient(90deg,rgba(37,99,235,.12),rgba(249,115,22,.08))}
                .order-panel-head h3{font-size:.95rem;font-weight:700;color:#f1f5f9;margin:0}
                .close-btn{background:none;border:1px solid rgba(255,255,255,.1);border-radius:8px;color:#94a3b8;padding:6px 10px;cursor:pointer;font-size:.85rem;transition:all .2s}
                .close-btn:hover{background:rgba(239,68,68,.1);color:#f87171;border-color:rgba(239,68,68,.3)}
                .order-panel-body{padding:22px;display:grid;grid-template-columns:1fr 1fr;gap:16px}
                .order-form-group{display:flex;flex-direction:column;gap:6px}
                .order-form-group.full{grid-column:1/-1}
                .order-form-group label{font-size:.72rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.5px}
                .order-form-group input{background:#0a0f1e;border:1px solid rgba(255,255,255,.07);border-radius:8px;color:#e2e8f0;padding:10px 14px;font-size:.88rem;font-family:inherit;transition:border-color .2s}
                .order-form-group input:focus{outline:none;border-color:#2563eb;box-shadow:0 0 0 3px rgba(37,99,235,.15)}
                .service-display{background:#0a0f1e;border:1px solid rgba(255,255,255,.07);border-radius:8px;padding:10px 14px;font-size:.84rem;font-weight:600;color:#f1f5f9}
                .total-box{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border:2px solid rgba(249,115,22,.25);border-radius:10px;background:rgba(249,115,22,.05)}
                .total-label{font-size:.75rem;color:#94a3b8;font-weight:600;text-transform:uppercase}
                .total-amount{font-size:1.3rem;font-weight:800;color:#f97316}
                .submit-btn{grid-column:1/-1;display:flex;align-items:center;justify-content:center;gap:8px;padding:13px 24px;background:linear-gradient(135deg,#2563eb,#f97316);color:#fff;border:none;border-radius:10px;font-size:.9rem;font-weight:700;cursor:pointer;font-family:inherit;transition:opacity .2s,transform .2s,box-shadow .2s;width:100%}
                .submit-btn:hover{opacity:.9;transform:translateY(-1px);box-shadow:0 8px 24px rgba(37,99,235,.35)}
                .empty-srv{text-align:center;padding:56px 20px;color:#94a3b8}
                .empty-srv i{font-size:2.5rem;opacity:.25;display:block;margin-bottom:14px}
                .empty-srv h5{color:#e2e8f0;margin-bottom:6px}
                @media(max-width:768px){.srv-search{grid-template-columns:1fr}.order-panel-body{grid-template-columns:1fr}.order-form-group.full,.submit-btn{grid-column:1}.srv-table thead{display:none}.srv-table tbody tr{display:block;border:1px solid rgba(255,255,255,.07);border-radius:12px;margin-bottom:10px;padding:4px 0}.srv-table td{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid rgba(255,255,255,.04);font-size:.82rem}.srv-table td:last-child{border-bottom:none}.srv-table td::before{content:attr(data-label);font-size:.68rem;font-weight:700;color:#94a3b8;text-transform:uppercase;flex-shrink:0}}
              `}</style>

              {/* Search */}
              <div className="srv-search">
                <div className="srv-input-wrap">
                  <i className="fas fa-search"></i>
                  <input type="text" placeholder="Search services…" value={srvSearch} onChange={e => setSrvSearch(e.target.value)} />
                </div>
                <div className="srv-input-wrap">
                  <i className="fas fa-layer-group"></i>
                  <select value={srvCat} onChange={e => setSrvCat(e.target.value)}>
                    {SRV_CATEGORIES.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
                  </select>
                </div>
              </div>

              {/* Category pills */}
              <div className="cat-pills">
                {SRV_CATEGORIES.map(c => (
                  <button key={c} className={`cat-pill${srvCat === c ? ' active' : ''}`} onClick={() => setSrvCat(c)}>
                    {c !== 'All' && <i className={`fab ${CAT_ICONS[c] ?? 'fa-globe'}`}></i>}
                    {c}
                  </button>
                ))}
              </div>

              {/* Table */}
              <div className="srv-table-wrap">
                <div style={{ overflowX: 'auto' }}>
                  <table className="srv-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Service</th>
                        <th>Rate / 1K</th>
                        <th>Min – Max</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSrv.map(s => (
                        <tr key={s.id}>
                          <td data-label="#"><span className="srv-id">{s.id}</span></td>
                          <td data-label="Service">
                            <div className="srv-cat-tag">
                              <i className={`fab ${CAT_ICONS[s.category] ?? 'fa-globe'}`}></i>
                              {s.category}
                            </div>
                            <div className="srv-name">{s.name}</div>
                            <div className="srv-desc">{s.description}</div>
                          </td>
                          <td data-label="Rate"><span className="srv-price">${s.rate.toFixed(2)}</span></td>
                          <td data-label="Min–Max">
                            <span className="srv-range">{s.min.toLocaleString('en-US')} – {s.max.toLocaleString('en-US')}</span>
                          </td>
                          <td data-label="Action">
                            <button className="srv-btn" onClick={() => selectSrv(s)}>
                              <i className="fas fa-bolt"></i> Order
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredSrv.length === 0 && (
                  <div className="empty-srv">
                    <i className="fas fa-search-minus"></i>
                    <h5>No services found</h5>
                    <p>Try a different keyword or category.</p>
                  </div>
                )}
              </div>

              {/* Order panel */}
              {srvSelected && (
                <div className="order-panel-wrap">
                  <div className="order-panel-head">
                    <h3><i className="fas fa-bolt" style={{ color: '#f97316', marginRight: 8 }}></i>Place Order — {srvSelected.name}</h3>
                    <button className="close-btn" onClick={() => setSrvSelected(null)}>
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <div className="order-panel-body">
                    <div className="order-form-group full">
                      <label>Selected Service</label>
                      <div className="service-display">{srvSelected.name}</div>
                    </div>
                    <div className="order-form-group">
                      <label>Link / URL</label>
                      <input type="url" placeholder="https://…" value={srvLink} onChange={e => setSrvLink(e.target.value)} />
                    </div>
                    <div className="order-form-group">
                      <label>Quantity (min {srvSelected.min.toLocaleString('en-US')} – max {srvSelected.max.toLocaleString('en-US')})</label>
                      <input type="number" value={srvQty} min={srvSelected.min} max={srvSelected.max} onChange={e => setSrvQty(e.target.value)} />
                    </div>
                    <div className="order-form-group full">
                      <label>Total Charge</label>
                      <div className="total-box">
                        <span className="total-label">Amount to pay</span>
                        <span className="total-amount">${srvTotal.toFixed(4)}</span>
                      </div>
                    </div>
                    <button className="submit-btn">
                      <i className="fas fa-shopping-cart"></i>
                      Submit Order
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Other tabs placeholder */}
          {['orders', 'add-funds', 'support', 'api'].includes(activeTab) && (
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


