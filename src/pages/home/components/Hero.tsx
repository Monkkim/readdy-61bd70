import { useEffect, useRef, useState } from 'react';

function ECGLine() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <svg
        className="absolute w-full"
        style={{ top: '78%', left: 0, height: '120px', opacity: 0.35 }}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ecgGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="30%" stopColor="white" stopOpacity="0.6" />
            <stop offset="70%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <filter id="glow1">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <mask id="revealMask1">
            <rect x="0" y="0" width="100%" height="100%" fill="black" />
            <rect x="-30%" y="0" width="60%" height="100%" fill="white">
              <animateTransform attributeName="transform" type="translate" from="-600 0" to="1800 0" dur="3.5s" repeatCount="indefinite" />
            </rect>
          </mask>
        </defs>
        <polyline
          points="0,60 180,60 220,60 240,20 260,100 280,10 300,110 320,60 360,60 540,60 580,60 600,20 620,100 640,10 660,110 680,60 720,60 900,60 940,60 960,20 980,100 1000,10 1020,110 1040,60 1080,60 1260,60 1300,60 1320,20 1340,100 1360,10 1380,110 1400,60 1440,60"
          fill="none" stroke="url(#ecgGrad1)" strokeWidth="1" opacity="0.2"
        />
        <polyline
          points="0,60 180,60 220,60 240,20 260,100 280,10 300,110 320,60 360,60 540,60 580,60 600,20 620,100 640,10 660,110 680,60 720,60 900,60 940,60 960,20 980,100 1000,10 1020,110 1040,60 1080,60 1260,60 1300,60 1320,20 1340,100 1360,10 1380,110 1400,60 1440,60"
          fill="none" stroke="white" strokeWidth="1.5" filter="url(#glow1)" mask="url(#revealMask1)"
        />
      </svg>
    </div>
  );
}

export default function Hero() {
  const leftRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const elements = [
      { el: leftRef.current, delay: 100 },
    ];
    elements.forEach(({ el, delay }) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = 'none';
      const timer = setTimeout(() => {
        el.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
      return () => clearTimeout(timer);
    });
  }, []);

  const handleScroll = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <img
        src="https://readdy.ai/api/search-image?query=Abstract%20dark%20minimalist%20background%20with%20soft%20light%20rays%20and%20geometric%20lines%2C%20deep%20black%20and%20charcoal%20tones%2C%20subtle%20glowing%20particles%20floating%20in%20darkness%2C%20futuristic%20AI%20technology%20concept%2C%20ultra%20clean%20and%20modern%20aesthetic%2C%20cinematic%20dark%20atmosphere%2C%20high%20contrast%20monochrome%20with%20faint%20silver%20highlights%2C%20no%20people%2C%20pure%20abstract%20art&width=1920&height=1080&seq=twosol-hero-bg-001&orientation=landscape"
        alt="AI Background"
        className="absolute inset-0 w-full h-full object-cover object-top opacity-40"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90"></div>
      <ECGLine />

      <div className="relative z-10 w-full px-6 sm:px-8 md:px-16 py-28 sm:py-36 md:py-40">
        <div className="max-w-6xl w-full mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start">

            {/* Left: Main copy */}
            <div ref={leftRef} className="flex-1 text-center lg:text-left">
              <p className="text-xs tracking-[0.4em] uppercase text-white/40 mb-5 font-light">
                AI Automation Coaching
              </p>
              <h1 className="text-[1.7rem] sm:text-[2.2rem] md:text-[2.8rem] lg:text-[3.2rem] font-bold text-white leading-tight mb-5 tracking-tight">
                내 사업 안에서<br />
                <span className="text-amber-400">진짜 작동하는 AI 에이전트</span> 1개,<br />
                4주 만에 만들기
              </h1>

              <p className="text-sm md:text-base text-white/60 mb-8 max-w-lg leading-relaxed font-light mx-auto lg:mx-0">
                비개발자 대표를 위한 <span className="text-white/90 font-medium">1:1 페어빌드 코칭</span>.<br />
                외주 1회 비용으로, 4주 후엔 직접 운영까지.
              </p>

              {/* Dual CTA */}
              <div className="flex flex-col sm:flex-row gap-3 items-center lg:items-start justify-center lg:justify-start">
                <button
                  onClick={() => handleScroll('#contact')}
                  className="inline-flex items-center gap-3 bg-white text-black px-6 sm:px-8 py-3.5 text-xs tracking-widest uppercase font-semibold hover:bg-amber-400 transition-all cursor-pointer whitespace-nowrap group rounded-full"
                >
                  <span>30분 무료 진단 받기</span>
                  <i className="ri-arrow-right-line text-base group-hover:translate-x-1 transition-transform"></i>
                </button>
                <button
                  onClick={() => handleScroll('#services')}
                  className="inline-flex items-center gap-3 border border-white/30 text-white/70 px-6 sm:px-8 py-3.5 text-xs tracking-widest uppercase font-light hover:border-white hover:text-white transition-all cursor-pointer whitespace-nowrap group rounded-full"
                >
                  <span>맞춤 컨설팅이 필요하신가요?</span>
                  <i className="ri-arrow-right-line text-base group-hover:translate-x-1 transition-transform"></i>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <div className="w-px h-10 md:h-12 bg-gradient-to-b from-white/30 to-transparent animate-pulse"></div>
      </div>
    </section>
  );
}
