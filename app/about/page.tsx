import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-velora-white text-velora-black">
      {/* 1. Hero Section - Full width, editorial style */}
      <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
        <video
          src="https://ik.imagekit.io/yrpp2zi5o/ZARA_50TH_ANNIVERSARY_THE_BLAZE_720P.mp4?updatedAt=1770457123005"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80 grayscale"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center text-white px-6 max-w-5xl">
          <p className="text-sm md:text-base font-bold tracking-[0.4em] uppercase mb-6 animate-fade-in">
            Since 1934
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-light tracking-wide mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            The Art of Living
          </h1>
          <p className="text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Velora is more than a brand; it is a movement towards conscious luxury, 
            where timeless design meets ethical craftsmanship.
          </p>
        </div>
      </section>

      {/* 2. Manifesto Section - Large typography */}
      <section className="py-32 container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif leading-tight text-gray-900 mb-12">
            "We believe that true luxury lies not in excess, but in the intentional curation of beauty, quality, and sustainability."
          </h2>
          <div className="h-24 w-[1px] bg-black mx-auto"></div>
        </div>
      </section>

      {/* 3. The Process - Alternating Grid */}
      <section className="pb-32 container mx-auto px-6 space-y-32">
        {/* Block 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[600px] w-full overflow-hidden rounded-sm group">
            <Image
              src="https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&q=80&w=1200"
              alt="Design Process"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="space-y-8">
            <span className="text-9xl font-serif text-gray-100 absolute -z-10 -translate-x-10 -translate-y-20">01</span>
            <h3 className="text-4xl font-serif font-bold">Design with Purpose</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Every collection begins in our Milan studio, where sketches are refined until they reach perfection. 
              We don't follow trends; we study the history of fashion to create silhouettes that will remain relevant for decades.
              Our designers prioritize versatility, ensuring each piece adapts to your dynamic lifestyle.
            </p>
            <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest">
              <span>Milan</span>
              <span className="w-1 h-1 bg-black rounded-full"></span>
              <span>Paris</span>
              <span className="w-1 h-1 bg-black rounded-full"></span>
              <span>New York</span>
            </div>
          </div>
        </div>

        {/* Block 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 space-y-8 text-right">
             <span className="text-9xl font-serif text-gray-100 absolute right-10 -z-10 -translate-y-20">02</span>
             <h3 className="text-4xl font-serif font-bold">Ethical Craftsmanship</h3>
             <p className="text-lg text-gray-600 leading-relaxed">
               We partner exclusively with family-owned ateliers in Italy and Portugal. These artisans have inherited 
               techniques passed down through generations. By paying fair wages and ensuring safe working conditions, 
               we ensure that the positive energy of creation is woven into the very fabric of your garment.
             </p>
             <p className="text-velora-wine font-medium italic">"Quality is never an accident; it is always the result of high intention."</p>
          </div>
          <div className="order-1 md:order-2 relative h-[600px] w-full overflow-hidden rounded-sm group">
            <Image
              src="https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=1200"
              alt="Craftsmanship"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* 4. Team / Leadership */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif font-bold mb-4">The Visionaries</h2>
            <p className="text-gray-500">The minds behind the movement.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {[
               { name: "Elena Rossi", role: "Creative Director", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" },
               { name: "James Sterling", role: "Head of Design", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" },
               { name: "Sophia Chen", role: "Sustainability Lead", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800" }
             ].map((member) => (
               <div key={member.name} className="text-center group">
                 <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-6 mx-auto w-full max-w-sm grayscale group-hover:grayscale-0 transition-all duration-500">
                   <Image src={member.img} alt={member.name} fill className="object-cover" />
                 </div>
                 <h3 className="text-xl font-serif font-bold">{member.name}</h3>
                 <p className="text-sm text-gray-500 uppercase tracking-wider mt-2">{member.role}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-32 bg-velora-black text-white text-center">
        <div className="container mx-auto px-6">
           <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">Experience Velora</h2>
           <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
             Join us in redefining the future of fashion. Explore our latest collections and find your signature style.
           </p>
           <a href="/collections" className="inline-flex items-center text-lg font-bold uppercase tracking-widest border-b-2 border-white pb-2 hover:text-gray-300 hover:border-gray-300 transition-colors">
             View Collections <ArrowRight className="ml-4" />
           </a>
        </div>
      </section>
    </div>
  );
}
