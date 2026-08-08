import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const MAX_DOWNLOADS = 5;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderItemId: string }> }
) {
  // Wait for the params to be resolved in Next.js 15+
  const resolvedParams = await params;
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  // 1. Fetch order item and check ownership & status
  const { data: orderItem, error: itemError } = await supabase
    .from("order_items")
    .select(`
      id,
      product_id,
      orders!inner(user_id, status),
      products!inner(file_url)
    `)
    .eq("id", resolvedParams.orderItemId)
    .single();

  if (itemError || !orderItem) {
    return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
  }

  // Type coercions for inner joins
  const order: any = Array.isArray(orderItem.orders) ? orderItem.orders[0] : orderItem.orders;
  const product: any = Array.isArray(orderItem.products) ? orderItem.products[0] : orderItem.products;

  if (order.user_id !== user.id) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  if (order.status !== "paid") {
    return NextResponse.json({ error: "Commande non payée" }, { status: 403 });
  }

  if (!product?.file_url) {
    return NextResponse.json({ error: "Fichier non disponible" }, { status: 404 });
  }

  // 2. Check download limit
  const { count, error: countError } = await supabase
    .from("product_downloads")
    .select("*", { count: 'exact', head: true })
    .eq("order_item_id", resolvedParams.orderItemId)
    .eq("user_id", user.id);

  if (countError) {
    console.error("Count error:", countError);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }

  if (count !== null && count >= MAX_DOWNLOADS) {
    return NextResponse.json({ 
      error: `Limite de téléchargement atteinte (${MAX_DOWNLOADS} max). Contactez le support si vous avez perdu votre fichier.` 
    }, { status: 429 });
  }

  // 3. Insert download record
  const { error: insertError } = await supabase
    .from("product_downloads")
    .insert({
      user_id: user.id,
      order_item_id: resolvedParams.orderItemId,
      product_id: orderItem.product_id,
    });

  if (insertError) {
    console.error("Download tracking error:", insertError);
    return NextResponse.json({ error: "Erreur lors du suivi" }, { status: 500 });
  }

  // 4. Generate signed URL (60 seconds)
  const { data: signedData, error: signedError } = await supabase.storage
    .from("product-files")
    .createSignedUrl(product.file_url, 60);

  if (signedError || !signedData?.signedUrl) {
    console.error("Signed URL error:", signedError);
    return NextResponse.json({ error: "Impossible de générer le lien de téléchargement" }, { status: 500 });
  }

  // 5. Redirect to the signed URL
  return NextResponse.redirect(signedData.signedUrl);
}
