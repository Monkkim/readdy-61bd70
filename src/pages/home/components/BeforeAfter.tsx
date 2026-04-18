import { useRef, useEffect, useState } from 'react';

const problemStats = [
  { value: '42시간', label: '평균 리드 응답 시간', sub: '업계 평균', color: 'text-red-400' },
  { value: '~5%', label: '일반적인 계약 클로징률', sub: '업계 평균', color: 'text-red-400' },
  { value: '8×', label: '5분 후 전환 가능성 하락', sub: '기회 손실', color: 'text-red-400' },
];

const resultStats = [
  { value: '60초', label: '60초 이내 응답', sub: '목표 응답 속도', color: 'text-white' },
  { value: '55%', label: '리드 계약률 달성', sub: '60초 응답 기준', color: 'text-white' },
  { value: '0%', label: '리드 누락률', sub: '24/7 자동화', color: 'text-white' },
];

const flowSteps = [
  { before: '리드 유입', after: '리드 유입', icon: 'ri-user-add-line' },
  { before: '평균 42시간 대기', after: '60초 이내 AI 응대', icon: 'ri-time-line' },
  { before: '대부분 누락·포기', after: '100% 캡처 & 분류', icon: 'ri-filter-line' },
  { before: '수동 후속 처리', after: '자동 파이프라인 진입', icon: 'ri-git-merge-line' },
  { before: '클로징률 ~5%', after: '클로징률 55%', icon: 'ri-trophy-line' },
];

export default function BeforeAfter() {
  const titleRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const infographicRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [quoteVisible, setQuoteVisible] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)';
            el.style.opacity = '1';
            el.style.transform = 'none';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setQuoteVisible(true), 150);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = infographicRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisible(true), 200);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-32 px-4 md:px-16 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <div ref={titleRef} className="text-center mb-24 flex flex-col items-center">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            지금 이 순간에도<br />
            <span className="text-white/50">기회가 사라지고 있습니다</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/60 font-light max-w-xl mx-auto leading-relaxed">
            60초 안에 응답한 기업의 클로징률은 <span className="text-white/90">55%</span><br className="block sm:hidden" /> 업계 평균 응답 시간은 여전히 <span className="text-white/90">42시간</span>입니다
          </p>
        </div>

        {/* Alex Hormozi Quote */}
        <div
          ref={quoteRef}
          className="mb-20 flex flex-col items-center text-center max-w-2xl mx-auto"
          style={{
            opacity: quoteVisible ? 1 : 0,
            transform: quoteVisible ? 'none' : 'translateY(30px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }}
        >
          <img
            src="https://static.readdy.ai/image/47d5051b6fbde7de04c78dda01d0a9c3/081a38cfc3ed19a1c71f2587c82da7b4.png"
            alt="Alex Hormozi"
            className="w-24 h-24 rounded-full object-cover object-top grayscale border border-white/20 mb-6"
          />
          <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed mb-5">
            저는 직원 한 명에게<br className="block md:hidden" /> 연 7천만 원을 줍니다<br />
            <span className="text-white font-semibold">그리고 단 하나의 임무만 줍니다<br /><br />"60초 안에 전화하는 것"</span>
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/50 uppercase tracking-widest font-light">Alex Hormozi</span>
            <span className="w-4 h-px bg-white/30"></span>
            <span className="text-xs text-white/40 font-light">$100M Leads 저자</span>
          </div>
        </div>

        {/* Infographic */}
        <div ref={infographicRef} className="space-y-16">

          {/* Top stat bars: Before vs After */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before stats */}
            <div
              className="border border-red-500/20 bg-red-500/[0.04] p-5 md:p-8"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateX(-40px)',
                transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s',
              }}
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-xs font-semibold uppercase tracking-widest text-red-400">Before — 지금 당신의 현실</span>
              </div>
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {problemStats.map((s, i) => (
                  <div
                    key={i}
                    className="text-center"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'none' : 'translateY(20px)',
                      transition: `opacity 0.6s ease ${0.3 + i * 0.12}s, transform 0.6s ease ${0.3 + i * 0.12}s`,
                    }}
                  >
                    <div className={`text-xl sm:text-3xl md:text-5xl font-bold ${s.color} leading-none mb-2 whitespace-nowrap`}>{s.value}</div>
                    <div className="text-[8px] sm:text-[10px] text-white/50 uppercase tracking-widest mb-1">{s.sub}</div>
                    <div className="text-[10px] sm:text-xs text-white/60 font-light leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>
              {/* Loss bar */}
              <div className="mt-8 pt-6 border-t border-red-500/20">
                <div className="flex justify-between text-[10px] text-white/40 uppercase tracking-widest mb-2">
                  <span>평균 클로징률</span>
                  <span>~5%</span>
                </div>
                <div className="h-1 bg-white/10 w-full">
                  <div
                    className="h-full bg-red-400/60"
                    style={{
                      width: visible ? '5%' : '0%',
                      transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1) 0.6s',
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* After stats */}
            <div
              className="border border-white/20 bg-white/[0.04] p-5 md:p-8 relative overflow-hidden"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateX(40px)',
                transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s',
              }}
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/[0.03] rounded-full blur-[60px] pointer-events-none"></div>
              <div className="flex items-center gap-2 mb-8 relative z-10">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/80">After — AI 도입 후</span>
              </div>
              <div className="grid grid-cols-3 gap-2 md:gap-4 relative z-10">
                {resultStats.map((s, i) => (
                  <div
                    key={i}
                    className="text-center"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'none' : 'translateY(20px)',
                      transition: `opacity 0.6s ease ${0.4 + i * 0.12}s, transform 0.6s ease ${0.4 + i * 0.12}s`,
                    }}
                  >
                    <div className={`text-xl sm:text-3xl md:text-5xl font-bold ${s.color} leading-none mb-2 whitespace-nowrap`}>{s.value}</div>
                    <div className="text-[8px] sm:text-[10px] text-white/50 uppercase tracking-widest mb-1">{s.sub}</div>
                    <div className="text-[10px] sm:text-xs text-white/70 font-light leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>
              {/* Gain bar */}
              <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                <div className="flex justify-between text-[10px] text-white/40 uppercase tracking-widest mb-2">
                  <span>클로징률</span>
                  <span>55%</span>
                </div>
                <div className="h-1 bg-white/10 w-full">
                  <div
                    className="h-full bg-white/60"
                    style={{
                      width: visible ? '55%' : '0%',
                      transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1) 0.8s',
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Flow diagram */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(30px)',
              transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s',
            }}
          >
            <div className="text-center mb-8">
              <span className="text-[10px] uppercase tracking-widest text-white/40">리드 여정 비교 — Before vs After</span>
            </div>

            <div className="relative">
              {/* Column headers */}
              <div className="grid grid-cols-[1fr_40px_1fr] md:grid-cols-[1fr_60px_1fr] mb-4">
                <div className="text-center">
                  <span className="text-[10px] uppercase tracking-widest text-red-400/80">기존 방식</span>
                </div>
                <div></div>
                <div className="text-center">
                  <span className="text-[10px] uppercase tracking-widest text-white/60">AI 자동화</span>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                {flowSteps.map((step, i) => {
                  const isLast = i === flowSteps.length - 1;
                  const isBad = i > 0 && i < flowSteps.length - 1;
                  return (
                    <div
                      key={i}
                      className="grid grid-cols-[1fr_40px_1fr] md:grid-cols-[1fr_60px_1fr] items-center gap-2"
                      style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'none' : 'translateY(10px)',
                        transition: `opacity 0.5s ease ${0.7 + i * 0.1}s, transform 0.5s ease ${0.7 + i * 0.1}s`,
                      }}
                    >
                      {/* Before cell */}
                      <div className={`flex items-center gap-3 px-4 py-3 border ${isLast ? 'border-red-500/40 bg-red-500/10' : 'border-white/10 bg-white/[0.02]'}`}>
                        <div className={`w-6 h-6 flex items-center justify-center shrink-0 ${isLast ? 'text-red-400' : isBad ? 'text-red-400/60' : 'text-white/50'}`}>
                          <i className={`${step.icon} text-sm`}></i>
                        </div>
                        <span className={`text-xs font-light ${isLast ? 'text-red-400' : 'text-white/50'}`}>{step.before}</span>
                        {isLast && <i className="ri-close-circle-line text-red-400/80 text-sm ml-auto"></i>}
                      </div>

                      {/* Center connector */}
                      <div className="flex items-center justify-center">
                        {i === 0 ? (
                          <div className="w-6 h-6 flex items-center justify-center">
                            <i className="ri-arrow-right-s-line text-white/30 text-lg"></i>
                          </div>
                        ) : (
                          <div className="w-px h-full bg-white/10 mx-auto" style={{ minHeight: '100%' }}></div>
                        )}
                      </div>

                      {/* After cell */}
                      <div className={`flex items-center gap-3 px-4 py-3 border ${isLast ? 'border-white/40 bg-white/10' : 'border-white/10 bg-white/[0.02]'}`}>
                        <div className={`w-6 h-6 flex items-center justify-center shrink-0 ${isLast ? 'text-white' : 'text-white/60'}`}>
                          <i className={`${step.icon} text-sm`}></i>
                        </div>
                        <span className={`text-xs font-light ${isLast ? 'text-white' : 'text-white/70'}`}>{step.after}</span>
                        {isLast && <i className="ri-check-line text-white text-sm ml-auto"></i>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
