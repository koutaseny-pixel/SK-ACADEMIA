import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { concours, topic, difficulty } = await req.json();

    if (!concours || !topic) {
      return NextResponse.json(
        { error: "Veuillez fournir un concours et une matière." },
        { status: 400 }
      );
    }

    // SIMULATION DU COMPORTEMENT DE L'IA (SDK Vercel AI)
    // Plus tard, vous pourrez utiliser :
    // const result = await generateObject({
    //   model: google('models/gemini-pro'),
    //   schema: quizSchema,
    //   prompt: `Agis comme un examinateur pour le concours ${concours}...`
    // });

    // Délai artificiel pour simuler le temps de réflexion de l'IA
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Examen généré par l'IA (Mock Data pour le moment)
    const generatedExam = {
      title: `Examen Blanc: ${topic} (${concours})`,
      questions: [
        {
          id: 1,
          question: "Quelle est la principale source de revenus du budget de l'État du Sénégal ?",
          options: ["La TVA", "L'impôt sur le revenu", "Les droits de douane", "Les taxes pétrolières"],
          correctAnswerIndex: 0,
          explanation: "La Taxe sur la Valeur Ajoutée (TVA) est l'impôt indirect qui rapporte le plus de recettes fiscales à l'État sénégalais, bien plus que les droits de douane."
        },
        {
          id: 2,
          question: "Quelle institution est chargée de contrôler la régularité des comptes de l'État ?",
          options: ["L'Assemblée Nationale", "La Cour des Comptes", "Le Conseil Constitutionnel", "L'IGE"],
          correctAnswerIndex: 1,
          explanation: "La Cour des Comptes est la juridiction supérieure chargée de contrôler les finances publiques et de vérifier la régularité des recettes et dépenses décrites dans les comptabilités publiques."
        },
        {
          id: 3,
          question: "Dans le cadre de l'UEMOA, quel est le taux du Tarif Extérieur Commun (TEC) applicable aux biens de consommation finale ?",
          options: ["5%", "10%", "20%", "35%"],
          correctAnswerIndex: 2,
          explanation: "Les biens de consommation finale sont classés dans la catégorie 3 du TEC de la CEDEAO/UEMOA, soumise à un taux de droit de douane de 20%."
        }
      ]
    };

    return NextResponse.json(generatedExam);
  } catch (error) {
    console.error("Erreur génération examen:", error);
    return NextResponse.json(
      { error: "Erreur lors de la génération de l'examen." },
      { status: 500 }
    );
  }
}
