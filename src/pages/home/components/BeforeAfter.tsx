import { useRef, useEffect, useState } from 'react';

const beforeItems = [
  { icon: 'ri-time-line', text: '리드가 와도 평균 42시간 뒤에나 연락한다' },
  { icon: 'ri-close-circle-line', text: '63%의 문의는 응답 없이 사라진다' },
  { icon: 'ri-arrow-down-line', text: '5분 후면 전환 가능성이 8배 떨어진다' },
  { icon: 'ri-money-dollar-circle-line', text: '비싼 광고비로 모은 DB가 증발하고 있다' },
  { icon: 'ri-user-unfollow-line', text: '야근해도 모든 문의를 커버할 수 없다' },
];

const afterItems = [
  { icon: 'ri-flashlight-line', text: '1초 만에 AI가 모든 채널에서 즉시 응대' },
  { icon: 'ri-line-chart-line', text: '1분 내 응답으로 전환율 391% 상승' },
  { icon: 'ri-git-merge-line', text: '유입 → 분류 → 후속 → 전환이 자동 연결' },
  { icon: 'ri-shield-check-line', text: '리드 0% 누락, 모든 기회가 파이프라인에 진입' },
  { icon: 'ri-moon-line', text: '24시간 365일 단 한 건도 놓치지 않는다' },
];

export default function BeforeAfter() {
  const titleRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const refs = [
      { el: titleRef.current, delay: 0, transform: 'translateY(30px)' },
      { el: dividerRef.current, delay: 200, transform: 'scaleY(0)' },
      { el: leftRef.current, delay: 150, transform: 'translateX(-40px)' },
      { el: rightRef.current, delay: 300, transform: 'translateX(40px)' },
    ];

    refs.forEach(({ el, delay, transform }) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = transform;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                el.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
                el.style.opacity = '1';
                el.style.transform = 'none';
              }, 50);
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    });
  }, []);

  // Animate the vertical line growing
  useEffect(() => {
    const el = dividerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setLineHeight(100), 400);
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
    <section className="py-32 px-8 md:px-16 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <div ref={titleRef} className="text-center mb-20">
          <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-4 font-light">
            Before / After
          </p>
          <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            지금 이 순간에도<br />
            <span className="text-white/30">기회가 사라지고 있습니다</span>
          </h2>
          <p className="text-sm text-white/40 font-light max-w-xl mx-auto leading-relaxed">
            B2B 기업의 평균 리드 응답 시간은 42시간.<br />
            63%는 아예 응답조차 하지 않습니다.
          </p>
        </div>

        {/* Comparison */}
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-0 items-stretch">

          {/* Before */}
          <div ref={leftRef} className="bg-white/[0.03] border border-white/[0.06] p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-red-400/80 bg-red-500/10 px-3 py-1 border border-red-500/20">
                Before
              </span>
              <span className="text-xs text-white/20 font-light">기존 운영 방식</span>
            </div>

            <div className="mb-10">
              <div className="text-6xl md:text-7xl font-bold text-red-400/40 leading-none mb-2">42h</div>
              <div className="text-xs text-white/20 font-light tracking-wider uppercase">평균 리드 응답 시간</div>
            </div>

            <ul className="space-y-5">
              {beforeItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 group"
                  style={{
                    opacity: 0,
                    animation: `fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 80 + 600}ms forwards`,
                  }}
                >
                  <div className="w-8 h-8 flex items-center justify-center shrink-0 mt-0.5 text-red-400/50">
                    <i className={`${item.icon} text-base`}></i>
                  </div>
                  <span className="text-sm text-white/40 font-light leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-8 border-t border-white/[0.06]">
              <div className="text-2xl font-bold text-red-400/50">전환율 기준치</div>
              <div className="text-xs text-white/20 font-light mt-1">업계 평균 응답 전환율 1x</div>
            </div>
          </div>

          {/* Divider */}
          <div ref={dividerRef} className="hidden md:flex flex-col items-center justify-center px-6 gap-4">
            <div className="w-px bg-white/10 flex-1" style={{ height: `${lineHeight}%`, transition: 'height 1.2s cubic-bezier(0.16,1,0.3,1)' }}></div>
            <div className="w-10 h-10 border border-white/10 flex items-center justify-center shrink-0">
              <i className="ri-arrow-right-line text-white/20 text-base"></i>
            </div>
            <div className="w-px bg-white/10 flex-1" style={{ height: `${lineHeight}%`, transition: 'height 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s' }}></div>
          </div>

          {/* After */}
          <div ref={rightRef} className="relative bg-white/[0.04] border border-white/20 p-8 md:p-12 overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.04] rounded-full blur-[80px] pointer-events-none"></div>

            <div className="flex items-center gap-3 mb-8 relative z-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-white bg-white/10 px-3 py-1 border border-white/20">
                After
              </span>
              <span className="text-xs text-white/20 font-light">AI 시스템 도입 후</span>
            </div>

            <div className="mb-10 relative z-10">
              <div className="text-6xl md:text-7xl font-bold text-white leading-none mb-2">&lt;1s</div>
              <div className="text-xs text-white/30 font-light tracking-wider uppercase">AI 응답 속도</div>
            </div>

            <ul className="space-y-5 relative z-10">
              {afterItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4"
                  style={{
                    opacity: 0,
                    animation: `fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 80 + 800}ms forwards`,
                  }}
                >
                  <div className="w-8 h-8 flex items-center justify-center shrink-0 mt-0.5 text-white/60">
                    <i className={`${item.icon} text-base`}></i>
                  </div>
                  <span className="text-sm text-white/70 font-light leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-8 border-t border-white/[0.06] relative z-10">
              <div className="text-2xl font-bold text-white">전환율 391% 향상</div>
              <div className="text-xs text-white/30 font-light mt-1">1분 내 응답 시 전환율 기준</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-16 text-center"
          style={{ opacity: 0, animation: 'fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) 1200ms forwards' }}
        >
          <p className="text-sm text-white/30 font-light mb-6">
            30분 무료 상담 · 현재 업무 흐름 진단 · 맞춤 자동화 제안
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 text-xs tracking-widest uppercase font-semibold hover:bg-gray-100 transition-all cursor-pointer whitespace-nowrap rounded-full group"
          >
            <span>지금 무료 진단 받기</span>
            <i className="ri-arrow-right-line text-base group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>

      </div>
    </section>
  );
}
