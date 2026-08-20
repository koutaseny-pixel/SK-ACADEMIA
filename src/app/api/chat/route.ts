import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `Tu es Seny, l'assistant virtuel officiel de SK ACADEMIA. 
Ton rôle est d'assister et d'aider les utilisateurs à mieux comprendre, planifier et choisir les différents concours et e-books (fascicules) proposés par SK ACADEMIA. 
Tu dois également leur expliquer l'essence de SK ACADEMIA, l'importance de bien se préparer aux concours au Sénégal, et pourquoi l'achat et la consultation de nos documents sont essentiels pour leur réussite.
Sois toujours poli, encourageant, professionnel et chaleureux. Tes réponses doivent être concises et bien formatées. Ne propose pas d'autres services qui ne sont pas liés à SK ACADEMIA.`;

    const result = streamText({
      model: google("gemini-2.5-pro"),
      messages,
      system: systemPrompt,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
