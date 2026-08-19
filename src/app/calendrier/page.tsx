"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, CalendarDays, AlertCircle, CheckCircle2, Clock, ChevronRight, Bell } from "lucide-react";
import { motion } from "framer-motion";

// Types
type ConcoursStatus = "open" | "coming_soon" | "closed";

interface ConcoursEvent {
  id: string;
  title: string;
  institution: string;
  status: ConcoursStatus;
  openDate: string;
  closeDate: string;
  examDate: string;
  level: string;
  theme: { bg: string; text: string; light: string; border: string };
}

// Mock Data
const CALENDAR_DATA: ConcoursEvent[] = [
  {
    id: "police-nationale",
    title: "Concours de la Police Nationale",
    institution: "Ministère de l'Intérieur",
    status: "open",
    openDate: "15 Août 2026",
    closeDate: "15 Septembre 2026",
    examDate: "Octobre 2026",
    level: "Bac / Licence",
    theme: { bg: "bg-gray-800", text: "text-gray-800", light: "bg-gray-100", border: "border-gray-200" },
  },
  {
    id: "douanes",
    title: "Concours des Douanes",
    institution: "Ministère des Finances",
    status: "coming_soon",
    openDate: "1 Novembre 2026",
    closeDate: "30 Novembre 2026",
    examDate: "Janvier 2027",
    level: "Bac / Licence / Master",
    theme: { bg: "bg-red-800", text: "text-red-800", light: "bg-red-50", border: "border-red-200" },
  },
  {
    id: "ena",
    title: "École Nationale d'Administration (ENA)",
    institution: "Gouvernement du Sénégal",
    status: "closed",
    openDate: "1 Mars 2026",
    closeDate: "30 Avril 2026",
    examDate: "Juillet 2026",
    level: "Licence / Master",
    theme: { bg: "bg-blue-800", text: "text-blue-800", light: "bg-blue-50", border: "border-blue-200" },
  },
  {
    id: "gendarmerie",
    title: "Concours de la Gendarmerie",
    institution: "Forces Armées",
    status: "open",
    openDate: "10 Août 2026",
    closeDate: "10 Septembre 2026",
    examDate: "Novembre 2026",
    level: "BFEM / Bac",
    theme: { bg: "bg-green-800", text: "text-green-800", light: "bg-green-50", border: "border-green-200" },
  }
];

export default function CalendrierConcours() {
  const [filter, setFilter] = useState<ConcoursStatus | "all">("all");
  const [search, setSearch] = useState("");

  const filteredEvents = CALENDAR_DATA.filter(event => {
    const matchesFilter = filter === "all" || event.status === filter;
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) || 
                          event.institution.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusConfig = (status: ConcoursStatus) => {
    switch (status) {
      case "open":
        return { icon: <CheckCircle2 size={16} />, text: "Inscriptions Ouvertes", color: "text-green-600 bg-green-100 border-green-200" };
      case "coming_soon":
        return { icon: <Clock size={16} />, text: "Bientôt Ouvert", color: "text-amber-600 bg-amber-100 border-amber-200" };
      case "closed":
        return { icon: <AlertCircle size={16} />, text: "Clôturé", color: "text-red-600 bg-red-100 border-red-200" };
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Section */}
      <section className="bg-white pt-24 pb-16 relative overflow-hidden border-b border-gray-200">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent opacity-50 pointer-events-none"></div>
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-100 text-blue-800 text-sm font-bold tracking-wide mb-6">
              <CalendarDays size={18} />
              Calendrier Officiel 2026-2027
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Ne ratez plus <span className="text-blue-600">aucune date.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl">
              Suivez en temps réel les dates d'ouverture, de clôture et de composition de tous les concours post-Bac au Sénégal.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un concours (ex: Police, ENA...)"
                className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              filter === "all" ? "bg-gray-900 text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Tous les concours
          </button>
          <button
            onClick={() => setFilter("open")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
              filter === "open" ? "bg-green-600 text-white shadow-md" : "bg-white text-green-700 border border-green-200 hover:bg-green-50"
            }`}
          >
            <CheckCircle2 size={16} /> Ouverts
          </button>
          <button
            onClick={() => setFilter("coming_soon")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
              filter === "coming_soon" ? "bg-amber-500 text-white shadow-md" : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-50"
            }`}
          >
            <Clock size={16} /> Bientôt
          </button>
          <button
            onClick={() => setFilter("closed")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
              filter === "closed" ? "bg-red-600 text-white shadow-md" : "bg-white text-red-700 border border-red-200 hover:bg-red-50"
            }`}
          >
            <AlertCircle size={16} /> Clôturés
          </button>
        </div>

        {/* List of Events */}
        <div className="space-y-6">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
              <CalendarDays className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Aucun concours trouvé</h3>
              <p className="text-gray-500 mt-1">Essayez de modifier vos filtres ou votre recherche.</p>
            </div>
          ) : (
            filteredEvents.map((event, index) => {
              const statusConfig = getStatusConfig(event.status);
              
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={event.id} 
                  className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 hover:shadow-lg transition-all group flex flex-col md:flex-row gap-6 md:gap-10"
                >
                  {/* Left Column: Dates & Status */}
                  <div className="w-full md:w-1/4 shrink-0 flex flex-col items-start border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border mb-4 ${statusConfig.color}`}>
                      {statusConfig.icon}
                      {statusConfig.text}
                    </span>
                    
                    <div className="space-y-4 w-full">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Ouverture</p>
                        <p className="font-medium text-gray-900">{event.openDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Clôture</p>
                        <p className="font-medium text-red-600">{event.closeDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Info */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="mb-2">
                      <span className="text-sm font-medium text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">{event.institution}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex items-center gap-2">
                      <span className="font-medium">Niveau requis:</span> {event.level}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100 w-fit">
                      <CalendarDays size={16} className="text-gray-400" />
                      <span>Date d'examen (prévue): <strong>{event.examDate}</strong></span>
                    </div>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="w-full md:w-auto flex flex-col justify-center gap-3 shrink-0">
                    <Link 
                      href={`/concours/${event.id}`}
                      className="w-full md:w-auto flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Détails & Inscription
                    </Link>
                    
                    {event.status === "open" ? (
                       <Link 
                        href={`/catalog?category=prepa&search=${event.id}`}
                        className={`w-full md:w-auto flex items-center justify-center font-bold py-3 px-6 rounded-xl text-white ${event.theme.bg} shadow-md hover:opacity-90 transition-opacity`}
                      >
                        Se préparer
                      </Link>
                    ) : (
                      <button className="w-full md:w-auto flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
                        <Bell size={18} />
                        Créer une alerte
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
