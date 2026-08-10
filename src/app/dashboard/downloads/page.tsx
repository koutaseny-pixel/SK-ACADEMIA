import { createClient } from "@/lib/supabase/server";
import { Download, FileText, Lock, ShoppingBag, AlertCircle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Mes Téléchargements | SK Academia",
};

const MAX_DOWNLOADS = 5;

export default async function DownloadsLibrary() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch PAID order items for the user, including product details
  const { data: paidOrders } = await supabase
    .from("orders")
    .select(`
      id,
      reference,
      order_items (
        id,
        product_id,
        product_name,
        products (
          file_url,
          image_url,
          category,
          description
        )
      )
    `)
    .eq("user_id", user?.id)
    .eq("status", "paid");

  // Fetch download counts for this user
  const { data: downloadCounts } = await supabase
    .from("product_downloads")
    .select("order_item_id")
    .eq("user_id", user?.id);

  const downloadCountMap = (downloadCounts || []).reduce((acc: any, curr: any) => {
    acc[curr.order_item_id] = (acc[curr.order_item_id] || 0) + 1;
    return acc;
  }, {});

  // Build accessible items with metadata
  const accessibleItems = (paidOrders?.flatMap(order =>
    order.order_items.map((item: any) => ({
      ...item,
      orderReference: order.reference,
      count: downloadCountMap[item.id] || 0,
      remaining: Math.max(0, MAX_DOWNLOADS - (downloadCountMap[item.id] || 0)),
      isDownloadable: (downloadCountMap[item.id] || 0) < MAX_DOWNLOADS,
      downloadUrl: `/api/downloads/${item.id}`,
    }))
  ) || []);

  // Total downloads so far
  const totalDownloads = downloadCounts?.length || 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Bibliothèque de téléchargements</h1>
          <p className="text-gray-500 text-sm mt-1">
            {accessibleItems.length} ressource(s) disponible(s) · {totalDownloads} téléchargement(s) effectué(s)
          </p>
        </div>
      </div>

      {accessibleItems.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 text-center py-16 px-6">
          <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Lock size={36} className="text-[#1b508f]" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune ressource débloquée</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6 text-sm leading-relaxed">
            Vos documents apparaîtront ici une fois que votre commande aura été validée. 
            Après confirmation de votre paiement Mobile Money, l'accès est instantané.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/dashboard/orders" className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-50 transition-all text-sm">
              <ShoppingBag size={16} /> Voir mes commandes
            </Link>
            <Link href="/catalog" className="inline-flex items-center gap-2 bg-[#1b508f] hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md text-sm">
              Explorer la boutique
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Secure download notice */}
          <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm">
            <AlertCircle size={18} className="text-[#1b508f] shrink-0 mt-0.5" />
            <div className="text-blue-800">
              <strong>Téléchargement sécurisé :</strong> Chaque lien est valable uniquement 60 secondes après le clic. 
              Vous disposez de <strong>{MAX_DOWNLOADS} téléchargements</strong> maximum par ressource achetée.
              Le partage est strictement interdit.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accessibleItems.map((item: any, idx: number) => (
              <div key={idx} className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all hover:shadow-md ${
                item.isDownloadable ? "border-gray-100" : "border-red-100"
              }`}>
                {/* Card header with image or placeholder */}
                <div className="h-32 bg-gradient-to-br from-[#1b508f] to-blue-600 relative overflow-hidden">
                  {item.products?.image_url ? (
                    <img src={item.products.image_url} alt={item.product_name} className="w-full h-full object-cover opacity-30" />
                  ) : null}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText size={48} className="text-white/60" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full">
                      {item.products?.category === "prepa" ? "Préparation" : item.products?.category === "formation" ? "Formation" : "Ressource"}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="font-bold text-gray-900 mb-1 line-clamp-2">{item.product_name}</h4>
                  <p className="text-xs text-gray-400 mb-4">Commande {item.orderReference}</p>

                  {/* Download quota bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <span className="text-gray-500">Téléchargements utilisés</span>
                      <span className={item.remaining <= 1 ? "text-red-600" : "text-gray-600"}>
                        {item.count} / {MAX_DOWNLOADS}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          item.count >= MAX_DOWNLOADS ? "bg-red-500" :
                          item.count >= MAX_DOWNLOADS - 1 ? "bg-orange-400" : "bg-[#1b508f]"
                        }`}
                        style={{ width: `${(item.count / MAX_DOWNLOADS) * 100}%` }}
                      />
                    </div>
                  </div>

                  {item.isDownloadable ? (
                    <a
                      href={item.downloadUrl}
                      className="w-full flex items-center justify-center gap-2 bg-[#1b508f] hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md shadow-blue-900/20 text-sm"
                    >
                      <Download size={16} />
                      Télécharger le fichier
                      <span className="ml-auto text-blue-200 text-xs font-normal">{item.remaining} restant(s)</span>
                    </a>
                  ) : (
                    <div className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-400 font-bold py-3 px-4 rounded-xl text-sm cursor-not-allowed">
                      <Lock size={16} />
                      Limite de téléchargement atteinte
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
