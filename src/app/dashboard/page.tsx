'use client';

import './dashboard.css';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  getServices, getBalance, placeOrder, getOrderStatus, requestRefill,
  hasApiKey, saveApiKey, removeApiKey, KamiboostService, KamiboostBalanceResponse 
} from '@/lib/kamiboost-api';

/* ── Types ─────────────────────────────────────────── */
interface Order {
  id: number; service: string; link: string;
  quantity: number; charge: number; status: string; date: string;
}
interface RefillOrder {
  id: number; service: string; link: string;
  quantity: number; remaining: number; status: string; date: string;
}
interface FullService {
  id: number; name: string; rate: number;
  min: number; max: number; category: string; description: string;
}

/* ── Mock Data (fallback) ─────────────────────────── */
const MOCK_SERVICES: FullService[] = [
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

const allOrders: Order[] = [
  { id: 12345, service: 'Instagram Followers [Real]',  link: 'https://instagram.com/user1',      quantity: 1000,  charge: 2.50,  status: 'Completed',   date: '2026-04-25' },
  { id: 12344, service: 'Facebook Page Likes',         link: 'https://facebook.com/page',         quantity: 500,   charge: 1.75,  status: 'In Progress', date: '2026-04-24' },
  { id: 12343, service: 'YouTube Views [HQ]',          link: 'https://youtube.com/watch?v=abc',   quantity: 5000,  charge: 15.00, status: 'Pending',     date: '2026-04-24' },
  { id: 12342, service: 'TikTok Followers',            link: 'https://tiktok.com/@user',          quantity: 2000,  charge: 2.40,  status: 'Completed',   date: '2026-04-23' },
  { id: 12341, service: 'Twitter/X Followers',         link: 'https://twitter.com/user',          quantity: 300,   charge: 0.60,  status: 'Completed',   date: '2026-04-22' },
  { id: 12340, service: 'Instagram Likes [Real HQ]',   link: 'https://instagram.com/p/abc',       quantity: 5000,  charge: 0.25,  status: 'Processing',  date: '2026-04-22' },
  { id: 12339, service: 'YouTube Subscribers',         link: 'https://youtube.com/@channel',      quantity: 100,   charge: 0.50,  status: 'Partial',     date: '2026-04-21' },
  { id: 12338, service: 'Telegram Members',            link: 'https://t.me/channel',              quantity: 1000,  charge: 1.80,  status: 'Canceled',    date: '2026-04-20' },
  { id: 12337, service: 'Instagram Views [Instant]',   link: 'https://instagram.com/p/xyz',       quantity: 10000, charge: 0.20,  status: 'Completed',   date: '2026-04-19' },
  { id: 12336, service: 'Facebook Post Likes',         link: 'https://facebook.com/post',         quantity: 200,   charge: 0.30,  status: 'Completed',   date: '2026-04-18' },
];

const refillOrders: RefillOrder[] = [
  { id: 12341, service: 'Twitter/X Followers',       link: 'https://twitter.com/user',    quantity: 300,  remaining: 85,  status: 'Partial', date: '2026-04-22' },
  { id: 12340, service: 'Instagram Likes [Real HQ]', link: 'https://instagram.com/p/abc', quantity: 5000, remaining: 420, status: 'Partial', date: '2026-04-22' },
  { id: 12339, service: 'YouTube Subscribers',       link: 'https://youtube.com/@channel', quantity: 100,  remaining: 22,  status: 'Partial', date: '2026-04-21' },
];

/* ── Constants ──────────────────────────────────────── */
const SRV_CATEGORIES = ['All', 'Instagram', 'Facebook', 'YouTube', 'TikTok', 'Twitter', 'Telegram'];
const CAT_ICONS: Record<string, string> = {
  Instagram: 'fa-instagram', Facebook: 'fa-facebook-f',
  YouTube: 'fa-youtube', TikTok: 'fa-tiktok',
  Twitter: 'fa-twitter', Telegram: 'fa-telegram-plane',
};
const STATUS_COLORS: Record<string, string> = {
  'Completed':   '#22c55e', 'In Progress': '#3b82f6', 'Pending':    '#f59e0b',
  'Processing':  '#a855f7', 'Partial':     '#f97316', 'Canceled':   '#ef4444',
};
const STATUS_BG: Record<string, string> = {
  'Completed':   'rgba(34,197,94,.12)', 'In Progress': 'rgba(59,130,246,.12)',
  'Pending':     'rgba(245,158,11,.12)', 'Processing': 'rgba(168,85,247,.12)',
  'Partial':     'rgba(249,115,22,.12)', 'Canceled':   'rgba(239,68,68,.12)',
};
const ORD_STATUSES = ['All', 'Completed', 'In Progress', 'Pending', 'Processing', 'Partial', 'Canceled'];
const FUND_PRESETS = [5, 10, 20, 50, 100, 200];
const PAYMENT_METHODS = [
  { id: 'crypto', label: 'Cryptocurrency',  icon: 'fa-bitcoin',     sub: 'BTC, ETH, USDT — No fees' },
  { id: 'paypal', label: 'PayPal',          icon: 'fa-paypal',      sub: 'Instant — 3.5% fee' },
  { id: 'card',   label: 'Credit Card',     icon: 'fa-credit-card', sub: 'Visa / Mastercard — 2% fee' },
  { id: 'bank',   label: 'Bank Transfer',   icon: 'fa-university',  sub: '1-3 business days — No fee' },
];
const DF_INTERVALS = [
  { value: '30', label: '30 minutes' }, { value: '60', label: '1 hour' },
  { value: '120', label: '2 hours' },  { value: '360', label: '6 hours' },
  { value: '720', label: '12 hours' }, { value: '1440', label: '24 hours' },
];
const API_KEY_FULL = 'fb_live_sk_a3f9b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8';
const API_ENDPOINTS = [
  { method: 'GET',  path: '/services',      desc: 'List all available services' },
  { method: 'POST', path: '/order',         desc: 'Place a new order' },
  { method: 'GET',  path: '/status',        desc: 'Get order status (param: id)' },
  { method: 'GET',  path: '/balance',       desc: 'Get your account balance' },
  { method: 'POST', path: '/refill',        desc: 'Request a refill for an order' },
];
const ORD_PER_PAGE = 5;
const NAV = [
  { icon: 'fa-home',          label: 'Overview',   tab: 'overview'   },
  { icon: 'fa-shopping-cart', label: 'New Order',  tab: 'new-order'  },
  { icon: 'fa-layer-group',   label: 'Mass Order', tab: 'mass-order' },
  { icon: 'fa-list',          label: 'All Orders', tab: 'orders'     },
  { icon: 'fa-redo',          label: 'Refill',     tab: 'refill'     },
  { icon: 'fa-tint',          label: 'Drip Feed',  tab: 'drip-feed'  },
  { icon: 'fa-th-large',      label: 'Services',   tab: 'services'   },
  { icon: 'fa-wallet',        label: 'Add Funds',  tab: 'add-funds'  },
  { icon: 'fa-headset',       label: 'Support',    tab: 'support'    },
  { icon: 'fa-code',          label: 'API',        tab: 'api'        },
];
const PAGE_TITLES: Record<string, string> = {
  'overview': 'Dashboard Overview', 'new-order': 'New Order',
  'mass-order': 'Mass Order',       'orders': 'Order History',
  'refill': 'Refill Orders',        'drip-feed': 'Drip Feed',
  'services': 'Services List',      'add-funds': 'Add Funds',
  'support': 'Support Center',      'api': 'API Documentation',
};

/* ── Component ──────────────────────────────────────── */
export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab]         = useState('overview');

  /* API states */
  const [servicesData, setServicesData] = useState<FullService[]>(MOCK_SERVICES);
  const [userBalance, setUserBalance]   = useState<number>(0);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);
  const [orderPlacing, setOrderPlacing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<number | null>(null);

  /* Fetch services and balance on mount */
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        
        const [services, balance] = await Promise.all([
          getServices().catch(() => null),
          getBalance().catch(() => null)
        ]);

        if (services && services.length > 0) {
          const mapped = services.map((s, idx) => ({
            id: s.service,
            name: s.name,
            rate: parseFloat(s.rate),
            min: parseInt(s.min),
            max: parseInt(s.max),
            category: s.category || 'Other',
            description: s.type || ''
          }));
          setServicesData(mapped);
        }

        if (balance) {
          setUserBalance(parseFloat(balance.balance));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  /* services tab */
  const [srvSearch,   setSrvSearch]   = useState('');
  const [srvCat,      setSrvCat]      = useState('All');
  const [srvSelected, setSrvSelected] = useState<FullService | null>(null);
  const [srvLink,     setSrvLink]     = useState('');
  const [srvQty,      setSrvQty]      = useState('');

  /* new-order tab */
  const [noSearch,   setNoSearch]   = useState('');
  const [noCat,      setNoCat]      = useState('All');
  const [noSelected, setNoSelected] = useState<FullService | null>(null);
  const [noLink,     setNoLink]     = useState('');
  const [noQty,      setNoQty]      = useState('');

  /* orders tab */
  const [ordSearch, setOrdSearch] = useState('');
  const [ordStatus, setOrdStatus] = useState('All');
  const [ordPage,   setOrdPage]   = useState(1);
  const [userOrders, setUserOrders] = useState<Order[]>([]);

  /* mass order */
  const [massText, setMassText] = useState('');
  const [massSubmitting, setMassSubmitting] = useState(false);

  /* refill */
  const [refillModal, setRefillModal] = useState<RefillOrder | null>(null);
  const [refillQty,   setRefillQty]   = useState('');
  const [refillSubmitting, setRefillSubmitting] = useState(false);

  /* drip feed */
  const [dfSearch,   setDfSearch]   = useState('');
  const [dfCat,      setDfCat]      = useState('All');
  const [dfService,  setDfService]  = useState<FullService | null>(null);
  const [dfLink,     setDfLink]     = useState('');
  const [dfQtyRun,   setDfQtyRun]   = useState('');
  const [dfRuns,     setDfRuns]     = useState('');
  const [dfInterval, setDfInterval] = useState('60');

  /* add funds */
  const [fundMethod, setFundMethod] = useState('crypto');
  const [fundAmount, setFundAmount] = useState('');
  const [fundSent,   setFundSent]   = useState(false);

  /* support */
  const [suppSubject,  setSuppSubject]  = useState('');
  const [suppMessage,  setSuppMessage]  = useState('');
  const [suppPriority, setSuppPriority] = useState('medium');
  const [suppSent,     setSuppSent]     = useState(false);

  /* api */
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [apiKeyCopied,  setApiKeyCopied]  = useState(false);
  const [apiKeyInput,   setApiKeyInput]   = useState('');
  const [apiKeySaved,   setApiKeySaved]   = useState(hasApiKey());

  /* user */
  const user = { name: 'John Doe', email: 'john@example.com', balance: userBalance, totalOrders: userOrders.length, spent: 3420.75 };

  /* ── Computed ── */
  const srvTotal     = srvSelected && srvQty ? (srvSelected.rate * parseInt(srvQty || '0')) / 1000 : 0;
  const noTotal      = noSelected  && noQty  ? (noSelected.rate  * parseInt(noQty  || '0')) / 1000 : 0;
  const filteredSrv  = servicesData.filter(s => s.name.toLowerCase().includes(srvSearch.toLowerCase()) && (srvCat === 'All' || s.category === srvCat));
  const noFiltered   = servicesData.filter(s => s.name.toLowerCase().includes(noSearch.toLowerCase())  && (noCat === 'All'  || s.category === noCat));
  const dfFiltered   = servicesData.filter(s => s.name.toLowerCase().includes(dfSearch.toLowerCase())  && (dfCat === 'All'  || s.category === dfCat));
  const filteredOrd  = userOrders.length > 0 ? userOrders.filter(o => (o.service.toLowerCase().includes(ordSearch.toLowerCase()) || String(o.id).includes(ordSearch)) && (ordStatus === 'All' || o.status === ordStatus)) : allOrders.filter(o => (o.service.toLowerCase().includes(ordSearch.toLowerCase()) || String(o.id).includes(ordSearch)) && (ordStatus === 'All' || o.status === ordStatus));
  const pagedOrd     = filteredOrd.slice((ordPage - 1) * ORD_PER_PAGE, ordPage * ORD_PER_PAGE);
  const totalPages   = Math.ceil(filteredOrd.length / ORD_PER_PAGE);
  const massLines    = massText.trim().split('\n').filter(l => l.trim());
  const dfTotalQty   = dfQtyRun && dfRuns ? parseInt(dfQtyRun) * parseInt(dfRuns) : 0;
  const dfTotal      = dfService && dfTotalQty ? (dfService.rate * dfTotalQty) / 1000 : 0;
  const dfDuration   = dfRuns && dfInterval ? `${((parseInt(dfRuns) * parseInt(dfInterval)) / 60).toFixed(1)}h` : '—';
  const apiKeyMasked = API_KEY_FULL.slice(0, 10) + '••••••••••••••••••••••••••••••' + API_KEY_FULL.slice(-4);
  const copyApiKey   = () => { navigator.clipboard.writeText(API_KEY_FULL); setApiKeyCopied(true); setTimeout(() => setApiKeyCopied(false), 2000); };
  const popularServices = servicesData.slice(0, 4);

  /* ── API Actions ─────────────────────────────────── */
  const handlePlaceOrder = async () => {
    if (!noSelected || !noLink || !noQty) return;
    
    try {
      setOrderPlacing(true);
      const result = await placeOrder({
        service: noSelected.id,
        link: noLink,
        quantity: parseInt(noQty)
      });
      setOrderSuccess(result.order);
      setTimeout(() => {
        setOrderSuccess(null);
        setNoSelected(null);
        setNoLink('');
        setNoQty('');
      }, 3000);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Order failed');
    } finally {
      setOrderPlacing(false);
    }
  };

  const handleMassOrder = async () => {
    if (massLines.length === 0) return;
    
    try {
      setMassSubmitting(true);
      const orders = [];
      for (const line of massLines) {
        const [serviceId, link, quantity] = line.split('|').map(s => s.trim());
        if (serviceId && link && quantity) {
          await placeOrder({
            service: parseInt(serviceId),
            link,
            quantity: parseInt(quantity)
          });
          orders.push({ serviceId, link, quantity });
        }
      }
      alert(`Successfully placed ${orders.length} order(s)!`);
      setMassText('');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Mass order failed');
    } finally {
      setMassSubmitting(false);
    }
  };

  const handleRefill = async () => {
    if (!refillModal) return;
    
    try {
      setRefillSubmitting(true);
      await requestRefill(refillModal.id);
      alert('Refill request submitted successfully!');
      setRefillModal(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Refill failed');
    } finally {
      setRefillSubmitting(false);
    }
  };

  const handleDripFeedOrder = async () => {
    if (!dfService || !dfLink || !dfQtyRun || !dfRuns) return;
    
    try {
      setOrderPlacing(true);
      const result = await placeOrder({
        service: dfService.id,
        link: dfLink,
        quantity: parseInt(dfQtyRun),
        runs: parseInt(dfRuns),
        interval: parseInt(dfInterval)
      });
      alert(`Drip Feed order placed! Order #${result.order}`);
      setDfService(null);
      setDfLink('');
      setDfQtyRun('');
      setDfRuns('');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Drip Feed order failed');
    } finally {
      setOrderPlacing(false);
    }
  };

  const handleSaveApiKey = () => {
    if (apiKeyInput.trim()) {
      saveApiKey(apiKeyInput.trim());
      setApiKeySaved(true);
      setApiKeyInput('');
      alert('API key saved successfully!');
    }
  };

  const goTab = (tab: string) => { setActiveTab(tab); window.scrollTo(0, 0); };

  return (
    <>
      {/* ── Global tab styles ── */}
      <style>{`
        /* inputs / selects shared */
        .db-input{width:100%;background:#0a0f1e;border:1px solid rgba(255,255,255,.07);border-radius:10px;color:#e2e8f0;padding:11px 14px;font-size:.875rem;font-family:inherit;transition:border-color .2s;appearance:none;-webkit-appearance:none}
        .db-input:focus{outline:none;border-color:#2563eb;box-shadow:0 0 0 3px rgba(37,99,235,.15)}
        .db-input-icon{position:relative}
        .db-input-icon i{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:#94a3b8;font-size:.85rem;pointer-events:none}
        .db-input-icon .db-input{padding-left:38px}
        .db-label{display:block;font-size:.72rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px}
        .db-form-group{display:flex;flex-direction:column;margin-bottom:16px}
        .db-form-group:last-child{margin-bottom:0}

        /* category pills */
        .cat-pills{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}
        .cat-pill{display:inline-flex;align-items:center;gap:6px;padding:7px 16px;border-radius:20px;border:1px solid rgba(255,255,255,.07);background:transparent;color:#94a3b8;font-size:.78rem;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s;white-space:nowrap}
        .cat-pill:hover{border-color:rgba(249,115,22,.4);color:#f97316}
        .cat-pill.active{background:linear-gradient(135deg,#2563eb,#f97316);border-color:transparent;color:#fff;box-shadow:0 4px 14px rgba(37,99,235,.3)}

        /* info box */
        .info-box{display:flex;align-items:flex-start;gap:14px;padding:14px 18px;background:rgba(37,99,235,.08);border:1px solid rgba(37,99,235,.2);border-radius:12px;margin-bottom:20px;font-size:.84rem;color:#93c5fd}
        .info-box i{color:#60a5fa;font-size:1.1rem;margin-top:2px;flex-shrink:0}
        .info-box strong{color:#bfdbfe}

        /* services table */
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

        /* order panel */
        .order-panel-wrap{margin-top:24px;background:#0d1726;border:1px solid rgba(249,115,22,.25);border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.4)}
        .order-panel-head{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.07);background:linear-gradient(90deg,rgba(37,99,235,.12),rgba(249,115,22,.08))}
        .order-panel-head h3{font-size:.95rem;font-weight:700;color:#f1f5f9;margin:0}
        .order-panel-body{padding:22px;display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .opfg{display:flex;flex-direction:column;gap:6px}
        .opfg.full{grid-column:1/-1}
        .opfg label{font-size:.72rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.5px}
        .opfg input{background:#0a0f1e;border:1px solid rgba(255,255,255,.07);border-radius:8px;color:#e2e8f0;padding:10px 14px;font-size:.88rem;font-family:inherit;transition:border-color .2s}
        .opfg input:focus{outline:none;border-color:#2563eb;box-shadow:0 0 0 3px rgba(37,99,235,.15)}
        .srv-display{background:#0a0f1e;border:1px solid rgba(255,255,255,.07);border-radius:8px;padding:10px 14px;font-size:.84rem;font-weight:600;color:#f1f5f9}
        .total-box{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border:2px solid rgba(249,115,22,.25);border-radius:10px;background:rgba(249,115,22,.05)}
        .total-label{font-size:.75rem;color:#94a3b8;font-weight:600;text-transform:uppercase}
        .total-amount{font-size:1.3rem;font-weight:800;color:#f97316}
        .submit-btn{grid-column:1/-1;display:flex;align-items:center;justify-content:center;gap:8px;padding:13px 24px;background:linear-gradient(135deg,#2563eb,#f97316);color:#fff;border:none;border-radius:10px;font-size:.9rem;font-weight:700;cursor:pointer;font-family:inherit;transition:opacity .2s,transform .2s,box-shadow .2s;width:100%}
        .submit-btn:hover{opacity:.9;transform:translateY(-1px);box-shadow:0 8px 24px rgba(37,99,235,.35)}
        .close-btn{background:none;border:1px solid rgba(255,255,255,.1);border-radius:8px;color:#94a3b8;padding:6px 10px;cursor:pointer;font-size:.85rem;transition:all .2s}
        .close-btn:hover{background:rgba(239,68,68,.1);color:#f87171;border-color:rgba(239,68,68,.3)}
        .empty-state{text-align:center;padding:56px 20px;color:#94a3b8}
        .empty-state i{font-size:2.5rem;opacity:.25;display:block;margin-bottom:14px}
        .empty-state h5{color:#e2e8f0;margin-bottom:6px}

        /* new-order two-column */
        .no-layout{display:grid;grid-template-columns:1fr 380px;gap:20px;align-items:start}
        .no-service-list{display:flex;flex-direction:column;gap:8px;max-height:520px;overflow-y:auto}
        .no-service-card{padding:13px 16px;background:#0d1726;border:1px solid rgba(255,255,255,.06);border-radius:12px;cursor:pointer;transition:all .2s}
        .no-service-card:hover{border-color:rgba(37,99,235,.4);background:rgba(37,99,235,.05)}
        .no-service-card.selected{border-color:#f97316;background:rgba(249,115,22,.06);box-shadow:0 0 0 1px rgba(249,115,22,.3)}
        .no-service-card .sname{font-weight:600;font-size:.84rem;color:#f1f5f9;margin-bottom:3px}
        .no-service-card .smeta{display:flex;align-items:center;justify-content:space-between}
        .no-service-card .sprice{color:#f97316;font-size:.8rem;font-weight:700}
        .no-service-card .srange{color:#94a3b8;font-size:.75rem}
        .no-form-panel{position:sticky;top:90px;background:#0d1726;border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:24px}
        .no-form-panel h4{font-size:.9rem;font-weight:700;color:#f1f5f9;margin:0 0 18px}

        /* orders table */
        .ord-search-row{display:grid;grid-template-columns:1fr auto;gap:12px;margin-bottom:16px;align-items:start}
        .ord-table{width:100%;border-collapse:collapse}
        .ord-table thead{background:rgba(30,64,175,.3)}
        .ord-table th{padding:12px 14px;text-align:left;font-size:.7rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.7px;white-space:nowrap;border-bottom:1px solid rgba(255,255,255,.06)}
        .ord-table tbody tr{border-bottom:1px solid rgba(255,255,255,.04);transition:background .15s}
        .ord-table tbody tr:hover{background:rgba(37,99,235,.04)}
        .ord-table td{padding:12px 14px;font-size:.83rem;color:#cbd5e1;vertical-align:middle}
        .ord-id{color:#60a5fa;font-weight:700;font-size:.82rem}
        .ord-link a{color:#94a3b8;font-size:.78rem;text-decoration:none;max-width:140px;display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;vertical-align:middle}
        .ord-link a:hover{color:#f97316}
        .st-badge{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:20px;font-size:.72rem;font-weight:700}
        .st-dot{width:6px;height:6px;border-radius:50%;display:inline-block}
        .ord-charge{color:#22c55e;font-weight:700;font-size:.83rem}
        .pagination{display:flex;align-items:center;gap:6px;justify-content:flex-end;margin-top:16px}
        .pg-btn{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:8px;border:1px solid rgba(255,255,255,.08);background:transparent;color:#94a3b8;cursor:pointer;font-size:.8rem;transition:all .2s}
        .pg-btn:hover:not(:disabled){background:rgba(37,99,235,.15);border-color:#2563eb;color:#93c5fd}
        .pg-btn.active{background:linear-gradient(135deg,#2563eb,#f97316);border-color:transparent;color:#fff}
        .pg-btn:disabled{opacity:.3;cursor:not-allowed}

        /* mass order */
        .mass-textarea{width:100%;min-height:260px;background:#0a0f1e;border:1px solid rgba(255,255,255,.08);border-radius:12px;color:#e2e8f0;padding:14px;font-size:.85rem;font-family:'Courier New',monospace;resize:vertical;transition:border-color .2s;line-height:1.6}
        .mass-textarea:focus{outline:none;border-color:#2563eb;box-shadow:0 0 0 3px rgba(37,99,235,.12)}
        .mass-count{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;background:rgba(249,115,22,.1);border:1px solid rgba(249,115,22,.2);border-radius:20px;color:#f97316;font-size:.8rem;font-weight:700;margin-top:12px}

        /* refill */
        .refill-table{width:100%;border-collapse:collapse}
        .refill-table th{padding:12px 14px;text-align:left;font-size:.7rem;font-weight:700;color:#94a3b8;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,.06)}
        .refill-table td{padding:13px 14px;font-size:.83rem;color:#cbd5e1;border-bottom:1px solid rgba(255,255,255,.04);vertical-align:middle}
        .prog-wrap{width:120px;background:rgba(255,255,255,.07);border-radius:20px;height:7px;overflow:hidden}
        .prog-bar{height:100%;border-radius:20px;background:linear-gradient(90deg,#2563eb,#f97316)}
        .prog-text{font-size:.73rem;color:#94a3b8;margin-top:3px}
        .refill-btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:8px;background:rgba(37,99,235,.15);border:1px solid rgba(37,99,235,.3);color:#93c5fd;font-size:.78rem;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s}
        .refill-btn:hover{background:rgba(37,99,235,.25);border-color:#3b82f6;color:#bfdbfe}

        /* modal */
        .modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px}
        .modal-box{background:#0d1726;border:1px solid rgba(255,255,255,.1);border-radius:20px;width:100%;max-width:480px;overflow:hidden;box-shadow:0 40px 80px rgba(0,0,0,.6)}
        .modal-head{padding:18px 22px;border-bottom:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:space-between}
        .modal-head h4{margin:0;font-size:.95rem;font-weight:700;color:#f1f5f9}
        .modal-body{padding:24px}
        .modal-field{margin-bottom:16px}
        .modal-field label{display:block;font-size:.72rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px}
        .modal-field .val{background:#0a0f1e;border:1px solid rgba(255,255,255,.07);border-radius:8px;padding:10px 14px;font-size:.84rem;color:#f1f5f9;font-weight:600}
        .modal-field input{width:100%;background:#0a0f1e;border:1px solid rgba(255,255,255,.07);border-radius:8px;color:#e2e8f0;padding:10px 14px;font-size:.88rem;font-family:inherit;transition:border-color .2s}
        .modal-field input:focus{outline:none;border-color:#2563eb;box-shadow:0 0 0 3px rgba(37,99,235,.15)}

        /* drip feed */
        .df-layout{display:grid;gap:20px}
        .df-row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}
        .df-summary{background:rgba(37,99,235,.06);border:1px solid rgba(37,99,235,.2);border-radius:14px;padding:18px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:4px}
        .df-sum-item{text-align:center}
        .df-sum-val{font-size:1.2rem;font-weight:800;color:#f97316;display:block}
        .df-sum-lbl{font-size:.72rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.5px}

        /* add funds */
        .pay-methods{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:24px}
        .pay-card{padding:16px;background:#0d1726;border:1px solid rgba(255,255,255,.07);border-radius:14px;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:14px}
        .pay-card:hover{border-color:rgba(37,99,235,.4)}
        .pay-card.active{border-color:#f97316;background:rgba(249,115,22,.06);box-shadow:0 0 0 1px rgba(249,115,22,.3)}
        .pay-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:rgba(37,99,235,.12);color:#60a5fa;font-size:1.2rem;flex-shrink:0}
        .pay-card.active .pay-icon{background:rgba(249,115,22,.12);color:#f97316}
        .pay-label{font-weight:700;font-size:.88rem;color:#f1f5f9;margin-bottom:2px}
        .pay-sub{font-size:.74rem;color:#94a3b8}
        .preset-amounts{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px}
        .preset-btn{padding:9px 20px;border-radius:10px;border:1px solid rgba(255,255,255,.08);background:transparent;color:#94a3b8;font-size:.85rem;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s}
        .preset-btn:hover{border-color:rgba(249,115,22,.4);color:#f97316}
        .preset-btn.active{background:linear-gradient(135deg,#2563eb,#f97316);border-color:transparent;color:#fff}
        .fund-submit{display:flex;align-items:center;justify-content:center;gap:8px;padding:14px 24px;background:linear-gradient(135deg,#2563eb,#f97316);color:#fff;border:none;border-radius:12px;font-size:.95rem;font-weight:700;cursor:pointer;width:100%;font-family:inherit;transition:opacity .2s,transform .2s;margin-top:6px}
        .fund-submit:hover{opacity:.9;transform:translateY(-1px)}
        .fund-submit:disabled{opacity:.4;cursor:not-allowed;transform:none}
        .success-box{text-align:center;padding:48px 24px}
        .success-box .s-icon{width:70px;height:70px;border-radius:50%;background:rgba(34,197,94,.15);border:2px solid rgba(34,197,94,.3);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:1.8rem;color:#22c55e}
        .success-box h3{font-size:1.2rem;font-weight:700;color:#f1f5f9;margin-bottom:8px}
        .success-box p{color:#94a3b8;font-size:.88rem}

        /* support */
        .wa-cta{display:flex;align-items:center;gap:18px;padding:20px 24px;background:linear-gradient(135deg,rgba(37,211,102,.12),rgba(37,211,102,.04));border:1px solid rgba(37,211,102,.25);border-radius:16px;margin-bottom:24px;cursor:pointer;text-decoration:none;transition:all .2s}
        .wa-cta:hover{background:linear-gradient(135deg,rgba(37,211,102,.2),rgba(37,211,102,.08));border-color:rgba(37,211,102,.4)}
        .wa-icon{width:52px;height:52px;border-radius:14px;background:rgba(37,211,102,.15);display:flex;align-items:center;justify-content:center;font-size:1.6rem;color:#25d366;flex-shrink:0}
        .wa-text h4{margin:0 0 4px;font-size:.95rem;font-weight:700;color:#f1f5f9}
        .wa-text p{margin:0;font-size:.82rem;color:#94a3b8}
        .supp-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .supp-form-group{display:flex;flex-direction:column;gap:6px}
        .supp-form-group.full{grid-column:1/-1}
        .supp-form-group label{font-size:.72rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.5px}
        .supp-form-group input,.supp-form-group select,.supp-form-group textarea{background:#0a0f1e;border:1px solid rgba(255,255,255,.07);border-radius:8px;color:#e2e8f0;padding:10px 14px;font-size:.88rem;font-family:inherit;transition:border-color .2s;appearance:none;width:100%}
        .supp-form-group input:focus,.supp-form-group select:focus,.supp-form-group textarea:focus{outline:none;border-color:#2563eb;box-shadow:0 0 0 3px rgba(37,99,235,.15)}
        .supp-form-group textarea{min-height:120px;resize:vertical}

        /* api */
        .api-key-box{display:flex;align-items:center;gap:10px;background:#0a0f1e;border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:12px 16px;margin-bottom:16px}
        .api-key-val{flex:1;font-family:'Courier New',monospace;font-size:.83rem;color:#93c5fd;word-break:break-all}
        .api-key-btn{padding:7px 13px;border-radius:8px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:#94a3b8;cursor:pointer;font-size:.78rem;font-family:inherit;transition:all .2s;white-space:nowrap;display:inline-flex;align-items:center;gap:5px}
        .api-key-btn:hover{background:rgba(37,99,235,.15);border-color:#3b82f6;color:#93c5fd}
        .api-ep-table{width:100%;border-collapse:collapse}
        .api-ep-table th{padding:10px 14px;text-align:left;font-size:.7rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.7px;border-bottom:1px solid rgba(255,255,255,.06)}
        .api-ep-table td{padding:12px 14px;font-size:.83rem;border-bottom:1px solid rgba(255,255,255,.04);color:#cbd5e1}
        .api-ep-table tr:last-child td{border-bottom:none}
        .method-badge{display:inline-flex;padding:3px 9px;border-radius:5px;font-size:.68rem;font-weight:800;letter-spacing:.5px;font-family:monospace}
        .method-get{background:rgba(34,197,94,.12);color:#4ade80;border:1px solid rgba(34,197,94,.2)}
        .method-post{background:rgba(249,115,22,.12);color:#fb923c;border:1px solid rgba(249,115,22,.2)}
        .api-path{font-family:'Courier New',monospace;color:#93c5fd;font-size:.82rem}
        .api-code{background:#060b14;border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:18px;font-family:'Courier New',monospace;font-size:.8rem;color:#a3e635;line-height:1.7;overflow-x:auto;white-space:pre;margin-top:16px}
        .api-base{background:#0a0f1e;border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:12px 16px;font-family:monospace;font-size:.85rem;color:#67e8f9;margin-bottom:16px;display:flex;align-items:center;gap:10px}
        .base-label{font-size:.7rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.5px;white-space:nowrap}

        /* ── responsive ── */
        @media(max-width:900px){
          .no-layout{grid-template-columns:1fr}
          .no-form-panel{position:static}
          .pay-methods{grid-template-columns:1fr}
          .supp-form-grid{grid-template-columns:1fr}
          .supp-form-group.full{grid-column:1}
          .df-row3{grid-template-columns:1fr 1fr}
          .df-summary{grid-template-columns:1fr 1fr 1fr}
          .ord-search-row{grid-template-columns:1fr}
        }
        @media(max-width:600px){
          .order-panel-body{grid-template-columns:1fr}
          .opfg.full,.submit-btn{grid-column:1}
          .df-row3{grid-template-columns:1fr}
          .df-summary{grid-template-columns:1fr 1fr}
          .srv-table thead{display:none}
          .srv-table tbody tr{display:block;border:1px solid rgba(255,255,255,.07);border-radius:12px;margin-bottom:10px;padding:4px 0}
          .srv-table td{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid rgba(255,255,255,.04);font-size:.82rem}
          .srv-table td:last-child{border-bottom:none}
          .srv-table td::before{content:attr(data-label);font-size:.68rem;font-weight:700;color:#94a3b8;text-transform:uppercase;flex-shrink:0}
          .ord-table thead{display:none}
          .ord-table tbody tr{display:block;border:1px solid rgba(255,255,255,.06);border-radius:12px;margin-bottom:10px;padding:4px 0}
          .ord-table td{display:flex;justify-content:space-between;align-items:center;padding:9px 14px;border-bottom:1px solid rgba(255,255,255,.04);font-size:.82rem}
          .ord-table td:last-child{border-bottom:none}
          .ord-table td::before{content:attr(data-label);font-size:.68rem;font-weight:700;color:#94a3b8;text-transform:uppercase;flex-shrink:0}
        }
      `}</style>

      {/* ── Sidebar ── */}
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
            {NAV.map(item => (
              <li key={item.tab}>
                <button
                  className={activeTab === item.tab ? 'active' : ''}
                  onClick={() => goTab(item.tab)}
                >
                  <i className={`fas ${item.icon}`}></i>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <Link href="/login" className="logout-btn">
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="main-content">
        <header className="top-bar">
          <div className="top-bar-left">
            <button className="mobile-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <i className="fas fa-bars"></i>
            </button>
            <h1 className="page-title">{PAGE_TITLES[activeTab]}</h1>
          </div>
          <div className="top-bar-right">
            <div className="user-balance">
              <i className="fas fa-wallet"></i>
              <span>{loading ? <i className="fas fa-spinner fa-spin"></i> : `$${user.balance.toFixed(2)}`}</span>
            </div>
            {!hasApiKey() && (
              <button 
                onClick={() => goTab('api')}
                style={{ background: 'rgba(249,115,22,.2)', border: '1px solid rgba(249,115,22,.4)', color: '#f97316', padding: '6px 12px', borderRadius: 8, cursor: 'pointer', fontSize: '.75rem', fontWeight: 600 }}
              >
                <i className="fas fa-exclamation-triangle"></i> Add API Key
              </button>
            )}
            <div className="user-info">
              <div className="user-avatar"><i className="fas fa-user"></i></div>
              <div className="user-details">
                <span className="user-name">{user.name}</span>
                <span className="user-email">{user.email}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-content">

          {/* ══ OVERVIEW ══ */}
          {activeTab === 'overview' && (
            <>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon balance"><i className="fas fa-dollar-sign"></i></div>
                  <div className="stat-info"><h3>${user.balance.toFixed(2)}</h3><p>Current Balance</p></div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon orders"><i className="fas fa-shopping-cart"></i></div>
                  <div className="stat-info"><h3>{user.totalOrders}</h3><p>Total Orders</p></div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon spent"><i className="fas fa-chart-line"></i></div>
                  <div className="stat-info"><h3>${user.spent.toFixed(2)}</h3><p>Total Spent</p></div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon pending"><i className="fas fa-clock"></i></div>
                  <div className="stat-info"><h3>3</h3><p>Pending Orders</p></div>
                </div>
              </div>

              <div className="dashboard-grid">
                <div className="dashboard-card">
                  <div className="card-header"><h3>Quick Actions</h3></div>
                  <div className="card-body">
                    <div className="quick-actions">
                      <button className="quick-action-btn" onClick={() => goTab('new-order')}><i className="fas fa-plus-circle"></i><span>New Order</span></button>
                      <button className="quick-action-btn" onClick={() => goTab('add-funds')}><i className="fas fa-wallet"></i><span>Add Funds</span></button>
                      <button className="quick-action-btn" onClick={() => goTab('support')}><i className="fas fa-headset"></i><span>Support</span></button>
                      <button className="quick-action-btn" onClick={() => goTab('services')}><i className="fas fa-th-large"></i><span>Services</span></button>
                    </div>
                  </div>
                </div>

                <div className="dashboard-card">
                  <div className="card-header">
                    <h3>Popular Services</h3>
                    <button className="view-all" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => goTab('services')}>View All</button>
                  </div>
                  <div className="card-body">
                    <div className="services-list">
                      {popularServices.map(s => (
                        <div key={s.id} className="service-item">
                          <div className="service-info">
                            <span className="service-name">{s.name}</span>
                            <span className="service-category">{s.category}</span>
                          </div>
                          <div className="service-price">
                            <span className="price">${s.rate.toFixed(2)}</span>
                            <span className="per">/1K</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-header">
                  <h3>Recent Orders</h3>
                  <button className="view-all" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => goTab('orders')}>View All</button>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="orders-table">
                      <thead>
                        <tr><th>Order ID</th><th>Service</th><th>Quantity</th><th>Charge</th><th>Status</th><th>Date</th></tr>
                      </thead>
                      <tbody>
                        {allOrders.slice(0, 5).map(o => (
                          <tr key={o.id}>
                            <td>#{o.id}</td>
                            <td>{o.service}</td>
                            <td>{o.quantity.toLocaleString('en-US')}</td>
                            <td style={{ color: '#22c55e', fontWeight: 700 }}>${o.charge.toFixed(2)}</td>
                            <td>
                              <span className={`status-badge ${o.status.toLowerCase().replace(/ /g, '-')}`}>{o.status}</span>
                            </td>
                            <td>{o.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ══ NEW ORDER ══ */}
          {activeTab === 'new-order' && (
            <div className="no-layout">
              {/* Left: service browser */}
              <div>
                {/* search + category */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: 12, marginBottom: 16 }}>
                  <div className="db-input-icon">
                    <i className="fas fa-search"></i>
                    <input className="db-input" type="text" placeholder="Search services…" value={noSearch} onChange={e => setNoSearch(e.target.value)} />
                  </div>
                  <div className="db-input-icon">
                    <i className="fas fa-layer-group"></i>
                    <select className="db-input" value={noCat} onChange={e => setNoCat(e.target.value)}>
                      {SRV_CATEGORIES.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="cat-pills">
                  {SRV_CATEGORIES.map(c => (
                    <button key={c} className={`cat-pill${noCat === c ? ' active' : ''}`} onClick={() => setNoCat(c)}>
                      {c !== 'All' && <i className={`fab ${CAT_ICONS[c] ?? 'fa-globe'}`}></i>}
                      {c}
                    </button>
                  ))}
                </div>
                <div className="no-service-list">
                  {noFiltered.length === 0 && (
                    <div className="empty-state"><i className="fas fa-search-minus"></i><h5>No services found</h5><p>Try another keyword.</p></div>
                  )}
                  {noFiltered.map(s => (
                    <div
                      key={s.id}
                      className={`no-service-card${noSelected?.id === s.id ? ' selected' : ''}`}
                      onClick={() => { setNoSelected(s); setNoQty(String(s.min)); }}
                    >
                      <div className="srv-cat-tag"><i className={`fab ${CAT_ICONS[s.category] ?? 'fa-globe'}`}></i>{s.category}</div>
                      <div className="sname">{s.name}</div>
                      <div className="smeta">
                        <span className="srange" style={{ fontSize: '.75rem', color: '#94a3b8' }}>{s.description}</span>
                        <span className="sprice">${s.rate.toFixed(2)}/1K</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: order form */}
              <div className="no-form-panel">
                {!noSelected ? (
                  <div className="empty-state" style={{ padding: '40px 10px' }}>
                    <i className="fas fa-hand-pointer" style={{ fontSize: '2rem', opacity: .3, display: 'block', marginBottom: 12 }}></i>
                    <h5>Select a service</h5>
                    <p style={{ fontSize: '.82rem', color: '#64748b' }}>Click any service on the left to configure your order.</p>
                  </div>
                ) : (
                  <>
                    <h4><i className="fas fa-bolt" style={{ color: '#f97316', marginRight: 8 }}></i>Place Order</h4>
                    <div className="db-form-group">
                      <label className="db-label">Service</label>
                      <div className="srv-display">{noSelected.name}</div>
                    </div>
                    <div className="db-form-group">
                      <label className="db-label">Link / URL</label>
                      <input className="db-input" type="url" placeholder="https://…" value={noLink} onChange={e => setNoLink(e.target.value)} />
                    </div>
                    <div className="db-form-group">
                      <label className="db-label">Quantity (min {noSelected.min.toLocaleString('en-US')} — max {noSelected.max.toLocaleString('en-US')})</label>
                      <input className="db-input" type="number" value={noQty} min={noSelected.min} max={noSelected.max} onChange={e => setNoQty(e.target.value)} />
                    </div>
                    <div className="db-form-group">
                      <div className="total-box" style={{ marginTop: 4 }}>
                        <span className="total-label">Total Charge</span>
                        <span className="total-amount">${noTotal.toFixed(4)}</span>
                      </div>
                    </div>
                    {orderSuccess ? (
                      <div className="success-box" style={{ padding: '20px', textAlign: 'center' }}>
                        <div className="s-icon" style={{ width: 50, height: 50, margin: '0 auto 10px', fontSize: '1.5rem' }}><i className="fas fa-check"></i></div>
                        <h4 style={{ margin: 0, fontSize: '.9rem' }}>Order #{orderSuccess} placed!</h4>
                      </div>
                    ) : (
                      <button 
                        className="submit-btn" 
                        style={{ gridColumn: 'auto' }} 
                        disabled={!noLink || !noQty || orderPlacing}
                        onClick={handlePlaceOrder}
                      >
                        <i className={`fas ${orderPlacing ? 'fa-spinner fa-spin' : 'fa-shopping-cart'}`}></i>
                        {orderPlacing ? 'Placing Order...' : 'Submit Order'}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* ══ MASS ORDER ══ */}
          {activeTab === 'mass-order' && (
            <div className="dashboard-card">
              <div className="card-header"><h3>Mass Order</h3></div>
              <div className="card-body">
                <div className="info-box">
                  <i className="fas fa-info-circle"></i>
                  <div>
                    <strong>Format:</strong> One order per line — <strong>ServiceID | URL | Quantity</strong><br />
                    Example: <code style={{ color: '#93c5fd', fontSize: '.82rem' }}>2 | https://instagram.com/user | 500</code>
                  </div>
                </div>
                <textarea
                  className="mass-textarea"
                  placeholder={"2 | https://instagram.com/user | 500\n9 | https://tiktok.com/@user | 1000\n7 | https://youtube.com/@channel | 50"}
                  value={massText}
                  onChange={e => setMassText(e.target.value)}
                />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
                  {massLines.length > 0
                    ? <span className="mass-count"><i className="fas fa-list-ol"></i>{massLines.length} order{massLines.length > 1 ? 's' : ''} detected</span>
                    : <span style={{ color: '#475569', fontSize: '.82rem' }}>No orders entered yet</span>
                  }
                  <button
                    className="submit-btn"
                    style={{ width: 'auto', gridColumn: 'auto' }}
                    disabled={massLines.length === 0 || massSubmitting}
                    onClick={handleMassOrder}
                  >
                    <i className={`fas ${massSubmitting ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
                    {massSubmitting ? 'Submitting...' : `Submit ${massLines.length > 0 ? massLines.length : ''} Order${massLines.length > 1 ? 's' : ''}`}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ══ ALL ORDERS ══ */}
          {activeTab === 'orders' && (
            <>
              {/* Search + Status filter */}
              <div className="ord-search-row">
                <div className="db-input-icon">
                  <i className="fas fa-search"></i>
                  <input className="db-input" type="text" placeholder="Search by ID or service…" value={ordSearch} onChange={e => { setOrdSearch(e.target.value); setOrdPage(1); }} />
                </div>
                <div className="db-input-icon">
                  <i className="fas fa-filter"></i>
                  <select className="db-input" value={ordStatus} onChange={e => { setOrdStatus(e.target.value); setOrdPage(1); }}>
                    {ORD_STATUSES.map(s => <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>)}
                  </select>
                </div>
              </div>

              <div className="cat-pills" style={{ marginBottom: 16 }}>
                {ORD_STATUSES.map(s => (
                  <button key={s} className={`cat-pill${ordStatus === s ? ' active' : ''}`} onClick={() => { setOrdStatus(s); setOrdPage(1); }}>
                    {s !== 'All' && <span className="st-dot" style={{ background: STATUS_COLORS[s] ?? '#94a3b8' }}></span>}
                    {s}
                  </button>
                ))}
              </div>

              <div className="dashboard-card">
                <div className="card-body" style={{ padding: 0 }}>
                  <div style={{ overflowX: 'auto' }}>
                    <table className="ord-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Service</th>
                          <th>Link</th>
                          <th>Quantity</th>
                          <th>Charge</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pagedOrd.length === 0 && (
                          <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#475569' }}>No orders found</td></tr>
                        )}
                        {pagedOrd.map(o => (
                          <tr key={o.id}>
                            <td data-label="ID"><span className="ord-id">#{o.id}</span></td>
                            <td data-label="Service" style={{ maxWidth: 180 }}>{o.service}</td>
                            <td data-label="Link" className="ord-link">
                              <a href={o.link} target="_blank" rel="noopener noreferrer" title={o.link}>
                                {o.link.replace('https://', '').substring(0, 22)}…
                              </a>
                            </td>
                            <td data-label="Qty">{o.quantity.toLocaleString('en-US')}</td>
                            <td data-label="Charge" className="ord-charge">${o.charge.toFixed(2)}</td>
                            <td data-label="Status">
                              <span className="st-badge" style={{ background: STATUS_BG[o.status] ?? 'rgba(148,163,184,.1)', color: STATUS_COLORS[o.status] ?? '#94a3b8' }}>
                                <span className="st-dot" style={{ background: STATUS_COLORS[o.status] ?? '#94a3b8' }}></span>
                                {o.status}
                              </span>
                            </td>
                            <td data-label="Date">{o.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="pagination" style={{ padding: '12px 16px' }}>
                      <button className="pg-btn" disabled={ordPage === 1} onClick={() => setOrdPage(p => p - 1)}>
                        <i className="fas fa-chevron-left"></i>
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                        <button key={n} className={`pg-btn${ordPage === n ? ' active' : ''}`} onClick={() => setOrdPage(n)}>{n}</button>
                      ))}
                      <button className="pg-btn" disabled={ordPage === totalPages} onClick={() => setOrdPage(p => p + 1)}>
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ══ REFILL ══ */}
          {activeTab === 'refill' && (
            <>
              {refillModal && (
                <div className="modal-backdrop" onClick={() => setRefillModal(null)}>
                  <div className="modal-box" onClick={e => e.stopPropagation()}>
                    <div className="modal-head">
                      <h4><i className="fas fa-redo" style={{ color: '#f97316', marginRight: 8 }}></i>Request Refill</h4>
                      <button className="close-btn" onClick={() => setRefillModal(null)}><i className="fas fa-times"></i></button>
                    </div>
                    <div className="modal-body">
                      <div className="modal-field"><label>Order ID</label><div className="val">#{refillModal.id}</div></div>
                      <div className="modal-field"><label>Service</label><div className="val">{refillModal.service}</div></div>
                      <div className="modal-field"><label>Original Quantity</label><div className="val">{refillModal.quantity.toLocaleString('en-US')}</div></div>
                      <div className="modal-field"><label>Remaining to deliver</label><div className="val" style={{ color: '#f97316' }}>{refillModal.remaining.toLocaleString('en-US')}</div></div>
                      <div className="modal-field">
                        <label>Refill Quantity (max {refillModal.remaining.toLocaleString('en-US')})</label>
                        <input type="number" value={refillQty} max={refillModal.remaining} min={1} onChange={e => setRefillQty(e.target.value)} placeholder={String(refillModal.remaining)} />
                      </div>
                      <button 
                        className="submit-btn" 
                        style={{ marginTop: 8 }} 
                        onClick={handleRefill}
                        disabled={refillSubmitting}
                      >
                        <i className={`fas ${refillSubmitting ? 'fa-spinner fa-spin' : 'fa-redo'}`}></i>
                        {refillSubmitting ? 'Submitting...' : 'Submit Refill Request'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="info-box">
                <i className="fas fa-info-circle"></i>
                <div>Refill is available for orders with <strong>Partial</strong> status. Only the remaining quantity will be reprocessed at no extra cost.</div>
              </div>

              <div className="dashboard-card">
                <div className="card-header"><h3>Refill-Eligible Orders</h3></div>
                <div className="card-body" style={{ padding: 0 }}>
                  <div style={{ overflowX: 'auto' }}>
                    <table className="refill-table">
                      <thead>
                        <tr><th>Order ID</th><th>Service</th><th>Link</th><th>Progress</th><th>Date</th><th>Action</th></tr>
                      </thead>
                      <tbody>
                        {refillOrders.map(o => {
                          const pct = Math.round(((o.quantity - o.remaining) / o.quantity) * 100);
                          return (
                            <tr key={o.id}>
                              <td><span className="ord-id">#{o.id}</span></td>
                              <td>{o.service}</td>
                              <td>
                                <a href={o.link} target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', fontSize: '.78rem', textDecoration: 'none' }}>
                                  {o.link.replace('https://', '').substring(0, 24)}…
                                </a>
                              </td>
                              <td>
                                <div className="prog-wrap"><div className="prog-bar" style={{ width: `${pct}%` }}></div></div>
                                <div className="prog-text">{pct}% delivered — {o.remaining.toLocaleString('en-US')} remaining</div>
                              </td>
                              <td>{o.date}</td>
                              <td>
                                <button className="refill-btn" onClick={() => { setRefillModal(o); setRefillQty(String(o.remaining)); }}>
                                  <i className="fas fa-redo"></i>Refill
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ══ DRIP FEED ══ */}
          {activeTab === 'drip-feed' && (
            <div className="dashboard-card max-width-card">
              <div className="card-header"><h3>Configure Drip Feed Order</h3></div>
              <div className="card-body">
                <div className="info-box">
                  <i className="fas fa-tint"></i>
                  <div>Drip Feed spreads your order over multiple runs at a set interval — ideal for <strong>natural-looking growth</strong>.</div>
                </div>

                <div className="df-layout">
                  {/* Category + search + service select */}
                  <div className="db-form-group">
                    <label className="db-label">Category</label>
                    <div className="cat-pills" style={{ marginBottom: 0 }}>
                      {SRV_CATEGORIES.map(c => (
                        <button key={c} className={`cat-pill${dfCat === c ? ' active' : ''}`} onClick={() => { setDfCat(c); setDfService(null); }}>
                          {c !== 'All' && <i className={`fab ${CAT_ICONS[c] ?? 'fa-globe'}`}></i>}
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div className="db-form-group">
                      <label className="db-label">Search Service</label>
                      <div className="db-input-icon">
                        <i className="fas fa-search"></i>
                        <input className="db-input" type="text" placeholder="Type to search…" value={dfSearch} onChange={e => setDfSearch(e.target.value)} />
                      </div>
                    </div>
                    <div className="db-form-group">
                      <label className="db-label">Select Service</label>
                      <div className="db-input-icon">
                        <i className="fas fa-th-large"></i>
                        <select className="db-input" value={dfService?.id ?? ''} onChange={e => {
                          const found = dfFiltered.find(s => s.id === parseInt(e.target.value));
                          setDfService(found ?? null);
                        }}>
                          <option value="">— Choose service —</option>
                          {dfFiltered.map(s => <option key={s.id} value={s.id}>{s.name} — ${s.rate.toFixed(2)}/1K</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  {dfService && (
                    <div className="info-box" style={{ marginBottom: 0 }}>
                      <i className="fas fa-tag"></i>
                      <div>
                        <strong>{dfService.name}</strong><br />
                        Rate: <strong style={{ color: '#f97316' }}>${dfService.rate.toFixed(2)}/1K</strong> &nbsp;·&nbsp;
                        Min per run: <strong>{dfService.min.toLocaleString('en-US')}</strong> &nbsp;·&nbsp;
                        Max per run: <strong>{dfService.max.toLocaleString('en-US')}</strong>
                      </div>
                    </div>
                  )}

                  <div className="db-form-group">
                    <label className="db-label">Link / URL</label>
                    <input className="db-input" type="url" placeholder="https://…" value={dfLink} onChange={e => setDfLink(e.target.value)} />
                  </div>

                  <div className="df-row3">
                    <div className="db-form-group">
                      <label className="db-label">Quantity per run</label>
                      <input className="db-input" type="number" placeholder={dfService ? String(dfService.min) : '0'} value={dfQtyRun} onChange={e => setDfQtyRun(e.target.value)} />
                    </div>
                    <div className="db-form-group">
                      <label className="db-label">Number of runs</label>
                      <input className="db-input" type="number" placeholder="e.g. 10" value={dfRuns} onChange={e => setDfRuns(e.target.value)} />
                    </div>
                    <div className="db-form-group">
                      <label className="db-label">Interval</label>
                      <div className="db-input-icon">
                        <i className="fas fa-clock"></i>
                        <select className="db-input" value={dfInterval} onChange={e => setDfInterval(e.target.value)}>
                          {DF_INTERVALS.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="df-summary">
                    <div className="df-sum-item">
                      <span className="df-sum-val">{dfTotalQty > 0 ? dfTotalQty.toLocaleString('en-US') : '—'}</span>
                      <span className="df-sum-lbl">Total Quantity</span>
                    </div>
                    <div className="df-sum-item">
                      <span className="df-sum-val">{dfRuns ? dfDuration : '—'}</span>
                      <span className="df-sum-lbl">Total Duration</span>
                    </div>
                    <div className="df-sum-item">
                      <span className="df-sum-val">{dfTotal > 0 ? `$${dfTotal.toFixed(4)}` : '—'}</span>
                      <span className="df-sum-lbl">Total Charge</span>
                    </div>
                  </div>

                  <button 
                    className="submit-btn" 
                    style={{ gridColumn: 'auto' }} 
                    disabled={!dfService || !dfLink || !dfQtyRun || !dfRuns || orderPlacing}
                    onClick={handleDripFeedOrder}
                  >
                    <i className={`fas ${orderPlacing ? 'fa-spinner fa-spin' : 'fa-tint'}`}></i>
                    {orderPlacing ? 'Placing Order...' : 'Place Drip Feed Order'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ══ SERVICES ══ */}
          {activeTab === 'services' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 12, marginBottom: 20 }}>
                <div className="db-input-icon">
                  <i className="fas fa-search"></i>
                  <input className="db-input" type="text" placeholder="Search services…" value={srvSearch} onChange={e => setSrvSearch(e.target.value)} />
                </div>
                <div className="db-input-icon">
                  <i className="fas fa-layer-group"></i>
                  <select className="db-input" value={srvCat} onChange={e => setSrvCat(e.target.value)}>
                    {SRV_CATEGORIES.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
                  </select>
                </div>
              </div>

              <div className="cat-pills">
                {SRV_CATEGORIES.map(c => (
                  <button key={c} className={`cat-pill${srvCat === c ? ' active' : ''}`} onClick={() => setSrvCat(c)}>
                    {c !== 'All' && <i className={`fab ${CAT_ICONS[c] ?? 'fa-globe'}`}></i>}
                    {c}
                  </button>
                ))}
              </div>

              <div className="srv-table-wrap">
                <div style={{ overflowX: 'auto' }}>
                  <table className="srv-table">
                    <thead>
                      <tr><th>#</th><th>Service</th><th>Rate / 1K</th><th>Min – Max</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      {filteredSrv.map(s => (
                        <tr key={s.id}>
                          <td data-label="#"><span className="srv-id">{s.id}</span></td>
                          <td data-label="Service">
                            <div className="srv-cat-tag"><i className={`fab ${CAT_ICONS[s.category] ?? 'fa-globe'}`}></i>{s.category}</div>
                            <div className="srv-name">{s.name}</div>
                            <div className="srv-desc">{s.description}</div>
                          </td>
                          <td data-label="Rate"><span className="srv-price">${s.rate.toFixed(2)}</span></td>
                          <td data-label="Min–Max"><span className="srv-range">{s.min.toLocaleString('en-US')} – {s.max.toLocaleString('en-US')}</span></td>
                          <td data-label="Action">
                            <button className="srv-btn" onClick={() => { setSrvSelected(s); setSrvQty(String(s.min)); setSrvLink(''); }}>
                              <i className="fas fa-bolt"></i> Order
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredSrv.length === 0 && (
                  <div className="empty-state"><i className="fas fa-search-minus"></i><h5>No services found</h5><p>Try a different keyword or category.</p></div>
                )}
              </div>

              {srvSelected && (
                <div className="order-panel-wrap">
                  <div className="order-panel-head">
                    <h3><i className="fas fa-bolt" style={{ color: '#f97316', marginRight: 8 }}></i>Place Order — {srvSelected.name}</h3>
                    <button className="close-btn" onClick={() => setSrvSelected(null)}><i className="fas fa-times"></i></button>
                  </div>
                  <div className="order-panel-body">
                    <div className="opfg full"><label>Selected Service</label><div className="srv-display">{srvSelected.name}</div></div>
                    <div className="opfg"><label>Link / URL</label><input type="url" placeholder="https://…" value={srvLink} onChange={e => setSrvLink(e.target.value)} /></div>
                    <div className="opfg"><label>Quantity (min {srvSelected.min.toLocaleString('en-US')} – max {srvSelected.max.toLocaleString('en-US')})</label><input type="number" value={srvQty} min={srvSelected.min} max={srvSelected.max} onChange={e => setSrvQty(e.target.value)} /></div>
                    <div className="opfg full"><label>Total Charge</label><div className="total-box"><span className="total-label">Amount to pay</span><span className="total-amount">${srvTotal.toFixed(4)}</span></div></div>
                    <button 
                      className="submit-btn"
                      disabled={!srvLink || !srvQty || orderPlacing}
                      onClick={async () => {
                        if (!srvSelected) return;
                        try {
                          setOrderPlacing(true);
                          const result = await placeOrder({
                            service: srvSelected.id,
                            link: srvLink,
                            quantity: parseInt(srvQty)
                          });
                          alert(`Order #${result.order} placed successfully!`);
                          setSrvSelected(null);
                          setSrvLink('');
                          setSrvQty('');
                        } catch (err) {
                          alert(err instanceof Error ? err.message : 'Order failed');
                        } finally {
                          setOrderPlacing(false);
                        }
                      }}
                    >
                      <i className={`fas ${orderPlacing ? 'fa-spinner fa-spin' : 'fa-shopping-cart'}`}></i>
                      {orderPlacing ? 'Placing...' : 'Submit Order'}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ══ ADD FUNDS ══ */}
          {activeTab === 'add-funds' && (
            <div className="dashboard-card max-width-card">
              <div className="card-header"><h3>Add Funds to Your Account</h3></div>
              <div className="card-body">
                {fundSent ? (
                  <div className="success-box">
                    <div className="s-icon"><i className="fas fa-check"></i></div>
                    <h3>Payment Request Submitted!</h3>
                    <p style={{ marginBottom: 24 }}>Your payment of <strong style={{ color: '#f97316' }}>${fundAmount}</strong> via <strong>{PAYMENT_METHODS.find(m => m.id === fundMethod)?.label}</strong> is being processed.</p>
                    <button className="srv-btn" onClick={() => { setFundSent(false); setFundAmount(''); }}>
                      <i className="fas fa-plus"></i> Add More Funds
                    </button>
                  </div>
                ) : (
                  <>
                    <p style={{ color: '#94a3b8', fontSize: '.88rem', marginBottom: 20 }}>Select a payment method and enter the amount you want to add.</p>

                    {/* Payment methods */}
                    <label className="db-label" style={{ marginBottom: 12 }}>Payment Method</label>
                    <div className="pay-methods">
                      {PAYMENT_METHODS.map(m => (
                        <div key={m.id} className={`pay-card${fundMethod === m.id ? ' active' : ''}`} onClick={() => setFundMethod(m.id)}>
                          <div className="pay-icon"><i className={`fab ${m.icon}`}></i></div>
                          <div>
                            <div className="pay-label">{m.label}</div>
                            <div className="pay-sub">{m.sub}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Preset amounts */}
                    <label className="db-label" style={{ marginBottom: 12 }}>Select Amount (USD)</label>
                    <div className="preset-amounts">
                      {FUND_PRESETS.map(a => (
                        <button key={a} className={`preset-btn${fundAmount === String(a) ? ' active' : ''}`} onClick={() => setFundAmount(String(a))}>
                          ${a}
                        </button>
                      ))}
                    </div>

                    {/* Custom amount */}
                    <div className="db-form-group" style={{ marginBottom: 20 }}>
                      <label className="db-label">Or enter custom amount</label>
                      <div className="db-input-icon">
                        <i className="fas fa-dollar-sign"></i>
                        <input className="db-input" type="number" placeholder="Minimum $5" value={fundAmount} onChange={e => setFundAmount(e.target.value)} min={5} />
                      </div>
                    </div>

                    {fundAmount && parseFloat(fundAmount) >= 5 && (
                      <div className="info-box" style={{ marginBottom: 16 }}>
                        <i className="fas fa-receipt"></i>
                        <div>
                          You will add <strong style={{ color: '#f97316' }}>${parseFloat(fundAmount).toFixed(2)}</strong> to your balance via <strong>{PAYMENT_METHODS.find(m => m.id === fundMethod)?.label}</strong>.
                        </div>
                      </div>
                    )}

                    <button
                      className="fund-submit"
                      disabled={!fundAmount || parseFloat(fundAmount) < 5}
                      onClick={() => setFundSent(true)}
                    >
                      <i className="fas fa-lock"></i>
                      Proceed to Payment {fundAmount && parseFloat(fundAmount) >= 5 ? `— $${parseFloat(fundAmount).toFixed(2)}` : ''}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ══ SUPPORT ══ */}
          {activeTab === 'support' && (
            <div style={{ display: 'grid', gap: 20, maxWidth: 780 }}>
              {/* WhatsApp CTA */}
              <a className="wa-cta" href="https://wa.me/2348131654957" target="_blank" rel="noopener noreferrer">
                <div className="wa-icon"><i className="fab fa-whatsapp"></i></div>
                <div className="wa-text">
                  <h4>Chat with us on WhatsApp</h4>
                  <p>Get instant support — we typically reply in under 5 minutes</p>
                </div>
                <i className="fas fa-arrow-right" style={{ color: '#25d366', marginLeft: 'auto', opacity: .7 }}></i>
              </a>

              {/* Support ticket form */}
              <div className="dashboard-card">
                <div className="card-header"><h3>Submit a Support Ticket</h3></div>
                <div className="card-body">
                  {suppSent ? (
                    <div className="success-box" style={{ padding: '32px 10px' }}>
                      <div className="s-icon"><i className="fas fa-check"></i></div>
                      <h3>Ticket Submitted!</h3>
                      <p style={{ marginBottom: 20 }}>We'll get back to you within 24 hours.</p>
                      <button className="srv-btn" onClick={() => { setSuppSent(false); setSuppSubject(''); setSuppMessage(''); setSuppPriority('medium'); }}>
                        <i className="fas fa-plus"></i> New Ticket
                      </button>
                    </div>
                  ) : (
                    <div className="supp-form-grid">
                      <div className="supp-form-group">
                        <label>Subject</label>
                        <input type="text" placeholder="Brief description of your issue" value={suppSubject} onChange={e => setSuppSubject(e.target.value)} />
                      </div>
                      <div className="supp-form-group">
                        <label>Priority</label>
                        <select value={suppPriority} onChange={e => setSuppPriority(e.target.value)}>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                      <div className="supp-form-group full">
                        <label>Message</label>
                        <textarea placeholder="Describe your issue in detail — include order ID if applicable…" value={suppMessage} onChange={e => setSuppMessage(e.target.value)} />
                      </div>
                      <div className="supp-form-group full">
                        <button
                          className="submit-btn"
                          style={{ gridColumn: 'auto' }}
                          disabled={!suppSubject.trim() || !suppMessage.trim()}
                          onClick={() => setSuppSent(true)}
                        >
                          <i className="fas fa-paper-plane"></i>Send Ticket
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick answers */}
              <div className="dashboard-card">
                <div className="card-header"><h3>Quick Answers</h3></div>
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    ['How long does delivery take?',       'Most orders start within 0–30 minutes. Completion depends on the quantity ordered.'],
                    ['What if my order doesn\'t complete?', 'Orders with Partial status are eligible for a free Refill. Go to the Refill tab.'],
                    ['Can I cancel an order?',              'Orders can only be canceled while in Pending status. Contact support immediately.'],
                    ['How do I add funds?',                 'Go to the Add Funds tab and choose your preferred payment method.'],
                  ].map(([q, a]) => (
                    <div key={q} style={{ background: '#0d1726', border: '1px solid rgba(255,255,255,.06)', borderRadius: 12, padding: '14px 16px' }}>
                      <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '.85rem', marginBottom: 5 }}>
                        <i className="fas fa-question-circle" style={{ color: '#f97316', marginRight: 8 }}></i>{q}
                      </div>
                      <div style={{ color: '#94a3b8', fontSize: '.82rem', lineHeight: 1.6, paddingLeft: 22 }}>{a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══ API ══ */}
          {activeTab === 'api' && (
            <div style={{ display: 'grid', gap: 20, maxWidth: 820 }}>
              <div className="dashboard-card">
                <div className="card-header"><h3>Your API Key</h3></div>
                <div className="card-body">
                  <p style={{ color: '#94a3b8', fontSize: '.85rem', marginBottom: 14 }}>
                    Get your API key from <a href="https://kamiboost.com/account" target="_blank" rel="noopener noreferrer" style={{ color: '#f97316' }}>Kamiboost Account Page</a> and save it here to enable orders.
                  </p>
                  
                  {apiKeySaved ? (
                    <div className="api-key-box">
                      <span className="api-key-val" style={{ color: '#22c55e' }}><i className="fas fa-check-circle"></i> API Key is saved and active</span>
                      <button className="api-key-btn" onClick={() => { removeApiKey(); setApiKeySaved(false); setApiKeyVisible(false); }}>
                        <i className="fas fa-trash"></i>Remove
                      </button>
                    </div>
                  ) : (
                    <div className="api-key-box" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 10 }}>
                      <input 
                        className="db-input" 
                        type="password" 
                        placeholder="Paste your API key here" 
                        value={apiKeyInput}
                        onChange={e => setApiKeyInput(e.target.value)}
                        style={{ marginBottom: 8 }}
                      />
                      <button className="srv-btn" onClick={handleSaveApiKey} disabled={!apiKeyInput.trim()}>
                        <i className="fas fa-save"></i>Save API Key
                      </button>
                    </div>
                  )}
                  
                  <div className="info-box" style={{ marginTop: 12 }}>
                    <i className="fas fa-info-circle"></i>
                    <div>Your API key is stored locally in your browser and never sent to our servers.</div>
                  </div>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-header"><h3>Base URL &amp; Authentication</h3></div>
                <div className="card-body">
                  <label className="db-label" style={{ marginBottom: 8 }}>Base URL</label>
                  <div className="api-base">
                    <span className="base-label">POST</span>
                    <span>https://kamiboost.com/api/v2</span>
                  </div>
                  <div className="info-box">
                    <i className="fas fa-key"></i>
                    <div>Send your API key as a <strong>key</strong> parameter in the request body (FormData).</div>
                  </div>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-header"><h3>Endpoints</h3></div>
                <div className="card-body" style={{ padding: 0 }}>
                  <table className="api-ep-table">
                    <thead>
                      <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
                    </thead>
                    <tbody>
                      {API_ENDPOINTS.map(ep => (
                        <tr key={ep.path}>
                          <td>
                            <span className={`method-badge ${ep.method === 'GET' ? 'method-get' : 'method-post'}`}>{ep.method}</span>
                          </td>
                          <td><span className="api-path">{ep.path}</span></td>
                          <td>{ep.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-header"><h3>Code Example</h3></div>
                <div className="card-body">
                  <p style={{ color: '#94a3b8', fontSize: '.83rem', marginBottom: 0 }}>Place an order via <code style={{ color: '#a3e635', fontSize: '.82rem' }}>POST /api/v2</code></p>
                  <pre className="api-code">{`// JavaScript / fetch with FormData
const formData = new FormData();
formData.append('key', 'YOUR_API_KEY');
formData.append('action', 'add');
formData.append('service', '2');
formData.append('link', 'https://instagram.com/yourprofile');
formData.append('quantity', '500');

const response = await fetch('https://kamiboost.com/api/v2', {
  method: 'POST',
  body: formData,
});
const data = await response.json();
// { order: 12346 }`}</pre>

                  <p style={{ color: '#94a3b8', fontSize: '.83rem', marginTop: 16, marginBottom: 0 }}>Get services list</p>
                  <pre className="api-code">{`// Get all services
const formData = new FormData();
formData.append('key', 'YOUR_API_KEY');
formData.append('action', 'services');

const response = await fetch('https://kamiboost.com/api/v2', {
  method: 'POST',
  body: formData,
});
const services = await response.json();
// [{ service: 1, name: "...", rate: "0.50", ... }]`}</pre>

                  <p style={{ color: '#94a3b8', fontSize: '.83rem', marginTop: 16, marginBottom: 0 }}>Check order status</p>
                  <pre className="api-code">{`// Order status response
{
  "charge": "2.50",
  "start_count": "3572",
  "status": "Partial",
  "remains": "157",
  "currency": "USD"
}`}</pre>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
