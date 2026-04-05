"use client";

import Image from "next/image";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { getProductImage } from "@/lib/image-mapping";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  tags?: string;
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
  description,
  discount 
}: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const tagsList = tags ? tags.split(",") : [];
  
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    addItem({
      id,
      name,
      price: discount ? price * (1 - discount / 100) : price,
      image,
      size: selectedSize || 'M',
      color: 'Black' 
    });

    setTimeout(() => setIsAdding(false), 2000);
  };

  const discountedPrice = discount ? price * (1 - discount / 100) : price;

  return (
    <div className="group block relative cursor-default">
      {/* Container - No longer a Link */}
      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4] mb-4 rounded-sm">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {tagsList.map((tag) => (
            <span key={tag} className="bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase px-2 py-1 tracking-wider text-velora-black">
              {tag}
            </span>
          ))}
          {discount && (
            <span className="bg-velora-wine/90 backdrop-blur-sm text-[10px] font-bold uppercase px-2 py-1 tracking-wider text-white">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-velora-wine">
          <Heart size={16} />
        </button>

        {/* Image */}
        <img
          src={getProductImage(name, image)}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Quick Add Overlay - Still works for adding to cart! */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/95 backdrop-blur-sm border-t border-gray-100">
           <div className="flex flex-col space-y-3">
             <div className="flex justify-center space-x-2">
               {sizes.map(size => (
                 <button 
                  key={size}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center text-[10px] border transition-colors",
                    selectedSize === size 
                      ? "bg-black text-white border-black" 
                      : "border-gray-300 hover:border-black text-gray-600"
                  )}
                  onClick={() => setSelectedSize(size)}
                 >
                   {size}
                 </button>
               ))}
             </div>
             <button 
              onClick={handleAddToCart}
              className="w-full bg-black text-white text-xs uppercase font-bold py-3 tracking-widest hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
             >
               {isAdding ? <Check size={14} /> : <ShoppingBag size={14} />}
               {isAdding ? "Added" : "Add to Cart"}
             </button>
           </div>
        </div>
      </div>

      {/* Info Section - No hover underline anymore */}
      <div className="space-y-1">
        <p className="text-xs text-gray-500 uppercase tracking-wide">{category}</p>
        <h3 className="text-sm font-medium text-velora-black truncate">
          {name}
        </h3>
        {description && (
           <p className="text-xs text-gray-500 line-clamp-1 mb-1">{description}</p>
        )}
        <div className="flex items-center gap-2">
          <span className={cn("text-sm font-medium", discount ? "text-velora-wine" : "text-gray-900")}>
            ${discountedPrice.toFixed(2)}
          </span>
          {discount && (
            <span className="text-xs text-gray-400 line-through">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}