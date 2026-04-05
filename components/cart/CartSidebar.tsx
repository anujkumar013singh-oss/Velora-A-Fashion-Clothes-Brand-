"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { getProductImage } from "@/lib/image-mapping";
import { motion, AnimatePresence } from "framer-motion";

export default function CartSidebar() {
  const { isCartOpen, setIsCartOpen, items, removeItem, updateQuantity, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-serif font-bold">Shopping Bag</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                    <ShoppingBag size={24} />
                  </div>
                  <p className="text-gray-500">Your bag is empty.</p>
                  <Button variant="outline" onClick={() => setIsCartOpen(false)}>Continue Shopping</Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4">
                    <div className="relative w-20 h-28 bg-gray-100 rounded-sm flex-shrink-0">
                      <img 
                        src={getProductImage(item.name, item.image)} 
                        alt={item.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-medium line-clamp-2 pr-4">{item.name}</h3>
                          <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)}</p>
                        {(item.size || item.color) && (
                           <p className="text-xs text-gray-400 mt-1">
                             {item.size && `Size: ${item.size}`}
                             {item.size && item.color && ' | '}
                             {item.color && `Color: ${item.color}`}
                           </p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-500">Subtotal</span>
                  <span className="text-lg font-bold font-serif">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-400 mb-4 text-center">Shipping and taxes calculated at checkout.</p>
                <Button className="w-full">Checkout</Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
