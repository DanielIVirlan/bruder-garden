import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
// Il "Titolo Blu" che appare su Google (massimo 60 caratteri circa)
title: "Giardiniere Roma | Manutenzione Aree Verdi e Potature | Bruder Garden",

// La descrizione grigia sotto il titolo su Google (persuasiva per far cliccare)
description: "Cerchi un giardiniere professionista a Roma? Bruder Garden offre servizi di manutenzione giardini, potature ad alto fusto, tree climbing e cura del prato. Preventivi gratuiti!",

// Parole chiave principali per aiutare i motori di ricerca
keywords: [
"giardiniere Roma",
"manutenzione giardini Roma",
"potatura alberi Roma",
"tree climbing Roma",
"realizzazione giardini",
"Bruder Garden"
],

// Come appare il sito se qualcuno condivide il link su WhatsApp o Facebook
openGraph: {
title: "Bruder Garden | Il tuo Giardiniere a Roma",
description: "Manutenzione aree verdi, potature e realizzazione giardini a Roma e provincia. Affidati a professionisti del verde.",
url: "https://www.brudergarden.it", // INSERISCI QUI IL DOMINIO VERO UNA VOLTA COLLEGATO
siteName: "Bruder Garden",
locale: "it_IT",
type: "website",
},

// Diciamo esplicitamente ai robot di Google di leggere e indicizzare il sito
robots: {
index: true,
follow: true,
}
};

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (
// Impostiamo la lingua italiana per aiutare la SEO locale
<html lang="it" className="scroll-smooth">
<body>{children}</body>
</html>
);
}
