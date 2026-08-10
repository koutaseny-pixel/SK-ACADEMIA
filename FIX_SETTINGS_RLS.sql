-- Supprimer l'ancienne politique
DROP POLICY IF EXISTS "Admin peut modifier les paramètres" ON public.site_settings;

-- Créer la nouvelle politique qui inclut l'adresse email de l'administrateur
CREATE POLICY "Admin peut modifier les paramètres"
    ON public.site_settings
    FOR UPDATE
    USING (
      auth.jwt() ->> 'email' = 'skacademia25@gmail.com'
      OR 
      auth.uid() IN (
        SELECT id FROM public.profiles WHERE role = 'admin'
      )
    );
