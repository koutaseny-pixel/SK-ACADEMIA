-- Création de la table pour stocker les paramètres du site
CREATE TABLE public.site_settings (
    id INT PRIMARY KEY DEFAULT 1,
    email TEXT NOT NULL DEFAULT 'support@skacademia.sn',
    phone TEXT NOT NULL DEFAULT '+221 77 000 00 00',
    address TEXT NOT NULL DEFAULT 'Dakar, Sénégal',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    CONSTRAINT site_settings_id_check CHECK (id = 1) -- Assure qu'il n'y a qu'une seule ligne
);

-- Activation de RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut lire les paramètres (anonyme ou connecté)
CREATE POLICY "Tout le monde peut lire les paramètres"
    ON public.site_settings
    FOR SELECT
    USING (true);

-- Seul l'administrateur peut modifier les paramètres
CREATE POLICY "Admin peut modifier les paramètres"
    ON public.site_settings
    FOR UPDATE
    USING (
      auth.uid() IN (
        SELECT id FROM public.profiles WHERE role = 'admin'
      )
    );

-- Insertion de la ligne par défaut
INSERT INTO public.site_settings (id, email, phone, address)
VALUES (1, 'support@skacademia.sn', '+221 77 000 00 00', 'Dakar, Sénégal (Sur rendez-vous uniquement)')
ON CONFLICT (id) DO NOTHING;
