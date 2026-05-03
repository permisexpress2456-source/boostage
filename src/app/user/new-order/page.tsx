'use client';

import { useState } from 'react';

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
    <>
      <style>{`
        /* ── layout ── */
        .no-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 24px;
          align-items: flex-start;
        }

        /* ── search / filter bar ── */
        .no-search-bar {
          display: grid;
          grid-template-columns: 1fr 200px;
          gap: 12px;
          margin-bottom: 16px;
        }
        .no-input-wrap { position: relative; }
        .no-input-wrap i {
          position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
          color: #94a3b8; font-size: .85rem; pointer-events: none;
        }
        .no-input-wrap input,
        .no-input-wrap select {
          width: 100%; background: #0a0f1e; border: 1px solid rgba(255,255,255,.07);
          border-radius: 10px; color: #e2e8f0; padding: 11px 14px 11px 38px;
          font-size: .875rem; font-family: inherit; transition: border-color .2s;
          appearance: none; -webkit-appearance: none;
        }
        .no-input-wrap input:focus,
        .no-input-wrap select:focus {
          outline: none; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.15);
        }

        /* ── services list card ── */
        .no-services-card {
          background: #0d1726; border: 1px solid rgba(255,255,255,.07);
          border-radius: 16px; overflow: hidden;
        }
        .no-card-head {
          padding: 18px 20px; border-bottom: 1px solid rgba(255,255,255,.07);
          background: linear-gradient(90deg, rgba(37,99,235,.1), rgba(249,115,22,.06));
        }
        .no-card-head h2 { font-size: 1rem; font-weight: 700; color: #f1f5f9; margin: 0 0 3px; }
        .no-card-head p { font-size: .78rem; color: #94a3b8; margin: 0; }

        .no-service-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 20px; border-bottom: 1px solid rgba(255,255,255,.05);
          cursor: pointer; transition: background .15s;
        }
        .no-service-item:last-child { border-bottom: none; }
        .no-service-item:hover { background: rgba(37,99,235,.06); }
        .no-service-item.selected { background: rgba(37,99,235,.12); border-left: 3px solid #2563eb; }
        .no-service-name { font-size: .84rem; font-weight: 600; color: #f1f5f9; margin-bottom: 4px; }
        .no-cat-tag {
          display: inline-flex; align-items: center;
          background: rgba(249,115,22,.1); border: 1px solid rgba(249,115,22,.2);
          color: #f97316; font-size: .68rem; font-weight: 700;
          padding: 2px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: .4px;
        }
        .no-service-meta { text-align: right; }
        .no-rate {
          display: inline-block; padding: 4px 10px; border-radius: 7px;
          background: linear-gradient(135deg, rgba(37,99,235,.18), rgba(249,115,22,.18));
          border: 1px solid rgba(249,115,22,.22); color: #f97316;
          font-size: .78rem; font-weight: 700; white-space: nowrap; margin-bottom: 4px;
        }
        .no-range { font-size: .72rem; color: #94a3b8; white-space: nowrap; }

        /* ── order panel card ── */
        .no-panel-card {
          background: #0d1726; border: 1px solid rgba(249,115,22,.22);
          border-radius: 16px; overflow: hidden; position: sticky; top: 24px;
          box-shadow: 0 20px 60px rgba(0,0,0,.4);
        }
        .no-panel-head {
          padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,.07);
          background: linear-gradient(90deg, rgba(37,99,235,.12), rgba(249,115,22,.08));
        }
        .no-panel-head h3 { font-size: .95rem; font-weight: 700; color: #f1f5f9; margin: 0; }
        .no-panel-body { padding: 20px; display: flex; flex-direction: column; gap: 16px; }

        .no-empty-state { text-align: center; padding: 40px 20px; color: #94a3b8; }
        .no-empty-state i { font-size: 2rem; opacity: .25; display: block; margin-bottom: 12px; }
        .no-empty-state p { font-size: .84rem; }

        .no-form-group { display: flex; flex-direction: column; gap: 6px; }
        .no-form-group label { font-size: .7rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: .5px; }
        .no-form-display {
          background: #0a0f1e; border: 1px solid rgba(255,255,255,.07); border-radius: 8px;
          padding: 10px 14px; font-size: .84rem; font-weight: 600; color: #f1f5f9;
        }
        .no-service-details {
          display: flex; gap: 10px; flex-wrap: wrap; margin-top: 6px;
        }
        .no-service-details span { font-size: .72rem; color: #94a3b8; }
        .no-form-group input {
          background: #0a0f1e; border: 1px solid rgba(255,255,255,.07); border-radius: 8px;
          color: #e2e8f0; padding: 10px 14px; font-size: .875rem; font-family: inherit;
          transition: border-color .2s;
        }
        .no-form-group input:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.15); }

        .no-total-box {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 16px; border: 2px solid rgba(249,115,22,.25); border-radius: 10px;
          background: rgba(249,115,22,.05);
        }
        .no-total-label { font-size: .72rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; }
        .no-total-amount { font-size: 1.3rem; font-weight: 800; color: #f97316; }

        .no-submit-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 13px 24px; background: linear-gradient(135deg, #2563eb, #f97316);
          color: #fff; border: none; border-radius: 10px; font-size: .9rem; font-weight: 700;
          cursor: pointer; font-family: inherit; width: 100%;
          transition: opacity .2s, transform .2s, box-shadow .2s;
        }
        .no-submit-btn:hover { opacity: .9; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(37,99,235,.35); }

        @media (max-width: 900px) {
          .no-layout { grid-template-columns: 1fr; }
          .no-panel-card { position: static; }
          .no-search-bar { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="no-layout">
        {/* Left — service picker */}
        <div className="no-services-card">
          <div className="no-card-head">
            <h2>New Order</h2>
            <p>Fill in the details below to place your order</p>
          </div>

          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
            <div className="no-search-bar">
              <div className="no-input-wrap">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Search for services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="no-input-wrap">
                <i className="fas fa-layer-group"></i>
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
          </div>

          <div>
            {filteredServices.map(service => (
              <div
                key={service.id}
                className={`no-service-item${selectedService?.id === service.id ? ' selected' : ''}`}
                onClick={() => setSelectedService(service)}
              >
                <div>
                  <div className="no-service-name">{service.name}</div>
                  <span className="no-cat-tag">{service.category}</span>
                </div>
                <div className="no-service-meta">
                  <div className="no-rate">${service.rate.toFixed(2)}/1K</div>
                  <div className="no-range">Min: {service.min.toLocaleString('en-US')} · Max: {service.max.toLocaleString('en-US')}</div>
                </div>
              </div>
            ))}
            {filteredServices.length === 0 && (
              <div className="no-empty-state">
                <i className="fas fa-search-minus"></i>
                <p>No services match your search.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right — order panel */}
        <div className="no-panel-card">
          <div className="no-panel-head">
            <h3><i className="fas fa-shopping-cart" style={{ color: '#f97316', marginRight: 8 }}></i>Place Order</h3>
          </div>
          <div className="no-panel-body">
            {!selectedService ? (
              <div className="no-empty-state">
                <i className="fas fa-hand-pointer"></i>
                <p>Select a service from the list to continue</p>
              </div>
            ) : (
              <>
                <div className="no-form-group">
                  <label>Category</label>
                  <div className="no-form-display">{selectedService.category}</div>
                </div>
                <div className="no-form-group">
                  <label>Service</label>
                  <div className="no-form-display">{selectedService.name}</div>
                  <div className="no-service-details">
                    <span>Rate: ${selectedService.rate.toFixed(2)}/1K</span>
                    <span>Min: {selectedService.min} | Max: {selectedService.max}</span>
                  </div>
                </div>
                <div className="no-form-group">
                  <label>Link</label>
                  <input
                    type="url"
                    placeholder="https://instagram.com/username or post link"
                    value={orderLink}
                    onChange={(e) => setOrderLink(e.target.value)}
                  />
                </div>
                <div className="no-form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    placeholder={`Min: ${selectedService.min} – Max: ${selectedService.max}`}
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(e.target.value)}
                    min={selectedService.min}
                    max={selectedService.max}
                  />
                </div>
                <div className="no-form-group">
                  <label>Total Charge</label>
                  <div className="no-total-box">
                    <span className="no-total-label">Amount to pay</span>
                    <span className="no-total-amount">${calculateTotal().toFixed(4)}</span>
                  </div>
                </div>
                <button className="no-submit-btn">
                  <i className="fas fa-shopping-cart"></i>
                  Submit Order
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
