'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Service {
  id: number;
  name: string;
  rate: number;
  min: number;
  max: number;
  category: string;
}

const servicesData: Service[] = [
  { id: 1, name: 'Instagram Likes [Real HQ]', rate: 0.05, min: 100, max: 50000, category: 'Instagram' },
  { id: 2, name: 'Instagram Followers [Real]', rate: 2.50, min: 100, max: 100000, category: 'Instagram' },
  { id: 3, name: 'Facebook Page Likes', rate: 3.50, min: 100, max: 50000, category: 'Facebook' },
  { id: 4, name: 'YouTube Subscribers', rate: 5.00, min: 50, max: 10000, category: 'YouTube' },
  { id: 5, name: 'TikTok Followers', rate: 1.20, min: 100, max: 50000, category: 'TikTok' },
];

const categories = ['All Categories', 'Instagram', 'Facebook', 'YouTube', 'TikTok', 'Twitter'];

export default function NewOrderPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [orderLink, setOrderLink] = useState('');
  const [orderQuantity, setOrderQuantity] = useState('');

  const filteredServices = servicesData.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const calculateTotal = () => {
    if (!selectedService || !orderQuantity) return 0;
    return (selectedService.rate * parseInt(orderQuantity)) / 1000;
  };

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
                  <Link href="/user/new-order" className="active">New Order</Link>
                  <Link href="/user/mass-order">Mass Order</Link>
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
            <span className="active">New Order</span>
          </div>

          <div className="new-order-layout">
            <div className="order-form-section">
              <div className="section-header">
                <h2>New Order</h2>
                <p>Fill in the details below to place your order</p>
              </div>

              <div className="search-filter-bar">
                <div className="search-box">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Search for services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="category-filter">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="services-list">
                {filteredServices.map(service => (
                  <div
                    key={service.id}
                    className={`service-item ${selectedService?.id === service.id ? 'selected' : ''}`}
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="service-info">
                      <h4>{service.name}</h4>
                      <span className="category-tag">{service.category}</span>
                    </div>
                    <div className="service-meta">
                      <span className="rate">${service.rate.toFixed(2)}/1K</span>
                      <span className="range">Min: {service.min} - Max: {service.max}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-panel">
              <div className="order-panel-header">
                <h3>Place Order</h3>
              </div>
              <div className="order-panel-body">
                {!selectedService ? (
                  <div className="no-service-selected">
                    <i className="fas fa-shopping-cart"></i>
                    <p>Select a service to continue</p>
                  </div>
                ) : (
                  <>
                    <div className="form-group">
                      <label>Category</label>
                      <div className="form-display">{selectedService.category}</div>
                    </div>
                    <div className="form-group">
                      <label>Service</label>
                      <div className="form-display">{selectedService.name}</div>
                      <div className="service-details">
                        <span>Rate: ${selectedService.rate.toFixed(2)}/1K</span>
                        <span>Min: {selectedService.min} | Max: {selectedService.max}</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Link</label>
                      <input
                        type="url"
                        className="form-control"
                        placeholder="https://instagram.com/username or post link"
                        value={orderLink}
                        onChange={(e) => setOrderLink(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder={`Min: ${selectedService.min} - Max: ${selectedService.max}`}
                        value={orderQuantity}
                        onChange={(e) => setOrderQuantity(e.target.value)}
                        min={selectedService.min}
                        max={selectedService.max}
                      />
                    </div>
                    <div className="form-group">
                      <label>Total Charge</label>
                      <div className="total-display">
                        <span className="amount">${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                    <button className="submit-order-btn">
                      <i className="fas fa-shopping-cart"></i>
                      Submit Order
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


