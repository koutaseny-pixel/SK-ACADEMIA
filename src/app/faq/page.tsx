"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Comment puis-je accéder à mes documents après l'achat ?",
    answer: "Une fois votre achat confirmé, vous pourrez accéder à vos documents directement depuis votre espace personnel dans la rubrique 'Mes Documents'. Vous recevrez également un lien par email."
  },
  {
    question: "Les documents sont-ils disponibles hors ligne ?",
    answer: "Oui, tous nos fascicules et annales sont au format PDF téléchargeable. Vous pouvez les enregistrer sur votre téléphone ou ordinateur pour les consulter sans connexion internet."
  },
  {
    question: "Quels sont les moyens de paiement acceptés ?",
    answer: "Nous acceptons principalement les paiements via Mobile Money (Wave, Orange Money, Free Money) pour faciliter l'accès à tous les étudiants au Sénégal."
  },
  {
    question: "Puis-je partager les documents avec mes camarades ?",
    answer: "Vos achats sont personnels et liés à votre compte. Le partage non autorisé de nos documents est contraire à nos conditions d'utilisation et peut entraîner la suspension de votre compte."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#1b508f]">
            <HelpCircle size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Foire Aux Questions</h1>
          <p className="text-xl text-gray-600">Trouvez rapidement des réponses à vos questions.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-2xl bg-white overflow-hidden transition-all duration-300 shadow-sm
                ${openIndex === index ? 'border-[#1b508f] shadow-md ring-4 ring-[#1b508f]/5' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              >
                <span className={`font-bold text-lg ${openIndex === index ? 'text-[#1b508f]' : 'text-gray-900'}`}>
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="text-orange-500 flex-shrink-0 ml-4" size={24} />
                ) : (
                  <ChevronDown className="text-gray-400 flex-shrink-0 ml-4" size={24} />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-600 animate-in slide-in-from-top-2">
                  <div className="pt-4 border-t border-gray-100 font-medium leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
