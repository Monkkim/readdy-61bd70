import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Empathy from './components/Empathy';
import Services from './components/Services';
import BeforeAfter from './components/BeforeAfter';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Comparison from './components/Comparison';
import FAQ from './components/FAQ';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <TrustBar />
      <Empathy />
      <Services />
      <BeforeAfter />
      <About />
      <Testimonials />
      <Comparison />
      <FAQ />
      <ContactCTA />
      <Footer />
    </div>
  );
}
