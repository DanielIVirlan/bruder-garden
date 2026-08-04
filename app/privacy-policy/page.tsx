import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Mail, MapPin, Building2 } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 py-16 px-4 md:px-8 selection:bg-green-500 selection:text-stone-950">
      <div className="max-w-4xl mx-auto">
        
        {/* Pulsante per tornare indietro */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-stone-400 hover:text-green-400 transition-colors text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Torna alla Home
          </Link>
        </div>

        {/* Card principale */}
        <div className="bg-stone-900/80 backdrop-blur-md border border-stone-800 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8">
          
          {/* Header */}
          <div className="border-b border-stone-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-green-400 text-sm font-semibold tracking-wider uppercase mb-2">
                <ShieldCheck className="w-5 h-5" />
                <span>Informativa Legale</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Privacy Policy
              </h1>
            </div>
            <span className="text-xs text-stone-400 bg-stone-800/60 px-3 py-1.5 rounded-full border border-stone-700/50 self-start md:self-auto">
              Aggiornato al: Agosto 2026
            </span>
          </div>

          {/* Contenuto della Policy */}
          <div className="space-y-8 text-stone-300 leading-relaxed text-sm md:text-base">
            
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-green-500" />
                1. Titolare del Trattamento dei Dati
              </h2>
              <p className="text-stone-400 pl-7">
                Il Titolare del trattamento è <strong className="text-stone-200">Bruder Garden</strong> di Lorenzo Abruzzetti.
              </p>
              <div className="pl-7 space-y-1 text-stone-400">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-500 shrink-0" />
                  Sede legale: Via Prato Sesia 52, 00166 Roma (RM)
                </p>
                <p>Partita IVA: IT16323311007</p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">2. Tipologie di Dati Raccolti</h2>
              <p className="text-stone-400 pl-7">
                Questo sito raccoglie dati personali in modo autonomo o tramite interazioni dirette (modulo di contatto, chiamate telefoniche o collegamenti WhatsApp). I dati possono includere nome, recapito telefonico, indirizzo email e dettagli relativi alle richieste di servizi di giardinaggio.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">3. Finalità del Trattamento</h2>
              <p className="text-stone-400 pl-7">
                I dati conferiti dall&apos;utente sono trattati esclusivamente per finalità connesse o strumentali all&apos;attività di Bruder Garden, nello specifico per rispondere a richieste di preventivo, informazioni o per gestire i rapporti contrattuali di assistenza e manutenzione del verde.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">4. Cookie e Servizi di Terze Parti</h2>
              <p className="text-stone-400 pl-7">
                Il sito si avvale di collegamenti a piattaforme esterne, tra cui Google Maps per la geolocalizzazione della sede e la visualizzazione delle recensioni dei clienti. Tali servizi di terze parti potrebbero tracciare l&apos;utente in conformità alle rispettive privacy policy.
              </p>
            </section>

          </div>

          {/* Footer interno con CTA */}
          <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-500">
              © 2026 Bruder Garden • Tutti i diritti riservati
            </p>
            <Link 
              href="/" 
              className="w-full sm:w-auto text-center bg-green-600 hover:bg-green-500 text-stone-950 font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-green-900/20"
            >
              Torna alla Home
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
