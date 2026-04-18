import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: '391%', label: '1분 내 응답 시 전환율' },
  { value: '78%', label: '첫 응답 업체와 계약' },
  { value: '<1초', label: 'AI 응답 속도' },
];

export default function Hero() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const elements = [
      { el: badgeRef.current, delay: 0 },
      { el: headingRef.current, delay: 150 },
      { el: subRef.current, delay: 300 },
      { el: statsRef.current, delay: 450 },
      { el: ctaRef.current, delay: 600 },
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
      }, delay + 100);
      return () => clearTimeout(timer);
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <img
        src="https://readdy.ai/api/search-image?query=Abstract%20dark%20minimalist%20background%20with%20soft%20light%20rays%20and%20geometric%20lines%2C%20deep%20black%20and%20charcoal%20tones%2C%20subtle%20glowing%20particles%20floating%20in%20darkness%2C%20futuristic%20AI%20technology%20concept%2C%20ultra%20clean%20and%20modern%20aesthetic%2C%20cinematic%20dark%20atmosphere%2C%20high%20contrast%20monochrome%20with%20faint%20silver%20highlights%2C%20no%20people%2C%20pure%20abstract%20art&width=1920&height=1080&seq=twosol-hero-bg-001&orientation=landscape"
        alt="AI Background"
        className="absolute inset-0 w-full h-full object-cover object-top opacity-40"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90"></div>

      <div className="relative z-10 w-full px-8 md:px-16 py-40">
        <div className="max-w-5xl">
          <div ref={badgeRef}>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-xs font-medium uppercase tracking-[0.3em] text-white/60 mb-8">
              AI 자동화 전문
            </span>
          </div>

          <h1 ref={headingRef} className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-6 tracking-tight">
            1분 안에 응답 못 하면
            <br />
            <span className="text-white/30">매출의 78%를 잃습니다</span>
          </h1>

          <p ref={subRef} className="text-base md:text-lg text-white/50 mb-6 max-w-2xl leading-relaxed font-light">
            B2B 리드의 평균 응답시간은 <span className="text-white/80 font-medium">42시간</span><sup className="text-white/40">1</sup>.
            1분 내 응답 시 전환율 <span className="text-white/80 font-medium">391% 상승</span><sup className="text-white/40">2</sup>.
            <br />투쏠은 이 <span className="text-white/80 font-medium">'응답 속도'</span> 하나에 집중하는 AI 시스템을 설계합니다.
          </p>
          <p className="text-[11px] text-white/30 mb-12 max-w-2xl leading-relaxed font-light tracking-wide">
            <sup>1</sup> Harvard Business Review · "The Short Life of Online Sales Leads" &nbsp;
            <sup>2</sup> InsideSales.com · Lead Response Management Study
          </p>

          <div ref={statsRef} className="flex flex-wrap gap-10 mb-14">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">{stat.value}</span>
                <span className="text-xs text-white/30 font-light tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="flex flex-col gap-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-xs tracking-widest uppercase font-semibold hover:bg-gray-100 transition-all cursor-pointer whitespace-nowrap group rounded-full"
              >
                <span>30분 진단 예약</span>
                <i className="ri-arrow-right-line text-base group-hover:translate-x-1 transition-transform"></i>
              </a>
              <span className="text-[11px] text-white/40 font-light tracking-wider pl-2">이번 주 남은 자리 3개</span>
            </div>
            <a
              href="#testimonials"
              className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 text-xs tracking-widest uppercase font-semibold hover:border-white hover:bg-white/10 transition-all cursor-pointer whitespace-nowrap rounded-full"
            >
              <i className="ri-play-circle-line text-base"></i>
              <span>실제 고객이 쓰는 모습 30초 보기</span>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-white/20 text-xs tracking-widest uppercase">증거 보기 ↓</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent animate-pulse"></div>
      </div>
    </section>
  );
}
