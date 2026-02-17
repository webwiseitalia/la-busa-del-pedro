import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Music, Beer, Trophy, PartyPopper, Instagram, Calendar } from 'lucide-react'
import { FaInstagram } from 'react-icons/fa'

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

const eventTypes = [
  {
    icon: <Music className="w-8 h-8" />,
    title: 'DJ Set',
    description: 'Musica live e selezioni dei migliori DJ. Ogni weekend una serata diversa.',
    color: 'from-purple-500/20 to-purple-500/5',
    borderColor: 'border-purple-500/20 hover:border-purple-500/40',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-400',
  },
  {
    icon: <Beer className="w-8 h-8" />,
    title: 'Happy Hour',
    description: 'Aperitivo con buffet e drink speciali. Il momento perfetto per iniziare la serata.',
    color: 'from-amber-500/20 to-amber-500/5',
    borderColor: 'border-amber-500/20 hover:border-amber-500/40',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
  },
  {
    icon: <Trophy className="w-8 h-8" />,
    title: 'Beer Pong',
    description: 'Tornei e sfide epiche con Distrettoundici. Metti alla prova la tua mira!',
    color: 'from-emerald-500/20 to-emerald-500/5',
    borderColor: 'border-emerald-500/20 hover:border-emerald-500/40',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
  },
  {
    icon: <PartyPopper className="w-8 h-8" />,
    title: 'Serate Speciali',
    description: 'Eventi a tema, feste, inaugurazioni e sorprese. Seguici per non perderti nulla!',
    color: 'from-rose-500/20 to-rose-500/5',
    borderColor: 'border-rose-500/20 hover:border-rose-500/40',
    iconBg: 'bg-rose-500/10',
    iconColor: 'text-rose-400',
  },
]

const partners = [
  'R3SET Club',
  'Distrettoundici',
  'BEACH Lake Endine',
  'K Barber Soul',
]

export default function Eventi() {
  return (
    <section id="eventi" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-brand-gold/[0.03] rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-brand-gold text-sm font-medium tracking-[0.3em] uppercase">
              Programmazione
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mt-4 mb-6">
              Eventi & <span className="gold-text">Serate</span>
            </h2>
            <div className="gold-divider mb-8" />
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Ogni settimana qualcosa di nuovo. DJ set, happy hour, tornei, serate a tema.
              Seguici sui social per non perderti nulla!
            </p>
          </div>
        </AnimatedSection>

        {/* Event types grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {eventTypes.map((event, i) => (
            <AnimatedSection key={event.title} delay={0.1 * i}>
              <div
                className={`relative overflow-hidden rounded-2xl border ${event.borderColor} bg-white/[0.02] p-6 sm:p-8 transition-all duration-500 h-full group`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative">
                  <div className={`w-16 h-16 rounded-2xl ${event.iconBg} flex items-center justify-center mb-5 ${event.iconColor}`}>
                    {event.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-3">
                    {event.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Next event / Instagram CTA */}
        <AnimatedSection delay={0.3}>
          <div className="gold-glass-card p-8 sm:p-10 text-center max-w-3xl mx-auto">
            <Calendar className="w-10 h-10 text-brand-gold mx-auto mb-4" />
            <h3 className="text-2xl font-display font-bold text-white mb-3">
              Prossimi Eventi
            </h3>
            <p className="text-white/50 mb-6 max-w-lg mx-auto">
              Segui il nostro profilo Instagram per scoprire tutti gli eventi in programma,
              le serate speciali e le sorprese che abbiamo in serbo per te.
            </p>
            <a
              href="https://www.instagram.com/labusa_del_pedro/"
              target="_blank"
              rel="noopener noreferrer"
              className="gold-button inline-flex items-center gap-2 text-sm tracking-wider uppercase"
            >
              <FaInstagram size={18} />
              @labusa_del_pedro
            </a>
          </div>
        </AnimatedSection>

        {/* Partners */}
        <AnimatedSection delay={0.4}>
          <div className="mt-16 text-center">
            <p className="text-white/30 text-sm tracking-widest uppercase mb-6">
              I nostri partner
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {partners.map((partner) => (
                <span
                  key={partner}
                  className="text-white/20 text-sm font-medium tracking-wider hover:text-brand-gold/50 transition-colors"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
