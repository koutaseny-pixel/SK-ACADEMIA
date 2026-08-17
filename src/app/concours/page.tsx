"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

const CONCOURS = [
  {
    id: "police-nationale",
    title: "Police Nationale",
    description: "Préparation complète au concours d'entrée à l'école nationale de police. Inclus : Droit pénal, culture générale et tests psychotechniques.",
    theme: { bg: "bg-[#7f3500]", text: "text-[#7f3500]", light: "bg-[#7f3500]/10", border: "border-[#7f3500]/20" },
    icon: "local_police",
    successRate: "92%",
    students: "1.2k"
  },
  {
    id: "gendarmerie",
    title: "Gendarmerie",
    description: "Fascicules et annales corrigées pour le concours de la gendarmerie nationale. Maîtrisez les épreuves écrites et physiques.",
    theme: { bg: "bg-[#1b5e20]", text: "text-[#1b5e20]", light: "bg-[#1b5e20]/10", border: "border-[#1b5e20]/20" },
    icon: "security",
    successRate: "89%",
    students: "950"
  },
  {
    id: "ena",
    title: "École Nationale d'Administration (ENA)",
    description: "Le pack ultime pour réussir l'ENA. Droit public, économie, relations internationales et dissertation générale.",
    theme: { bg: "bg-primary", text: "text-primary", light: "bg-primary/10", border: "border-primary/20" },
    icon: "account_balance",
    successRate: "85%",
    students: "2.5k"
  },
  {
    id: "douanes",
    title: "Douanes",
    description: "Préparez-vous efficacement au concours des douanes avec nos modules spécialisés en législation et fiscalité.",
    theme: { bg: "bg-[#ba1a1a]", text: "text-[#ba1a1a]", light: "bg-[#ba1a1a]/10", border: "border-[#ba1a1a]/20" },
    icon: "policy",
    successRate: "90%",
    students: "1.8k"
  }
];

export default function Concours() {
  return (
    <div className="bg-surface text-on-background min-h-screen pb-24">
      {/* Hero Section */}
      <section className="bg-surface-dim pt-24 pb-16 relative overflow-hidden border-b border-outline-variant/30">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary font-caption text-caption font-bold uppercase tracking-wider mb-6">
              <span className="material-symbols-outlined text-[16px]">military_tech</span>
              Préparation Concours
            </div>
            <h1 className="font-display text-headline-lg lg:text-[48px] font-bold text-on-background mb-6 leading-tight">
              Mettez toutes les chances de votre côté.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed max-w-2xl">
              Fascicules complets, annales corrigées et fiches de révision pour exceller aux concours les plus sélectifs de l'administration publique.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {CONCOURS.map((item) => (
            <div key={item.id} className="group glass-card rounded-[32px] p-8 border border-outline-variant hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1 relative overflow-hidden">
              {/* Decorative background circle */}
              <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full ${item.theme.light} opacity-50 transition-transform duration-500 group-hover:scale-150`}></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div className={`w-16 h-16 rounded-2xl ${item.theme.bg} text-white flex items-center justify-center shadow-md shadow-black/5`}>
                    <span className="material-symbols-outlined text-[32px]">{item.icon}</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-right">
                      <p className="font-display text-[24px] font-bold text-on-background leading-none">{item.successRate}</p>
                      <p className="font-caption text-caption text-on-surface-variant">Réussite</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-[24px] font-bold text-on-background leading-none">{item.students}</p>
                      <p className="font-caption text-caption text-on-surface-variant">Inscrits</p>
                    </div>
                  </div>
                </div>

                <h3 className="font-display text-[28px] font-bold text-on-background mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed min-h-[80px]">
                  {item.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <Link 
                    href={`/catalog?category=prepa&search=${item.id}`}
                    className={`flex-1 text-center font-label-md text-label-md font-bold py-3.5 px-6 rounded-xl text-white ${item.theme.bg} shadow-md transition-transform hover:-translate-y-0.5`}
                  >
                    Voir les fascicules
                  </Link>
                  <Link 
                    href={`/concours/${item.id}`}
                    className="flex items-center justify-center gap-2 font-label-md text-label-md font-bold py-3.5 px-6 rounded-xl border border-outline-variant bg-surface text-on-surface hover:bg-surface-variant transition-colors"
                  >
                    Détails
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
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
