"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, AlertCircle, ArrowRight, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

interface InteractiveQuizProps {
  examData: {
    title: string;
    questions: Question[];
  };
  onRestart: () => void;
}

export default function InteractiveQuiz({ examData, onRestart }: InteractiveQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const question = examData.questions[currentQuestionIndex];
  const hasAnsweredCurrent = selectedAnswers[currentQuestionIndex] !== undefined;
  const isLastQuestion = currentQuestionIndex === examData.questions.length - 1;

  const handleSelectOption = (optionIndex: number) => {
    if (hasAnsweredCurrent) return; // Prevent changing answer after selection
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: optionIndex });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  if (showResults) {
    const score = Object.keys(selectedAnswers).reduce((acc, key) => {
      const qIndex = parseInt(key);
      if (selectedAnswers[qIndex] === examData.questions[qIndex].correctAnswerIndex) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const percentage = Math.round((score / examData.questions.length) * 100);

    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Résultats de l'examen</h2>
        
        <div className="relative inline-flex items-center justify-center w-40 h-40 rounded-full bg-slate-50 border-8 border-slate-100 mb-8">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className={`stroke-current ${percentage >= 50 ? 'text-green-500' : 'text-red-500'}`}
              strokeWidth="3"
              strokeDasharray={`${percentage}, 100`}
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="text-center">
            <span className="text-4xl font-black">{score}</span>
            <span className="text-gray-400 font-bold text-xl">/{examData.questions.length}</span>
          </div>
        </div>

        <p className="text-lg text-gray-600 mb-8">
          {percentage >= 70 ? "Excellent travail ! Vous êtes prêt." : "Ne vous découragez pas. Révisez les corrections ci-dessous."}
        </p>

        <button 
          onClick={onRestart}
          className="inline-flex items-center justify-center gap-2 font-bold py-3 px-8 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors"
        >
          <RotateCcw size={18} /> Recommencer
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Progress bar */}
      <div className="h-2 w-full bg-slate-100">
        <div 
          className="h-full bg-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${((currentQuestionIndex) / examData.questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            Question {currentQuestionIndex + 1} / {examData.questions.length}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
          {question.question}
        </h3>

        <div className="space-y-4 mb-8">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswers[currentQuestionIndex] === index;
            const isCorrect = question.correctAnswerIndex === index;
            
            let optionStyles = "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50";
            
            if (hasAnsweredCurrent) {
              if (isCorrect) {
                optionStyles = "border-green-500 bg-green-50 ring-1 ring-green-500";
              } else if (isSelected && !isCorrect) {
                optionStyles = "border-red-500 bg-red-50 ring-1 ring-red-500";
              } else {
                optionStyles = "border-gray-200 bg-slate-50 opacity-50";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectOption(index)}
                disabled={hasAnsweredCurrent}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex justify-between items-center group ${optionStyles}`}
              >
                <span className={`font-medium ${hasAnsweredCurrent && (isCorrect || isSelected) ? 'text-gray-900' : 'text-gray-700'}`}>
                  {option}
                </span>
                
                {hasAnsweredCurrent && isCorrect && <CheckCircle2 className="text-green-600" size={20} />}
                {hasAnsweredCurrent && isSelected && !isCorrect && <XCircle className="text-red-600" size={20} />}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {hasAnsweredCurrent && (
            <motion.div
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              className="mb-8"
            >
              <div className="p-6 rounded-xl bg-blue-50 border border-blue-100 flex gap-4">
                <AlertCircle className="text-blue-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-bold text-blue-900 mb-1">L'explication de l'IA</h4>
                  <p className="text-blue-800 leading-relaxed text-sm">
                    {question.explanation}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={!hasAnsweredCurrent}
            className={`flex items-center gap-2 font-bold py-3 px-8 rounded-xl transition-all ${
              hasAnsweredCurrent 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isLastQuestion ? "Voir les résultats" : "Question Suivante"}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
