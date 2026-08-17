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
    <div className="bg-surface text-on-background min-h-screen pb-24">
      {/* Hero Section */}
      <section className="bg-primary pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-hover opacity-90"></div>
        <div className="absolute inset-0 hero-pattern opacity-20 mix-blend-overlay"></div>
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-display text-headline-lg lg:text-[48px] font-bold text-on-primary mb-6 leading-tight">
              Développez vos compétences avec nos Formations Pro.
            </h1>
            <p className="font-body-lg text-body-lg text-primary-fixed-dim mb-8 leading-relaxed">
              Des cours intensifs, certifiants et créés par des experts de l'industrie pour vous aider à atteindre vos objectifs professionnels.
            </p>
            
            {/* Search */}
            <div className="relative max-w-xl">
              <input 
                type="text" 
                placeholder="Quelle compétence souhaitez-vous apprendre ?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-surface text-on-surface rounded-2xl py-4 pl-12 pr-6 font-body-md text-body-md shadow-lg outline-none focus:ring-4 focus:ring-primary-container border-2 border-transparent focus:border-primary transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={24} />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-12">
        
        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-12">
          {["Toutes les formations", "Bureautique", "Programmation", "IA & Data", "Design", "Marketing"].map((cat, i) => (
            <button 
              key={i} 
              className={`px-6 py-2.5 rounded-full font-label-md text-label-md font-bold transition-all shadow-sm
                ${i === 0 
                  ? 'bg-primary text-on-primary border border-primary' 
                  : 'bg-surface border border-outline-variant text-on-surface-variant hover:bg-surface-variant hover:text-on-surface'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.map((course) => (
            <Link href={`/formations/${course.id}`} key={course.id} className="group glass-card rounded-[24px] overflow-hidden flex flex-col hover:-translate-y-2 transition-all duration-300">
              <div className="relative h-48 bg-surface-container overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-lg">
                  <span className="font-caption text-caption font-bold text-on-surface uppercase tracking-wider">{course.category}</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-display text-[20px] font-bold text-on-background mb-4 leading-tight group-hover:text-primary transition-colors">{course.title}</h3>
                
                <div className="flex items-center gap-4 mb-6 text-on-surface-variant">
                  <div className="flex items-center gap-1.5 font-caption text-caption">
                    <span className="material-symbols-outlined text-[18px]">signal_cellular_alt</span>
                    {course.level}
                  </div>
                  <div className="flex items-center gap-1.5 font-caption text-caption">
                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                    {course.duration}
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-outline-variant/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs uppercase">
                      {course.instructor.charAt(0)}
                    </div>
                    <span className="font-caption text-caption font-medium text-on-surface">{course.instructor}</span>
                  </div>
                  <span className="font-display text-[20px] font-bold text-primary">
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
