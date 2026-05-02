'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Plane } from 'lucide-react';
import { brandStory } from '@/data/products';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-[#1a1a2e]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
            alt="Travel"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <span className="text-[#0f4c81] text-sm font-medium uppercase tracking-wider">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mt-4 mb-6 tracking-tight">
              Built for the
              <br />
              modern traveler
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              {brandStory.mission}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1a1a2e] tracking-tight mb-4">
              What we stand for
            </h2>
            <p className="text-[#6b7280] max-w-xl mx-auto">
              Every decision we make is guided by these principles.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {brandStory.values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#0f4c81]/10 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6 text-[#0f4c81]" />
                </div>
                <h3 className="font-semibold text-[#1a1a2e] mb-2">{value.title}</h3>
                <p className="text-sm text-[#6b7280]">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1a1a2e] tracking-tight">
              Our journey
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {brandStory.timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 pb-8 relative"
              >
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-lg font-semibold text-[#0f4c81]">{item.year}</span>
                </div>
                <div className="flex-shrink-0 relative">
                  <div className="w-3 h-3 rounded-full bg-[#0f4c81] mt-2" />
                  {index < brandStory.timeline.length - 1 && (
                    <div className="absolute top-4 left-1/2 w-px h-full -translate-x-1/2 bg-[#e5e7eb]" />
                  )}
                </div>
                <div className="flex-1 pt-0.5">
                  <p className="text-[#1a1a2e]">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1a1a2e] tracking-tight mb-4">
              Ready to travel smarter?
            </h2>
            <p className="text-[#6b7280] max-w-xl mx-auto mb-8">
              Explore our collection of premium travel essentials.
            </p>
            <Link href="/shop">
              <Button size="lg">
                Shop Collection
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
