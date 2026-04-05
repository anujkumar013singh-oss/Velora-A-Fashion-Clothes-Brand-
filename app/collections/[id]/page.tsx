"use client";

import ProductGrid from "@/components/product/ProductGrid";
import Image from "next/image";

export default function CollectionDetailPage() {
  // Static data so it never crashes
  const collection = {
    name: "Summer Edit",
    subtext: "Lightweight fabrics for the season",
    image: "/images/summer-collection.jpg",
    products: [] // Keep empty or add static products here
  };

  return (
    <div className="pt-24 pb-20 container mx-auto px-4">
      <div className="relative w-full h-[40vh] md:h-[50vh] rounded-sm overflow-hidden mb-8">
        <Image 
          src={collection.image} 
          alt={collection.name} 
          fill 
          className="object-cover"
          priority 
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white p-6">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 italic">{collection.name}</h1>
            <p className="text-lg md:text-xl font-light tracking-wide">{collection.subtext}</p>
          </div>
        </div>
      </div>
      <ProductGrid products={collection.products} />
    </div>
  );
}