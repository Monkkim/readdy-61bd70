import Hero from './components/Hero';
import Services from './components/Services';
import BeforeAfter from './components/BeforeAfter';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Insights from './components/Insights';
import FAQ from './components/FAQ';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <BeforeAfter />
      <About />
      <Testimonials />
      <Insights />
      <FAQ />
      <ContactCTA />
      <Footer />
    </div>
  );
}
