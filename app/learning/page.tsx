import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { PlayCircle, FileText, Download } from "lucide-react";
import AIAssistant from "@/components/AIAssistant";

async function getLearningModules() {
  return await prisma.learningModule.findMany();
}

export default async function LearningPage() {
  const modules = await getLearningModules();

  return (
    <div className="pt-20 min-h-screen bg-velora-offwhite">
      {/* 1. Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden bg-velora-charcoal text-white">
         <div className="absolute inset-0 z-0 opacity-40">
            <video
              src="https://ik.imagekit.io/yrpp2zi5o/Untitled%20(2).mp4?updatedAt=1770461357430"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
         </div>
         <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">VELORA Learning Studio</h1>
            <p className="text-xl font-light text-gray-300">Learn fashion. Style smarter. Master the art of elegance.</p>
         </div>
      </section>

      <div className="container mx-auto px-6 py-20 space-y-24">
        
        {/* 2. Learning Modules Section */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-2">Curated Courses</h2>
              <p className="text-gray-500">Expert-led modules to elevate your fashion knowledge.</p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0">View All Courses</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {modules.map((module) => (
              <div key={module.id} className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={module.image}
                    alt={module.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="text-white w-12 h-12" />
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-velora-wine uppercase tracking-wider block mb-2">{module.category}</span>
                  <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-velora-wine transition-colors">{module.title}</h3>
                  <p className="text-sm text-gray-500 mb-6 line-clamp-2">{module.description}</p>
                  <Button size="sm" variant="secondary" className="w-full">Start Learning</Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. AI Learning Box Section */}
        <AIAssistant />

        {/* 4. Resource Grid */}
        <section>
          <h2 className="text-3xl font-serif font-bold mb-8">Downloadable Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: "2024 Trend Report", type: "PDF Guide", size: "2.4 MB" },
              { title: "Fabric Care 101", type: "Cheatsheet", size: "1.1 MB" },
              { title: "Capsule Wardrobe Planner", type: "Template", size: "0.5 MB" },
            ].map((resource, i) => (
              <div key={i} className="flex items-center p-6 bg-white border border-gray-100 rounded-sm hover:border-gray-300 transition-colors cursor-pointer group">
                <div className="p-3 bg-velora-offwhite rounded-full mr-4 group-hover:bg-velora-black group-hover:text-white transition-colors">
                  <FileText size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-velora-black">{resource.title}</h4>
                  <p className="text-xs text-gray-500">{resource.type} • {resource.size}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-400 group-hover:text-velora-black">
                  <Download size={20} />
                </Button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
