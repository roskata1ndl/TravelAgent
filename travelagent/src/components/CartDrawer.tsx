'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice, cn } from '@/lib/utils';
import { Button } from './ui/Button';

export function CartDrawer() {
  const { items, removeItem, updateQuantity, subtotal, isOpen, setIsOpen } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#1a1a2e]/30 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-[#e5e7eb]">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#1a1a2e]" />
                <span className="font-semibold text-lg text-[#1a1a2e]">Your Cart</span>
                <span className="text-sm text-[#6b7280]">({items.length} items)</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-[#f8f9fa] transition-colors"
              >
                <X className="w-5 h-5 text-[#6b7280]" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="w-20 h-20 rounded-full bg-[#f8f9fa] flex items-center justify-center mb-6">
                  <ShoppingBag className="w-8 h-8 text-[#6b7280]" />
                </div>
                <p className="text-lg font-medium text-[#1a1a2e] mb-2">Your cart is empty</p>
                <p className="text-sm text-[#6b7280] text-center mb-6">
                  Looks like you have not added anything yet.
                </p>
                <Button onClick={() => setIsOpen(false)}>
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#f8f9fa] flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-medium text-[#1a1a2e] line-clamp-1">
                              {item.name}
                            </h4>
                            {item.color && (
                              <p className="text-xs text-[#6b7280]">{item.color}</p>
                            )}
                            {item.size && (
                              <p className="text-xs text-[#6b7280]">{item.size}</p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 rounded-full hover:bg-[#f8f9fa] transition-colors"
                          >
                            <X className="w-4 h-4 text-[#6b7280]" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-full border border-[#e5e7eb] flex items-center justify-center hover:bg-[#f8f9fa] transition-colors"
                            >
                              <Minus className="w-3 h-3 text-[#6b7280]" />
                            </button>
                            <span className="text-sm font-medium text-[#1a1a2e] w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-full border border-[#e5e7eb] flex items-center justify-center hover:bg-[#f8f9fa] transition-colors"
                            >
                              <Plus className="w-3 h-3 text-[#6b7280]" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-[#1a1a2e]">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-[#e5e7eb] p-6 space-y-4 bg-[#fafafa]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6b7280]">Subtotal</span>
                    <span className="text-lg font-semibold text-[#1a1a2e]">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <p className="text-xs text-[#6b7280]">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <Button className="w-full" size="lg">
                    <Link href="/checkout" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                      Checkout
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full text-sm text-[#6b7280] hover:text-[#1a1a2e] transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
