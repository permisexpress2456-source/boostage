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

  const totalQty = quantityPerRun && runs
    ? (parseInt(quantityPerRun) * parseInt(runs)).toLocaleString('en-US')
    : '0';
  const totalDuration = quantityPerRun && runs
    ? `${(parseInt(runs) * parseInt(interval)) / 60} hours`
    : '0 hours';

  return (
    <>
      <style>{`
        /* ── info box ── */
        .df-info-box {
          display: flex; align-items: flex-start; gap: 14px;
          background: rgba(249,115,22,.07); border: 1px solid rgba(249,115,22,.2);
          border-radius: 12px; padding: 16px 20px; margin-bottom: 24px;
        }
        .df-info-box i { color: #f97316; font-size: 1.1rem; margin-top: 2px; flex-shrink: 0; }
        .df-info-box strong { font-size: .84rem; color: #f1f5f9; display: block; margin-bottom: 4px; }
        .df-info-box p { font-size: .8rem; color: #94a3b8; margin: 0; line-height: 1.5; }

        /* ── form card ── */
        .df-card {
          background: #0d1726; border: 1px solid rgba(255,255,255,.07);
          border-radius: 16px; overflow: hidden;
        }
        .df-card-head {
          padding: 18px 22px; border-bottom: 1px solid rgba(255,255,255,.07);
          background: linear-gradient(90deg, rgba(37,99,235,.1), rgba(249,115,22,.06));
        }
        .df-card-head h2 { font-size: 1rem; font-weight: 700; color: #f1f5f9; margin: 0 0 3px; }
        .df-card-head p { font-size: .78rem; color: #94a3b8; margin: 0; }
        .df-card-body { padding: 22px; display: flex; flex-direction: column; gap: 18px; }

        /* ── form elements ── */
        .df-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .df-row-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
        .df-group { display: flex; flex-direction: column; gap: 6px; }
        .df-group label { font-size: .7rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: .5px; }
        .df-group input,
        .df-group select {
          background: #0a0f1e; border: 1px solid rgba(255,255,255,.07); border-radius: 8px;
          color: #e2e8f0; padding: 10px 14px; font-size: .875rem; font-family: inherit;
          transition: border-color .2s; appearance: none; -webkit-appearance: none;
        }
        .df-group input:focus,
        .df-group select:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.15); }

        /* ── service info strip ── */
        .df-service-strip {
          display: flex; gap: 20px; flex-wrap: wrap;
          background: rgba(37,99,235,.08); border: 1px solid rgba(37,99,235,.15);
          border-radius: 10px; padding: 14px 18px;
        }
        .df-strip-item { display: flex; flex-direction: column; gap: 3px; }
        .df-strip-label { font-size: .66rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: .4px; }
        .df-strip-value { font-size: .88rem; font-weight: 700; color: #60a5fa; }

        /* ── summary box ── */
        .df-summary {
          background: rgba(249,115,22,.05); border: 1px solid rgba(249,115,22,.18);
          border-radius: 12px; padding: 18px 20px;
        }
        .df-summary h4 { font-size: .84rem; font-weight: 700; color: #f1f5f9; margin: 0 0 12px; }
        .df-summary-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 7px 0; border-bottom: 1px solid rgba(255,255,255,.05);
        }
        .df-summary-row:last-child { border-bottom: none; }
        .df-summary-key { font-size: .78rem; color: #94a3b8; }
        .df-summary-val { font-size: .84rem; font-weight: 700; color: #e2e8f0; }
        .df-summary-val.amount { font-size: 1.1rem; color: #f97316; }

        /* ── submit button ── */
        .df-submit-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 13px 24px; background: linear-gradient(135deg, #2563eb, #f97316);
          color: #fff; border: none; border-radius: 10px; font-size: .9rem; font-weight: 700;
          cursor: pointer; font-family: inherit; width: 100%;
          transition: opacity .2s, transform .2s, box-shadow .2s;
        }
        .df-submit-btn:hover { opacity: .9; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(37,99,235,.35); }

        @media (max-width: 768px) {
          .df-row { grid-template-columns: 1fr; }
          .df-row-3 { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Info box */}
      <div className="df-info-box">
        <i className="fas fa-lightbulb"></i>
        <div>
          <strong>What is Drip Feed?</strong>
          <p>Drip feed allows you to spread your order over multiple runs. For example, instead of ordering 10,000 followers at once, you can receive 1,000 followers every hour for 10 hours. This creates a more natural growth pattern.</p>
        </div>
      </div>

      {/* Form card */}
      <div className="df-card">
        <div className="df-card-head">
          <h2>Drip Feed Order</h2>
          <p>Deliver your order gradually over time. Perfect for organic growth!</p>
        </div>
        <div className="df-card-body">

          {/* Category + Service selects */}
          <div className="df-row">
            <div className="df-group">
              <label>Select Category</label>
              <select>
                <option>All Categories</option>
                <option>Instagram</option>
                <option>Facebook</option>
                <option>YouTube</option>
                <option>TikTok</option>
                <option>Twitter</option>
              </select>
            </div>
            <div className="df-group">
              <label>Select Service</label>
              <select
                onChange={(e) => {
                  const service = servicesData.find(s => s.id === parseInt(e.target.value));
                  setSelectedService(service || null);
                }}
              >
                <option value="">Choose a service</option>
                {servicesData.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name} — ${service.rate.toFixed(2)}/1K
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Service info strip (only when selected) */}
          {selectedService && (
            <>
              <div className="df-service-strip">
                <div className="df-strip-item">
                  <span className="df-strip-label">Rate</span>
                  <span className="df-strip-value">${selectedService.rate.toFixed(2)}/1K</span>
                </div>
                <div className="df-strip-item">
                  <span className="df-strip-label">Min per run</span>
                  <span className="df-strip-value">{selectedService.min.toLocaleString('en-US')}</span>
                </div>
                <div className="df-strip-item">
                  <span className="df-strip-label">Max per run</span>
                  <span className="df-strip-value">{selectedService.max.toLocaleString('en-US')}</span>
                </div>
              </div>

              <div className="df-group">
                <label>Link</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={orderLink}
                  onChange={(e) => setOrderLink(e.target.value)}
                />
              </div>

              <div className="df-row-3">
                <div className="df-group">
                  <label>Quantity per run</label>
                  <input
                    type="number"
                    placeholder={`Min: ${selectedService.min}`}
                    value={quantityPerRun}
                    onChange={(e) => setQuantityPerRun(e.target.value)}
                    min={selectedService.min}
                    max={selectedService.max}
                  />
                </div>
                <div className="df-group">
                  <label>Number of runs</label>
                  <input
                    type="number"
                    placeholder="e.g., 10"
                    value={runs}
                    onChange={(e) => setRuns(e.target.value)}
                    min={1}
                    max={100}
                  />
                </div>
                <div className="df-group">
                  <label>Interval</label>
                  <select
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

              {/* Summary */}
              <div className="df-summary">
                <h4>Order Summary</h4>
                <div className="df-summary-row">
                  <span className="df-summary-key">Total Quantity</span>
                  <span className="df-summary-val">{totalQty}</span>
                </div>
                <div className="df-summary-row">
                  <span className="df-summary-key">Total Duration</span>
                  <span className="df-summary-val">{totalDuration}</span>
                </div>
                <div className="df-summary-row">
                  <span className="df-summary-key">Total Charge</span>
                  <span className="df-summary-val amount">${calculateTotal().toFixed(4)}</span>
                </div>
              </div>

              <button className="df-submit-btn">
                <i className="fas fa-tint"></i>
                Place Drip Feed Order
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
