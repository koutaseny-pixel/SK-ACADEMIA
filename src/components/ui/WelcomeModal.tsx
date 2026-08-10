"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { BookOpen, Calculator, Landmark, Microscope, Stethoscope, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Vérifier si l'utilisateur a déjà choisi une filière
    const savedFiliere = localStorage.getItem("selected_filiere");
    
    // S'il n'y a pas de sélection, on affiche le modal après un court délai
    if (!savedFiliere) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted) return null;

  const handleSelectFiliere = (filiere: string) => {
    localStorage.setItem("selected_filiere", filiere);
    setIsOpen(false);
    
    // Optionnel : Vous pourriez rediriger l'utilisateur vers le catalogue filtré
    // router.push(`/catalog?filiere=${encodeURIComponent(filiere)}`);
  };

  const filieres = [
    {
      category: "Lycée",
      items: [
        { id: "S", name: "Séries Scientifiques (S1, S2, S3)", icon: Calculator, color: "text-blue-500", bg: "bg-blue-50" },
        { id: "L", name: "Séries Littéraires (L1, L2, L-AR)", icon: BookOpen, color: "text-purple-500", bg: "bg-purple-50" },
        { id: "G-T", name: "Séries Techniques (G, T1, T2)", icon: Briefcase, color: "text-orange-500", bg: "bg-orange-50" },
      ]
    },
    {
      category: "Université & Études Supérieures",
      items: [
        { id: "DROIT", name: "Droit & Sciences Politiques", icon: Landmark, color: "text-red-500", bg: "bg-red-50" },
        { id: "SANTE", name: "Médecine & Santé", icon: Stethoscope, color: "text-green-500", bg: "bg-green-50" },
        { id: "SCIENCES", name: "Sciences & Technologies", icon: Microscope, color: "text-cyan-500", bg: "bg-cyan-50" },
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      
      <div className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-10 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-500">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-3">Bienvenue sur SK Academia 👋</h2>
          <p className="text-gray-200 text-lg">
            Pour vous proposer les meilleurs fascicules et ressources, dites-nous dans quelle filière vous étudiez actuellement :
          </p>
        </div>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {filieres.map((group) => (
            <div key={group.category}>
              <h3 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">{group.category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectFiliere(item.id)}
                      className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-white/50 hover:bg-white/10 transition-all text-left group bg-white/5"
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${item.bg} ${item.color} group-hover:scale-110 transition-transform shadow-lg`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{item.name}</div>
                        <div className="text-xs text-gray-300">Sélectionner</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => setIsOpen(false)}
          className="w-full text-center text-sm font-medium text-gray-300 hover:text-white mt-8 transition-colors"
        >
          Passer pour le moment
        </button>
      </div>
    </div>
  );
}
