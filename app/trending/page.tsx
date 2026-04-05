import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ui/ProductCard";

async function getTrendingProducts() {
  return await prisma.product.findMany({
    where: {
      tags: {
        contains: 'Trending'
      }
    },
    take: 60
  });
}

export default async function TrendingPage() {
  const products = await getTrendingProducts();

  return (
    <div className="pt-24 pb-20 container mx-auto px-6">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold">Trending Now</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover the most coveted pieces of the season. Curated for the modern muse.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.images.split(',')[0]}
            category={product.category}
            tags={product.tags}
            description={product.description}
            discount={Math.random() > 0.7 ? 20 : undefined}
          />
        ))}
      </div>
      
      {products.length === 0 && (
         <div className="text-center py-20">
            <p className="text-gray-500">No trending products found at the moment.</p>
         </div>
      )}
    </div>
  );
}
