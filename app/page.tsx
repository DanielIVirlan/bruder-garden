import HomeClient from "@/components/HomeClient";

type Recensione = { id: number | string; nome: string; testo: string; zona: string; };

const recensioniFallback: Recensione[] = [
  { id: 1, nome: "Marco R.", testo: "Lorenzo è un vero professionista. Ha rimesso a nuovo il nostro giardino condominiale in un giorno. Consigliatissimo!", zona: "Roma Sud" },
  { id: 2, nome: "Giulia S.", testo: "Puntuale, preciso e con attrezzatura all'avanguardia. Finalmente ho trovato un giardiniere di fiducia a Roma.", zona: "Eur" },
  { id: 3, nome: "Alessandro T.", testo: "Ottimo servizio di potatura per i miei ulivi. Lavoro pulito e grande attenzione alla salute delle piante.", zona: "Castelli Romani" }
];

async function getRecensioniGoogle(): Promise<Recensione[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return recensioniFallback;
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&language=it&key=${apiKey}`;
    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json();

    if (data.result && data.result.reviews) {
      return data.result.reviews.map((rev: any, index: number) => ({
        id: index,
        nome: rev.author_name,
        testo: rev.text,
        zona: "Roma e Provincia" // Oppure estrai la zona se disponibile
      }));
    }
  } catch (error) {
    console.error("Errore nel fetch delle recensioni Google a build-time:", error);
  }

  return recensioniFallback;
}

export default async function Page() {
  const recensioni = await getRecensioniGoogle();
  return <HomeClient recensioniIniziali={recensioni} />;
}