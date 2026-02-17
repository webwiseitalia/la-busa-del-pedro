import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Phone, Mail, Clock, Car, Train, CreditCard, ParkingCircle } from 'lucide-react'
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa'

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  )
}

const orari = [
  { giorno: 'Lunedì', orario: 'Chiuso' },
  { giorno: 'Martedì', orario: 'Chiuso' },
  { giorno: 'Mercoledì', orario: '17:00 – 00:00' },
  { giorno: 'Giovedì', orario: '17:00 – 00:00' },
  { giorno: 'Venerdì', orario: '17:00 – 01:00' },
  { giorno: 'Sabato', orario: '17:00 – 01:00' },
  { giorno: 'Domenica', orario: '16:00 – 00:00' },
]

export default function Contatti() {
  return (
    <section id="contatti" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-gold/[0.03] rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-brand-gold text-sm font-medium tracking-[0.3em] uppercase">
              Dove Siamo
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mt-4 mb-6">
              Vieni a <span className="gold-text">trovarci</span>
            </h2>
            <div className="gold-divider mb-8" />
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left column - Info */}
          <div className="space-y-6">
            {/* Address */}
            <AnimatedSection delay={0.1}>
              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="text-white font-display font-semibold text-lg mb-1">Indirizzo</h3>
                    <p className="text-white/50">Via Agostino Rizzieri 1</p>
                    <p className="text-white/50">25043 Breno (BS)</p>
                    <p className="text-white/40 text-sm mt-1">Valle Camonica, Lombardia</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact */}
            <AnimatedSection delay={0.15}>
              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="text-white font-display font-semibold text-lg mb-2">Contattaci</h3>
                    <div className="space-y-2">
                      <a
                        href="https://www.instagram.com/labusa_del_pedro/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/50 hover:text-brand-gold transition-colors"
                      >
                        <FaInstagram size={16} />
                        <span>@labusa_del_pedro</span>
                      </a>
                      <a
                        href="https://www.facebook.com/LABUSAdelpedro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/50 hover:text-brand-gold transition-colors"
                      >
                        <FaFacebookF size={16} />
                        <span>LABUSAdelpedro</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Orari */}
            <AnimatedSection delay={0.2}>
              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-display font-semibold text-lg mb-3">Orari</h3>
                    <div className="space-y-2">
                      {orari.map((o) => (
                        <div
                          key={o.giorno}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-white/50">{o.giorno}</span>
                          <span className={o.orario === 'Chiuso' ? 'text-white/30' : 'text-brand-gold font-medium'}>
                            {o.orario}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-white/30 text-xs mt-3 italic">
                      * Orari indicativi, possono variare durante eventi speciali
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Come arrivare */}
            <AnimatedSection delay={0.25}>
              <div className="glass-card p-6">
                <h3 className="text-white font-display font-semibold text-lg mb-4">Come arrivare</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Car className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <p className="text-white/50 text-sm">
                      <span className="text-white/70 font-medium">In auto:</span> SS42 da Brescia/Lago d'Iseo, parcheggi disponibili in centro
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Train className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <p className="text-white/50 text-sm">
                      <span className="text-white/70 font-medium">In treno:</span> Stazione Breno (linea Trenord Brescia-Iseo-Edolo), 5 min a piedi
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-white/40 text-xs">
                    <ParkingCircle size={14} className="text-brand-gold" />
                    Parcheggi nelle vicinanze
                  </div>
                  <div className="flex items-center gap-2 text-white/40 text-xs">
                    <CreditCard size={14} className="text-brand-gold" />
                    Carte accettate
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right column - Map */}
          <AnimatedSection delay={0.2}>
            <div className="glass-card overflow-hidden h-full min-h-[400px] lg:min-h-0">
              <iframe
                title="La Büsa del Pedro - Mappa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1380.5!2d10.3005!3d46.0345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47823edbc3fd7e25%3A0x4c2fd5f0e5c2d0!2sVia+Agostino+Rizzieri%2C+1%2C+25043+Breno+BS!5e0!3m2!1sit!2sit!4v1708200000000!5m2!1sit!2sit"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
