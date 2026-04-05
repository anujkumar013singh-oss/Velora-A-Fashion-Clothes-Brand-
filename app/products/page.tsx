import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ui/ProductCard";
import { Suspense } from "react";

async function getProducts() {
  return await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

async function ProductsList() {
  const products = await getProducts();
  
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg font-serif">Our curated collection is currently being refreshed.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.images.split(',')[0]}
          category={product.category}
          tags={product.tags}
          description={product.description}
        />
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <div className="pt-24 pb-20 container mx-auto px-6">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">Shop All</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our full range of luxury essentials, meticulously crafted for those who appreciate the finer details.
        </p>
      </div>
      
      <Suspense fallback={<div className="text-center py-20">Loading our collection...</div>}>
        <ProductsList />
      </Suspense>
    </div>
  );
}
