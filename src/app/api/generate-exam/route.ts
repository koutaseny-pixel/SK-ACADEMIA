import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

// Autoriser un temps d'exécution plus long pour l'API (utile pour les modèles d'IA)
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const questionSchema = z.object({
  id: z.number(),
  question: z.string().describe("La question posée au candidat"),
  options: z.array(z.string()).length(4).describe("4 options de réponse, dont une seule est correcte"),
  correctAnswerIndex: z.number().min(0).max(3).describe("L'index de la bonne réponse dans le tableau options"),
  explanation: z.string().describe("Explication détaillée de la bonne réponse pour aider l'étudiant à comprendre")
});

const examSchema = z.object({
  title: z.string().describe("Le titre généré pour l'examen"),
  questions: z.array(questionSchema).length(10).describe("Une liste de 10 questions")
});

export async function POST(req: Request) {
  try {
    const { concours, topic, difficulty } = await req.json();

    if (!concours || !topic) {
      return NextResponse.json(
        { error: "Veuillez fournir un concours et une matière." },
        { status: 400 }
      );
    }

    const prompt = `
      Tu es un examinateur expert et un professeur spécialisé dans la préparation des concours d'État au Sénégal (notamment pour le concours: ${concours}).
      Génère un examen blanc de 10 questions à choix multiples (QCM) sur la matière suivante : "${topic}".
      Le niveau de difficulté souhaité est : ${difficulty || "moyen"}.
      
      Instructions strictes:
      - Les questions doivent être très pertinentes par rapport à la réalité et au programme officiel de ce concours au Sénégal.
      - Fournis 4 options par question.
      - Une seule option doit être la bonne.
      - L'explication (explanation) doit être pédagogique, claire et détaillée pour que l'étudiant comprenne pourquoi c'est la bonne réponse.
      - Si le sujet est "Culture Générale", inclus des questions sur l'histoire, la géographie, l'économie ou les institutions du Sénégal et de l'Afrique.
    `;

    // Appel à l'API Google Gemini
    const { object } = await generateObject({
      model: google("gemini-1.5-flash"), // Utilisation du modèle Flash pour des réponses rapides
      schema: examSchema,
      prompt: prompt,
    });

    return NextResponse.json(object);
  } catch (error) {
    console.error("Erreur génération examen par l'IA:", error);
    return NextResponse.json(
      { error: "Erreur lors de la génération de l'examen par l'IA." },
      { status: 500 }
    );
  }
}
