"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Leaf, Phone, MapPin, CheckCircle, MessageCircle, X, ChevronLeft, ChevronRight, Info, Menu, Tractor, Wrench, Scissors, Settings, Star, ShieldCheck, Award, Send, Trees } from "lucide-react";
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
  const [servizioSelezionato, setServizioSelezionato] = useState<Servizio | null>(null);
  const [menuAperto, setMenuAperto] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (lavoroSelezionato || servizioSelezionato || menuAperto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [lavoroSelezionato, servizioSelezionato, menuAperto]);

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const popUpSpring: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 12 } },
  };

  const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fotoSuccessiva = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lavoroSelezionato) setIndiceFoto((prev) => (prev === lavoroSelezionato.galleria.length - 1 ? 0 : prev + 1));
  };

  const fotoPrecedente = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lavoroSelezionato) setIndiceFoto((prev) => (prev === 0 ? lavoroSelezionato.galleria.length - 1 : prev - 1));
  };

  const attrezzature = [
    { id: 1, titolo: "Trattorini Rasaerba", desc: "Taglio rapido e uniforme per grandi superfici e parchi.", icona: <Tractor size={32} /> },
    { id: 2, titolo: "Decespugliatori Professionali", desc: "Rifiniture perfette e pulizia profonda di erba alta e rovi.", icona: <Wrench size={32} /> },
    { id: 3, titolo: "Motoseghe da Potatura", desc: "Interventi precisi e sicuri per potature e abbattimenti.", icona: <Scissors size={32} /> },
    { id: 4, titolo: "Arieggiatori e Soffiatori", desc: "Per la rigenerazione, la pulizia e la salute del prato.", icona: <Settings size={32} /> }
  ];

  const certificazioni = [
    { id: 1, titolo: "Assicurazione RC", desc: "Copertura completa per eventuali danni a terzi durante i lavori.", icona: <ShieldCheck size={36} /> },
    { id: 2, titolo: "Potature in Quota", desc: "Abilitazione e patentino per lavori ad alto fusto (Tree Climbing).", icona: <Trees size={36} /> },
    { id: 3, titolo: "Fitosanitari", desc: "Patentino ufficiale per l'uso in sicurezza di trattamenti specifici.", icona: <Award size={36} /> },
    { id: 4, titolo: "Smaltimento Verde", desc: "Gestione e smaltimento del verde a norma presso centri autorizzati.", icona: <Leaf size={36} /> }
  ];

  const recensioni = [
    { id: 1, nome: "Marco R.", testo: "Lorenzo è un vero professionista. Ha rimesso a nuovo il nostro giardino condominiale in un giorno. Consigliatissimo!", zona: "Roma Sud" },
    { id: 2, nome: "Giulia S.", testo: "Puntuale, preciso e con attrezzatura all'avanguardia. Finalmente ho trovato un giardiniere di fiducia a Roma.", zona: "Eur" },
    { id: 3, nome: "Alessandro T.", testo: "Ottimo servizio di potatura per i miei ulivi. Lavoro pulito e grande attenzione alla salute delle piante.", zona: "Castelli Romani" }
  ];

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 overflow-x-hidden">
      
      {/* NAVBAR */}
      <motion.nav 
        initial={{ y: -100 }} 
        animate={{ y: 0 }} 
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
        className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50"
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-green-700 font-black text-2xl tracking-tighter z-50">
            <Leaf size={28} />
            BRUDER GARDEN
          </div>

          <div className="hidden md:flex gap-6 font-semibold text-stone-600 items-center">
            <a href="#chi-siamo" className="hover:text-green-700 transition-colors">Chi Siamo</a>
            <a href="#servizi" className="hover:text-green-700 transition-colors">Servizi & Prezzi</a>
            <a href="#lavori" className="hover:text-green-700 transition-colors">I Nostri Lavori</a>
            <a href="#contatti" className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-500 transition-colors">Contatti</a>
          </div>

          <button 
            className="md:hidden text-stone-800 p-2 z-50"
            onClick={() => setMenuAperto(!menuAperto)}
          >
            {menuAperto ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* MENU A TENDINA PER MOBILE */}
        <AnimatePresence>
          {menuAperto && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-stone-100 shadow-xl overflow-hidden"
            >
              <div className="flex flex-col px-6 py-6 gap-6 font-bold text-lg text-stone-700 text-center">
                <a href="#chi-siamo" onClick={() => setMenuAperto(false)} className="hover:text-green-600">Chi Siamo</a>
                <a href="#servizi" onClick={() => setMenuAperto(false)} className="hover:text-green-600">Servizi & Prezzi</a>
                <a href="#lavori" onClick={() => setMenuAperto(false)} className="hover:text-green-600">I Nostri Lavori</a>
                <a href="#contatti" onClick={() => setMenuAperto(false)} className="bg-green-600 text-white py-3 rounded-full">Contatti</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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

      {/* SEZIONE CHI SIAMO */}
      <section id="chi-siamo" className="pt-24 pb-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto pt-10">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            
            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={slideInLeft}
              className="w-full md:w-1/2"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-4/5 md:aspect-square group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/profilo.png" 
                  alt="Il fondatore di Bruder Garden" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 border-4 border-green-500 rounded-[2.5rem] scale-95 opacity-50 pointer-events-none"></div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={popUpSpring}
              className="w-full md:w-1/2"
            >
              <div className="flex items-center gap-3 mb-4">
                <Leaf className="text-green-600" size={32} />
                <h2 className="text-4xl font-bold text-green-900">Chi Siamo</h2>
              </div>
              <h3 className="text-2xl text-stone-800 font-semibold mb-6">Radici profonde, passione che cresce.</h3>
              
              <div className="space-y-4 text-stone-600 text-lg leading-relaxed">
                <p>
                  Ciao! Sono <strong>Lorenzo</strong>, il fondatore di Bruder Garden. La mia avventura nel mondo del verde è nata da una passione semplice ma fortissima: trasformare spazi anonimi in angoli di natura vivi e rigogliosi.
                </p>
                <p>
                  Con anni di esperienza sul campo, sporcandomi le mani di terra e studiando le esigenze di ogni singola pianta, ho costruito una realtà che non si limita a "tagliare l'erba", ma che si prende cura dell'intero ecosistema del tuo giardino.
                </p>
                <p>
                  Ogni progetto, dal piccolo cortile di casa al grande parco condominiale, è per me una nuova tela. Lavoro con precisione, puntualità e attrezzature professionali per garantirti un risultato impeccabile, sempre.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SEZIONE CERTIFICAZIONI E SICUREZZA */}
      <section className="pb-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto border-t border-stone-100 pt-16">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >
            {certificazioni.map((cert) => (
              <motion.div key={cert.id} variants={popUpSpring} className="flex flex-col items-center justify-start p-4">
                <div className="w-20 h-20 mx-auto bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-5 shadow-[0_0_25px_rgba(34,197,94,0.25)] border border-green-100">
                  {cert.icona}
                </div>
                <h3 className="text-lg font-bold text-stone-800 mb-2">{cert.titolo}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{cert.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
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
            className="fixed inset-0 z-100 flex items-center justify-center bg-stone-900/80 p-4"
            onClick={() => setServizioSelezionato(null)} 
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white max-w-2xl w-full rounded-4xl shadow-2xl overflow-hidden"
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
                    <li key={idx} className="flex flex-col md:flex-row md:justify-between md:items-center py-2 border-b border-stone-50 last:border-0 gap-2">
                      <span className="text-stone-700">{dettaglio.nome}</span>
                      <span className="font-bold text-stone-900 bg-stone-100 px-3 py-1 rounded-lg text-sm text-center md:text-right whitespace-nowrap">
                        {dettaglio.costo}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-stone-50 p-6 text-center border-t border-stone-100">
                <p className="text-sm text-stone-500 mb-4">I prezzi sono indicativi e possono variare in base alle condizioni del giardino.</p>
                <a 
                  href="#contatti"
                  onClick={() => setServizioSelezionato(null)}
                  className="inline-flex items-center justify-center gap-2 w-full md:w-auto bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-full font-bold transition-colors"
                >
                  Richiedi Sopralluogo Esatto
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEZIONE ATTREZZATURA */}
      <section id="attrezzatura" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto pt-10">
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={slideInLeft}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-green-900 mb-4">La Nostra Attrezzatura</h2>
            <p className="text-stone-600 text-lg">Investiamo nei migliori macchinari professionali per garantire rapidità e risultati perfetti.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {attrezzature.map((mezzo) => (
              <motion.div 
                key={mezzo.id}
                variants={popUpSpring}
                className="bg-stone-50 border border-stone-100 p-8 rounded-3xl text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  {mezzo.icona}
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-3">{mezzo.titolo}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {mezzo.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* LOGHI MARCHE DI FIDUCIA */}
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={popUpSpring}
            className="text-center"
          >
            <p className="text-sm font-bold text-stone-400 tracking-widest uppercase mb-8">I nostri marchi di fiducia</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Stihl_Logo.svg" alt="Stihl" className="h-12 md:h-16 w-auto object-contain" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Milwaukee_Logo.svg" alt="Milwaukee" className="h-12 md:h-16 w-auto object-contain" />
            </div>
          </motion.div>
        </div>
      </section>

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
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
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

      {/* SEZIONE RECENSIONI */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={slideInLeft}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-green-900 mb-4">Dicono di Noi</h2>
            <p className="text-stone-600 text-lg">La soddisfazione dei nostri clienti è la nostra garanzia migliore.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {recensioni.map((rec) => (
              <motion.div key={rec.id} variants={popUpSpring} className="bg-stone-50 p-8 rounded-3xl shadow-sm border border-stone-100">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <p className="text-stone-700 italic mb-6 leading-relaxed">&quot;{rec.testo}&quot;</p>
                <div>
                  <h4 className="font-bold text-stone-900">{rec.nome}</h4>
                  <span className="text-sm text-stone-500">{rec.zona}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SEZIONE CONTATTI & MODULO */}
      <section id="contatti" className="py-24 px-4 bg-stone-100">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={slideInLeft}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-green-900 mb-4">Pronto per un giardino perfetto?</h2>
            <p className="text-stone-600 text-lg">Scrivici un messaggio, chiamaci o mandaci un WhatsApp per un preventivo gratuito.</p>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row gap-12 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border-t-8 border-green-500 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 text-green-50 opacity-50 pointer-events-none z-0">
              <Leaf size={300} />
            </div>

            {/* Colonna Sinistra: Recapiti Diretti */}
            <div className="w-full lg:w-1/3 flex flex-col gap-10 z-10">
              <a 
                href="https://www.google.com/maps/place/Roma+RM/@41.910241,12.3959115,11z" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-6 group cursor-pointer"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-stone-800 group-hover:text-green-600 transition-colors">Zona Operativa</h4>
                  <p className="text-stone-500 underline underline-offset-2">Roma e Provincia</p>
                </div>
              </a>

              <a href="tel:+393892579007" className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-stone-800 group-hover:text-green-600 transition-colors">Chiamaci Subito</h4>
                  <p className="text-stone-500 font-medium">389 257 9007</p>
                </div>
              </a>

              <a href="https://wa.me/393892579007" target="_blank" rel="noreferrer" className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-[#25D366]/20 text-[#25D366] rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <MessageCircle size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-stone-800 group-hover:text-[#25D366] transition-colors">Scrivici su WhatsApp</h4>
                  <p className="text-stone-500 font-medium">Risposta veloce</p>
                </div>
              </a>
            </div>

            {/* Colonna Destra: Modulo di Contatto */}
            <div className="w-full lg:w-2/3 z-10 bg-stone-50 p-8 rounded-3xl border border-stone-100">
              <h3 className="text-2xl font-bold text-stone-800 mb-6">Inviaci un messaggio</h3>
              <form action="https://formspree.io/f/xaewwbvq" method="POST" className="flex flex-col gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="nome" className="text-sm font-semibold text-stone-600">Nome o Azienda *</label>
                    <input type="text" id="nome" name="nome" required className="px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white" placeholder="Es. Mario Rossi" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="telefono" className="text-sm font-semibold text-stone-600">Telefono *</label>
                    <input type="tel" id="telefono" name="telefono" required className="px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white" placeholder="Es. 333 1234567" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-sm font-semibold text-stone-600">Email (Opzionale)</label>
                  <input type="email" id="email" name="email" className="px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white" placeholder="tua@email.com" />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="messaggio" className="text-sm font-semibold text-stone-600">Come possiamo aiutarti? *</label>
                  <textarea id="messaggio" name="messaggio" required rows={4} className="px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white resize-none" placeholder="Descrivi brevemente il lavoro di cui hai bisogno..."></textarea>
                </div>

                <button type="submit" className="mt-2 inline-flex justify-center items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-500 transition-colors">
                  Invia Richiesta <Send size={20} />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-400 py-10 text-center flex flex-col items-center">
        <div className="flex justify-center items-center gap-2 mb-4 text-stone-500">
          <Leaf size={20} />
          <span className="font-bold tracking-widest text-sm">BRUDER GARDEN</span>
        </div>
        <p>© 2026 Bruder Garden. Tutti i diritti riservati.</p>
      </footer>

      {/* MODALE DELLA GALLERIA FOTO */}
      <AnimatePresence>
        {lavoroSelezionato && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLavoroSelezionato(null)} 
          >
            <button className="absolute top-6 right-6 text-stone-400 hover:text-white hover:rotate-90 transition-all duration-300 z-101" onClick={() => setLavoroSelezionato(null)}>
              <X size={48} />
            </button>
            <button className="absolute left-2 md:left-10 text-stone-400 hover:text-white hover:-translate-x-2 transition-all z-101" onClick={fotoPrecedente}>
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
            <button className="absolute right-2 md:right-10 text-stone-400 hover:text-white hover:translate-x-2 transition-all z-101" onClick={fotoSuccessiva}>
              <ChevronRight size={56} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
