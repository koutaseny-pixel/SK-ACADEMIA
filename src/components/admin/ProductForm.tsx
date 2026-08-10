"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Upload, Save, X, FileText, Image as ImageIcon, Loader2 } from "lucide-react";
import Link from "next/link";

type Product = {
  id?: string;
  name: string;
  category: string;
  price: number;
  badge: string;
  description: string;
  is_published: boolean;
  image_url: string;
  file_url: string;
  preview_url?: string;
};

export default function ProductForm({ initialData }: { initialData?: Product }) {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState<Product>({
    name: initialData?.name || "",
    category: initialData?.category || "prepa",
    price: initialData?.price || 0,
    badge: initialData?.badge || "",
    description: initialData?.description || "",
    is_published: initialData?.is_published || false,
    image_url: initialData?.image_url || "",
    file_url: initialData?.file_url || "",
    preview_url: initialData?.preview_url || "",
  });

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);

  const uploadFile = async (file: File, bucket: string, path: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    if (bucket === 'product-covers') {
      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filePath);
      return publicUrl;
    }
    
    // For private files, return the path to generate signed URLs later
    return filePath;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let finalImageUrl = formData.image_url;
      let finalFileUrl = formData.file_url;
      let finalPreviewUrl = formData.preview_url;

      if (coverFile) {
        finalImageUrl = await uploadFile(coverFile, 'product-covers', 'covers');
      }

      if (previewFile) {
        finalPreviewUrl = await uploadFile(previewFile, 'product-covers', 'previews');
      }

      if (pdfFile) {
        finalFileUrl = await uploadFile(pdfFile, 'product-files', 'pdfs');
      }

      const productData = {
        name: formData.name,
        category: formData.category,
        price: formData.price,
        badge: formData.badge,
        description: formData.description,
        is_published: formData.is_published,
        image_url: finalImageUrl,
        file_url: finalFileUrl,
        preview_url: finalPreviewUrl,
      };

      if (initialData?.id) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", initialData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("products")
          .insert([productData]);
        if (error) throw error;
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de la sauvegarde.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 max-w-4xl mx-auto">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Informations de base */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Informations Générales</h3>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Nom du produit *</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full border border-gray-200 rounded-xl py-2.5 px-4 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Catégorie *</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full border border-gray-200 rounded-xl py-2.5 px-4 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium bg-white"
              >
                <option value="prepa">Préparation</option>
                <option value="formation">Formation</option>
                <option value="ressources">Ressource et E-book</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Prix (FCFA) *</label>
              <input 
                type="number" 
                value={formData.price}
                onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                className="w-full border border-gray-200 rounded-xl py-2.5 px-4 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
                required 
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Badge (Optionnel)</label>
            <input 
              type="text" 
              value={formData.badge}
              onChange={e => setFormData({...formData, badge: e.target.value})}
              className="w-full border border-gray-200 rounded-xl py-2.5 px-4 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
              placeholder="ex: Nouveau, Promo"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
            <textarea 
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full border border-gray-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium min-h-[120px]"
              placeholder="Description détaillée du produit..."
            />
          </div>
        </div>

        {/* Fichiers & Statut */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Fichiers & Statut</h3>
          
          {/* Image de couverture */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Image de Couverture</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-orange-500 transition-colors bg-gray-50">
              <input 
                type="file" 
                accept="image/*"
                onChange={e => setCoverFile(e.target.files?.[0] || null)}
                className="hidden" 
                id="cover-upload" 
              />
              <label htmlFor="cover-upload" className="cursor-pointer flex flex-col items-center">
                <ImageIcon size={32} className="text-gray-400 mb-3" />
                <span className="text-sm font-medium text-gray-600">
                  {coverFile ? coverFile.name : "Cliquez pour uploader une image"}
                </span>
                {formData.image_url && !coverFile && (
                  <span className="text-xs text-green-600 font-bold mt-2">Image actuelle déjà enregistrée</span>
                )}
              </label>
            </div>
          </div>

          {/* Fichier Aperçu */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Fichier Aperçu (Image ou PDF) - Optionnel</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-purple-500 transition-colors bg-gray-50">
              <input 
                type="file" 
                accept="image/*,.pdf"
                onChange={e => setPreviewFile(e.target.files?.[0] || null)}
                className="hidden" 
                id="preview-upload" 
              />
              <label htmlFor="preview-upload" className="cursor-pointer flex flex-col items-center">
                <FileText size={32} className="text-gray-400 mb-3" />
                <span className="text-sm font-medium text-gray-600">
                  {previewFile ? previewFile.name : "Cliquez pour uploader un aperçu gratuit"}
                </span>
                {formData.preview_url && !previewFile && (
                  <span className="text-xs text-green-600 font-bold mt-2">Aperçu actuel déjà enregistré</span>
                )}
              </label>
            </div>
          </div>

          {/* Fichier PDF */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Fichier Numérique (PDF, ZIP) *</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#1b508f] transition-colors bg-gray-50">
              <input 
                type="file" 
                accept=".pdf,.zip"
                onChange={e => setPdfFile(e.target.files?.[0] || null)}
                className="hidden" 
                id="file-upload" 
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                <FileText size={32} className="text-gray-400 mb-3" />
                <span className="text-sm font-medium text-gray-600">
                  {pdfFile ? pdfFile.name : "Cliquez pour uploader le fichier final"}
                </span>
                {formData.file_url && !pdfFile && (
                  <span className="text-xs text-green-600 font-bold mt-2">Fichier actuel déjà enregistré</span>
                )}
              </label>
            </div>
          </div>

          {/* Statut */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between mt-8">
            <div>
              <span className="block text-sm font-bold text-gray-900">Visibilité</span>
              <span className="text-xs text-gray-500">Mettre en ligne ce produit sur la boutique</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={formData.is_published}
                onChange={e => setFormData({...formData, is_published: e.target.checked})}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
        <Link 
          href="/admin/products"
          className="px-6 py-2.5 rounded-xl text-gray-600 font-bold text-sm hover:bg-gray-100 transition-colors"
        >
          Annuler
        </Link>
        <button 
          type="submit" 
          disabled={loading}
          className="bg-[#1b508f] hover:bg-blue-800 text-white px-8 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-md disabled:opacity-50"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {initialData?.id ? "Enregistrer les modifications" : "Créer le produit"}
        </button>
      </div>
    </form>
  );
}
