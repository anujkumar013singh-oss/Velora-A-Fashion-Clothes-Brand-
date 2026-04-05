"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const collections = [
  { id: "summer", name: "Summer Edit", subtext: "Lightweight & Breathable", image: "/images/summer.jpg" },
  { id: "party", name: "Partywear", subtext: "Statement pieces", image: "/images/party.jpg" },
  { id: "work", name: "Workwear", subtext: "Modern Professional", image: "/images/work.jpg" },
];

export default function CollectionsPage() {
  return (
    <div className="pt-32 pb-20 container mx-auto px-4">
      <div className="max-w-2xl mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold uppercase tracking-tighter">Collections</h1>
        <p className="text-gray-500 max-w-lg">Explore our curated edits designed to inspire.</p>
      </div>
      
      <div className="space-y-32">
        {collections.map((col) => (
          <div key={col.id} className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2 aspect-[4/5] bg-gray-100 overflow-hidden">
               <img src={col.image} alt={col.name} className="w-full h-full object-cover" />
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-3xl font-serif italic">{col.name}</h2>
              <p className="text-gray-600">{col.subtext}</p>
              {/* Note: I removed the Link to prevent further crashes */}
              <div className="inline-flex items-center text-xs font-bold uppercase tracking-widest border-b border-black pb-1">
                Explore Collection <ArrowRight size={14} className="ml-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}