"use client";

import ProductCard from "@/components/ui/ProductCard";

// This is your static data that won't crash on Vercel
const products = [
  {
    id: "1",
    name: "Classic Black Hoodie",
    price: 89.00,
    category: "Outerwear",
    image: "hoodie-black.jpg",
    tags: "New Arrival",
    description: "Premium cotton oversized hoodie"
  },
  {
    id: "2",
    name: "Tailored Blazer",
    price: 159.00,
    category: "Outerwear",
    image: "blazer-black.jpg",
    tags: "Premium",
    description: "Modern fit black blazer"
  },
  {
    id: "3",
    name: "Silk V-Neck T-Shirt",
    price: 45.00,
    category: "Tops",
    image: "vneck-black.jpg",
    discount: 10,
    description: "Soft touch luxury cotton blend"
  }
];

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 uppercase tracking-widest text-center">Our Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}