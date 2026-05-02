'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/ProductCard';

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();
  const wishlistProducts = products.filter((p) => items.includes(p.id));

  return (
    <div className="min-h-screen pt-20">
      <section className="py-12 bg-[#f8f9fa] border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <Heart className="w-8 h-8 text-[#0f4c81]" />
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-[#1a1a2e] tracking-tight">
                Wishlist
              </h1>
              <p className="text-[#6b7280]">{items.length} items saved</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {wishlistProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-full bg-[#f8f9fa] flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-[#6b7280]" />
              </div>
              <h2 className="text-xl font-semibold text-[#1a1a2e] mb-2">Your wishlist is empty</h2>
              <p className="text-[#6b7280] mb-6">Save items you love for later.</p>
              <Link href="/shop">
                <Button>
                  Continue Shopping
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {wishlistProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
