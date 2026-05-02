'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Minus, Plus, Star, ChevronRight, Truck, Shield, RefreshCw, ArrowLeft } from 'lucide-react';
import { products, testimonials } from '@/data/products';
import { formatPrice, cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/ProductCard';
import { FAQAccordion } from '@/components/HomepageSections';

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}

function ProductDetail({ product }: { product: (typeof products)[0] }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const relatedProducts = useMemo(
    () => products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4),
    [product.category, product.id]
  );

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0],
      color: selectedColor,
      size: selectedSize,
    });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-[#6b7280]">
          <Link href="/" className="hover:text-[#1a1a2e]">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/shop" className="hover:text-[#1a1a2e]">Shop</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/shop?category=${product.category.toLowerCase()}`} className="hover:text-[#1a1a2e]">
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#1a1a2e]">{product.name}</span>
        </nav>
      </div>

      {/* Product */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-[#f8f9fa]"
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'relative w-20 h-20 rounded-lg overflow-hidden bg-[#f8f9fa] transition-all',
                      selectedImage === index ? 'ring-2 ring-[#0f4c81]' : 'opacity-60 hover:opacity-100'
                    )}
                  >
                    <Image src={image} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="mb-6">
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-4 h-4',
                      i < Math.floor(product.rating) ? 'text-[#f59e0b] fill-current' : 'text-[#e5e7eb]'
                    )}
                  />
                ))}
                <span className="text-sm text-[#6b7280] ml-2">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold text-[#1a1a2e] tracking-tight mb-2">
                {product.name}
              </h1>
              <p className="text-[#6b7280]">{product.shortDescription}</p>
            </div>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-2xl font-semibold text-[#1a1a2e]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-[#6b7280] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="px-2 py-0.5 bg-[#0f4c81] text-white text-xs font-medium rounded-full">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-[#1a1a2e]">Color</span>
                  <span className="text-sm text-[#6b7280]">{selectedColor}</span>
                </div>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={cn(
                        'w-10 h-10 rounded-full transition-all relative',
                        selectedColor === color.name && 'ring-2 ring-offset-2 ring-[#0f4c81]'
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor === color.name && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="w-3 h-3 rounded-full bg-white" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-[#1a1a2e]">Size</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        'px-4 py-2 rounded-lg border text-sm font-medium transition-all',
                        selectedSize === size
                          ? 'bg-[#1a1a2e] text-white border-[#1a1a2e]'
                          : 'border-[#e5e7eb] hover:border-[#1a1a2e]'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <span className="text-sm font-medium text-[#1a1a2e] block mb-3">Quantity</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#e5e7eb] rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-[#f8f9fa] transition-colors rounded-l-full"
                  >
                    <Minus className="w-4 h-4 text-[#6b7280]" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-[#f8f9fa] transition-colors rounded-r-full"
                  >
                    <Plus className="w-4 h-4 text-[#6b7280]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <Button onClick={handleAddToCart} size="lg" className="flex-1">
                Add to Cart
              </Button>
              <button
                onClick={() => toggleItem(product.id)}
                className={cn(
                  'w-12 h-12 rounded-full border flex items-center justify-center transition-all',
                  inWishlist
                    ? 'bg-[#0f4c81] border-[#0f4c81] text-white'
                    : 'border-[#e5e7eb] hover:border-[#1a1a2e]'
                )}
              >
                <Heart className={cn('w-5 h-5', inWishlist && 'fill-current')} />
              </button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-[#f8f9fa] rounded-xl">
              <div className="text-center">
                <Truck className="w-5 h-5 text-[#0f4c81] mx-auto mb-2" />
                <span className="text-xs text-[#6b7280]">Free shipping</span>
              </div>
              <div className="text-center">
                <Shield className="w-5 h-5 text-[#0f4c81] mx-auto mb-2" />
                <span className="text-xs text-[#6b7280]">Lifetime warranty</span>
              </div>
              <div className="text-center">
                <RefreshCw className="w-5 h-5 text-[#0f4c81] mx-auto mb-2" />
                <span className="text-xs text-[#6b7280]">30-day returns</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-[#1a1a2e] mb-4">About this item</h2>
            <p className="text-[#6b7280] leading-relaxed">{product.description}</p>
          </div>

          {/* Specs */}
          {product.specs && (
            <div>
              <h2 className="text-xl font-semibold text-[#1a1a2e] mb-4">Specifications</h2>
              <div className="space-y-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-[#e5e7eb]">
                    <span className="text-[#6b7280]">{key}</span>
                    <span className="text-[#1a1a2e] font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Highlights */}
        {product.highlights && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-[#1a1a2e] mb-4">Key features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {product.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#0f4c81]/10 flex items-center justify-center flex-shrink-0">
                    <span className="w-2 h-2 rounded-full bg-[#0f4c81]" />
                  </span>
                  <span className="text-[#6b7280]">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Reviews */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-[#1a1a2e] mb-8">Customer reviews</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.slice(0, 4).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'w-4 h-4',
                        i < testimonial.rating ? 'text-[#f59e0b] fill-current' : 'text-[#e5e7eb]'
                      )}
                    />
                  ))}
                </div>
                <p className="text-[#1a1a2e] text-sm leading-relaxed mb-4">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f8f9fa]" />
                  <div>
                    <p className="text-sm font-medium text-[#1a1a2e]">{testimonial.name}</p>
                    <p className="text-xs text-[#6b7280]">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-[#1a1a2e] mb-8">You may also like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
