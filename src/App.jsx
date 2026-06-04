import SmoothScrollProvider from './components/layout/SmoothScrollProvider'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import Hero from './components/sections/Hero'
import FilmStrip from './components/sections/FilmStrip'
import Gallery from './components/sections/Gallery/Gallery'
import Services from './components/sections/Services'
import HowItWorks from './components/sections/HowItWorks'
import Stats from './components/sections/Stats'
import About from './components/sections/About'
import Booking from './components/sections/Booking/Booking'
import Instagram from './components/sections/Instagram'
import Testimonials from './components/sections/Testimonials'
import FAQ from './components/sections/FAQ'
import Contact from './components/sections/Contact'

export default function App() {
  return (
    <SmoothScrollProvider>
      {/* Fixed grain overlay — never on a scroll container */}
      <div className="grain" aria-hidden="true" />

      <Navbar />

      <main>
        <Hero />
        <FilmStrip />
        <Gallery />
        <Services />
        <About />
        <Stats />
        <HowItWorks />
        <Booking />
        <Instagram />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </SmoothScrollProvider>
  )
}
