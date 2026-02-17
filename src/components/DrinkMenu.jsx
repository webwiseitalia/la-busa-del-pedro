import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Wine, Beer, GlassWater, Martini, Coffee, Grape } from 'lucide-react'

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

const categories = [
  {
    id: 'signature',
    label: 'Signature',
    icon: <Martini size={20} />,
    drinks: [
      {
        name: 'Bré',
        description: 'Un omaggio a Breno. Creazione originale con ingredienti locali e un tocco inaspettato.',
        tag: 'Speciale',
      },
      {
        name: 'Generale',
        description: 'Ispirato al Generale Pietro Ronchi, eroe di Breno. Intenso e deciso.',
        tag: 'Classico',
      },
      {
        name: 'Sant\'Antonio',
        description: 'Dedicato al patrono di Breno. Fresco, aromatico e sorprendente.',
        tag: 'Fresco',
      },
      {
        name: 'Pedro\'s Special',
        description: 'La creazione del capo. Un blend segreto che racchiude l\'essenza della Büsa.',
        tag: 'Must Try',
      },
    ],
  },
  {
    id: 'classici',
    label: 'Classici',
    icon: <Wine size={20} />,
    drinks: [
      { name: 'Negroni', description: 'Gin, Campari, Vermouth rosso. L\'intramontabile.' },
      { name: 'Mojito', description: 'Rum bianco, lime, menta, zucchero di canna. Freschezza pura.' },
      { name: 'Spritz', description: 'Prosecco, Aperol o Select, soda. L\'aperitivo per eccellenza.' },
      { name: 'Old Fashioned', description: 'Bourbon, zucchero, Angostura. Eleganza senza tempo.' },
      { name: 'Moscow Mule', description: 'Vodka, ginger beer, lime. Rinfrescante e speziato.' },
      { name: 'Gin Tonic', description: 'Gin premium, tonica artigianale, botaniche. Raffinato.' },
    ],
  },
  {
    id: 'birre',
    label: 'Birre',
    icon: <Beer size={20} />,
    drinks: [
      { name: 'Birre alla Spina', description: 'Selezione di birre artigianali e commerciali alla spina.' },
      { name: 'Birre in Bottiglia', description: 'Ampia scelta di birre nazionali e internazionali.' },
      { name: 'Birre Artigianali', description: 'Selezione di birrifici locali e italiani.' },
    ],
  },
  {
    id: 'vini',
    label: 'Vini & Bollicine',
    icon: <Grape size={20} />,
    drinks: [
      { name: 'Vini Rossi', description: 'Selezione di rossi regionali e nazionali.' },
      { name: 'Vini Bianchi', description: 'Bianchi freschi e aromatici.' },
      { name: 'Prosecco & Spumanti', description: 'Bollicine per ogni occasione.' },
    ],
  },
  {
    id: 'analcolici',
    label: 'Analcolici',
    icon: <GlassWater size={20} />,
    drinks: [
      { name: 'Virgin Mojito', description: 'Tutta la freschezza, zero alcol.' },
      { name: 'Fruit Smoothies', description: 'Frutta fresca frullata al momento.' },
      { name: 'Soft Drinks', description: 'Bibite classiche e speciali.' },
    ],
  },
  {
    id: 'caffe',
    label: 'Caffetteria',
    icon: <Coffee size={20} />,
    drinks: [
      { name: 'Caffè Specialty', description: 'Caffè selezionati e preparati con cura.' },
      { name: 'Caffè Corretti', description: 'Grappa, sambuca, baileys... scegli tu.' },
    ],
  },
]

export default function DrinkMenu() {
  const [activeCategory, setActiveCategory] = useState('signature')
  const activeDrinks = categories.find((c) => c.id === activeCategory)

  return (
    <section id="drink-menu" className="relative section-padding overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/[0.03] rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-brand-gold text-sm font-medium tracking-[0.3em] uppercase">
              I Nostri Cocktail
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mt-4 mb-6">
              Drink <span className="gold-text">List</span>
            </h2>
            <div className="gold-divider mb-8" />
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Cocktail classici rivisitati e creazioni originali.
              Ogni drink racconta una storia, ogni sorso è un'esperienza.
            </p>
          </div>
        </AnimatedSection>

        {/* Category tabs */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-brand-gold text-brand-black'
                    : 'border border-white/10 text-white/50 hover:text-brand-gold hover:border-brand-gold/30'
                }`}
              >
                {cat.icon}
                <span className="hidden sm:inline">{cat.label}</span>
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Drink list */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {activeDrinks?.drinks.map((drink, i) => (
              <motion.div
                key={drink.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-5 sm:p-6 group hover:border-brand-gold/30 transition-all duration-500"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-display font-semibold text-white group-hover:text-brand-gold transition-colors">
                        {drink.name}
                      </h3>
                      {drink.tag && (
                        <span className="text-[10px] font-medium tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
                          {drink.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed">
                      {drink.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.2}>
          <div className="text-center mt-12">
            <p className="text-white/30 text-sm mb-4 italic">
              Menu completo disponibile al locale
            </p>
            <a
              href="#contatti"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contatti')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="outline-button inline-flex items-center gap-2 text-sm tracking-wider uppercase"
            >
              <Wine size={16} />
              Vieni a scoprirli tutti
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
