'use client';

import { useState } from 'react';

export default function MassOrderPage() {
  const [massOrderText, setMassOrderText] = useState('');

  const orderCount = massOrderText
    ? massOrderText.split('\n').filter(line => line.trim()).length
    : 0;

  return (
    <>
      <style>{`
        /* ── main card ── */
        .mo-card {
          background: #0d1726; border: 1px solid rgba(255,255,255,.07);
          border-radius: 16px; overflow: hidden;
        }
        .mo-card-head {
          padding: 18px 22px; border-bottom: 1px solid rgba(255,255,255,.07);
          background: linear-gradient(90deg, rgba(37,99,235,.1), rgba(249,115,22,.06));
        }
        .mo-card-head h2 { font-size: 1rem; font-weight: 700; color: #f1f5f9; margin: 0 0 3px; }
        .mo-card-head p { font-size: .78rem; color: #94a3b8; margin: 0; }
        .mo-card-body { padding: 22px; display: flex; flex-direction: column; gap: 20px; }

        /* ── format example box ── */
        .mo-format-box {
          background: #0a0f1e; border: 1px solid rgba(255,255,255,.07);
          border-radius: 10px; padding: 16px 18px;
        }
        .mo-format-label {
          font-size: .7rem; font-weight: 700; color: #94a3b8;
          text-transform: uppercase; letter-spacing: .5px; margin-bottom: 10px;
        }
        .mo-format-box code {
          display: block; font-family: 'Courier New', monospace;
          font-size: .8rem; color: #60a5fa; line-height: 1.8;
          padding: 2px 0;
        }

        /* ── form elements ── */
        .mo-group { display: flex; flex-direction: column; gap: 6px; }
        .mo-group label { font-size: .7rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: .5px; }
        .mo-textarea {
          width: 100%; background: #0a0f1e; border: 1px solid rgba(255,255,255,.07);
          border-radius: 10px; color: #e2e8f0; padding: 14px 16px;
          font-size: .875rem; font-family: 'Courier New', monospace;
          resize: vertical; transition: border-color .2s; line-height: 1.7;
        }
        .mo-textarea:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.15); }
        .mo-textarea::placeholder { color: #4b5563; }

        /* ── count display ── */
        .mo-count-row {
          display: flex; align-items: center; justify-content: space-between;
          background: rgba(37,99,235,.07); border: 1px solid rgba(37,99,235,.15);
          border-radius: 10px; padding: 12px 18px;
        }
        .mo-count-label { font-size: .78rem; color: #94a3b8; font-weight: 600; }
        .mo-count-badge {
          display: inline-flex; align-items: center; justify-content: center;
          min-width: 48px; padding: 4px 14px; border-radius: 20px;
          background: linear-gradient(135deg, rgba(37,99,235,.3), rgba(249,115,22,.3));
          border: 1px solid rgba(249,115,22,.25); color: #f97316;
          font-size: .88rem; font-weight: 800;
        }

        /* ── submit button ── */
        .mo-submit-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 13px 24px; background: linear-gradient(135deg, #2563eb, #f97316);
          color: #fff; border: none; border-radius: 10px; font-size: .9rem; font-weight: 700;
          cursor: pointer; font-family: inherit; width: 100%;
          transition: opacity .2s, transform .2s, box-shadow .2s;
        }
        .mo-submit-btn:hover { opacity: .9; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(37,99,235,.35); }
        .mo-submit-btn:disabled { opacity: .4; cursor: not-allowed; transform: none; box-shadow: none; }

        /* ── tips ── */
        .mo-tips {
          display: flex; align-items: flex-start; gap: 12px;
          background: rgba(234,179,8,.06); border: 1px solid rgba(234,179,8,.18);
          border-radius: 10px; padding: 14px 18px;
        }
        .mo-tips i { color: #eab308; font-size: 1rem; margin-top: 1px; flex-shrink: 0; }
        .mo-tips p { font-size: .78rem; color: #94a3b8; margin: 0; line-height: 1.5; }
        .mo-tips p strong { color: #eab308; }
      `}</style>

      <div className="mo-card">
        <div className="mo-card-head">
          <h2>Mass Order</h2>
          <p>Place multiple orders at once. Each line should contain: Service ID | Link | Quantity</p>
        </div>
        <div className="mo-card-body">

          {/* Format example */}
          <div>
            <div className="mo-format-label">Format example</div>
            <div className="mo-format-box">
              <code>12 | https://instagram.com/p/abc123 | 1000</code>
              <code>15 | https://instagram.com/p/def456 | 5000</code>
              <code>20 | https://instagram.com/p/ghi789 | 2000</code>
            </div>
          </div>

          {/* Tips */}
          <div className="mo-tips">
            <i className="fas fa-exclamation-triangle"></i>
            <p>
              <strong>Tip:</strong> Each line must follow the format{' '}
              <code style={{ color: '#eab308', background: 'rgba(234,179,8,.08)', padding: '1px 6px', borderRadius: 4 }}>
                ServiceID | URL | Quantity
              </code>
              . Lines with invalid format will be skipped.
            </p>
          </div>

          {/* Textarea */}
          <div className="mo-group">
            <label>Mass Orders (one per line)</label>
            <textarea
              className="mo-textarea"
              placeholder={"Service ID | Link | Quantity\n12 | https://... | 1000\n15 | https://... | 5000"}
              value={massOrderText}
              onChange={(e) => setMassOrderText(e.target.value)}
              rows={15}
            />
          </div>

          {/* Order count */}
          <div className="mo-count-row">
            <span className="mo-count-label">Total orders detected</span>
            <span className="mo-count-badge">{orderCount}</span>
          </div>

          {/* Submit */}
          <button className="mo-submit-btn" disabled={orderCount === 0}>
            <i className="fas fa-shopping-cart"></i>
            Submit All Orders
          </button>

        </div>
      </div>
    </>
  );
}
