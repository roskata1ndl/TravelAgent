'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Truck, RefreshCw, Leaf } from 'lucide-react';
import { products, testimonials, faqData } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { NewsletterSection, TestimonialCard, BenefitCard, FAQSection } from '@/components/HomepageSections';
import { Button } from '@/components/ui/Button';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1a1a2e]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80"
            alt="Travel"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/90 via-[#1a1a2e]/60 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium uppercase tracking-wider text-white/80">
                New Collection
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] tracking-tight mb-6"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.03em' }}
            >
              Travel with
              <br />
              <span className="text-[#0f4c81]">intention.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-white/70 mb-10 max-w-lg leading-relaxed"
            >
              Premium travel essentials designed for the modern explorer.
              Quality that lasts, design that delights.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop">
                <Button size="lg" className="bg-white text-[#1a1a2e] hover:bg-white/90 w-full sm:w-auto">
                  Shop Collection
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 w-full sm:w-auto">
                  Our Story
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-[#f8f9fa] border-y border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { icon: Truck, label: 'Free shipping over $150' },
              { icon: RefreshCw, label: '30-day returns' },
              { icon: Shield, label: 'Lifetime warranty' },
              { icon: Leaf, label: 'Carbon neutral' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm text-[#6b7280]">
                <Icon className="w-5 h-5 text-[#0f4c81]" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#1a1a2e] tracking-tight">
                Featured
              </h2>
              <p className="text-[#6b7280] mt-2">Our most loved travel essentials.</p>
            </div>
            <Link
              href="/shop"
              className="text-sm font-medium text-[#0f4c81] hover:text-[#0a3a63] transition-colors flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle Section */}
      <section className="py-20 md:py-28 bg-[#1a1a2e]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <span className="text-[#0f4c81] text-sm font-medium uppercase tracking-wider">
                The Philosophy
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mt-4 mb-6 tracking-tight">
                Less clutter.
                <br />
                More clarity.
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                We believe in the power of organized travel. When everything has its place,
                you can focus on what matters most — the journey itself. Our products are
                designed to simplify, not complicate.
              </p>
              <Link href="/about">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden order-1 lg:order-2"
            >
              <Image
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&q=80"
                alt="Organized travel"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 md:py-28 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#1a1a2e] tracking-tight">
                Best sellers
              </h2>
              <p className="text-[#6b7280] mt-2">Proven favorites from our collection.</p>
            </div>
            <Link
              href="/shop"
              className="text-sm font-medium text-[#0f4c81] hover:text-[#0a3a63] transition-colors flex items-center gap-1"
            >
              Shop all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1a1a2e] tracking-tight mb-4">
              Why Travel Agent
            </h2>
            <p className="text-[#6b7280] max-w-xl mx-auto">
              We obsess over the details so you can focus on the adventure.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <BenefitCard
              icon={<Shield className="w-6 h-6 text-[#0f4c81]" />}
              title="Lifetime Warranty"
              description="Every product is built to last. We stand behind our craftsmanship."
              index={0}
            />
            <BenefitCard
              icon={<Truck className="w-6 h-6 text-[#0f4c81]" />}
              title="Free Shipping"
              description="On all orders over $150. Fast, reliable delivery worldwide."
              index={1}
            />
            <BenefitCard
              icon={<RefreshCw className="w-6 h-6 text-[#0f4c81]" />}
              title="Easy Returns"
              description="Not the right fit? Return within 30 days, no questions asked."
              index={2}
            />
            <BenefitCard
              icon={<Leaf className="w-6 h-6 text-[#0f4c81]" />}
              title="Eco Conscious"
              description="Sustainable materials and carbon-neutral shipping."
              index={3}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1a1a2e] tracking-tight">
              What travelers say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection />

      {/* FAQ */}
      <FAQSection faqs={faqData} />
    </div>
  );
}
