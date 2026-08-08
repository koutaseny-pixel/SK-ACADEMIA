"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Comment puis-je accéder à mes documents après l'achat ?",
    answer: "Une fois votre achat confirmé, vous pourrez accéder à vos documents directement depuis votre espace personnel dans la rubrique 'Bibliothèque de Téléchargements'. Vous recevrez également un lien par email."
  },
  {
    question: "Les documents sont-ils disponibles hors ligne ?",
    answer: "Oui, tous nos guides et annales sont au format PDF téléchargeable. Vous pouvez les enregistrer sur votre téléphone ou ordinateur pour les consulter sans connexion internet."
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Foire Aux Questions</h1>
        <p className="text-xl text-gray-600">Trouvez rapidement des réponses à vos questions.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-lg bg-white overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
            >
              <span className="font-semibold text-lg text-gray-900">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="text-primary flex-shrink-0 ml-4" />
              ) : (
                <ChevronDown className="text-gray-400 flex-shrink-0 ml-4" />
              )}
            </button>
            
            {openIndex === index && (
              <div className="px-6 pb-6 text-gray-600 animate-in slide-in-from-top-2">
                <div className="pt-2 border-t border-gray-100">
                  {faq.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
