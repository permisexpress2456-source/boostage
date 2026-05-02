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
  { id: 1, name: 'Instagram Followers [Real]', rate: 2.50, min: 100, max: 100000, category: 'Instagram' },
  { id: 2, name: 'Instagram Likes [Real HQ]', rate: 0.05, min: 100, max: 50000, category: 'Instagram' },
  { id: 3, name: 'Facebook Page Likes', rate: 3.50, min: 100, max: 50000, category: 'Facebook' },
  { id: 4, name: 'YouTube Subscribers', rate: 5.00, min: 50, max: 10000, category: 'YouTube' },
  { id: 5, name: 'TikTok Followers', rate: 1.20, min: 100, max: 50000, category: 'TikTok' },
];

export default function DripFeedPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [orderLink, setOrderLink] = useState('');
  const [quantityPerRun, setQuantityPerRun] = useState('');
  const [runs, setRuns] = useState('');
  const [interval, setInterval] = useState('60');

  const calculateTotal = () => {
    if (!selectedService || !quantityPerRun || !runs) return 0;
    const totalQuantity = parseInt(quantityPerRun) * parseInt(runs);
    return (selectedService.rate * totalQuantity) / 1000;
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
                  <Link href="/user/new-order">New Order</Link>
                  <Link href="/user/mass-order">Mass Order</Link>
                  <Link href="/user/all-order">All Order</Link>
                  <Link href="/user/refill-order">Refill Order</Link>
                  <Link href="/user/drip-feed" className="active">Drip Feed</Link>
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
            <span className="active">Drip Feed</span>
          </div>

          <div className="drip-feed-container">
            <div className="section-header">
              <h2>Drip Feed Order</h2>
              <p>Deliver your order gradually over time. Perfect for organic growth!</p>
            </div>

            <div className="info-box">
              <i className="fas fa-lightbulb"></i>
              <div>
                <strong>What is Drip Feed?</strong>
                <p>Drip feed allows you to spread your order over multiple runs. For example, instead of ordering 10,000 followers at once, you can receive 1,000 followers every hour for 10 hours. This creates a more natural growth pattern.</p>
              </div>
            </div>

            <div className="drip-feed-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Select Category</label>
                  <select className="form-control">
                    <option>All Categories</option>
                    <option>Instagram</option>
                    <option>Facebook</option>
                    <option>YouTube</option>
                    <option>TikTok</option>
                    <option>Twitter</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Select Service</label>
                  <select 
                    className="form-control"
                    onChange={(e) => {
                      const service = servicesData.find(s => s.id === parseInt(e.target.value));
                      setSelectedService(service || null);
                    }}
                  >
                    <option value="">Choose a service</option>
                    {servicesData.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name} - ${service.rate.toFixed(2)}/1K
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedService && (
                <>
                  <div className="service-info-box">
                    <div className="info-item">
                      <span className="label">Rate:</span>
                      <span className="value">${selectedService.rate.toFixed(2)}/1K</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Min per run:</span>
                      <span className="value">{selectedService.min}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Max per run:</span>
                      <span className="value">{selectedService.max}</span>
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

                  <div className="form-row">
                    <div className="form-group">
                      <label>Quantity per run</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder={`Min: ${selectedService.min}`}
                        value={quantityPerRun}
                        onChange={(e) => setQuantityPerRun(e.target.value)}
                        min={selectedService.min}
                        max={selectedService.max}
                      />
                    </div>
                    <div className="form-group">
                      <label>Number of runs</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="e.g., 10"
                        value={runs}
                        onChange={(e) => setRuns(e.target.value)}
                        min={1}
                        max={100}
                      />
                    </div>
                    <div className="form-group">
                      <label>Interval (minutes)</label>
                      <select 
                        className="form-control"
                        value={interval}
                        onChange={(e) => setInterval(e.target.value)}
                      >
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                        <option value="180">3 hours</option>
                        <option value="360">6 hours</option>
                        <option value="720">12 hours</option>
                        <option value="1440">24 hours</option>
                      </select>
                    </div>
                  </div>

                  <div className="drip-summary">
                    <h4>Order Summary</h4>
                    <div className="summary-item">
                      <span>Total Quantity:</span>
                      <span className="value">{quantityPerRun && runs ? (parseInt(quantityPerRun) * parseInt(runs)).toLocaleString('en-US') : '0'}</span>
                    </div>
                    <div className="summary-item">
                      <span>Total Duration:</span>
                      <span className="value">
                        {quantityPerRun && runs ? `${(parseInt(runs) * parseInt(interval)) / 60} hours` : '0 hours'}
                      </span>
                    </div>
                    <div className="summary-item">
                      <span>Total Charge:</span>
                      <span className="value amount">${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <button className="submit-order-btn">
                    <i className="fas fa-tint"></i>
                    Place Drip Feed Order
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


