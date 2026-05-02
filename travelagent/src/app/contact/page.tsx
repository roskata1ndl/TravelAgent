'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Check } from 'lucide-react';
import { Camera as Instagram, MessageSquare as Twitter, Users as Facebook } from 'lucide-react';
import { faqData } from '@/data/products';
import { FAQSection } from '@/components/HomepageSections';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 md:py-24 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold text-[#1a1a2e] tracking-tight mb-4">
              Get in touch
            </h1>
            <p className="text-[#6b7280] max-w-xl mx-auto">
              Have a question or need help? We are here for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-semibold text-[#1a1a2e] mb-6">Send us a message</h2>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#0f4c81]/10 flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-[#0f4c81]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1a1a2e] mb-2">Message sent!</h3>
                  <p className="text-[#6b7280]">We will get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-[#1a1a2e] block mb-2">Name</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81] transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#1a1a2e] block mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81] transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1a1a2e] block mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81] transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1a1a2e] block mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81] transition-colors resize-none"
                      placeholder="Tell us more about your question..."
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    Send Message
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-semibold text-[#1a1a2e] mb-6">Contact information</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#f8f9fa] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#0f4c81]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#6b7280]">Email</p>
                      <a href="mailto:hello@travelagent.com" className="text-[#1a1a2e] hover:text-[#0f4c81]">
                        hello@travelagent.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#f8f9fa] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#0f4c81]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#6b7280]">Phone</p>
                      <a href="tel:+18001234567" className="text-[#1a1a2e] hover:text-[#0f4c81]">
                        +1 (800) 123-4567
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#f8f9fa] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#0f4c81]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#6b7280]">Office</p>
                      <p className="text-[#1a1a2e]">
                        123 Travel Way<br />
                        Brooklyn, NY 11201
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-[#1a1a2e] mb-4">Follow us</h3>
                <div className="flex gap-4">
                  {[Instagram, Twitter, Facebook].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 rounded-full border border-[#e5e7eb] flex items-center justify-center hover:border-[#0f4c81] hover:bg-[#0f4c81]/5 transition-all"
                    >
                      <Icon className="w-4 h-4 text-[#6b7280]" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-[#f8f9fa] rounded-xl">
                <p className="text-sm text-[#6b7280] mb-2">Business hours</p>
                <p className="text-[#1a1a2e]">Monday — Friday: 9am — 6pm EST</p>
                <p className="text-[#1a1a2e]">Saturday: 10am — 4pm EST</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FAQSection faqs={faqData} />
        </div>
      </section>
    </div>
  );
}
