

INSERT INTO storage.buckets (id, name, public)
VALUES ('CARPETA_IMAGENES', 'CARPETA_IMAGENES', true)
ON CONFLICT (id) DO UPDATE SET public = true;


DROP POLICY IF EXISTS "Permitir subida publica en CARPETA_IMAGENES" ON storage.objects;
CREATE POLICY "Permitir subida publica en CARPETA_IMAGENES"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'CARPETA_IMAGENES');


DROP POLICY IF EXISTS "Permitir lectura publica en CARPETA_IMAGENES" ON storage.objects;
CREATE POLICY "Permitir lectura publica en CARPETA_IMAGENES"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'CARPETA_IMAGENES');


DROP POLICY IF EXISTS "Permitir actualizacion en CARPETA_IMAGENES" ON storage.objects;
CREATE POLICY "Permitir actualizacion en CARPETA_IMAGENES"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'CARPETA_IMAGENES');


DROP POLICY IF EXISTS "Permitir borrado en CARPETA_IMAGENES" ON storage.objects;
CREATE POLICY "Permitir borrado en CARPETA_IMAGENES"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'CARPETA_IMAGENES');

