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
  description: string;
}

const servicesData: Service[] = [
  { id: 1, name: 'Instagram Likes [Real HQ]', rate: 0.05, min: 100, max: 50000, category: 'Instagram Likes', description: 'High quality real likes' },
  { id: 2, name: 'Instagram Followers [Real]', rate: 2.50, min: 100, max: 100000, category: 'Instagram Followers', description: 'Real active followers' },
  { id: 3, name: 'Facebook Page Likes', rate: 3.50, min: 100, max: 50000, category: 'Facebook', description: 'Page likes from real users' },
  { id: 4, name: 'YouTube Subscribers', rate: 5.00, min: 50, max: 10000, category: 'YouTube', description: 'Real YouTube subscribers' },
  { id: 5, name: 'TikTok Followers', rate: 1.20, min: 100, max: 50000, category: 'TikTok', description: 'Fast delivery followers' },
  { id: 6, name: 'Twitter Followers', rate: 2.00, min: 100, max: 20000, category: 'Twitter', description: 'Real Twitter followers' },
  { id: 7, name: 'Instagram Views', rate: 0.02, min: 1000, max: 1000000, category: 'Instagram Views', description: 'Instant views delivery' },
  { id: 8, name: 'Instagram Comments', rate: 5.00, min: 10, max: 1000, category: 'Instagram Comments', description: 'Custom comments' },
  { id: 9, name: 'Facebook Post Likes', rate: 1.50, min: 100, max: 20000, category: 'Facebook', description: 'Post likes with emoji' },
  { id: 10, name: 'YouTube Views', rate: 3.00, min: 500, max: 100000, category: 'YouTube', description: 'High retention views' },
];

const categories = [
  'All Categories',
  'Instagram Likes',
  'Instagram Followers',
  'Instagram Views',
  'Instagram Comments',
  'Facebook',
  'YouTube',
  'TikTok',
  'Twitter',
];

export default function UserServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [orderLink, setOrderLink] = useState('');
  const [orderQuantity, setOrderQuantity] = useState('');

  const filteredServices = servicesData.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || service.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setOrderQuantity(service.min.toString());
  };

  const calculateTotal = () => {
    if (!selectedService || !orderQuantity) return 0;
    return (selectedService.rate * parseInt(orderQuantity)) / 1000;
  };

  return (
    <div className="user-services-page">
      {/* Top Navigation */}
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
                  <Link href="/user/mass-order">Mass Order</Link>
                  <Link href="/user/all-order">All Order</Link>
                  <Link href="/user/refill-order">Refill Order</Link>
                  <Link href="/user/drip-feed">Drip Feed</Link>
                </div>
              </li>
              <li><Link href="/user/services" className="active">Services</Link></li>
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

      {/* Main Content */}
      <main className="user-services-content">
        <div className="container">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link href="/dashboard">Home</Link>
            <span className="separator">/</span>
            <span className="active">Services</span>
          </div>

          {/* Search & Filter */}
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

          {/* Services Grid */}
          <div className="services-grid">
            {filteredServices.map(service => (
              <div
                key={service.id}
                className={`service-card ${selectedService?.id === service.id ? 'selected' : ''}`}
                onClick={() => handleServiceSelect(service)}
              >
                <div className="service-header">
                  <h4>{service.name}</h4>
                  <span className="category-tag">{service.category}</span>
                </div>
                <div className="service-body">
                  <div className="service-detail">
                    <span className="label">Rate:</span>
                    <span className="value rate">${service.rate.toFixed(2)}/1K</span>
                  </div>
                  <div className="service-detail">
                    <span className="label">Min:</span>
                    <span className="value">{service.min.toLocaleString()}</span>
                  </div>
                  <div className="service-detail">
                    <span className="label">Max:</span>
                    <span className="value">{service.max.toLocaleString()}</span>
                  </div>
                  <p className="service-description">{service.description}</p>
                </div>
                <button className="select-btn">
                  <i className="fas fa-plus"></i> Select
                </button>
              </div>
            ))}
          </div>

          {/* Order Panel */}
          {selectedService && (
            <div className="order-panel">
              <div className="order-panel-header">
                <h3>Place Order</h3>
                <button className="close-panel" onClick={() => setSelectedService(null)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="order-panel-body">
                <div className="form-group">
                  <label>Service</label>
                  <div className="service-display">
                    {selectedService.name}
                  </div>
                </div>
                <div className="form-group">
                  <label>Link</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://..."
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
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


