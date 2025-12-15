import { redirect } from 'next/navigation';

// Ez a fájl csak arra szolgál, hogy ha valaki a gyökérre téved,
// azonnal dobja át az angol (vagy olasz) oldalra.
export default function RootPage() {
  redirect('/en');
}