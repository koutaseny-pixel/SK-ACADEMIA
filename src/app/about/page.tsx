import { Target, Users, BookOpen } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">À propos de SK Academia</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nous transformons l'éducation au Sénégal en rendant l'excellence académique accessible à tous, partout et à tout moment.
          </p>
        </div>
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 mb-16">
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-6 leading-relaxed">
              Fondée avec une mission claire, <strong>SK Academia</strong> s'engage à accompagner les étudiants à travers tout le Sénégal et au-delà. Nous sommes convaincus que l'accès à des ressources éducatives de haute qualité doit être simple, abordable et avoir un véritable impact sur la réussite.
            </p>
            <p className="mb-6 leading-relaxed">
              Que vous prépariez le BAC, vos examens universitaires, ou que vous visiez les concours d'entrée les plus sélectifs, notre plateforme est conçue pour vous fournir les meilleurs outils. Des fascicules rédigés par des experts aux annales corrigées, en passant par nos formations complètes, nous avons tout ce qu'il vous faut.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-orange-500">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Notre Vision</h3>
            <p className="text-gray-600">Devenir le compagnon numérique le plus fiable et le plus complet pour chaque étudiant au Sénégal.</p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#1b508f]">
              <BookOpen size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Qualité Absolue</h3>
            <p className="text-gray-600">Tous nos documents sont vérifiés et mis à jour selon les derniers programmes officiels.</p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-500">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Pour les Étudiants</h3>
            <p className="text-gray-600">Une plateforme pensée par des passionnés de l'éducation pour la réussite des apprenants.</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
