"use client";

import { useState } from "react";
import { Sparkles, BrainCircuit, Target, RefreshCw } from "lucide-react";
import InteractiveQuiz from "@/components/quiz/InteractiveQuiz";

export default function GenerateurPage() {
  const [concours, setConcours] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("moyen");
  const [isGenerating, setIsGenerating] = useState(false);
  const [examData, setExamData] = useState<any>(null);
  const [error, setError] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!concours || !topic) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setError("");
    setIsGenerating(true);

    try {
      const res = await fetch("/api/generate-exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concours, topic, difficulty }),
      });

      if (!res.ok) throw new Error("Échec de la génération");

      const data = await res.json();
      setExamData(data);
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-100 text-blue-800 text-sm font-bold tracking-wide mb-4">
            <Sparkles size={16} /> Nouvelle fonctionnalité
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Générateur d'Examens par IA
          </h1>
          <p className="text-gray-600 text-lg">
            Générez des examens blancs sur mesure pour n'importe quel concours. Notre IA analyse les annales précédentes pour créer des questions pertinentes avec des corrections détaillées.
          </p>
        </div>

        {/* Configuration or Quiz view */}
        {!examData ? (
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-200 shadow-xl relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            <form onSubmit={handleGenerate} className="relative z-10 space-y-8">
              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl font-medium text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 font-bold text-gray-900">
                    <Target size={18} className="text-blue-600" />
                    Concours Cible
                  </label>
                  <select 
                    value={concours}
                    onChange={(e) => setConcours(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium text-gray-700"
                  >
                    <option value="">Sélectionnez un concours...</option>
                    <option value="Police Nationale">Police Nationale</option>
                    <option value="Douanes">Douanes</option>
                    <option value="ENA">ENA</option>
                    <option value="Gendarmerie">Gendarmerie</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 font-bold text-gray-900">
                    <BrainCircuit size={18} className="text-blue-600" />
                    Matière / Thématique
                  </label>
                  <select 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium text-gray-700"
                  >
                    <option value="">Sélectionnez une matière...</option>
                    <option value="Culture Générale">Culture Générale</option>
                    <option value="Droit Public">Droit Public</option>
                    <option value="Économie">Économie</option>
                    <option value="Tests Psychotechniques">Tests Psychotechniques</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-end">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-2 font-bold py-4 px-8 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw size={20} className="animate-spin" />
                      Génération en cours...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Générer l'examen blanc
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">{examData.title}</h2>
              <button 
                onClick={() => setExamData(null)}
                className="text-sm font-medium text-gray-500 hover:text-gray-900 underline"
              >
                Changer de matière
              </button>
            </div>
            
            <InteractiveQuiz 
              examData={examData} 
              onRestart={() => setExamData(null)} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
