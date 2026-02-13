import React, { useState } from 'react';
import { useMoolContext } from '../context/MoolContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { allOrders, userRole, updateOrderStatus, logout } = useMoolContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders'); // 'dashboard' | 'orders'
  const [filterStatus, setFilterStatus] = useState('All');

  // Security Check
  if (userRole !== 'admin') {
    setTimeout(() => navigate('/login'), 100);
    return null;
  }

  // --- ANALYTICS CALCULATIONS ---
  const totalRevenue = allOrders.reduce((sum, order) => sum + parseInt(order.total.toString().replace(/[^0-9]/g, '')), 0);
  const pendingCount = allOrders.filter(o => o.status === 'Pending').length;
  const shippedCount = allOrders.filter(o => o.status === 'Shipped').length;
  const deliveredCount = allOrders.filter(o => o.status === 'Delivered').length;

  // Filter Orders Logic
  const filteredOrders = allOrders.filter(order => 
    filterStatus === 'All' ? true : order.status === filterStatus
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex">
      
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-brand-dark text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-serif font-bold text-brand-saffron">Admin Panel</h2>
          <p className="text-xs text-gray-400 mt-1">Mool Granth Store</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-brand-green text-white' : 'text-gray-300 hover:bg-white/10'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('orders')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-brand-green text-white' : 'text-gray-300 hover:bg-white/10'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
            Orders 
            {pendingCount > 0 && <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{pendingCount}</span>}
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={logout} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-full">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Logout
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 font-serif">
            {activeTab === 'dashboard' ? 'Overview' : 'Order Management'}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Admin Mode</span>
            <div className="w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center font-bold">A</div>
          </div>
        </header>

        {/* --- TAB: DASHBOARD OVERVIEW --- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Total Revenue</p>
                <p className="text-3xl font-bold text-brand-dark mt-2">₹{totalRevenue.toLocaleString()}</p>
                <span className="text-green-500 text-xs font-bold">↑ Lifetime</span>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Total Orders</p>
                <p className="text-3xl font-bold text-brand-dark mt-2">{allOrders.length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Pending</p>
                <p className="text-3xl font-bold text-yellow-500 mt-2">{pendingCount}</p>
                <span className="text-xs text-gray-400">Needs Action</span>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Delivered</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{deliveredCount}</p>
              </div>
            </div>

            {/* Quick Status Bar */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Order Status Distribution</h3>
              <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden flex">
                <div style={{ width: `${(pendingCount/allOrders.length)*100}%` }} className="bg-yellow-400 h-full" title="Pending"></div>
                <div style={{ width: `${(shippedCount/allOrders.length)*100}%` }} className="bg-blue-400 h-full" title="Shipped"></div>
                <div style={{ width: `${(deliveredCount/allOrders.length)*100}%` }} className="bg-green-500 h-full" title="Delivered"></div>
              </div>
              <div className="flex gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-yellow-400 rounded-full"></span> Pending</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-400 rounded-full"></span> Shipped</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-green-500 rounded-full"></span> Delivered</div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB: ORDERS MANAGEMENT --- */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in">
            
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex gap-2">
                {['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                      filterStatus === status 
                        ? 'bg-brand-green text-white border-brand-green' 
                        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                Showing {filteredOrders.length} orders
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-500">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono font-bold text-brand-dark">{order.id}</span>
                        <br/>
                        <span className="text-xs text-gray-400">{new Date(order.date).toLocaleDateString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-900">{order.shipping.firstName} {order.shipping.lastName}</p>
                        <p className="text-xs">{order.shipping.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block w-24 text-center ${
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-brand-green">₹{order.total}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {order.status === 'Pending' && (
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'Shipped')}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs font-bold transition-colors"
                          >
                            Mark Shipped
                          </button>
                        )}
                        {order.status === 'Shipped' && (
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'Delivered')}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-xs font-bold transition-colors"
                          >
                            Mark Delivered
                          </button>
                        )}
                        {(order.status === 'Pending' || order.status === 'Shipped') && (
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'Cancelled')}
                            className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 text-xs font-bold transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-10 text-gray-400">No orders found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;