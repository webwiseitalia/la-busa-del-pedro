import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Wine, Users, Star, MapPin } from 'lucide-react'

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

export default function ChiSiamo() {
  const features = [
    {
      icon: <Wine className="w-6 h-6" />,
      title: 'Cocktail d\'autore',
      description: 'Creazioni originali e classici rivisitati, preparati con passione e ingredienti selezionati.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Atmosfera unica',
      description: 'Un locale che unisce eleganza e convivialità, perfetto per ogni occasione.',
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Eventi esclusivi',
      description: 'DJ set, happy hour, serate a tema e tanto altro. Ogni settimana qualcosa di nuovo.',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location storica',
      description: 'Nel cuore del centro storico di Breno, in una piazzetta caratteristica e accogliente.',
    },
  ]

  return (
    <section id="chi-siamo" className="relative section-padding overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-brand-gold text-sm font-medium tracking-[0.3em] uppercase">
              Il Locale
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mt-4 mb-6">
              Benvenuti alla{' '}
              <span className="gold-text">Büsa</span>
            </h2>
            <div className="gold-divider mb-8" />
            <p className="text-white/50 text-lg max-w-3xl mx-auto leading-relaxed">
              Nel cuore di Breno, dove la piazzetta incontra la notte.
              La Büsa del Pedro è il nuovo punto di riferimento per chi cerca
              cocktail d'autore, buona musica e l'atmosfera giusta.
            </p>
          </div>
        </AnimatedSection>

        {/* Story */}
        <AnimatedSection delay={0.2}>
          <div className="glass-card p-8 sm:p-12 mb-16 max-w-4xl mx-auto">
            <div className="space-y-6 text-white/60 leading-relaxed text-center">
              <p className="text-lg">
                Un locale che nasce dalla passione di <span className="text-brand-gold font-medium">Pedro</span> per
                la mixology e l'intrattenimento, in una location storica e unica: una piazzetta
                caratteristica, tavoli all'aperto d'estate, e un interno accogliente dove ogni
                serata diventa speciale.
              </p>
              <p className="text-lg">
                Che tu stia cercando un aperitivo al tramonto, una serata con amici o
                un evento da ricordare, alla Büsa trovi sempre il <span className="text-brand-gold font-medium">mood giusto</span>.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={0.1 * i}>
              <div className="glass-card p-6 text-center group hover:border-brand-gold/30 transition-all duration-500 h-full">
                <div className="w-14 h-14 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto mb-5 text-brand-gold group-hover:bg-brand-gold/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-display font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Location highlight */}
        <AnimatedSection delay={0.3}>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-brand-gold/20 bg-brand-gold/5">
              <MapPin size={18} className="text-brand-gold" />
              <span className="text-white/60 text-sm">
                Via Agostino Rizzieri 1, 25043 Breno (BS) &mdash; Valle Camonica
              </span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
