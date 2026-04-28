import Navbar from './components/Navbar';
import Hero from './components/Hero';

import Empathy from './components/Empathy';
import TheCoaching from './components/TheCoaching';
import PainBridge from './components/PainBridge';
import TheMethod from './components/TheMethod';
import WhatYouWillBuild from './components/WhatYouWillBuild';
import CoachingCases from './components/CoachingCases';
import Bridge from './components/Bridge';
import OutsourcingHeader from './components/OutsourcingHeader';
import Services from './components/Services';
import About from './components/About';
import FAQ from './components/FAQ';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Empathy />
      <TheCoaching />
      <PainBridge />
      <About />
      <WhatYouWillBuild />
      <CoachingCases />
      <TheMethod />
      <Bridge />
      <OutsourcingHeader />
      <Services />
      <ContactCTA />
      <FAQ />
      <Footer />
    </div>
  );
}
