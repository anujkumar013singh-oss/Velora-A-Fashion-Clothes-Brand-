"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string;
  category: string;
  tags: string;
  description: string;
}

interface ProductGridProps {
  products: Product[];
}

const categoryImages: Record<string, string> = {
  'Dresses': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
  'Tops': 'https://images.unsplash.com/photo-1551163943-3f6a29e3945a?auto=format&fit=crop&q=80&w=800',
  'Bottoms': 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800',
  'Outerwear': 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800',
  'Accessories': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
  'Knitwear': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800',
};

export default function ProductGrid({ products }: ProductGridProps) {
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      // If the param is a comma-separated list or just a single value
      // Our links send single values like ?category=Dresses
      // We capitalize it to match our internal categories list if needed, 
      // but our links are already "Dresses".
      // Let's just set it.
      // If we want to support multiple, we'd need to parse. For now, replace.
      setSelectedCategories([categoryParam]);
    }
  }, [searchParams]);

  const categories = ['Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Accessories', 'Knitwear'];
  const prices = [
    { label: "$0 - $100", min: 0, max: 100 },
    { label: "$100 - $300", min: 100, max: 300 },
    { label: "$300+", min: 300, max: 10000 },
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const togglePrice = (label: string) => {
    setPriceRange(prev => 
      prev.includes(label) ? prev.filter(p => p !== label) : [...prev, label]
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category Filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }

      // Price Filter
      if (priceRange.length > 0) {
        const matchesPrice = priceRange.some(label => {
          const range = prices.find(p => p.label === label);
          return range && product.price >= range.min && product.price <= range.max;
        });
        if (!matchesPrice) return false;
      }

      return true;
    });
  }, [products, selectedCategories, priceRange]);

  return (
    <div className="flex gap-12 relative">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden w-full mb-4">
         <Button 
           variant="outline" 
           size="sm" 
           className="w-full flex items-center justify-center"
           onClick={() => setMobileFiltersOpen(true)}
         >
           Filters <SlidersHorizontal size={14} className="ml-2" />
         </Button>
      </div>

      {/* Sidebar Filters (Desktop) */}
      <aside className="hidden md:block w-64 space-y-8 sticky top-32 h-fit">
        <div>
          <h3 className="font-bold mb-4 uppercase text-xs tracking-wider">Category</h3>
          <div className="space-y-2 text-sm text-gray-600">
            {categories.map(c => (
              <label key={c} className="flex items-center space-x-2 cursor-pointer hover:text-velora-black">
                <input 
                  type="checkbox" 
                  checked={selectedCategories.includes(c)}
                  onChange={() => toggleCategory(c)}
                  className="rounded border-gray-300 text-velora-black focus:ring-velora-black accent-velora-black" 
                />
                <span>{c}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-4 uppercase text-xs tracking-wider">Price</h3>
          <div className="space-y-2 text-sm text-gray-600">
            {prices.map(p => (
              <label key={p.label} className="flex items-center space-x-2 cursor-pointer hover:text-velora-black">
                <input 
                  type="checkbox" 
                  checked={priceRange.includes(p.label)}
                  onChange={() => togglePrice(p.label)}
                  className="rounded border-gray-300 text-velora-black focus:ring-velora-black accent-velora-black" 
                />
                <span>{p.label}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Mobile Filters Slide-over */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-0 z-[60] bg-white p-6 md:hidden overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-serif font-bold">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)}><X size={24}/></button>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-bold mb-4 uppercase text-xs tracking-wider">Category</h3>
                <div className="space-y-3">
                  {categories.map(c => (
                    <label key={c} className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(c)}
                        onChange={() => toggleCategory(c)}
                        className="w-5 h-5 rounded border-gray-300 accent-velora-black" 
                      />
                      <span className="text-base">{c}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold mb-4 uppercase text-xs tracking-wider">Price</h3>
                <div className="space-y-3">
                  {prices.map(p => (
                    <label key={p.label} className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        checked={priceRange.includes(p.label)}
                        onChange={() => togglePrice(p.label)}
                        className="w-5 h-5 rounded border-gray-300 accent-velora-black" 
                      />
                      <span className="text-base">{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Button className="w-full" onClick={() => setMobileFiltersOpen(false)}>Show Results</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Grid */}
      <div className="flex-1">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No products match your filters.</p>
            <Button variant="outline" className="mt-4" onClick={() => { setSelectedCategories([]); setPriceRange([]); }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.images.split(',')[0].startsWith('http') ? product.images.split(',')[0] : categoryImages[product.category] || categoryImages['Dresses']}
                category={product.category}
                tags={product.tags}
                description={product.description}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
