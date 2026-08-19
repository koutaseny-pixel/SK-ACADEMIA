"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileText, Info, AlertCircle, CalendarDays, Download } from "lucide-react";

// In a real app, you would fetch this by ID
const CONCOURS_DETAILS: Record<string, any> = {
  "police-nationale": {
    id: "police-nationale",
    title: "Police Nationale",
    description: "Le concours d'entrée à l'école nationale de police est l'un des plus prestigieux. Il donne accès aux carrières de Sous-officier, Officier et Commissaire.",
    status: "open",
    dates: { open: "15 Août 2026", close: "15 Septembre 2026", exam: "Octobre 2026" },
    conditions: [
      "Être de nationalité sénégalaise",
      "Être âgé de 21 ans au moins et 30 ans au plus",
      "Avoir une taille minimale de 1.75m (hommes) ou 1.65m (femmes)",
      "Avoir une bonne acuité visuelle (15/10 sans lunettes)"
    ],
    documents: [
      "Demande manuscrite adressée au Ministre de l'Intérieur",
      "Copie légalisée de la carte d'identité",
      "Extrait de naissance datant de moins de 3 mois",
      "Casier judiciaire de moins de 3 mois",
      "Certificat médical d'aptitude",
      "Copie légalisée du diplôme requis"
    ],
    link: "https://www.policenationale.gouv.sn"
  },
  "gendarmerie": {
    id: "gendarmerie",
    title: "Gendarmerie Nationale",
    description: "Le concours d'entrée à la Gendarmerie permet d'intégrer un corps d'élite avec de nombreuses spécialisations (mobile, territoriale, GIGN...).",
    status: "open",
    dates: { open: "10 Août 2026", close: "10 Septembre 2026", exam: "Novembre 2026" },
    conditions: [
      "Être de nationalité sénégalaise",
      "Être âgé de 18 ans au moins et 28 ans au plus",
      "Avoir une taille minimale de 1.70m"
    ],
    documents: [
      "Demande manuscrite",
      "Extrait de naissance",
      "Copie légalisée de la carte d'identité"
    ],
    link: "https://www.gendarmerie.sn"
  }
};

export default function ConcoursDetail({ params }: { params: { id: string } }) {
  const concours = CONCOURS_DETAILS[params.id];

  if (!concours) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Concours introuvable</h1>
        <Link href="/calendrier" className="text-blue-600 hover:underline">Retour au calendrier</Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-10 pb-16">
        <div className="max-w-[1000px] mx-auto px-4 md:px-8">
          <Link href="/calendrier" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 font-medium transition-colors">
            <ArrowLeft size={20} />
            Retour au calendrier
          </Link>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{concours.title}</h1>
              <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">{concours.description}</p>
            </div>
            {concours.status === "open" && (
              <div className="shrink-0 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3">
                <CheckCircle2 size={24} className="text-green-600" />
                <div>
                  <p className="font-bold">Inscriptions Ouvertes</p>
                  <p className="text-sm">Jusqu'au {concours.dates.close}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Conditions Section */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Info size={20} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Conditions d'éligibilité</h2>
              </div>
              <ul className="space-y-3">
                {concours.conditions.map((condition: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-green-500 mt-0.5 shrink-0" />
                    <span className="text-gray-700">{condition}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Documents Section */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Pièces à fournir</h2>
              </div>
              <ul className="space-y-3">
                {concours.documents.map((doc: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0"></div>
                    <span className="text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <a href={concours.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full py-4 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors">
                  Lien officiel d'inscription
                </a>
              </div>
            </div>

          </div>

          {/* Sidebar / Upsell */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl text-white shadow-lg">
              <h3 className="text-xl font-bold mb-2">Préparez ce concours</h3>
              <p className="text-blue-100 text-sm mb-6">Mettez toutes les chances de votre côté avec nos fascicules complets et annales corrigées.</p>
              <Link href={`/catalog?category=prepa&search=${concours.id}`} className="block text-center bg-white text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors">
                Voir les fascicules
              </Link>
            </div>

            {/* Lead Magnet Preview */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                <Download size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Anciens sujets gratuits</h3>
              <p className="text-sm text-gray-500 mb-6">Téléchargez les sujets des années précédentes (PDF).</p>
              <button className="w-full font-bold py-2.5 rounded-xl border-2 border-red-100 text-red-600 bg-red-50 hover:bg-red-100 transition-colors">
                Télécharger (Gratuit)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
