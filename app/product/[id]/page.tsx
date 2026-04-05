import { prisma } from "@/lib/prisma";
import { getProductImage } from "@/lib/image-mapping";
import { Button } from "@/components/ui/Button";
import ProductCard from "@/components/ui/ProductCard";
import AddToCartSection from "@/components/product/AddToCartSection";
import { Star, Truck, ShieldCheck, ArrowRight } from "lucide-react";

async function getProduct(id: string) {
  return await prisma.product.findUnique({
    where: { id },
  });
}

async function getRelatedProducts(category: string, currentId: string) {
  return await prisma.product.findMany({
    where: { 
      category, 
      id: { not: currentId } 
    },
    take: 4,
  });
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    return <div className="pt-32 text-center">Product not found</div>;
  }

  const relatedProducts = await getRelatedProducts(product.category, product.id);
  const images = product.images.split(',');

  return (
    <div className="pt-24 pb-20 container mx-auto px-6">
      {/* Product Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Left: Images */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] bg-gray-100 rounded-sm overflow-hidden">
             <img
              src={getProductImage(product.name, images[0])}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
             {images.map((img, i) => (
                <div key={i} className="relative aspect-square bg-gray-100 rounded-sm overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                  <img 
                    src={getProductImage(product.name, img)} 
                    alt={`${product.name} ${i}`} 
                    className="w-full h-full object-cover" 
                  />
                </div>
             ))}
             {/* Placeholder for more images if only 1 exists */}
             {images.length === 1 && [1,2,3].map(i => (
                <div key={i} className="relative aspect-square bg-gray-100 rounded-sm overflow-hidden opacity-50"></div>
             ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <div className="mb-2 flex items-center space-x-2">
             <span className="text-xs font-bold uppercase tracking-wider text-velora-wine">{product.category}</span>
             {product.tags && <span className="text-xs text-gray-400">| {product.tags}</span>}
          </div>
          <h1 className="text-4xl font-serif font-bold mb-4">{product.name}</h1>
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-2xl font-medium">${product.price.toFixed(2)}</span>
            <div className="flex items-center text-velora-gold text-sm">
              <Star fill="currentColor" size={16} />
              <Star fill="currentColor" size={16} />
              <Star fill="currentColor" size={16} />
              <Star fill="currentColor" size={16} />
              <Star fill="currentColor" size={16} className="text-gray-300" />
              <span className="text-gray-500 ml-2">(42 Reviews)</span>
            </div>
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description} Crafted with the finest materials to ensure both luxury and longevity. 
            A perfect addition to your curated wardrobe.
          </p>

          <AddToCartSection product={product} />

          {/* Delivery Info */}

          <div className="space-y-4 pt-8 border-t border-gray-100">
             <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Truck size={18} />
                <span>Free shipping on orders over $300</span>
             </div>
             <div className="flex items-center space-x-3 text-sm text-gray-600">
                <ShieldCheck size={18} />
                <span>2-year warranty included</span>
             </div>
          </div>
        </div>
      </div>

      {/* Details & Reviews Tabs (Simplified) */}
      <div className="mb-24">
         <div className="border-b border-gray-200 flex space-x-8 mb-8">
            <button className="pb-4 border-b-2 border-black font-medium text-sm uppercase tracking-wide">Description</button>
            <button className="pb-4 border-b-2 border-transparent text-gray-400 hover:text-black font-medium text-sm uppercase tracking-wide">Specifications</button>
            <button className="pb-4 border-b-2 border-transparent text-gray-400 hover:text-black font-medium text-sm uppercase tracking-wide">Reviews</button>
         </div>
         <div className="prose max-w-none text-gray-600">
            <p>
              Experience the pinnacle of craftsmanship with our {product.name}. Designed in our Milan studio and brought to life by expert artisans, 
              this piece embodies the VELORA philosophy of timeless elegance. The fabric is sourced ethically from premium mills in Italy, 
              ensuring a soft touch and durable wear.
            </p>
         </div>
      </div>

      {/* Related Products */}
      <section>
        <h2 className="text-2xl font-serif font-bold mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
           {relatedProducts.length > 0 ? relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                price={p.price}
                image={p.images.split(',')[0]}
                category={p.category}
                tags={p.tags}
                description={p.description}
              />
           )) : (
             <p className="text-gray-500">No related products found.</p>
           )}
        </div>
      </section>
    </div>
  );
}
