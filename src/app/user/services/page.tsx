'use client';

import { useState } from 'react';

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

const CATEGORIES = ['All', 'Instagram', 'Facebook', 'YouTube', 'TikTok', 'Twitter', 'Telegram'];

const CAT_ICONS: Record<string, string> = {
  Instagram: 'fa-instagram', Facebook: 'fa-facebook-f',
  YouTube: 'fa-youtube', TikTok: 'fa-tiktok',
  Twitter: 'fa-twitter', Telegram: 'fa-telegram',
};

export default function UserServicesPage() {
  const [search, setSearch]       = useState('');
  const [cat, setCat]             = useState('All');
  const [selected, setSelected]   = useState<Service | null>(null);
  const [link, setLink]           = useState('');
  const [qty, setQty]             = useState('');

  const filtered = servicesData.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) &&
    (cat === 'All' || s.category === cat)
  );

  const total = selected && qty
    ? (selected.rate * parseInt(qty || '0')) / 1000
    : 0;

  const select = (s: Service) => { setSelected(s); setQty(String(s.min)); };

  return (
    <>
      <style>{`
        /* ── search bar ── */
        .srv-search {
          display: grid;
          grid-template-columns: 1fr 220px;
          gap: 12px;
          margin-bottom: 20px;
        }
        .srv-input-wrap { position: relative; }
        .srv-input-wrap i { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); color: #94a3b8; font-size: .85rem; pointer-events: none; }
        .srv-input-wrap input,
        .srv-input-wrap select {
          width: 100%; background: #0a0f1e; border: 1px solid rgba(255,255,255,.07);
          border-radius: 10px; color: #e2e8f0; padding: 11px 14px 11px 38px;
          font-size: .875rem; font-family: inherit; transition: border-color .2s;
          appearance: none; -webkit-appearance: none;
        }
        .srv-input-wrap input:focus, .srv-input-wrap select:focus {
          outline: none; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.15);
        }

        /* ── category pills ── */
        .cat-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
        .cat-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 16px; border-radius: 20px; border: 1px solid rgba(255,255,255,.07);
          background: transparent; color: #94a3b8; font-size: .78rem; font-weight: 600;
          cursor: pointer; font-family: inherit; transition: all .2s; white-space: nowrap;
        }
        .cat-pill:hover { border-color: rgba(249,115,22,.4); color: #f97316; }
        .cat-pill.active {
          background: linear-gradient(135deg, #2563eb, #f97316);
          border-color: transparent; color: #fff;
          box-shadow: 0 4px 14px rgba(37,99,235,.3);
        }

        /* ── services table ── */
        .srv-table-wrap {
          background: #0d1726; border: 1px solid rgba(255,255,255,.07);
          border-radius: 16px; overflow: hidden;
        }
        .srv-table { width: 100%; border-collapse: collapse; }
        .srv-table thead { background: linear-gradient(90deg, #1e40af, #7c3aed, #ea580c); }
        .srv-table th {
          padding: 13px 16px; text-align: left; font-size: .7rem; font-weight: 700;
          color: rgba(255,255,255,.9); text-transform: uppercase; letter-spacing: .8px; white-space: nowrap;
        }
        .srv-table tbody tr { border-bottom: 1px solid rgba(255,255,255,.05); transition: background .15s; }
        .srv-table tbody tr:last-child { border-bottom: none; }
        .srv-table tbody tr:hover { background: rgba(37,99,235,.06); }
        .srv-table td { padding: 13px 16px; font-size: .84rem; vertical-align: middle; color: #e2e8f0; }

        .srv-id {
          display: inline-flex; align-items: center; justify-content: center;
          width: 34px; height: 34px; border-radius: 9px;
          background: rgba(37,99,235,.12); color: #60a5fa;
          font-size: .72rem; font-weight: 700;
          border: 1px solid rgba(37,99,235,.2);
        }
        .srv-cat-tag {
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(249,115,22,.1); border: 1px solid rgba(249,115,22,.2);
          color: #f97316; font-size: .68rem; font-weight: 700;
          padding: 2px 8px; border-radius: 4px; text-transform: uppercase;
          letter-spacing: .4px; margin-bottom: 3px;
        }
        .srv-name { font-weight: 600; color: #f1f5f9; font-size: .84rem; }
        .srv-desc { font-size: .75rem; color: #94a3b8; margin-top: 2px; }
        .srv-price {
          display: inline-block; padding: 5px 12px; border-radius: 8px;
          background: linear-gradient(135deg, rgba(37,99,235,.18), rgba(249,115,22,.18));
          border: 1px solid rgba(249,115,22,.22); color: #f97316;
          font-size: .82rem; font-weight: 700; white-space: nowrap;
        }
        .srv-range { font-size: .8rem; color: #94a3b8; white-space: nowrap; }
        .srv-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 16px; border-radius: 8px;
          background: linear-gradient(135deg, #2563eb, #f97316);
          color: #fff; border: none; font-size: .78rem; font-weight: 600;
          cursor: pointer; font-family: inherit; white-space: nowrap;
          transition: opacity .2s, transform .2s, box-shadow .2s;
        }
        .srv-btn:hover { opacity: .9; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(249,115,22,.35); }

        /* ── order panel (slide-up card) ── */
        .order-panel-wrap {
          margin-top: 24px;
          background: #0d1726; border: 1px solid rgba(249,115,22,.25);
          border-radius: 16px; overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,.4);
        }
        .order-panel-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,.07);
          background: linear-gradient(90deg, rgba(37,99,235,.12), rgba(249,115,22,.08));
        }
        .order-panel-head h3 { font-size: .95rem; font-weight: 700; color: #f1f5f9; margin: 0; }
        .close-btn {
          background: none; border: 1px solid rgba(255,255,255,.1); border-radius: 8px;
          color: #94a3b8; padding: 6px 10px; cursor: pointer; font-size: .85rem;
          transition: all .2s;
        }
        .close-btn:hover { background: rgba(239,68,68,.1); color: #f87171; border-color: rgba(239,68,68,.3); }
        .order-panel-body { padding: 22px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .order-form-group { display: flex; flex-direction: column; gap: 6px; }
        .order-form-group.full { grid-column: 1 / -1; }
        .order-form-group label { font-size: .72rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: .5px; }
        .order-form-group input {
          background: #0a0f1e; border: 1px solid rgba(255,255,255,.07); border-radius: 8px;
          color: #e2e8f0; padding: 10px 14px; font-size: .88rem; font-family: inherit;
          transition: border-color .2s;
        }
        .order-form-group input:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.15); }
        .service-display {
          background: #0a0f1e; border: 1px solid rgba(255,255,255,.07); border-radius: 8px;
          padding: 10px 14px; font-size: .84rem; font-weight: 600; color: #f1f5f9;
        }
        .total-box {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 16px; border: 2px solid rgba(249,115,22,.25); border-radius: 10px;
          background: rgba(249,115,22,.05);
        }
        .total-label { font-size: .75rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; }
        .total-amount { font-size: 1.3rem; font-weight: 800; color: #f97316; }
        .submit-btn {
          grid-column: 1 / -1;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 13px 24px; background: linear-gradient(135deg, #2563eb, #f97316);
          color: #fff; border: none; border-radius: 10px; font-size: .9rem; font-weight: 700;
          cursor: pointer; font-family: inherit; transition: opacity .2s, transform .2s, box-shadow .2s;
          width: 100%;
        }
        .submit-btn:hover { opacity: .9; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(37,99,235,.35); }

        /* empty state */
        .empty-srv { text-align: center; padding: 56px 20px; color: #94a3b8; }
        .empty-srv i { font-size: 2.5rem; opacity: .25; display: block; margin-bottom: 14px; }
        .empty-srv h5 { color: #e2e8f0; margin-bottom: 6px; }

        @media (max-width: 768px) {
          .srv-search { grid-template-columns: 1fr; }
          .order-panel-body { grid-template-columns: 1fr; }
          .order-form-group.full { grid-column: 1; }
          .submit-btn { grid-column: 1; }
          /* mobile table cards */
          .srv-table thead { display: none; }
          .srv-table tbody tr { display: block; border: 1px solid rgba(255,255,255,.07); border-radius: 12px; margin-bottom: 10px; padding: 4px 0; }
          .srv-table td { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,.04); font-size: .82rem; }
          .srv-table td:last-child { border-bottom: none; }
          .srv-table td::before { content: attr(data-label); font-size: .68rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; flex-shrink: 0; }
        }
      `}</style>

      {/* Search */}
      <div className="srv-search">
        <div className="srv-input-wrap">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search services…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="srv-input-wrap">
          <i className="fas fa-layer-group"></i>
          <select value={cat} onChange={e => setCat(e.target.value)}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
          </select>
        </div>
      </div>

      {/* Category pills */}
      <div className="cat-pills">
        {CATEGORIES.map(c => (
          <button key={c} className={`cat-pill${cat === c ? ' active' : ''}`} onClick={() => setCat(c)}>
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
              {filtered.map(s => (
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
                    <button className="srv-btn" onClick={() => select(s)}>
                      <i className="fas fa-bolt"></i> Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="empty-srv">
            <i className="fas fa-search-minus"></i>
            <h5>No services found</h5>
            <p>Try a different keyword or category.</p>
          </div>
        )}
      </div>

      {/* Order panel */}
      {selected && (
        <div className="order-panel-wrap">
          <div className="order-panel-head">
            <h3><i className="fas fa-bolt" style={{ color: '#f97316', marginRight: 8 }}></i>Place Order — {selected.name}</h3>
            <button className="close-btn" onClick={() => setSelected(null)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="order-panel-body">
            <div className="order-form-group full">
              <label>Selected Service</label>
              <div className="service-display">{selected.name}</div>
            </div>
            <div className="order-form-group">
              <label>Link / URL</label>
              <input type="url" placeholder="https://…" value={link} onChange={e => setLink(e.target.value)} />
            </div>
            <div className="order-form-group">
              <label>Quantity (min {selected.min.toLocaleString('en-US')} – max {selected.max.toLocaleString('en-US')})</label>
              <input
                type="number"
                value={qty}
                min={selected.min}
                max={selected.max}
                onChange={e => setQty(e.target.value)}
              />
            </div>
            <div className="order-form-group full">
              <label>Total Charge</label>
              <div className="total-box">
                <span className="total-label">Amount to pay</span>
                <span className="total-amount">${total.toFixed(4)}</span>
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
  );
}
