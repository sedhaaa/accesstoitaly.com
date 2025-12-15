import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Ellenőrzés: Ha nincsenek meg a kulcsok, dobjon egy érthető hibát a konzolra,
// de ne omoljon össze az alkalmazás, amíg nem hívjuk meg a funkciót.
if (!supabaseUrl || !supabaseKey) {
  console.warn(
    'HIÁNYZÓ SUPABASE KULCSOK! Kérlek hozd létre a .env.local fájlt a megfelelő adatokkal.'
  );
}

// Fallback értékek használata, hogy a build ne törjön el, ha hiányzik a .env
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key'
);