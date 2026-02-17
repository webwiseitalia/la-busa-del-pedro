import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ChiSiamo from './components/ChiSiamo'
import DrinkMenu from './components/DrinkMenu'
import Eventi from './components/Eventi'
import Gallery from './components/Gallery'
import Contatti from './components/Contatti'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar />
      <Hero />
      <ChiSiamo />
      <DrinkMenu />
      <Eventi />
      <Gallery />
      <Contatti />
      <Footer />
    </div>
  )
}

export default App
