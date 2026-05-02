'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Check } from 'lucide-react';

interface FAQAccordionProps {
  faq: { question: string; answer: string };
  index: number;
}

function FAQAccordion({ faq, index }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-[#e5e7eb]"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left"
      >
        <span className="font-medium text-[#1a1a2e] pr-8">{faq.question}</span>
        <span className={`flex-shrink-0 w-6 h-6 rounded-full border border-[#e5e7eb] flex items-center justify-center transition-colors ${isOpen ? 'bg-[#0f4c81] border-[#0f4c81]' : ''}`}>
          {isOpen ? <Minus className="w-3 h-3 text-white" /> : <Plus className="w-3 h-3 text-[#6b7280]" />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-[#6b7280] leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface NewsletterProps {
  onSubmit?: (email: string) => void;
}

export function NewsletterSection({ onSubmit }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      onSubmit?.(email);
    }
  };

  return (
    <section className="py-20 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold text-[#1a1a2e] mb-4"
          >
            Stay in the loop
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#6b7280] mb-8"
          >
            Subscribe for exclusive offers, travel tips, and new product alerts.
          </motion.p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 py-4 px-6 bg-[#0f4c81]/10 rounded-full"
            >
              <Check className="w-5 h-5 text-[#0f4c81]" />
              <span className="text-[#0f4c81] font-medium">Thanks for subscribing!</span>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-3.5 rounded-full border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81] transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#1a1a2e] text-white text-sm font-medium rounded-full hover:bg-[#2d2d44] transition-colors"
              >
                Subscribe
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: {
    id: string;
    name: string;
    role: string;
    avatar: string;
    rating: number;
    text: string;
  };
  index: number;
}

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white p-6 rounded-xl border border-[#e5e7eb]"
    >
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < testimonial.rating ? 'text-[#f59e0b] fill-current' : 'text-[#e5e7eb]'}`}
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <p className="text-[#1a1a2e] text-sm leading-relaxed mb-4">&ldquo;{testimonial.text}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-[#f8f9fa]">
          <Image src={testimonial.avatar} alt={testimonial.name} width={40} height={40} className="object-cover" />
        </div>
        <div>
          <p className="text-sm font-medium text-[#1a1a2e]">{testimonial.name}</p>
          <p className="text-xs text-[#6b7280]">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

export function BenefitCard({ icon, title, description, index }: BenefitProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="text-center"
    >
      <div className="w-14 h-14 rounded-full bg-[#0f4c81]/10 flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-[#1a1a2e] mb-2">{title}</h3>
      <p className="text-sm text-[#6b7280]">{description}</p>
    </motion.div>
  );
}

export function FAQSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-semibold text-[#1a1a2e] text-center mb-12"
        >
          Common questions
        </motion.h2>
        <div>
          {faqs.map((faq, index) => (
            <FAQAccordion key={index} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
