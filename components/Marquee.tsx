"use client";

import { motion } from "framer-motion";

export default function Marquee() {
  const text = "FRIDAY SALE IS LIVE • UP TO 50% OFF • SHOP NOW • FREE SHIPPING ON ORDERS OVER $200 • ";
  const repeatedText = Array(4).fill(text).join("");

  return (
    <div className="bg-velora-black text-white py-4 overflow-hidden whitespace-nowrap relative border-y border-gray-800">
      <motion.div 
        className="inline-block"
        animate={{ x: [0, -1000] }}
        transition={{ 
          repeat: Infinity, 
          ease: "linear", 
          duration: 40 // Slower, more elegant speed
        }}
      >
        <span className="text-sm md:text-base font-medium tracking-[0.2em] uppercase">
          {repeatedText}
        </span>
      </motion.div>
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-velora-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-velora-black to-transparent z-10" />
    </div>
  );
}
