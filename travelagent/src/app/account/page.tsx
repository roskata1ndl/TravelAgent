'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, MapPin, CreditCard, Settings, Package, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const tabs = [
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const mockOrders = [
  { id: 'TA-78234', date: '2026-04-15', status: 'Delivered', total: 485, items: 2 },
  { id: 'TA-78156', date: '2026-03-28', status: 'Delivered', total: 145, items: 1 },
  { id: 'TA-77901', date: '2026-02-14', status: 'Delivered', total: 320, items: 3 },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');
  const [showPassword, setShowPassword] = useState(false);
  const [accountInfo, setAccountInfo] = useState({
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@email.com',
    currentPassword: '',
    newPassword: '',
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-12 bg-[#f8f9fa] border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-semibold text-[#1a1a2e] tracking-tight">
              My Account
            </h1>
            <p className="text-[#6b7280] mt-1">Welcome back, {accountInfo.firstName}</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#1a1a2e] text-white'
                        : 'text-[#6b7280] hover:bg-[#f8f9fa] hover:text-[#1a1a2e]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl p-6">
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-semibold text-[#1a1a2e] mb-6">Order history</h2>
                  {mockOrders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-12 h-12 text-[#6b7280] mx-auto mb-4" />
                      <p className="text-[#6b7280] mb-4">No orders yet</p>
                      <Link href="/shop">
                        <Button>Start shopping</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {mockOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 bg-[#f8f9fa] rounded-xl">
                          <div>
                            <p className="font-medium text-[#1a1a2e]">{order.id}</p>
                            <p className="text-sm text-[#6b7280]">{order.date} · {order.items} items</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-[#1a1a2e]">{formatPrice(order.total)}</span>
                            <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">{order.status}</span>
                            <ChevronRight className="w-4 h-4 text-[#6b7280]" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-xl font-semibold text-[#1a1a2e] mb-6">My wishlist</h2>
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 text-[#6b7280] mx-auto mb-4" />
                    <p className="text-[#6b7280] mb-4">Save items for later</p>
                    <Link href="/shop">
                      <Button>Browse products</Button>
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div>
                  <h2 className="text-xl font-semibold text-[#1a1a2e] mb-6">Saved addresses</h2>
                  <div className="text-center py-12">
                    <MapPin className="w-12 h-12 text-[#6b7280] mx-auto mb-4" />
                    <p className="text-[#6b7280] mb-4">No saved addresses</p>
                    <Button>Add new address</Button>
                  </div>
                </div>
              )}

              {activeTab === 'payment' && (
                <div>
                  <h2 className="text-xl font-semibold text-[#1a1a2e] mb-6">Payment methods</h2>
                  <div className="text-center py-12">
                    <CreditCard className="w-12 h-12 text-[#6b7280] mx-auto mb-4" />
                    <p className="text-[#6b7280] mb-4">No saved cards</p>
                    <Button>Add payment method</Button>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-semibold text-[#1a1a2e] mb-6">Account settings</h2>
                  <form className="space-y-6 max-w-md">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-[#1a1a2e] block mb-2">First name</label>
                        <input
                          type="text"
                          value={accountInfo.firstName}
                          onChange={(e) => setAccountInfo({ ...accountInfo, firstName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81]"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#1a1a2e] block mb-2">Last name</label>
                        <input
                          type="text"
                          value={accountInfo.lastName}
                          onChange={(e) => setAccountInfo({ ...accountInfo, lastName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#1a1a2e] block mb-2">Email</label>
                      <input
                        type="email"
                        value={accountInfo.email}
                        onChange={(e) => setAccountInfo({ ...accountInfo, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#1a1a2e] block mb-2">Current password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={accountInfo.currentPassword}
                          onChange={(e) => setAccountInfo({ ...accountInfo, currentPassword: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4 text-[#6b7280]" /> : <Eye className="w-4 h-4 text-[#6b7280]" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#1a1a2e] block mb-2">New password</label>
                      <input
                        type="password"
                        value={accountInfo.newPassword}
                        onChange={(e) => setAccountInfo({ ...accountInfo, newPassword: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81]"
                      />
                    </div>
                    <Button type="submit" size="lg">Save changes</Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
