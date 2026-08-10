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

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Bienvenue sur SK Academia 👋"
      maxWidth="lg"
    >
      <div className="space-y-6">
        <p className="text-gray-600">
          Pour vous proposer les meilleurs fascicules et ressources, dites-nous dans quelle filière vous étudiez actuellement :
        </p>

        <div className="space-y-6">
          {filieres.map((group) => (
            <div key={group.category}>
              <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">{group.category}</h3>
              <div className="grid grid-cols-1 gap-3">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectFiliere(item.id)}
                      className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#00853f] hover:shadow-md transition-all text-left group bg-white"
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">Recommandations sur mesure</div>
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
          className="w-full text-center text-sm font-medium text-gray-400 hover:text-gray-600 mt-4"
        >
          Passer pour le moment
        </button>
      </div>
    </Modal>
  );
}
