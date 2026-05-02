'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ArrowLeft, ArrowRight, Tag, Truck, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [shippingCost, setShippingCost] = useState(0);
  const [discount, setDiscount] = useState(0);

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'TRAVEL10') {
      setDiscount(subtotal * 0.1);
    }
  };

  const shipping = subtotal >= 150 ? 0 : shippingCost;
  const total = subtotal - discount + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <div className="w-20 h-20 rounded-full bg-[#f8f9fa] flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#6b7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-[#1a1a2e] mb-2">Your cart is empty</h2>
            <p className="text-[#6b7280] mb-6">Add some products to get started.</p>
            <Link href="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-semibold text-[#1a1a2e] tracking-tight mb-8">
              Your cart
            </h1>

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-[#f8f9fa] rounded-xl">
                    <Link href={`/product/${item.productId}`} className="relative w-24 h-24 rounded-lg overflow-hidden bg-white flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link href={`/product/${item.productId}`} className="font-medium text-[#1a1a2e] hover:text-[#0f4c81]">
                            {item.name}
                          </Link>
                          {item.color && <p className="text-xs text-[#6b7280] mt-0.5">Color: {item.color}</p>}
                          {item.size && <p className="text-xs text-[#6b7280]">Size: {item.size}</p>}
                        </div>
                        <button onClick={() => removeItem(item.id)} className="p-1 rounded-full hover:bg-white transition-colors">
                          <X className="w-4 h-4 text-[#6b7280]" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#e5e7eb] rounded-full bg-white">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center">
                            <Minus className="w-3 h-3 text-[#6b7280]" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center">
                            <Plus className="w-3 h-3 text-[#6b7280]" />
                          </button>
                        </div>
                        <span className="font-semibold text-[#1a1a2e]">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                <div className="bg-[#f8f9fa] rounded-xl p-6 space-y-6">
                  <h2 className="text-lg font-semibold text-[#1a1a2e]">Order summary</h2>

                  {/* Promo Code */}
                  <div>
                    <label className="text-sm font-medium text-[#1a1a2e] block mb-2">Promo code</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 px-4 py-2.5 rounded-full border border-[#e5e7eb] text-sm bg-white outline-none focus:border-[#0f4c81]"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="px-4 py-2.5 bg-[#1a1a2e] text-white rounded-full text-sm font-medium hover:bg-[#2d2d44] transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {discount > 0 && (
                      <p className="text-xs text-[#0f4c81] mt-2">Code TRAVEL10 applied — 10% off!</p>
                    )}
                  </div>

                  <div className="space-y-3 border-t border-[#e5e7eb] pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6b7280]">Subtotal</span>
                      <span className="text-[#1a1a2e]">{formatPrice(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[#0f4c81]">Discount</span>
                        <span className="text-[#0f4c81]">-{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6b7280]">Shipping</span>
                      <span className="text-[#1a1a2e]">
                        {shipping === 0 ? 'Free' : formatPrice(shipping)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold border-t border-[#e5e7eb] pt-3">
                      <span className="text-[#1a1a2e]">Total</span>
                      <span className="text-[#1a1a2e]">{formatPrice(total)}</span>
                    </div>
                  </div>

                  {subtotal < 150 && (
                    <p className="text-xs text-[#6b7280] flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      Add {formatPrice(150 - subtotal)} more for free shipping
                    </p>
                  )}

                  <Link href="/checkout">
                    <Button size="lg" className="w-full">
                      Checkout
                      <Lock className="w-4 h-4" />
                    </Button>
                  </Link>

                  <Link href="/shop" className="flex items-center justify-center gap-2 text-sm text-[#6b7280] hover:text-[#1a1a2e] transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Continue shopping
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
