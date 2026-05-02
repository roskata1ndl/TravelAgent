'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, ArrowLeft, Lock, CreditCard, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type Step = 'shipping' | 'payment' | 'review' | 'confirmation';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<Step>('shipping');
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const shipping = subtotal >= 150 ? 0 : 15;
  const total = subtotal + shipping;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('review');
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearCart();
    setCurrentStep('confirmation');
    setIsProcessing(false);
  };

  if (currentStep === 'confirmation') {
    return (
      <div className="min-h-screen pt-20">
        <section className="py-20">
          <div className="max-w-xl mx-auto px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="w-20 h-20 rounded-full bg-[#0f4c81]/10 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-[#0f4c81]" />
              </div>
              <h1 className="text-3xl font-semibold text-[#1a1a2e] mb-4">Order confirmed!</h1>
              <p className="text-[#6b7280] mb-2">
                Thank you for your purchase. A confirmation email has been sent to:
              </p>
              <p className="text-[#1a1a2e] font-medium mb-8">{shippingInfo.email}</p>
              <div className="bg-[#f8f9fa] rounded-xl p-6 mb-8 text-left">
                <h3 className="font-semibold text-[#1a1a2e] mb-4">Order details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">Order number</span>
                    <span className="text-[#1a1a2e] font-medium">#TA-{Date.now().toString().slice(-6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">Estimated delivery</span>
                    <span className="text-[#1a1a2e]">5-7 business days</span>
                  </div>
                </div>
              </div>
              <Link href="/shop">
                <Button size="lg">Continue Shopping</Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/cart" className="flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#1a1a2e]">
            <ArrowLeft className="w-4 h-4" />
            Back to cart
          </Link>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#6b7280]" />
            <span className="text-sm text-[#6b7280]">Secure checkout</span>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {(['shipping', 'payment', 'review'] as const).map((step, index) => {
            const steps = ['shipping', 'payment', 'review'] as const;
            const validStep = currentStep as 'shipping' | 'payment' | 'review';
            const currentIndex = steps.indexOf(validStep);
            const isCompleted = index < currentIndex;
            const isCurrent = validStep === step;
            return (
              <React.Fragment key={step}>
                <div className={`flex items-center gap-2 ${isCurrent ? 'text-[#0f4c81]' : isCompleted ? 'text-[#0f4c81]' : 'text-[#6b7280]'}`}>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${isCurrent ? 'bg-[#0f4c81] text-white' : isCompleted ? 'bg-[#0f4c81] text-white' : 'bg-[#e5e7eb] text-[#6b7280]'}`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                  </span>
                  <span className="text-sm font-medium capitalize">{step}</span>
                </div>
                {index < 2 && <div className="w-16 h-px bg-[#e5e7eb]" />}
              </React.Fragment>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 md:p-8">
              {currentStep === 'shipping' && (
                <form onSubmit={handleShippingSubmit}>
                  <h2 className="text-xl font-semibold text-[#1a1a2e] mb-6">Shipping information</h2>
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-[#1a1a2e] block mb-2">First name</label>
                        <input required type="text" value={shippingInfo.firstName} onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81]" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#1a1a2e] block mb-2">Last name</label>
                        <input required type="text" value={shippingInfo.lastName} onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81]" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-[#1a1a2e] block mb-2">Email</label>
                        <input required type="email" value={shippingInfo.email} onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81]" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#1a1a2e] block mb-2">Phone</label>
                        <input required type="tel" value={shippingInfo.phone} onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81]" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#1a1a2e] block mb-2">Address</label>
                      <input required type="text" value={shippingInfo.address} onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81]" />
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium text-[#1a1a2e] block mb-2">City</label>
                        <input required type="text" value={shippingInfo.city} onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81]" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#1a1a2e] block mb-2">State</label>
                        <input required type="text" value={shippingInfo.state} onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81]" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#1a1a2e] block mb-2">ZIP code</label>
                        <input required type="text" value={shippingInfo.zip} onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81]" />
                      </div>
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="w-full mt-8">Continue to payment</Button>
                </form>
              )}

              {currentStep === 'payment' && (
                <form onSubmit={handlePaymentSubmit}>
                  <h2 className="text-xl font-semibold text-[#1a1a2e] mb-6">Payment details</h2>
                  <div className="flex items-center gap-2 mb-6 p-3 bg-[#f8f9fa] rounded-lg">
                    <CreditCard className="w-5 h-5 text-[#6b7280]" />
                    <span className="text-sm text-[#6b7280]">All transactions are secure and encrypted</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-[#1a1a2e] block mb-2">Card number</label>
                      <input required type="text" placeholder="1234 5678 9012 3456" value={paymentInfo.cardNumber} onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81]" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#1a1a2e] block mb-2">Name on card</label>
                      <input required type="text" value={paymentInfo.name} onChange={(e) => setPaymentInfo({ ...paymentInfo, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81]" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-[#1a1a2e] block mb-2">Expiry date</label>
                        <input required type="text" placeholder="MM/YY" value={paymentInfo.expiry} onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81]" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#1a1a2e] block mb-2">CVV</label>
                        <input required type="text" placeholder="123" value={paymentInfo.cvv} onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81]" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button type="button" onClick={() => setCurrentStep('shipping')} className="px-6 py-3 border border-[#e5e7eb] rounded-full text-sm font-medium hover:bg-[#f8f9fa] transition-colors">
                      Back
                    </button>
                    <Button type="submit" size="lg" className="flex-1">Review order</Button>
                  </div>
                </form>
              )}

              {currentStep === 'review' && (
                <form onSubmit={handleOrderSubmit}>
                  <h2 className="text-xl font-semibold text-[#1a1a2e] mb-6">Review your order</h2>
                  <div className="space-y-6">
                    <div className="p-4 bg-[#f8f9fa] rounded-xl">
                      <h3 className="font-medium text-[#1a1a2e] mb-2">Shipping to</h3>
                      <p className="text-sm text-[#6b7280]">
                        {shippingInfo.firstName} {shippingInfo.lastName}<br />
                        {shippingInfo.address}<br />
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
                      </p>
                    </div>
                    <div className="p-4 bg-[#f8f9fa] rounded-xl">
                      <h3 className="font-medium text-[#1a1a2e] mb-2">Payment</h3>
                      <p className="text-sm text-[#6b7280]">Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
                    </div>
                    <div className="border-t border-[#e5e7eb] pt-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-4 py-3">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#f8f9fa]">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[#1a1a2e]">{item.name}</p>
                            <p className="text-xs text-[#6b7280]">Qty: {item.quantity}</p>
                          </div>
                          <span className="text-sm font-medium text-[#1a1a2e]">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button type="button" onClick={() => setCurrentStep('payment')} className="px-6 py-3 border border-[#e5e7eb] rounded-full text-sm font-medium hover:bg-[#f8f9fa] transition-colors">
                      Back
                    </button>
                    <Button type="submit" size="lg" className="flex-1" isLoading={isProcessing}>
                      Place order — {formatPrice(total)}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-[#1a1a2e] mb-4">Order summary</h3>
              <div className="space-y-3 text-sm">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-[#6b7280]">{item.name} × {item.quantity}</span>
                    <span className="text-[#1a1a2e]">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-[#e5e7eb] pt-3">
                  <span className="text-[#6b7280]">Shipping</span>
                  <span className="text-[#1a1a2e]">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-[#1a1a2e]">Total</span>
                  <span className="text-[#1a1a2e]">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
