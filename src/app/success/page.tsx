import Link from "next/link";
import { CheckCircle2, Download, Home } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 text-center relative overflow-hidden">
        
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>
        <div className="absolute -left-16 -top-16 w-32 h-32 bg-orange-50 rounded-full blur-2xl"></div>
        <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-blue-50 rounded-full blur-2xl"></div>

        <div className="relative z-10">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <CheckCircle2 size={50} className="text-green-500" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Félicitations !</h1>
          <p className="text-xl text-gray-600 mb-2 font-medium">Votre commande a été confirmée avec succès.</p>
          
          <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-6 my-8 text-left">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Prochaine étape : Paiement Mobile Money</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Pour finaliser votre achat et recevoir vos accès, veuillez transférer le montant total au numéro sécurisé ci-dessous via Wave ou Orange Money :
            </p>
            <div className="bg-white border border-orange-200 rounded-xl p-4 text-center">
              <span className="block text-sm text-gray-500 font-bold mb-1">Numéro de transfert SK Academia</span>
              <span className="text-3xl font-black text-orange-500 tracking-wider">77 000 00 00</span>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Dès réception du transfert, vos documents seront débloqués dans votre tableau de bord.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link 
              href="/catalog" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-4 px-8 rounded-xl transition-all"
            >
              <Home size={20} />
              Retour à l'accueil
            </Link>
            <Link 
              href="/dashboard/downloads" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1b508f] hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-[#1b508f]/20"
            >
              <Download size={20} />
              Mes documents
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
