'use client';

import { useState } from 'react';

interface Order {
  id: number;
  service: string;
  link: string;
  quantity: number;
  remaining: number;
  status: string;
  date: string;
}

const refillOrders: Order[] = [
  { id: 12345, service: 'Instagram Followers [30 Days]', link: 'https://instagram.com/user', quantity: 1000, remaining: 850, status: 'Active', date: '2026-04-25' },
  { id: 12340, service: 'Instagram Followers [30 Days]', link: 'https://instagram.com/user2', quantity: 500, remaining: 0, status: 'Completed', date: '2026-04-15' },
  { id: 12335, service: 'Instagram Followers [Guaranteed]', link: 'https://instagram.com/user3', quantity: 2000, remaining: 1500, status: 'Active', date: '2026-04-10' },
];

export default function RefillOrderPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [refillQuantity, setRefillQuantity] = useState('');

  return (
    <>
      <style>{`
        /* ── info box ── */
        .ro-info-box {
          display: flex; align-items: flex-start; gap: 14px;
          background: rgba(37,99,235,.08); border: 1px solid rgba(37,99,235,.2);
          border-radius: 12px; padding: 16px 20px; margin-bottom: 20px;
        }
        .ro-info-box i { color: #60a5fa; font-size: 1.1rem; margin-top: 2px; flex-shrink: 0; }
        .ro-info-box strong { font-size: .84rem; color: #f1f5f9; display: block; margin-bottom: 4px; }
        .ro-info-box p { font-size: .8rem; color: #94a3b8; margin: 0; line-height: 1.5; }

        /* ── table ── */
        .ro-table-card {
          background: #0d1726; border: 1px solid rgba(255,255,255,.07);
          border-radius: 16px; overflow: hidden;
        }
        .ro-table-scroll { overflow-x: auto; }
        .ro-table { width: 100%; border-collapse: collapse; }
        .ro-table thead { background: linear-gradient(90deg, #1e40af, #7c3aed, #ea580c); }
        .ro-table th {
          padding: 13px 16px; text-align: left; font-size: .7rem; font-weight: 700;
          color: rgba(255,255,255,.9); text-transform: uppercase; letter-spacing: .8px; white-space: nowrap;
        }
        .ro-table tbody tr { border-bottom: 1px solid rgba(255,255,255,.05); transition: background .15s; }
        .ro-table tbody tr:last-child { border-bottom: none; }
        .ro-table tbody tr:hover { background: rgba(37,99,235,.06); }
        .ro-table td { padding: 13px 16px; font-size: .84rem; vertical-align: middle; color: #e2e8f0; }

        .ro-order-id {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 4px 10px; border-radius: 7px;
          background: rgba(37,99,235,.12); color: #60a5fa;
          font-size: .75rem; font-weight: 700; border: 1px solid rgba(37,99,235,.2);
        }
        .ro-link-cell a {
          color: #60a5fa; text-decoration: none; font-size: .78rem;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
          display: block; max-width: 200px;
        }
        .ro-link-cell a:hover { text-decoration: underline; }

        .ro-remaining-wrap { display: flex; flex-direction: column; gap: 5px; }
        .ro-remaining-count { font-size: .82rem; font-weight: 600; color: #f1f5f9; }
        .ro-bar-track {
          width: 100px; height: 5px; background: rgba(255,255,255,.08);
          border-radius: 4px; overflow: hidden;
        }
        .ro-bar-fill {
          height: 100%; border-radius: 4px;
          background: linear-gradient(90deg, #2563eb, #f97316);
          transition: width .3s;
        }

        .ro-status-badge {
          display: inline-block; padding: 4px 10px; border-radius: 20px;
          font-size: .72rem; font-weight: 700; white-space: nowrap;
        }
        .ro-status-badge.active     { background: rgba(34,197,94,.15);  color: #22c55e; }
        .ro-status-badge.completed  { background: rgba(148,163,184,.1); color: #94a3b8; }

        .ro-refill-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 8px;
          background: linear-gradient(135deg, #2563eb, #f97316);
          color: #fff; border: none; font-size: .78rem; font-weight: 600;
          cursor: pointer; font-family: inherit; white-space: nowrap;
          transition: opacity .2s, transform .2s;
        }
        .ro-refill-btn:hover:not(:disabled) { opacity: .9; transform: translateY(-1px); }
        .ro-refill-btn:disabled { opacity: .4; cursor: not-allowed; }

        /* ── modal ── */
        .ro-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,.65);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000; padding: 20px;
        }
        .ro-modal {
          background: #0d1726; border: 1px solid rgba(255,255,255,.1);
          border-radius: 16px; width: 100%; max-width: 480px;
          box-shadow: 0 24px 64px rgba(0,0,0,.6);
          overflow: hidden;
        }
        .ro-modal-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 22px; border-bottom: 1px solid rgba(255,255,255,.07);
          background: linear-gradient(90deg, rgba(37,99,235,.12), rgba(249,115,22,.08));
        }
        .ro-modal-head h3 { font-size: .95rem; font-weight: 700; color: #f1f5f9; margin: 0; }
        .ro-modal-close {
          background: none; border: 1px solid rgba(255,255,255,.1); border-radius: 8px;
          color: #94a3b8; padding: 6px 10px; cursor: pointer; font-size: .85rem;
          transition: all .2s;
        }
        .ro-modal-close:hover { background: rgba(239,68,68,.1); color: #f87171; border-color: rgba(239,68,68,.3); }
        .ro-modal-body { padding: 22px; display: flex; flex-direction: column; gap: 14px; }
        .ro-modal-foot {
          display: flex; gap: 10px; padding: 16px 22px;
          border-top: 1px solid rgba(255,255,255,.07);
        }

        .ro-form-group { display: flex; flex-direction: column; gap: 6px; }
        .ro-form-group label { font-size: .7rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: .5px; }
        .ro-form-display {
          background: #0a0f1e; border: 1px solid rgba(255,255,255,.07); border-radius: 8px;
          padding: 10px 14px; font-size: .84rem; font-weight: 600; color: #f1f5f9;
        }
        .ro-form-group input {
          background: #0a0f1e; border: 1px solid rgba(255,255,255,.07); border-radius: 8px;
          color: #e2e8f0; padding: 10px 14px; font-size: .875rem; font-family: inherit;
          transition: border-color .2s;
        }
        .ro-form-group input:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.15); }

        .ro-cancel-btn {
          flex: 1; padding: 11px 20px; border-radius: 9px;
          border: 1px solid rgba(255,255,255,.12); background: transparent;
          color: #94a3b8; font-size: .88rem; font-weight: 600;
          cursor: pointer; font-family: inherit; transition: all .2s;
        }
        .ro-cancel-btn:hover { border-color: rgba(255,255,255,.25); color: #e2e8f0; }
        .ro-submit-btn {
          flex: 2; display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 11px 20px; background: linear-gradient(135deg, #2563eb, #f97316);
          color: #fff; border: none; border-radius: 9px; font-size: .88rem; font-weight: 700;
          cursor: pointer; font-family: inherit; transition: opacity .2s, transform .2s;
        }
        .ro-submit-btn:hover { opacity: .9; transform: translateY(-1px); }

        @media (max-width: 768px) {
          .ro-table thead { display: none; }
          .ro-table tbody tr { display: block; border: 1px solid rgba(255,255,255,.07); border-radius: 12px; margin-bottom: 10px; }
          .ro-table td { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,.04); }
          .ro-table td:last-child { border-bottom: none; }
          .ro-table td::before { content: attr(data-label); font-size: .68rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; flex-shrink: 0; }
        }
      `}</style>

      {/* Info box */}
      <div className="ro-info-box">
        <i className="fas fa-info-circle"></i>
        <div>
          <strong>Refill Policy</strong>
          <p>Only orders with guarantee (30 days, 60 days, etc.) are eligible for refill. You can request a refill if your order drops within the guarantee period.</p>
        </div>
      </div>

      {/* Table */}
      <div className="ro-table-card">
        <div className="ro-table-scroll">
          <table className="ro-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Service</th>
                <th>Link</th>
                <th>Quantity</th>
                <th>Remaining</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {refillOrders.map(order => (
                <tr key={order.id}>
                  <td data-label="Order ID">
                    <span className="ro-order-id">#{order.id}</span>
                  </td>
                  <td data-label="Service">{order.service}</td>
                  <td data-label="Link" className="ro-link-cell">
                    <a href={order.link} target="_blank" rel="noopener noreferrer">
                      {order.link.substring(0, 35)}…
                    </a>
                  </td>
                  <td data-label="Quantity">{order.quantity.toLocaleString('en-US')}</td>
                  <td data-label="Remaining">
                    <div className="ro-remaining-wrap">
                      <span className="ro-remaining-count">{order.remaining.toLocaleString('en-US')}</span>
                      <div className="ro-bar-track">
                        <div
                          className="ro-bar-fill"
                          style={{ width: `${(order.remaining / order.quantity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td data-label="Status">
                    <span className={`ro-status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td data-label="Date">{order.date}</td>
                  <td data-label="Action">
                    <button
                      className="ro-refill-btn"
                      onClick={() => { setSelectedOrder(order); setRefillQuantity(''); }}
                      disabled={order.remaining === order.quantity}
                    >
                      <i className="fas fa-sync"></i> Refill
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Refill modal */}
      {selectedOrder && (
        <div className="ro-modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="ro-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ro-modal-head">
              <h3><i className="fas fa-sync" style={{ color: '#f97316', marginRight: 8 }}></i>Request Refill</h3>
              <button className="ro-modal-close" onClick={() => setSelectedOrder(null)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="ro-modal-body">
              <div className="ro-form-group">
                <label>Order ID</label>
                <div className="ro-form-display">#{selectedOrder.id}</div>
              </div>
              <div className="ro-form-group">
                <label>Service</label>
                <div className="ro-form-display">{selectedOrder.service}</div>
              </div>
              <div className="ro-form-group">
                <label>Original Quantity</label>
                <div className="ro-form-display">{selectedOrder.quantity.toLocaleString('en-US')}</div>
              </div>
              <div className="ro-form-group">
                <label>Current Count</label>
                <div className="ro-form-display">{selectedOrder.remaining.toLocaleString('en-US')}</div>
              </div>
              <div className="ro-form-group">
                <label>Refill Quantity</label>
                <input
                  type="number"
                  placeholder={`Max: ${selectedOrder.quantity - selectedOrder.remaining}`}
                  value={refillQuantity}
                  onChange={(e) => setRefillQuantity(e.target.value)}
                  max={selectedOrder.quantity - selectedOrder.remaining}
                />
              </div>
            </div>
            <div className="ro-modal-foot">
              <button className="ro-cancel-btn" onClick={() => setSelectedOrder(null)}>Cancel</button>
              <button className="ro-submit-btn">
                <i className="fas fa-sync"></i> Submit Refill Request
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
