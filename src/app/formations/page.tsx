"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

const COURSES = [
  {
    id: "excel-pro",
    title: "Excel Pro : De Débutant à Expert",
    category: "Bureautique",
    level: "Tous Niveaux",
    duration: "12h 30m",
    price: 15000,
    instructor: "Jean Dupont",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "web-dev",
    title: "Développement Web Full-Stack",
    category: "Programmation",
    level: "Intermédiaire",
    duration: "45h",
    price: 45000,
    instructor: "Aminata Sall",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ai-basics",
    title: "Introduction à l'Intelligence Artificielle",
    category: "IA & Data",
    level: "Débutant",
    duration: "8h",
    price: 25000,
    instructor: "Ousmane Ndiaye",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  }
];

export default function Formations() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Section */}
      <section className="bg-primary text-white pt-24 pb-16 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Développez vos compétences avec nos Formations Pro.
            </h1>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Des cours intensifs, certifiants et créés par des experts de l'industrie pour vous aider à atteindre vos objectifs professionnels.
            </p>
            
            {/* Search */}
            <div className="relative max-w-xl">
              <input 
                type="text" 
                placeholder="Quelle compétence souhaitez-vous apprendre ?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white text-gray-900 rounded-xl py-4 pl-12 pr-6 shadow-lg outline-none focus:ring-2 focus:ring-orange-500 border border-transparent transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-12">
        
        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-12">
          {["Toutes les formations", "Bureautique", "Programmation", "IA & Data", "Design", "Marketing"].map((cat, i) => (
            <button 
              key={i} 
              className={`px-6 py-2.5 rounded-full font-medium transition-all shadow-sm
                ${i === 0 
                  ? 'bg-primary text-white border border-primary' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.map((course) => (
            <Link href={`/formations/${course.id}`} key={course.id} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                  <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">{course.category}</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-primary transition-colors">{course.title}</h3>
                
                <div className="flex items-center gap-4 mb-6 text-gray-500 text-sm">
                  <div className="flex items-center gap-1.5">
                    <span>📊</span>
                    {course.level}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>⏱️</span>
                    {course.duration}
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs uppercase">
                      {course.instructor.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{course.instructor}</span>
                  </div>
                  <span className="text-lg font-bold text-orange-500">
                    {course.price.toLocaleString("fr-SN", { style: "currency", currency: "XOF" })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
