import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import ProductCard from "@/components/ui/ProductCard";
import Marquee from "@/components/Marquee";
import { getProductImage } from "@/lib/image-mapping";
import { ArrowRight } from "lucide-react";

async function getNewArrivals() {
  return await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' },
  });
}

async function getTrending() {
  return await prisma.product.findMany({
    take: 4,
    where: { tags: { contains: 'Trending' } },
  });
}

async function getCollections() {
  return await prisma.collection.findMany();
}

export default async function Home() {
  const newArrivals = await getNewArrivals();
  const trending = await getTrending();
  const collections = await getCollections();

  return (
    <div className="bg-velora-white">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-90"
          >
            <source src="https://ik.imagekit.io/yrpp2zi5o/WhatsApp%20Video%202026-02-07%20at%2016.37.27.mp4" type="video/mp4" />
            {/* Fallback Image */}
             <Image
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2000"
              alt="Hero Background"
              fill
              className="object-cover"
            />
          </video>
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 text-center text-white space-y-6 px-4">
          <p className="text-sm md:text-base font-medium tracking-[0.3em] uppercase animate-slide-up drop-shadow-lg">
            New Collection
          </p>
          <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight animate-slide-up drop-shadow-lg" style={{ animationDelay: "0.1s" }}>
            VELORA
          </h1>
          <p className="text-lg md:text-2xl font-light text-gray-100 max-w-xl mx-auto animate-slide-up drop-shadow-md" style={{ animationDelay: "0.2s" }}>
            Elegance Redefined. The Friday Sale is Live.
          </p>
          <div className="pt-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Link href="/collections">
              <Button size="lg" className="bg-white text-velora-black hover:bg-gray-100 border-none px-8 py-6 text-lg tracking-widest uppercase">
                Explore Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals Grid (Below Banner) */}
      <section id="new-arrivals" className="py-20 container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-serif font-bold text-velora-black">New Arrivals</h2>
          <Link href="/products" className="group flex items-center text-sm font-medium uppercase tracking-wide hover:text-velora-wine transition-colors">
            View All <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.images.split(',')[0]}
              category={product.category}
              tags={product.tags}
            />
          ))}
        </div>
      </section>

      {/* 2. TRENDING SECTION */}
      <section id="trending" className="py-24">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-serif font-bold mb-4">Trending Now</h2>
            <p className="text-gray-600">Curated styles that are making waves.</p>
          </div>
          
          {/* Horizontal Scroll / Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {trending.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.images.split(',')[0]}
                category={product.category}
                tags={product.tags}
              />
            ))}
          </div>
        </div>
      </section>

      <Marquee />

      {/* 3. COLLECTIONS SECTION */}
      <section id="collections" className="py-24 container mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold mb-12 text-center">Our Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection) => (
            <div key={collection.id} className="block">
              <div className="group relative aspect-square md:aspect-[16/9] overflow-hidden rounded-sm cursor-pointer">
                <img
                  src={getProductImage(collection.name, collection.image)}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {collection.name}
                  </h3>
                  <p className="text-sm md:text-base font-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {collection.subtext}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-20 bg-velora-beige/30">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h2 className="text-3xl font-serif font-bold mb-4">Join the Inner Circle</h2>
          <p className="text-gray-600 mb-8">Sign up for exclusive access to new arrivals, luxury events, and styling tips.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-velora-black bg-white"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
