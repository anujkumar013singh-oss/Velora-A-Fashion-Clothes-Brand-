"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { Star } from "lucide-react";

interface AddToCartSectionProps {
  product: {
    id: string;
    name: string;
    price: number;
    images: string;
  };
}

export default function AddToCartSection({ product }: AddToCartSectionProps) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState<string>("Black");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    setIsLoading(true);
    // Simulate network delay for effect
    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images.split(",")[0],
        size: selectedSize,
        color: selectedColor,
      });
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-6 mb-8">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider mb-2 block">Color: {selectedColor}</label>
        <div className="flex space-x-3">
          {["Black", "Beige", "Wine"].map((color) => {
             const bgClass = color === "Black" ? "bg-black" : color === "Beige" ? "bg-[#E5E0D8]" : "bg-[#4A0404]";
             return (
               <button
                 key={color}
                 onClick={() => setSelectedColor(color)}
                 className={`w-8 h-8 rounded-full ${bgClass} border-2 border-transparent transition-all ${
                   selectedColor === color ? "ring-1 ring-offset-2 ring-gray-400" : ""
                 }`}
                 aria-label={color}
               />
             );
          })}
        </div>
      </div>
      
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider">Size: {selectedSize}</label>
          <button className="text-xs underline text-gray-500 hover:text-black">Size Guide</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {["XS", "S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-10 border flex items-center justify-center text-sm font-medium transition-all ${
                selectedSize === size
                  ? "border-black bg-black text-white"
                  : "border-gray-300 hover:border-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex space-x-4">
        <Button 
          size="lg" 
          className="flex-1" 
          onClick={handleAddToCart}
          isLoading={isLoading}
        >
          Add to Cart
        </Button>
        <Button size="lg" variant="outline" className="px-4">
          <Star size={20} />
        </Button>
      </div>
    </div>
  );
}
