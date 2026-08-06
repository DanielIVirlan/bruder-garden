import { NextResponse } from 'next/server';

// QUESTA È LA RIGA MAGICA CHE RISOLVE L'ERRORE
export const dynamic = 'force-static';

export async function GET() {
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  const PLACE_ID = process.env.GOOGLE_PLACE_ID;

  if (!API_KEY || !PLACE_ID) {
    return NextResponse.json(
      { error: 'Configurazione Google API o Place ID mancante' },
      { status: 500 }
    );
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&language=it&key=${API_KEY}`;
    
    // Per i siti statici, togliamo il revalidate interno a fetch e usiamo la forza statica globale
    const response = await fetch(url);
    
    const data = await response.json();

    if (!data.result || !data.result.reviews) {
      return NextResponse.json([]);
    }

    const recensioniFormattate = data.result.reviews
      .filter((rev: any) => rev.rating >= 4)
      .slice(0, 3)
      .map((rev: any, index: number) => ({
        id: index,
        nome: rev.author_name,
        testo: rev.text,
        zona: "Cliente Verificato su Google", 
      }));

    return NextResponse.json(recensioniFormattate);

  } catch (error) {
    console.error("Errore fetch recensioni da Google Maps:", error);
    return NextResponse.json(
      { error: 'Errore interno nel recupero delle recensioni' },
      { status: 500 }
    );
  }
}