import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getProductImage } from "@/lib/image-mapping";

async function getCollections() {
  return await prisma.collection.findMany({
    include: {
      products: {
        take: 3
      }
    }
  });
}

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="pt-24 pb-20 container mx-auto px-6">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold">Our Collections</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our thoughtfully curated edits, designed to inspire and elevate.
        </p>
      </div>

      <div className="space-y-20">
        {collections.map((collection, index) => (
          <div key={collection.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
            {/* Image Side */}
            <div className="w-full lg:w-1/2 relative aspect-[4/3] group overflow-hidden">
               <img
                 src={getProductImage(collection.name, collection.image)}
                 alt={collection.name}
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
            </div>
            
            {/* Content Side */}
            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
               <h2 className="text-3xl md:text-4xl font-serif font-bold">{collection.name}</h2>
               <p className="text-lg text-gray-600 italic">{collection.subtext}</p>
               <p className="text-gray-500 leading-relaxed max-w-md mx-auto lg:mx-0">
                 Discover pieces that embody the essence of {collection.name.toLowerCase()}. 
                 Timeless designs meeting modern sensibilities.
               </p>
               
               <div className="pt-4">
                 <Link 
                   href={`/collections/${collection.slug}`}
                   className="inline-flex items-center text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-velora-wine hover:border-velora-wine transition-colors"
                 >
                   Explore Collection <ArrowRight size={16} className="ml-2" />
                 </Link>
               </div>

               {/* Preview Products */}
               <div className="grid grid-cols-3 gap-4 pt-8">
                 {collection.products.map((product, productIndex) => (
                    <div key={product.id} className="aspect-[3/4] relative bg-gray-100">
                      <img 
                        src={getProductImage(product.name, product.images.split(',')[0])}
                        alt={product.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                 ))}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
