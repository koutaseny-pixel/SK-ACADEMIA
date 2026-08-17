"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

const CONCOURS = [
  {
    id: "police-nationale",
    title: "Police Nationale",
    description: "Préparation complète au concours d'entrée à l'école nationale de police. Inclus : Droit pénal, culture générale et tests psychotechniques.",
    theme: { bg: "bg-gray-800", text: "text-gray-800", light: "bg-gray-100", border: "border-gray-200" },
    icon: "local_police",
    successRate: "92%",
    students: "1.2k"
  },
  {
    id: "gendarmerie",
    title: "Gendarmerie",
    description: "Fascicules et annales corrigées pour le concours de la gendarmerie nationale. Maîtrisez les épreuves écrites et physiques.",
    theme: { bg: "bg-green-800", text: "text-green-800", light: "bg-green-50", border: "border-green-200" },
    icon: "security",
    successRate: "89%",
    students: "950"
  },
  {
    id: "ena",
    title: "École Nationale d'Administration (ENA)",
    description: "Le pack ultime pour réussir l'ENA. Droit public, économie, relations internationales et dissertation générale.",
    theme: { bg: "bg-primary", text: "text-primary", light: "bg-blue-50", border: "border-blue-200" },
    icon: "account_balance",
    successRate: "85%",
    students: "2.5k"
  },
  {
    id: "douanes",
    title: "Douanes",
    description: "Préparez-vous efficacement au concours des douanes avec nos modules spécialisés en législation et fiscalité.",
    theme: { bg: "bg-red-800", text: "text-red-800", light: "bg-red-50", border: "border-red-200" },
    icon: "policy",
    successRate: "90%",
    students: "1.8k"
  }
];

export default function Concours() {
  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Section */}
      <section className="bg-white pt-24 pb-16 relative overflow-hidden border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <span>🏆</span>
              Préparation Concours
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Mettez toutes les chances de votre côté.
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl">
              Fascicules complets, annales corrigées et fiches de révision pour exceller aux concours les plus sélectifs de l'administration publique.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {CONCOURS.map((item) => (
            <div key={item.id} className={`bg-white rounded-2xl p-8 border ${item.theme.border} hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1 relative overflow-hidden`}>
              {/* Decorative background circle */}
              <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full ${item.theme.light} opacity-50 transition-transform duration-500 group-hover:scale-150`}></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div className={`w-16 h-16 rounded-xl ${item.theme.bg} text-white flex items-center justify-center shadow-md`}>
                    <span className="text-2xl font-bold">{item.title.charAt(0)}</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-extrabold text-gray-900 leading-none">{item.successRate}</p>
                      <p className="text-xs text-gray-500 mt-1">Réussite</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-extrabold text-gray-900 leading-none">{item.students}</p>
                      <p className="text-xs text-gray-500 mt-1">Inscrits</p>
                    </div>
                  </div>
                </div>

                <h3 className={`text-2xl font-bold text-gray-900 mb-4 group-hover:${item.theme.text} transition-colors`}>{item.title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed min-h-[80px]">
                  {item.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <Link 
                    href={`/catalog?category=prepa&search=${item.id}`}
                    className={`flex-1 text-center font-bold py-3.5 px-6 rounded-xl text-white ${item.theme.bg} shadow-md transition-transform hover:-translate-y-0.5`}
                  >
                    Voir les fascicules
                  </Link>
                  <Link 
                    href={`/concours/${item.id}`}
                    className="flex items-center justify-center gap-2 font-bold py-3.5 px-6 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Détails
                    <ChevronRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
