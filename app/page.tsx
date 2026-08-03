"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Leaf, Phone, MapPin, CheckCircle, MessageCircle, X, ChevronLeft, ChevronRight, Info } from "lucide-react";
import prezzi from "../data/prezzi.json";
import lavori from "../data/lavori.json";

type Lavoro = {
  id: number;
  titolo: string;
  galleria: string[];
};

type DettaglioPrezzo = {
  nome: string;
  costo: string;
};

type Servizio = {
  id: number;
  servizio: string;
  prezzo: string;
  descrizione: string;
  dettagli: DettaglioPrezzo[];
};

export default function Home() {
  const [lavoroSelezionato, setLavoroSelezionato] = useState<Lavoro | null>(null);
  const [indiceFoto, setIndiceFoto] = useState(0);
  
  // Stato per la modale dei prezzi
  const [servizioSelezionato, setServizioSelezionato] = useState<Servizio | null>(null);

  // --- MOTORE DELLE ANIMAZIONI ---
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const popUpSpring: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 12 } 
    },
  };

  const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };
  // --- FINE MOTORE ANIMAZIONI ---

  const fotoSuccessiva = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lavoroSelezionato) setIndiceFoto((prev) => (prev === lavoroSelezionato.galleria.length - 1 ? 0 : prev + 1));
  };

  const fotoPrecedente = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lavoroSelezionato) setIndiceFoto((prev) => (prev === 0 ? lavoroSelezionato.galleria.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 overflow-hidden">
      
      {/* NAVBAR */}
      <motion.nav 
        initial={{ y: -100 }} 
        animate={{ y: 0 }} 
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
        className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50"
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          
          {/* LOGO TESTUALE RIPRISTINATO */}
          <div className="flex items-center gap-2 text-green-700 font-black text-2xl tracking-tighter">
            <Leaf size={28} />
            BRUDER GARDEN
          </div>

          <div className="hidden md:flex gap-6 font-semibold text-stone-600 items-center">
            <a href="#servizi" className="hover:text-green-700 transition-colors">Servizi & Prezzi</a>
            <a href="#lavori" className="hover:text-green-700 transition-colors">I Nostri Lavori</a>
            <a href="#contatti" className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-500 transition-colors">Contatti</a>
          </div>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 bg-[url('/sfondo-hero.jpg')]" />
        <div className="absolute inset-0 bg-black/60 z-10" /> 
        
        <motion.div 
          className="relative z-20 text-center px-4 max-w-4xl"
          variants={staggerContainer}
          initial="hidden" 
          animate="show"
        >
          <motion.h1 variants={popUpSpring} className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg">
            Il Tuo Giardino,<br />La Nostra Passione.
          </motion.h1>
          <motion.p variants={popUpSpring} className="text-xl md:text-2xl text-stone-200 mb-10 font-medium drop-shadow-md">
            Manutenzione, potature e realizzazione aree verdi con la massima professionalità.
          </motion.p>
          <motion.div variants={popUpSpring} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a 
              href="#contatti" 
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-green-500 transition-colors"
            >
              <MessageCircle size={24} />
              Richiedi Preventivo Gratuito
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* SEZIONE SERVIZI E PREZZI */}
      <section id="servizi" className="py-24 px-4 max-w-6xl mx-auto">
        <motion.div 
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={slideInLeft}
          className="text-center mb-16 pt-10"
        >
          <h2 className="text-4xl font-bold text-green-900 mb-4">Cosa Facciamo & Listino</h2>
          <p className="text-stone-600 text-lg">Trasparenza totale. Clicca sui servizi per vedere il listino dettagliato.</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {prezzi.map((item) => (
            <motion.div 
              key={item.id}
              variants={popUpSpring}
              whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              onClick={() => setServizioSelezionato(item)}
              className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 cursor-pointer transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold flex items-center gap-2 text-stone-800 group-hover:text-green-700 transition-colors">
                  <CheckCircle className="text-green-500" size={24} />
                  {item.servizio}
                </h3>
                <span className="bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full text-sm whitespace-nowrap">
                  {item.prezzo}
                </span>
              </div>
              <p className="text-stone-600 leading-relaxed mb-4">
                {item.descrizione}
              </p>
              <div className="flex items-center gap-1 text-green-600 font-semibold text-sm opacity-80 group-hover:opacity-100">
                <Info size={16} /> Clicca per vedere tutti i costi
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* MODALE DEI PREZZI DETTAGLIATI */}
      <AnimatePresence>
        {servizioSelezionato && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/80 p-4"
            onClick={() => setServizioSelezionato(null)} 
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white max-w-2xl w-full rounded-[2rem] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()} 
            >
              <div className="bg-green-50 p-6 md:p-8 flex justify-between items-start border-b border-green-100">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-green-900">{servizioSelezionato.servizio}</h3>
                  <p className="text-green-700 mt-2">{servizioSelezionato.descrizione}</p>
                </div>
                <button 
                  onClick={() => setServizioSelezionato(null)}
                  className="bg-green-200/50 hover:bg-green-200 text-green-800 p-2 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 md:p-8">
                <h4 className="font-bold text-stone-800 mb-4 text-lg border-b border-stone-100 pb-2">Listino Dettagliato</h4>
                <ul className="space-y-4">
                  {servizioSelezionato.dettagli.map((dettaglio, idx) => (
                    <li key={idx} className="flex justify-between items-center py-2 border-b border-stone-50 last:border-0">
                      <span className="text-stone-700">{dettaglio.nome}</span>
                      <span className="font-bold text-stone-900 bg-stone-100 px-3 py-1 rounded-lg text-sm text-right whitespace-nowrap ml-4">
                        {dettaglio.costo}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-stone-50 p-6 text-center border-t border-stone-100">
                <p className="text-sm text-stone-500 mb-4">I prezzi sono indicativi e possono variare in base alle condizioni del giardino.</p>
                <a 
                  href="https://wa.me/393331234567" 
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full md:w-auto bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-full font-bold transition-colors"
                >
                  Richiedi Sopralluogo Esatto
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEZIONE PORTFOLIO LAVORI */}
      <section id="lavori" className="py-24 px-4 bg-stone-200/50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={slideInLeft}
            className="text-center mb-16 pt-10"
          >
            <h2 className="text-4xl font-bold text-green-900 mb-4">I Nostri Lavori</h2>
            <p className="text-stone-600 text-lg">Clicca su una categoria per vedere la galleria fotografica dei nostri interventi.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {lavori.map((lavoro) => (
              <motion.div 
                key={lavoro.id}
                variants={popUpSpring}
                onClick={() => {
                  setLavoroSelezionato(lavoro);
                  setIndiceFoto(0);
                }}
                className="group relative overflow-hidden rounded-2xl aspect-square bg-stone-300 cursor-pointer shadow-md hover:shadow-2xl transition-all"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={lavoro.galleria[0]} alt={lavoro.titolo} className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h4 className="text-white font-bold text-xl">{lavoro.titolo}</h4>
                  <p className="text-green-400 text-sm mt-1 font-semibold flex items-center gap-1">
                    Clicca per {lavoro.galleria.length} foto <ChevronRight size={16} />
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MODALE DELLA GALLERIA FOTO */}
      <AnimatePresence>
        {lavoroSelezionato && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLavoroSelezionato(null)} 
          >
            <button className="absolute top-6 right-6 text-stone-400 hover:text-white hover:rotate-90 transition-all duration-300 z-[101]" onClick={() => setLavoroSelezionato(null)}>
              <X size={48} />
            </button>
            <button className="absolute left-2 md:left-10 text-stone-400 hover:text-white hover:-translate-x-2 transition-all z-[101]" onClick={fotoPrecedente}>
              <ChevronLeft size={56} />
            </button>
            <div className="relative max-w-5xl w-full flex flex-col items-center">
              <motion.img
                key={indiceFoto} 
                initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                src={lavoroSelezionato.galleria[indiceFoto]}
                alt={`Foto ${indiceFoto + 1} di ${lavoroSelezionato.titolo}`}
                className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl border-4 border-white/10"
                onClick={(e) => e.stopPropagation()} 
              />
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-center mt-6 bg-black/50 px-6 py-2 rounded-full" 
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-white font-bold text-xl">{lavoroSelezionato.titolo}</h3>
                <p className="text-green-400 font-medium">Foto {indiceFoto + 1} di {lavoroSelezionato.galleria.length}</p>
              </motion.div>
            </div>
            <button className="absolute right-2 md:right-10 text-stone-400 hover:text-white hover:translate-x-2 transition-all z-[101]" onClick={fotoSuccessiva}>
              <ChevronRight size={56} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEZIONE CONTATTI */}
      <section id="contatti" className="py-24 px-4 max-w-4xl mx-auto text-center pt-32">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={popUpSpring}>
          <h2 className="text-4xl font-bold text-green-900 mb-8">Pronto per un giardino perfetto?</h2>
          
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center justify-around gap-8 border-t-8 border-green-500 relative overflow-hidden">
            
            {/* ICONA FOGLIA RIPRISTINATA COME DECORO */}
            <div className="absolute -right-10 -top-10 text-green-50 opacity-50 pointer-events-none">
              <Leaf size={200} />
            </div>

            <div className="flex flex-col items-center gap-4 z-10">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-inner">
                <MapPin size={36} />
              </motion.div>
              <div>
                <h4 className="font-bold text-2xl text-stone-800">Zona Operativa</h4>
                <p className="text-stone-500 font-medium text-lg">Roma e Provincia</p>
              </div>
            </div>

            <div className="hidden md:block w-px h-32 bg-stone-100 z-10" /> 

            <a href="tel:+393331234567" className="flex flex-col items-center gap-4 z-10 group cursor-pointer">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }} className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-inner group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                <Phone size={36} />
              </motion.div>
              <div className="text-center">
                <h4 className="font-bold text-2xl text-stone-800 group-hover:text-green-600 transition-colors">Chiamaci Subito</h4>
                <p className="text-stone-500 font-medium text-lg group-hover:text-green-500 transition-colors">+39 389 257 9007</p>
              </div>
            </a>
          </div>

          <motion.div className="mt-14" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a href="https://wa.me/3892579007" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-5 rounded-full font-bold text-xl shadow-xl hover:bg-[#20b858] transition-colors">
              <MessageCircle size={28} />
              Scrivici su WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER RIPRISTINATO */}
      <footer className="bg-stone-900 text-stone-400 py-10 text-center flex flex-col items-center">
        <div className="flex justify-center items-center gap-2 mb-4 text-stone-500">
          <Leaf size={20} />
          <span className="font-bold tracking-widest text-sm">BRUDER GARDEN</span>
        </div>
        <p>© 2026 Bruder Garden. Tutti i diritti riservati.</p>
      </footer>

    </div>
  );
}
