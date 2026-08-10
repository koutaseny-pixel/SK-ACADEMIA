-- Ajouter la colonne preview_url à la table products
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS preview_url TEXT;

-- Mettre à jour les politiques de stockage (Storage) pour le bucket 'product-covers' si ce n'est pas déjà fait
-- On va utiliser 'product-covers' pour stocker les images d'aperçu aussi, car c'est un bucket public
