'use client';

import { useState } from 'react';

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

const STATUS_COLORS: Record<string, string> = {
  'Completed':   'rgba(34,197,94,.15)',
  'In Progress': 'rgba(59,130,246,.15)',
  'Processing':  'rgba(59,130,246,.15)',
  'Pending':     'rgba(234,179,8,.15)',
  'Partial':     'rgba(249,115,22,.15)',
  'Canceled':    'rgba(239,68,68,.15)',
};
const STATUS_TEXT: Record<string, string> = {
  'Completed':   '#22c55e',
  'In Progress': '#60a5fa',
  'Processing':  '#60a5fa',
  'Pending':     '#eab308',
  'Partial':     '#f97316',
  'Canceled':    '#f87171',
};

export default function AllOrderPage() {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = ordersData.filter(order => {
    const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
    const matchesSearch =
      order.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  return (
    <>
      <style>{`
        /* ── filters row ── */
        .ao-filters {
          display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px;
        }
        .ao-search-wrap { position: relative; }
        .ao-search-wrap i {
          position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
          color: #94a3b8; font-size: .85rem; pointer-events: none;
        }
        .ao-search-wrap input {
          width: 100%; background: #0a0f1e; border: 1px solid rgba(255,255,255,.07);
          border-radius: 10px; color: #e2e8f0; padding: 11px 14px 11px 38px;
          font-size: .875rem; font-family: inherit; transition: border-color .2s;
        }
        .ao-search-wrap input:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.15); }

        .ao-status-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .ao-pill {
          padding: 6px 14px; border-radius: 20px; border: 1px solid rgba(255,255,255,.07);
          background: transparent; color: #94a3b8; font-size: .75rem; font-weight: 600;
          cursor: pointer; font-family: inherit; transition: all .2s; white-space: nowrap;
        }
        .ao-pill:hover { border-color: rgba(37,99,235,.4); color: #60a5fa; }
        .ao-pill.active {
          background: linear-gradient(135deg, #2563eb, #f97316);
          border-color: transparent; color: #fff;
          box-shadow: 0 4px 14px rgba(37,99,235,.3);
        }

        /* ── table ── */
        .ao-table-card {
          background: #0d1726; border: 1px solid rgba(255,255,255,.07);
          border-radius: 16px; overflow: hidden;
        }
        .ao-table-scroll { overflow-x: auto; }
        .ao-table { width: 100%; border-collapse: collapse; }
        .ao-table thead { background: linear-gradient(90deg, #1e40af, #7c3aed, #ea580c); }
        .ao-table th {
          padding: 13px 16px; text-align: left; font-size: .7rem; font-weight: 700;
          color: rgba(255,255,255,.9); text-transform: uppercase; letter-spacing: .8px; white-space: nowrap;
        }
        .ao-table tbody tr { border-bottom: 1px solid rgba(255,255,255,.05); transition: background .15s; }
        .ao-table tbody tr:last-child { border-bottom: none; }
        .ao-table tbody tr:hover { background: rgba(37,99,235,.06); }
        .ao-table td { padding: 13px 16px; font-size: .84rem; vertical-align: middle; color: #e2e8f0; }

        .ao-order-id {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 4px 10px; border-radius: 7px;
          background: rgba(37,99,235,.12); color: #60a5fa;
          font-size: .75rem; font-weight: 700; border: 1px solid rgba(37,99,235,.2);
          white-space: nowrap;
        }
        .ao-link-cell a {
          color: #60a5fa; text-decoration: none; font-size: .78rem;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
          display: block; max-width: 200px;
        }
        .ao-link-cell a:hover { text-decoration: underline; }
        .ao-charge { color: #f97316; font-weight: 700; }

        .ao-status-badge {
          display: inline-block; padding: 4px 10px; border-radius: 20px;
          font-size: .72rem; font-weight: 700; white-space: nowrap;
        }
        .ao-action-btn {
          background: rgba(37,99,235,.12); border: 1px solid rgba(37,99,235,.2);
          color: #60a5fa; padding: 6px 10px; border-radius: 8px;
          cursor: pointer; font-size: .82rem; transition: all .2s;
        }
        .ao-action-btn:hover { background: rgba(37,99,235,.25); }

        /* ── pagination ── */
        .ao-pagination {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 16px 20px; border-top: 1px solid rgba(255,255,255,.07);
        }
        .ao-page-btn {
          width: 36px; height: 36px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,.07); background: transparent;
          color: #94a3b8; font-size: .82rem; cursor: pointer; font-family: inherit;
          display: inline-flex; align-items: center; justify-content: center;
          transition: all .2s;
        }
        .ao-page-btn:hover { border-color: rgba(37,99,235,.4); color: #60a5fa; }
        .ao-page-btn.active {
          background: linear-gradient(135deg, #2563eb, #f97316);
          border-color: transparent; color: #fff;
        }

        /* ── empty state ── */
        .ao-empty { text-align: center; padding: 56px 20px; color: #94a3b8; }
        .ao-empty i { font-size: 2.5rem; opacity: .25; display: block; margin-bottom: 14px; }
        .ao-empty h5 { color: #e2e8f0; margin-bottom: 6px; }

        @media (max-width: 768px) {
          .ao-table thead { display: none; }
          .ao-table tbody tr { display: block; border: 1px solid rgba(255,255,255,.07); border-radius: 12px; margin-bottom: 10px; }
          .ao-table td { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,.04); }
          .ao-table td:last-child { border-bottom: none; }
          .ao-table td::before { content: attr(data-label); font-size: .68rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; flex-shrink: 0; }
          .ao-link-cell a { max-width: 140px; }
        }
      `}</style>

      {/* Filters */}
      <div className="ao-filters">
        <div className="ao-search-wrap">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search by Order ID or Service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="ao-status-pills">
          {statusFilters.map(status => (
            <button
              key={status}
              className={`ao-pill${selectedStatus === status ? ' active' : ''}`}
              onClick={() => setSelectedStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="ao-table-card">
        <div className="ao-table-scroll">
          <table className="ao-table">
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
                  <td data-label="Order ID">
                    <span className="ao-order-id">#{order.id}</span>
                  </td>
                  <td data-label="Service">{order.service}</td>
                  <td data-label="Link" className="ao-link-cell">
                    <a href={order.link} target="_blank" rel="noopener noreferrer">
                      {order.link.substring(0, 35)}…
                    </a>
                  </td>
                  <td data-label="Quantity">{order.quantity.toLocaleString('en-US')}</td>
                  <td data-label="Charge" className="ao-charge">${order.charge.toFixed(2)}</td>
                  <td data-label="Status">
                    <span
                      className="ao-status-badge"
                      style={{
                        background: STATUS_COLORS[order.status] ?? 'rgba(255,255,255,.08)',
                        color: STATUS_TEXT[order.status] ?? '#e2e8f0',
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td data-label="Date">{order.date}</td>
                  <td data-label="Action">
                    <button className="ao-action-btn">
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="ao-empty">
            <i className="fas fa-inbox"></i>
            <h5>No orders found</h5>
            <p>Try a different status filter or search term.</p>
          </div>
        )}

        <div className="ao-pagination">
          <button className="ao-page-btn"><i className="fas fa-chevron-left"></i></button>
          <button className="ao-page-btn active">1</button>
          <button className="ao-page-btn">2</button>
          <button className="ao-page-btn">3</button>
          <button className="ao-page-btn"><i className="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </>
  );
}
