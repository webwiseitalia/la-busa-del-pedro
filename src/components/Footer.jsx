import { FaInstagram, FaFacebookF } from 'react-icons/fa'
import { MapPin, ArrowUp } from 'lucide-react'
import logo from '../assets/logo-labusa-del-pedro.webp'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/5">
      {/* Gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto section-padding pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo & description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img
              src={logo}
              alt="La Büsa del Pedro"
              className="h-16 w-auto mb-5"
            />
            <p className="text-white/40 text-sm leading-relaxed">
              Il nuovo cuore della notte brenese.
              Cocktail, eventi e buona musica nel centro storico di Breno.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-5">
              Esplora
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Il Locale', href: '#chi-siamo' },
                { label: 'Drink List', href: '#drink-menu' },
                { label: 'Eventi', href: '#eventi' },
                { label: 'Gallery', href: '#gallery' },
                { label: 'Contatti', href: '#contatti' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="text-white/40 hover:text-brand-gold transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-5">
              Dove siamo
            </h4>
            <div className="flex items-start gap-2 text-white/40 text-sm mb-3">
              <MapPin size={14} className="text-brand-gold mt-1 flex-shrink-0" />
              <div>
                <p>Via Agostino Rizzieri 1</p>
                <p>25043 Breno (BS)</p>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-5">
              Social
            </h4>
            <div className="flex items-center gap-3 mb-6">
              <a
                href="https://www.instagram.com/labusa_del_pedro/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-brand-gold hover:border-brand-gold/30 transition-all"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/LABUSAdelpedro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-brand-gold hover:border-brand-gold/30 transition-all"
                aria-label="Facebook"
              >
                <FaFacebookF size={16} />
              </a>
            </div>
            <p className="text-white/30 text-sm">
              @labusa_del_pedro
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-white/30 text-xs">
                &copy; 2026 La Busa del Pedro di Pedretti Daniel &mdash; Breno (BS)
              </p>
              <p className="text-white/20 text-xs mt-1">
                Bevi responsabilmente. Vietata la vendita di alcolici ai minori di 18 anni.
              </p>
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-brand-gold hover:border-brand-gold/30 transition-all"
              aria-label="Torna su"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
