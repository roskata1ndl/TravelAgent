'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { products, categories } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { cn } from '@/lib/utils';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest' | 'rating';

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedRating, setSelectedRating] = useState(0);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (selectedCategory !== 'all') {
      const categoryMap: Record<string, string> = {
        luggage: 'Luggage',
        backpacks: 'Backpacks',
        organizers: 'Organizers',
        'tech-accessories': 'Tech Accessories',
        'travel-essentials': 'Travel Essentials',
      };
      const categoryName = categoryMap[selectedCategory];
      if (categoryName) {
        result = result.filter((p) => p.category === categoryName);
      }
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (selectedRating > 0) {
      result = result.filter((p) => p.rating >= selectedRating);
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.reverse();
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : -1) - (a.featured ? 1 : -1));
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy, priceRange, selectedRating]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('featured');
    setPriceRange([0, 500]);
    setSelectedRating(0);
  };

  const hasActiveFilters =
    searchQuery || selectedCategory !== 'all' || selectedRating > 0 || priceRange[0] > 0 || priceRange[1] < 500;

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-12 bg-[#f8f9fa] border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-semibold text-[#1a1a2e] tracking-tight mb-4">
              Shop
            </h1>
            <p className="text-[#6b7280] max-w-xl mx-auto">
              Everything you need for your next adventure.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-3 rounded-full border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1"
              >
                <X className="w-4 h-4 text-[#6b7280]" />
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none pl-4 pr-10 py-3 rounded-full border border-[#e5e7eb] text-sm bg-white cursor-pointer outline-none focus:border-[#0f4c81] transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280] pointer-events-none" />
            </div>

            <button
              onClick={() => setIsFilterOpen(true)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 rounded-full border text-sm transition-colors',
                isFilterOpen || hasActiveFilters
                  ? 'bg-[#1a1a2e] text-white border-[#1a1a2e]'
                  : 'border-[#e5e7eb] hover:border-[#1a1a2e]'
              )}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-[#0f4c81] rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => setSelectedCategory(category.slug)}
              className={cn(
                'flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-colors',
                selectedCategory === category.slug
                  ? 'bg-[#1a1a2e] text-white'
                  : 'bg-[#f8f9fa] text-[#6b7280] hover:bg-[#e8ecf0]'
              )}
            >
              {category.name}
              <span className="ml-2 text-xs opacity-60">{category.count}</span>
            </button>
          ))}
        </div>

        {/* Results */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg font-medium text-[#1a1a2e] mb-2">No products found</p>
            <p className="text-sm text-[#6b7280] mb-6">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-[#1a1a2e] text-white text-sm font-medium rounded-full hover:bg-[#2d2d44] transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-[#6b7280] mb-6">
              Showing {filteredProducts.length} products
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Filter Sidebar */}
      {isFilterOpen && (
        <>
          <div
            className="fixed inset-0 bg-[#1a1a2e]/30 backdrop-blur-sm z-50"
            onClick={() => setIsFilterOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#e5e7eb] p-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1a1a2e]">Filters</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 rounded-full hover:bg-[#f8f9fa] transition-colors"
              >
                <X className="w-5 h-5 text-[#6b7280]" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-[#1a1a2e] mb-4">Price range</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-xs text-[#6b7280] block mb-1">Min</label>
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full px-3 py-2 rounded-lg border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81]"
                      min={0}
                    />
                  </div>
                  <span className="text-[#6b7280] mt-5">—</span>
                  <div className="flex-1">
                    <label className="text-xs text-[#6b7280] block mb-1">Max</label>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full px-3 py-2 rounded-lg border border-[#e5e7eb] text-sm outline-none focus:border-[#0f4c81]"
                      max={500}
                    />
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="font-semibold text-[#1a1a2e] mb-4">Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={selectedRating === rating}
                        onChange={() => setSelectedRating(rating)}
                        className="w-4 h-4 accent-[#0f4c81]"
                      />
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < rating ? 'text-[#f59e0b] fill-current' : 'text-[#e5e7eb]'}`}
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                        <span className="text-xs text-[#6b7280]">& up</span>
                      </div>
                    </label>
                  ))}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === 0}
                      onChange={() => setSelectedRating(0)}
                      className="w-4 h-4 accent-[#0f4c81]"
                    />
                    <span className="text-sm text-[#6b7280]">All ratings</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-[#e5e7eb] p-6 flex gap-4">
              <button
                onClick={clearFilters}
                className="flex-1 py-3 border border-[#e5e7eb] rounded-full text-sm font-medium hover:bg-[#f8f9fa] transition-colors"
              >
                Clear all
              </button>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="flex-1 py-3 bg-[#1a1a2e] text-white rounded-full text-sm font-medium hover:bg-[#2d2d44] transition-colors"
              >
                Show {filteredProducts.length} results
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
