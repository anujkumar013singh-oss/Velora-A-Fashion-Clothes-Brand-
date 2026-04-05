import { prisma } from "@/lib/prisma";
import ProductGrid from "@/components/product/ProductGrid";
import Image from "next/image";

async function getCollection(id: string) {
  // Try to find by slug first (e.g. "summer-edit")
  const bySlug = await prisma.collection.findUnique({
    where: { slug: id },
    include: { products: true }
  });
  
  if (bySlug) return bySlug;

  // Fallback to finding by ID (uuid)
  return await prisma.collection.findUnique({
    where: { id },
    include: { products: true }
  });
}

export default async function CollectionDetailPage({ params }: { params: { id: string } }) {
  const collection = await getCollection(params.id);

  if (!collection) {
    return <div className="pt-32 text-center">Collection not found</div>;
  }

  return (
    <div className="pt-24 pb-20 container mx-auto px-6">
      {/* Header */}
      <div className="mb-16">
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
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">{collection.name}</h1>
                <p className="text-lg md:text-xl font-light tracking-wide">{collection.subtext}</p>
             </div>
           </div>
        </div>
        <p className="text-gray-500">Showing {collection.products.length} results</p>
      </div>

      <ProductGrid products={collection.products} />
    </div>
  );
}
