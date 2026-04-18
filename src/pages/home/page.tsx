import Hero from './components/Hero';
import Empathy from './components/Empathy';
import Services from './components/Services';
import BeforeAfter from './components/BeforeAfter';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import FAQ from './components/FAQ';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Empathy />
      <Services />
      <BeforeAfter />
      <About />
      <Testimonials />

      <Process />
      <FAQ />
      <ContactCTA />
      <Footer />
    </div>
  );
}
