'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Star, Plus } from 'lucide-react';
import { Product } from '@/data/products';
import { formatPrice, cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/product/${product.slug}`} className="group block">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-[#f8f9fa] mb-4">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {(product.featured || product.bestSeller) && (
            <div className="absolute top-3 left-3 flex gap-2">
              {product.bestSeller && (
                <span className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider bg-[#1a1a2e] text-white rounded-full">
                  Best Seller
                </span>
              )}
            </div>
          )}

          <button
            onClick={handleWishlist}
            className={cn(
              'absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200',
              inWishlist
                ? 'bg-[#0f4c81] text-white'
                : 'bg-white/90 text-[#6b7280] hover:bg-white hover:text-[#1a1a2e]'
            )}
          >
            <Heart className={cn('w-4 h-4', inWishlist && 'fill-current')} />
          </button>

          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleQuickAdd}
              className="w-full py-2.5 bg-[#1a1a2e] text-white text-sm font-medium rounded-full flex items-center justify-center gap-2 hover:bg-[#2d2d44] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Quick Add
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-3.5 h-3.5',
                  i < Math.floor(product.rating)
                    ? 'text-[#f59e0b] fill-current'
                    : 'text-[#e5e7eb]'
                )}
              />
            ))}
            <span className="text-xs text-[#6b7280] ml-1">({product.reviewCount})</span>
          </div>

          <h3 className="text-sm font-medium text-[#1a1a2e] group-hover:text-[#0f4c81] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#1a1a2e]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[#6b7280] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="flex gap-1.5 pt-1">
              {product.colors.slice(0, 3).map((color) => (
                <div
                  key={color.name}
                  className="w-4 h-4 rounded-full border border-[#e5e7eb]"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
