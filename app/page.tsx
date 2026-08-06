"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Leaf, Phone, MapPin, CheckCircle, MessageCircle, X, ChevronLeft, ChevronRight, Info, Menu, Tractor, Wrench, Scissors, Settings, Star, ShieldCheck, Award, Send, Trees } from "lucide-react";
import prezzi from "../data/prezzi.json";
import lavori from "../data/lavori.json";
import Link from 'next/link';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

type Lavoro = { id: number; titolo: string; galleria: string[]; };
type DettaglioPrezzo = { nome: string; costo: string; };
type Servizio = { id: number; servizio: string; prezzo: string; descrizione: string; dettagli: DettaglioPrezzo[]; };
type Recensione = { id: number | string; nome: string; testo: string; zona: string; };

// NUOVO TIPO PER LA GALLERIA PRIMA/DOPO
type PrimaDopo = { id: number; titolo: string; prima: string; dopo: string; };

export default function Home() {
  const [lavoroSelezionato, setLavoroSelezionato] = useState<Lavoro | null>(null);
  const [indiceFoto, setIndiceFoto] = useState(0);
  const [servizioSelezionato, setServizioSelezionato] = useState<Servizio | null>(null);
  const [menuAperto, setMenuAperto] = useState(false);
  
  // STATO PER EVITARE L'ERRORE DI IDRATAZIONE (HYDRATION ERROR)
  const [isMounted, setIsMounted] = useState(false);

  // NUOVO STATO PER IL MODALE DELLO SLIDER
  const [primaDopoSelezionato, setPrimaDopoSelezionato] = useState<PrimaDopo | null>(null);

  // LISTA DEI LAVORI PRIMA E DOPO
  const listaPrimaDopo: PrimaDopo[] = [
    { id: 1, titolo: "Rigenerazione Prato", prima: "/prima.png", dopo: "/dopo.png" },
    { id: 2, titolo: "Potatura Siepe", prima: "/prima.png", dopo: "/dopo.png" }, 
    { id: 3, titolo: "Recupero Giardino", prima: "/prima1.png", dopo: "/dopo1.png" },
    { id: 4, titolo: "Pulizia Viale Esterno", prima: "/prima.png", dopo: "/dopo.png" },
    { id: 5, titolo: "Messa a Dimora Piante", prima: "/prima.png", dopo: "/dopo.png" },
    { id: 6, titolo: "Potatura Alberi", prima: "/prima.png", dopo: "/dopo.png" }
  ];
  
  // STATO PER LE RECENSIONI GOOGLE (AGGIORNATO CON QUELLE REALI DELLA FOTO)
  const recensioniFallback: Recensione[] = [
    { 
      id: 1, 
      nome: "Nicolino Carioti", 
      testo: "Ho conosciuto questo giovane, ma molto professionale giardiniere, durante la raccolta delle olive nel mio terreno : è competente in materia, usa attrezzatura professionale.", 
      zona: "Cliente Verificato su Google" 
    },
    { 
      id: 2, 
      nome: "F Albe", 
      testo: "Lorenzo è un vero e proprio mago nel suo mestiere, consigliatissimo! Mi ha rivoluzionato il giardino come nessun altro giardiniere aveva mai fatto!", 
      zona: "Cliente Verificato su Google" 
    },
    { 
      id: 3, 
      nome: "Francesco", 
      testo: "Molto competente in materia , utilizza attrezzatura professionale e sà il fatto suo.", 
      zona: "Cliente Verificato su Google" 
    }
  ];
  const [recensioniGoogle, setRecensioniGoogle] = useState<Recensione[]>(recensioniFallback);

  // CHIAMATA API A GOOGLE MAPS E SETUP DEL MONTAGGIO
  useEffect(() => {
    // Comunica a React che siamo sul client
    setIsMounted(true);

    const fetchRecensioni = async () => {
      try {
        const response = await fetch('/api/recensioni');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setRecensioniGoogle(data);
          }
        }
      } catch (error) {
        console.error("Errore recupero recensioni Google", error);
      }
    };
    fetchRecensioni();
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);

  // BLOCCO SCROLL QUANDO MODALI SONO APERTI
  useEffect(() => {
    document.body.style.overflow = (lavoroSelezionato || servizioSelezionato || menuAperto || primaDopoSelezionato) ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [lavoroSelezionato, servizioSelezionato, menuAperto, primaDopoSelezionato]);

  const staggerContainer: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const popUpSpring: Variants = { hidden: { opacity: 0, y: 60, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 12 } } };
  const slideInLeft: Variants = { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } };

  const fotoSuccessiva = (e: React.MouseEvent) => { e.stopPropagation(); if (lavoroSelezionato) setIndiceFoto((prev) => (prev === lavoroSelezionato.galleria.length - 1 ? 0 : prev + 1)); };
  const fotoPrecedente = (e: React.MouseEvent) => { e.stopPropagation(); if (lavoroSelezionato) setIndiceFoto((prev) => (prev === 0 ? lavoroSelezionato.galleria.length - 1 : prev - 1)); };

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

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 overflow-x-hidden">
      
      {/* NAVBAR */}
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 50, damping: 15 }} className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-green-700 font-black text-2xl tracking-tighter z-50">
            <Leaf size={28} /> BRUDER GARDEN
          </div>
          <div className="hidden md:flex gap-6 font-semibold text-stone-600 items-center">
            <a href="#chi-siamo" className="hover:text-green-700 transition-colors">Chi Siamo</a>
            <a href="#servizi" className="hover:text-green-700 transition-colors">Servizi & Prezzi</a>
            <a href="#lavori" className="hover:text-green-700 transition-colors">I Nostri Lavori</a>
            <a href="#contatti" className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-500 transition-colors">Contatti</a>
          </div>
          <button className="md:hidden text-stone-800 p-2 z-50" onClick={() => setMenuAperto(!menuAperto)}>
            {menuAperto ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
        <AnimatePresence>
          {menuAperto && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white border-t border-stone-100 shadow-xl overflow-hidden">
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
        <motion.div className="relative z-20 text-center px-4 max-w-4xl" variants={staggerContainer} initial="hidden" animate="show">
          <motion.h1 variants={popUpSpring} className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg">Il Tuo Giardino,<br />La Nostra Passione.</motion.h1>
          <motion.p variants={popUpSpring} className="text-xl md:text-2xl text-stone-200 mb-10 font-medium drop-shadow-md">Manutenzione, potature e realizzazione aree verdi con la massima professionalità.</motion.p>
          <motion.div variants={popUpSpring} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a href="#contatti" className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-green-500 transition-colors">
              Richiedi Preventivo Gratuito
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* SEZIONE CHI SIAMO */}
      <section id="chi-siamo" className="pt-24 pb-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto pt-10">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={slideInLeft} className="w-full md:w-1/2">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-4/5 md:aspect-square group">
                <img src="/profilo.png" alt="Il fondatore di Bruder Garden" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 border-4 border-green-500 rounded-[2.5rem] scale-95 opacity-50 pointer-events-none"></div>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={popUpSpring} className="w-full md:w-1/2">
              <div className="flex items-center gap-3 mb-4"><Leaf className="text-green-600" size={32} /><h2 className="text-4xl font-bold text-green-900">Chi Siamo</h2></div>
              <h3 className="text-2xl text-stone-800 font-semibold mb-6">Radici profonde, passione che cresce.</h3>
              <div className="space-y-4 text-stone-600 text-lg leading-relaxed">
                <p>Ciao! Sono <strong>Lorenzo</strong>, il fondatore di Bruder Garden. La mia avventura nel mondo del verde è nata da una passione semplice ma fortissima: trasformare spazi anonimi in angoli di natura vivi e rigogliosi.</p>
                <p>Con anni di esperienza sul campo, sporcandomi le mani di terra e studiando le esigenze di ogni singola pianta, ho costruito una realtà che non si limita a "tagliare l'erba", ma che si prende cura dell'intero ecosistema del tuo giardino.</p>
                <p>Ogni progetto, dal piccolo cortile di casa al grande parco condominiale, è per me una nuova tela. Lavoro con precisione, puntualità e attrezzature professionali per garantirti un risultato impeccabile, sempre.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEZIONE CERTIFICAZIONI E SICUREZZA */}
      <section className="pb-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto border-t border-stone-100 pt-16">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {certificazioni.map((cert) => (
              <motion.div key={cert.id} variants={popUpSpring} className="flex flex-col items-center justify-start p-4">
                <div className="w-20 h-20 mx-auto bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-5 shadow-[0_0_25px_rgba(34,197,94,0.25)] border border-green-100">{cert.icona}</div>
                <h3 className="text-lg font-bold text-stone-800 mb-2">{cert.titolo}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{cert.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SEZIONE SERVIZI E PREZZI */}
      <section id="servizi" className="py-24 px-4 max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={slideInLeft} className="text-center mb-16 pt-10">
          <h2 className="text-4xl font-bold text-green-900 mb-4">Cosa Facciamo & Listino</h2>
          <p className="text-stone-600 text-lg">Trasparenza totale. Clicca sui servizi per vedere il listino nel dettaglio.</p>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="grid md:grid-cols-2 gap-8">
          {prezzi.map((item) => (
            <motion.div key={item.id} variants={popUpSpring} whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }} onClick={() => setServizioSelezionato(item as Servizio)} className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 cursor-pointer transition-all duration-300 group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold flex items-center gap-2 text-stone-800 group-hover:text-green-700 transition-colors"><CheckCircle className="text-green-500" size={24} />{item.servizio}</h3>
                <span className="bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full text-sm whitespace-nowrap">{item.prezzo}</span>
              </div>
              <p className="text-stone-600 leading-relaxed mb-4">{item.descrizione}</p>
              <div className="flex items-center gap-1 text-green-600 font-semibold text-sm opacity-80 group-hover:opacity-100"><Info size={16} /> Clicca per vedere tutti i costi</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* MODALE DEI PREZZI */}
      <AnimatePresence>
        {servizioSelezionato && (
          <motion.div initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(8px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }} className="fixed inset-0 z-100 flex items-center justify-center bg-stone-900/80 p-4" onClick={() => setServizioSelezionato(null)}>
            <motion.div initial={{ scale: 0.9, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 20, opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="bg-white max-w-2xl w-full rounded-4xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="bg-green-50 p-6 md:p-8 flex justify-between items-start border-b border-green-100">
                <div><h3 className="text-2xl md:text-3xl font-bold text-green-900">{servizioSelezionato.servizio}</h3><p className="text-green-700 mt-2">{servizioSelezionato.descrizione}</p></div>
                <button onClick={() => setServizioSelezionato(null)} className="bg-green-200/50 hover:bg-green-200 text-green-800 p-2 rounded-full transition-colors"><X size={24} /></button>
              </div>
              <div className="p-6 md:p-8">
                <h4 className="font-bold text-stone-800 mb-4 text-lg border-b border-stone-100 pb-2">Listino Dettagliato</h4>
                <ul className="space-y-4">
                  {servizioSelezionato.dettagli.map((dettaglio, idx) => (
                    <li key={idx} className="flex flex-col md:flex-row md:justify-between md:items-center py-2 border-b border-stone-50 last:border-0 gap-2">
                      <span className="text-stone-700">{dettaglio.nome}</span><span className="font-bold text-stone-900 bg-stone-100 px-3 py-1 rounded-lg text-sm text-center md:text-right whitespace-nowrap">{dettaglio.costo}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEZIONE ATTREZZATURA */}
      <section id="attrezzatura" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto pt-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={slideInLeft} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-900 mb-4">La Nostra Attrezzatura</h2>
            <p className="text-stone-600 text-lg">Investiamo nei migliori macchinari professionali per garantire rapidità e risultati perfetti.</p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {attrezzature.map((mezzo) => (
              <motion.div key={mezzo.id} variants={popUpSpring} className="bg-stone-50 border border-stone-100 p-8 rounded-3xl text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">{mezzo.icona}</div>
                <h3 className="text-xl font-bold text-stone-800 mb-3">{mezzo.titolo}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{mezzo.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SEZIONE GALLERIA PRIMA E DOPO (GRIGLIA) */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={slideInLeft}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-green-900 mb-4">La Differenza si Vede</h2>
            <p className="text-stone-600 text-lg">Clicca su un progetto per ingrandire lo slider e vedere la trasformazione.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {listaPrimaDopo.map((item) => (
              <motion.div 
                key={item.id} 
                variants={popUpSpring}
                onClick={() => setPrimaDopoSelezionato(item)}
                className="group cursor-pointer bg-stone-100 p-4 rounded-3xl border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] border-2 border-stone-200 shadow-inner bg-stone-200">
                  <div className="w-full h-full pointer-events-none">
                    {/* CONTROLLO isMounted PER EVITARE HYDRATION ERROR */}
                    {isMounted ? (
                      <ReactCompareSlider
                        itemOne={<ReactCompareSliderImage src={item.prima} alt="Prima" />}
                        itemTwo={<ReactCompareSliderImage src={item.dopo} alt="Dopo" />}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img src={item.dopo} alt="Anteprima" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center z-10">
                    <span className="bg-green-600 text-white px-4 py-2 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 shadow-lg">
                      Apri Slider
                    </span>
                  </div>
                </div>
                <h3 className="text-center font-bold text-green-900 mt-4">
                  {item.titolo}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SEZIONE PORTFOLIO LAVORI */}
      <section id="lavori" className="py-24 px-4 bg-stone-100">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={slideInLeft} className="text-center mb-16 pt-10">
            <h2 className="text-4xl font-bold text-green-900 mb-4">I Nostri Lavori</h2>
            <p className="text-stone-600 text-lg">Clicca su una categoria per vedere la galleria fotografica.</p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {lavori.map((lavoro) => (
              <motion.div key={lavoro.id} variants={popUpSpring} onClick={() => { setLavoroSelezionato(lavoro); setIndiceFoto(0); }} className="group relative overflow-hidden rounded-2xl aspect-square bg-stone-300 cursor-pointer shadow-md hover:shadow-2xl transition-all">
                <img src={lavoro.galleria[0]} alt={lavoro.titolo} className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h4 className="text-white font-bold text-xl">{lavoro.titolo}</h4>
                  <p className="text-green-400 text-sm mt-1 font-semibold flex items-center gap-1">Clicca per {lavoro.galleria.length} foto <ChevronRight size={16} /></p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SEZIONE RECENSIONI GOOGLE MAPS */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={slideInLeft} className="text-center mb-16">
            <div className="flex justify-center items-center gap-3 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-12 h-12">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              <h2 className="text-4xl font-bold text-stone-900">Recensioni a 5 Stelle</h2>
            </div>
            <p className="text-stone-600 text-lg">Verificate e certificate su Google Maps</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid md:grid-cols-3 gap-8 mb-12">
            {recensioniGoogle.map((rec, i) => (
              <motion.div key={i} variants={popUpSpring} className="bg-stone-50 p-8 rounded-3xl shadow-sm border border-stone-100 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500"></div>
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                    </div>
                  </div>
                  <p className="text-stone-700 mb-6 leading-relaxed line-clamp-4">&quot;{rec.testo}&quot;</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 font-bold uppercase">{rec.nome.charAt(0)}</div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">{rec.nome}</h4>
                    <span className="text-xs text-stone-500 flex items-center gap-1"><MapPin size={12}/> {rec.zona}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <a href="https://maps.app.goo.gl/JE21YP4aZF5EfJYR6?g_st=ic" target="_blank" rel="noreferrer" 
               className="inline-flex items-center gap-3 bg-white border-2 border-[#1a8c3d] text-[#1a8c3d] hover:bg-stone-50 px-8 py-4 rounded-full font-bold text-base shadow-sm transition-all duration-300">
              <Star size={24} className="text-yellow-400" fill="currentColor" />
              Leggi tutte le recensioni o lasciane una su Google Maps
            </a>
          </motion.div>
        </div>
      </section>

      {/* SEZIONE CONTATTI */}
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

            {/* Colonna Sinistra */}
            <div className="w-full lg:w-1/3 flex flex-col gap-10 z-10">
              <a href="https://www.google.com/maps/place/Roma+RM/@41.910241,12.3959115,11z" target="_blank" rel="noreferrer" className="flex items-center gap-6 group cursor-pointer">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-stone-800 group-hover:text-green-600 transition-colors">Zona Operativa</h4>
                  <p className="text-stone-500 underline underline-offset-2">Roma e Provincia</p>
                </div>
              </a>

              <a href="tel:+393923531298" className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-stone-800 group-hover:text-green-600 transition-colors">Chiamaci Subito</h4>
                  <p className="text-stone-500 font-medium">392 353 1298</p>
                </div>
              </a>

              <a href="https://wa.me/393923531298" target="_blank" rel="noreferrer" className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-[#25D366]/20 text-[#25D366] rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <MessageCircle size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-stone-800 group-hover:text-[#25D366] transition-colors">Scrivici su WhatsApp</h4>
                  <p className="text-stone-500 font-medium">Risposta veloce</p>
                </div>
              </a>
            </div>

            {/* Colonna Destra */}
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
      <footer className="bg-stone-900 text-stone-400 py-12 px-4 border-t border-stone-800">
        <div className="max-w-6xl mx-auto text-center space-y-3 text-sm">
          <p className="text-stone-300">
            Bruder Garden di Lorenzo Abbruzzetti • P.IVA IT16323311007 • Sede legale: Via Prato Sesia 52, 00166 Roma (RM)
          </p>
          <p>© 2026 Bruder Garden. Tutti i diritti riservati.</p>
          <div className="pt-2">
            <Link href="/privacy-policy" className="text-stone-400 hover:text-green-400 underline transition-colors">
              Privacy Policy & Cookie Policy
            </Link>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a href="https://wa.me/393923531298?text=Salve%20Bruder%20Garden,%20vorrei%20richiedere%20un%20preventivo%20per..." target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] transition-all duration-300 flex items-center justify-center group">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
      </a>
      
      {/* MODALE FOTOGRAFIE */}
      <AnimatePresence>
        {lavoroSelezionato && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={() => setLavoroSelezionato(null)}>
            <button className="absolute top-6 right-6 text-stone-400 hover:text-white hover:rotate-90 transition-all duration-300 z-[101]" onClick={() => setLavoroSelezionato(null)}>
              <X size={48} />
            </button>
            <button className="absolute left-2 md:left-10 text-stone-400 hover:text-white hover:-translate-x-2 transition-all z-[101]" onClick={fotoPrecedente}>
              <ChevronLeft size={56} />
            </button>
            <div className="relative max-w-5xl w-full flex flex-col items-center">
              <img src={lavoroSelezionato.galleria[indiceFoto]} className="max-h-[75vh] w-auto object-contain rounded-xl" onClick={(e) => e.stopPropagation()} alt="galleria" />
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center mt-6 bg-black/50 px-6 py-2 rounded-full" onClick={(e) => e.stopPropagation()}>
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

      {/* MODALE PER SLIDER PRIMA/DOPO INGRANDITO */}
      <AnimatePresence>
        {primaDopoSelezionato && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setPrimaDopoSelezionato(null)}
          >
            <button className="absolute top-6 right-6 text-stone-400 hover:text-white hover:rotate-90 transition-all duration-300 z-[101]" onClick={() => setPrimaDopoSelezionato(null)}>
              <X size={48} />
            </button>
            
            <div className="relative max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <motion.div
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", damping: 25 }}
                className="w-full bg-stone-100 p-4 md:p-8 rounded-[2rem] shadow-2xl"
              >
                <div className="rounded-2xl overflow-hidden shadow-inner border-2 border-stone-200 bg-white">
                  <ReactCompareSlider
                    itemOne={<ReactCompareSliderImage src={primaDopoSelezionato.prima} alt="Prima" />}
                    itemTwo={<ReactCompareSliderImage src={primaDopoSelezionato.dopo} alt="Dopo" />}
                    className="h-[50vh] md:h-[65vh] w-full"
                  />
                </div>
                <div className="text-center mt-6">
                  <h3 className="text-green-900 font-bold text-2xl">{primaDopoSelezionato.titolo}</h3>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}