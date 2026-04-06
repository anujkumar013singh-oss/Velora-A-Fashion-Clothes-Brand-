"use client";

import Link from "next/link";
import { getProductImage } from "@/lib/image-mapping";

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  tags: string;
  description?: string;
  discount?: number;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  category,
  tags,
  discount,
}: ProductCardProps) {
  const imgSrc = getProductImage(name, image);
  const showTrending = tags?.includes("Trending");

  return (
    <Link href={`/product/${id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-100 mb-4">
        <img
          src={imgSrc}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {discount != null && discount > 0 && (
          <span className="absolute top-3 left-3 bg-velora-wine text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1">
            {discount}% Off
          </span>
        )}
        {showTrending && (
          <span className="absolute top-3 right-3 bg-white/90 text-velora-black text-[10px] font-bold uppercase tracking-wider px-2 py-1">
            Trending
          </span>
        )}
      </div>
      <div className="space-y-1 text-center md:text-left">
        <p className="text-xs text-gray-500 uppercase tracking-widest">{category}</p>
        <h3 className="font-serif text-lg font-medium text-velora-black group-hover:text-velora-wine transition-colors line-clamp-2">
          {name}
        </h3>
        <p className="text-sm font-medium text-velora-black">
          {discount != null && discount > 0 ? (
            <>
              <span className="text-gray-400 line-through mr-2">
                ${price.toFixed(2)}
              </span>
              <span>${(price * (1 - discount / 100)).toFixed(2)}</span>
            </>
          ) : (
            <>${price.toFixed(2)}</>
          )}
        </p>
      </div>
    </Link>
  );
}
