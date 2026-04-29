import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';

// 아래 섹션들은 화면에 보일 때만 로드 (코드 분할)
const Empathy = lazy(() => import('./components/Empathy'));
const TheCoaching = lazy(() => import('./components/TheCoaching'));
const PainBridge = lazy(() => import('./components/PainBridge'));
const TheMethod = lazy(() => import('./components/TheMethod'));
const WhatYouWillBuild = lazy(() => import('./components/WhatYouWillBuild'));
const CoachingCases = lazy(() => import('./components/CoachingCases'));
const Bridge = lazy(() => import('./components/Bridge'));
const OutsourcingHeader = lazy(() => import('./components/OutsourcingHeader'));
const Services = lazy(() => import('./components/Services'));
const About = lazy(() => import('./components/About'));
const FAQ = lazy(() => import('./components/FAQ'));
const ContactCTA = lazy(() => import('./components/ContactCTA'));
const Footer = lazy(() => import('./components/Footer'));

function LazySection({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-[200px]" />}>
      {children}
    </Suspense>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <TrustBar />
      <LazySection>
        <Empathy />
      </LazySection>
      <LazySection>
        <TheCoaching />
      </LazySection>
      <LazySection>
        <PainBridge />
      </LazySection>
      <LazySection>
        <About />
      </LazySection>
      <LazySection>
        <WhatYouWillBuild />
      </LazySection>
      <LazySection>
        <CoachingCases />
      </LazySection>
      <LazySection>
        <TheMethod />
      </LazySection>
      <LazySection>
        <Bridge />
      </LazySection>
      <LazySection>
        <OutsourcingHeader />
      </LazySection>
      <LazySection>
        <Services />
      </LazySection>
      <LazySection>
        <ContactCTA />
      </LazySection>
      <LazySection>
        <FAQ />
      </LazySection>
      <LazySection>
        <Footer />
      </LazySection>
    </div>
  );
}
