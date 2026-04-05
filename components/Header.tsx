"use client";

import Link from "next/link";
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import SearchOverlay from "@/components/SearchOverlay";

import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { setIsCartOpen, cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "New Arrivals", href: "/" },
    { name: "Trending", href: "/trending" },
    { name: "Shop", href: "/products" },
    { name: "Learning", href: "/learning" },
    { name: "About Us", href: "/about" },
    { name: "Track Order", href: "/track-order" },
  ];

  return (
    <>
      <header
        className={cn(
          "w-full z-50 transition-all duration-300 border-b border-transparent",
          isHome ? "fixed top-0" : "sticky top-0",
          isScrolled || megaMenuOpen || !isHome ? "bg-white/90 backdrop-blur-md py-4 border-gray-100 shadow-sm" : "bg-transparent py-6"
        )}
        onMouseLeave={() => setMegaMenuOpen(false)}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-serif font-bold tracking-widest text-velora-black z-50 relative">
            VELORA
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" onMouseLeave={() => setHoveredLink(null)}>
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative h-full flex items-center"
                onMouseEnter={() => {
                 
                  setHoveredLink(link.name);
                }}
              >
                <Link
                  href={link.href}
                  className="relative text-sm font-medium text-velora-charcoal hover:text-velora-black transition-colors uppercase tracking-wide flex items-center gap-1 py-2"
                >
                  {link.name}
                  
                  {hoveredLink === link.name && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-velora-wine"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-6 text-velora-charcoal z-50 relative">
            <button className="hidden md:block hover:text-velora-black transition-colors">
              <Heart size={20} strokeWidth={1.5} />
            </button>
            <button 
              className="hover:text-velora-black transition-colors relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-velora-wine text-white text-[10px] rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="hidden md:block hover:text-velora-black transition-colors">
              <User size={20} strokeWidth={1.5} />
            </button>
            <button 
              className="md:hidden hover:text-velora-black transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */} 
      </header>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white"
          >
            <div className="flex flex-col h-full pt-24 px-6 pb-8">
              <nav className="flex-1 space-y-6">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className="text-3xl font-serif font-medium text-velora-black flex justify-between items-center group"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                      <ChevronRight className="text-gray-300 group-hover:text-velora-black transition-colors" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="border-t border-gray-100 pt-8">
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/account" className="flex items-center space-x-2 text-gray-600">
                    <User size={20} />
                    <span>My Account</span>
                  </Link>
                  <Link href="/wishlist" className="flex items-center space-x-2 text-gray-600">
                    <Heart size={20} />
                    <span>Wishlist</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
