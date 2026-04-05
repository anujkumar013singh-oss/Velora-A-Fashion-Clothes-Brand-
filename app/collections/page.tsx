"use client";

import ProductCard from "@/components/ui/ProductCard";

// STATIC DATA - This will never crash on Vercel
const featuredProducts = [
  { id: "1", name: "Classic Black Hoodie", price: 89.00, category: "Outerwear", image: "hoodie-black.jpg", tags: "New" },
  { id: "2", name: "Tailored Blazer", price: 159.00, category: "Outerwear", image: "blazer-black.jpg", tags: "Premium" },
  { id: "3", name: "Luxe Silk Gown", price: 299.00, category: "Partywear", image: "dress-1.jpg", tags: "Special" },
  { id: "4", name: "Premium Wool Coat", price: 450.00, category: "Outerwear", image: "coat-1.jpg", tags: "Winter" }
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="h-[70vh] bg-gray-50 flex items-center justify-center border-b border-gray-100">
        <div className="text-center space-y-4">
          <h1 className="text-7xl font-serif italic tracking-tighter text-velora-black">VELORA</h1>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Modern Luxury Fashion</p>
        </div>
      </section>

      {/* Featured Collection Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">Editor's Choice</h2>
            <h3 className="text-3xl font-serif italic">Featured Collection</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </main>
  );
}