'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Menu, X, Search, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { itemCount, setIsOpen: setCartOpen } = useCart();
  const { items: wishlistItems } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white/95 backdrop-blur-md shadow-sm'
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-45 h-45 flex-shrink-0">
                  <Image
                    src="/brand_assets/BrandLogo.png"
                    alt="Travel Agent Logo"
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    fill
                  />
                </div>

              </Link>

              <div className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-sm font-medium transition-colors duration-200',
                      isScrolled
                        ? 'text-[#1a1a2e]/70 hover:text-[#1a1a2e]'
                        : 'text-[#1a1a2e]/80 hover:text-[#1a1a2e]'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className={cn(
                  'p-2 rounded-full transition-colors duration-200',
                  isScrolled
                    ? 'text-[#1a1a2e]/70 hover:text-[#1a1a2e] hover:bg-[#f8f9fa]'
                    : 'text-[#1a1a2e]/80 hover:text-[#1a1a2e] hover:bg-white/10'
                )}
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/account"
                className={cn(
                  'hidden sm:flex p-2 rounded-full transition-colors duration-200',
                  isScrolled
                    ? 'text-[#1a1a2e]/70 hover:text-[#1a1a2e] hover:bg-[#f8f9fa]'
                    : 'text-[#1a1a2e]/80 hover:text-[#1a1a2e] hover:bg-white/10'
                )}
              >
                <User className="w-5 h-5" />
              </Link>

              <Link
                href="/wishlist"
                className={cn(
                  'hidden sm:flex p-2 rounded-full transition-colors duration-200 relative',
                  isScrolled
                    ? 'text-[#1a1a2e]/70 hover:text-[#1a1a2e] hover:bg-[#f8f9fa]'
                    : 'text-[#1a1a2e]/80 hover:text-[#1a1a2e] hover:bg-white/10'
                )}
              >
                <Heart className="w-5 h-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#0f4c81] text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setCartOpen(true)}
                className={cn(
                  'p-2 rounded-full transition-colors duration-200 relative',
                  isScrolled
                    ? 'text-[#1a1a2e]/70 hover:text-[#1a1a2e] hover:bg-[#f8f9fa]'
                    : 'text-[#1a1a2e]/80 hover:text-[#1a1a2e] hover:bg-white/10'
                )}
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#0f4c81] text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={cn(
                  'lg:hidden p-2 rounded-full transition-colors duration-200',
                  isScrolled
                    ? 'text-[#1a1a2e]/70 hover:text-[#1a1a2e] hover:bg-[#f8f9fa]'
                    : 'text-[#1a1a2e]/80 hover:text-[#1a1a2e] hover:bg-white/10'
                )}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#1a1a2e]/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-[300px] bg-white shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-[#e5e7eb]">
                  <span className="font-semibold text-lg text-[#1a1a2e]">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-[#f8f9fa] transition-colors"
                  >
                    <X className="w-5 h-5 text-[#1a1a2e]" />
                  </button>
                </div>
                <nav className="flex-1 p-6 space-y-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-lg font-medium text-[#1a1a2e] hover:text-[#0f4c81] transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t border-[#e5e7eb] pt-6 space-y-4">
                    <Link
                      href="/account"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-[#1a1a2e]/70 hover:text-[#0f4c81] transition-colors"
                    >
                      <User className="w-5 h-5" />
                      Account
                    </Link>
                    <Link
                      href="/wishlist"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-[#1a1a2e]/70 hover:text-[#0f4c81] transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                      Wishlist ({wishlistItems.length})
                    </Link>
                  </div>
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-24"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#1a1a2e]/50 backdrop-blur-sm"
              onClick={() => setIsSearchOpen(false)}
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="relative w-full max-w-xl mx-auto px-6"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-4 p-4">
                  <Search className="w-5 h-5 text-[#6b7280]" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    autoFocus
                    className="flex-1 text-lg outline-none placeholder:text-[#6b7280]"
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 rounded-full hover:bg-[#f8f9fa] transition-colors"
                  >
                    <X className="w-5 h-5 text-[#6b7280]" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
