"use client";

import { useState, useEffect } from "react";
import { Search, X, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useDebounce } from "@/hooks/useDebounce";

// Define local interfaces for the component
interface SearchProduct {
  id: string;
  name: string;
  price: number;
  images: string;
  category: string;
}

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  // Custom hook usage or simple timeout
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        // We'll create an API route for this later, for now simulate or call server action if possible
        // But since we are in client component, let's fetch from a simple API route we will create
        const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Search error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Focus input
      setTimeout(() => document.getElementById("search-input")?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      router.push(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-md"
        >
          <div className="container mx-auto px-6 pt-8 h-full flex flex-col">
            <div className="flex justify-end mb-8">
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="relative mb-12">
              <input
                id="search-input"
                type="text"
                placeholder="Search for products, collections..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-3xl md:text-5xl font-serif border-b-2 border-gray-200 py-4 focus:outline-none focus:border-black bg-transparent placeholder:text-gray-300"
              />
              <button 
                type="submit" 
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:text-velora-wine transition-colors"
              >
                <Search size={32} />
              </button>
            </form>

            <div className="flex-1 overflow-y-auto pb-20">
              {loading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="animate-spin text-gray-400" size={32} />
                </div>
              ) : results.length > 0 ? (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">Results</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {results.map((product) => (
                      <Link 
                        key={product.id} 
                        href={`/product/${product.id}`}
                        onClick={onClose}
                        className="group flex gap-4 md:block"
                      >
                        <div className="relative w-20 md:w-full aspect-[3/4] bg-gray-100 overflow-hidden rounded-sm flex-shrink-0">
                          <Image 
                            src={product.images.split(',')[0]} 
                            alt={product.name} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                        </div>
                        <div className="md:mt-3">
                          <p className="text-xs text-gray-500 uppercase">{product.category}</p>
                          <h4 className="font-medium group-hover:underline decoration-1 underline-offset-4">{product.name}</h4>
                          <p className="text-sm text-gray-900 mt-1">${product.price.toFixed(2)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-8 text-center">
                    <button 
                      onClick={handleSearchSubmit}
                      className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-velora-wine hover:border-velora-wine transition-colors"
                    >
                      View All Results
                    </button>
                  </div>
                </div>
              ) : query.length > 1 ? (
                <div className="text-center py-20 text-gray-500">
                  No results found for "{query}"
                </div>
              ) : (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">Popular Searches</h3>
                  <div className="flex flex-wrap gap-3">
                    {['Summer Dresses', 'Leather Bags', 'Silk Tops', 'Evening Wear', 'Accessories'].map((term) => (
                      <button 
                        key={term}
                        onClick={() => { setQuery(term); }}
                        className="px-4 py-2 bg-gray-50 hover:bg-black hover:text-white rounded-full text-sm transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
