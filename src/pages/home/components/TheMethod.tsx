import { useRef, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const weeks = [
  {
    week: 'Week 1',
    phase: '기초 강의 + 1개 선정',
    activities: [
      'Claude Code 기초 1:1 강의',
      '비즈니스 진단',
      '만들 워크플로우 또는 에이전트 1개 선정',
      '도구 환경 셋업',
    ],
    outcome: '기초 이해 완료 + 무엇 만들지 합의',
  },
  {
    week: 'Week 2',
    phase: '기초강의 + 같이 제작 (시작)',
    activities: [
      '워크플로우 단계별 분해',
      '1:1 미팅에서 페어 빌드 시작',
      '핵심 트리거 + 액션 1차 빌드',
    ],
    outcome: '작동하는 1차 프로토타입',
  },
  {
    week: 'Week 3',
    phase: '기초강의 + 같이 제작 (완성)',
    activities: [
      '디테일 보완 + 예외 케이스 처리',
      '실제 데이터로 테스트',
      '안정화 작업',
    ],
    outcome: '실 운영 가능한 완성본',
  },
  {
    week: 'Week 4',
    phase: '마무리 (이식 + 운영 자립)',
    activities: [
      '당신 사업에 정식 이식',
      '운영 매뉴얼 정리',
      '변경 시나리오 시뮬레이션',
      '다음 자동화 기회 매핑',
    ],
    outcome: '당신이 직접 운영하는 상태',
  },
];

const promises = [
  '워크플로우 1개 또는 에이전트 1개',
  'Claude Code 기초 강의',
  '같이 만들어서 당신 사업에 이식',
  '4주 후 직접 운영 가능한 상태',
];

const notPromises = [
  '사업 전반 자동화',
  '여러 시스템 통합 (3개 이상)',
  '4주 후 유지보수 책임',
  '24/7 장애 대응',
];

export default function TheMethod() {
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const promiseRef = useRef<HTMLDivElement>(null);

  const isLg = useMediaQuery('(min-width: 1024px)');
  const isMd = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    const items = [
      { el: headerRef.current, delay: 0 },
      { el: timelineRef.current, delay: 150 },
      { el: promiseRef.current, delay: 300 },
    ];
    items.forEach(({ el, delay }) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                el.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
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

  const handleScroll = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="method" className="py-16 md:py-28 px-4 md:px-16 bg-black text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="mb-10 md:mb-14 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-white/50 mb-4 font-light">
            How It Works
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            4주, 이렇게 진행됩니다
          </h2>
          <p className="text-white/60 text-sm md:text-base font-light max-w-xl mx-auto">
            매주 1회 1:1 미팅 + 비동기 피드백.
Week 1에 기초를 다지고, Week 2~3에 같이 만들고, Week 4에 이식합니다
          </p>
        </div>

        {/* Timeline — 조건부 렌더링: 한 breakpoint만 렌더링 */}
        <div ref={timelineRef}>
          {isLg ? (
            /* Desktop: Horizontal cards with connecting line */
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-[3.5rem] left-[12%] right-[12%] h-0.5 bg-white/15"></div>

              <div className="grid grid-cols-4 gap-6">
                {weeks.map((week, i) => {
                  const colors = [
                    { border: 'border-sky-500/40', bg: 'bg-sky-500/10', circle: 'border-sky-500/60', num: 'text-sky-300', label: 'text-sky-400/80', title: 'text-sky-300', badge: 'border-sky-500/30 text-sky-300/80 bg-sky-500/10' },
                    { border: 'border-amber-400/50', bg: 'bg-amber-400/10', circle: 'border-amber-400/70', num: 'text-amber-400', label: 'text-amber-400/80', title: 'text-amber-400', badge: 'border-amber-400/30 text-amber-400/80 bg-amber-400/10' },
                    { border: 'border-amber-400/50', bg: 'bg-amber-400/10', circle: 'border-amber-400/70', num: 'text-amber-400', label: 'text-amber-400/80', title: 'text-amber-400', badge: 'border-amber-400/30 text-amber-400/80 bg-amber-400/10' },
                    { border: 'border-emerald-500/40', bg: 'bg-emerald-500/10', circle: 'border-emerald-500/60', num: 'text-emerald-400', label: 'text-emerald-400/80', title: 'text-emerald-400', badge: 'border-emerald-500/30 text-emerald-400/80 bg-emerald-500/10' },
                  ];
                  const c = colors[i];
                  return (
                  <div key={i} className="relative">
                    {/* Week number circle */}
                    <div className="flex justify-center mb-6">
                      <div className={`relative z-10 w-14 h-14 flex items-center justify-center rounded-full border-2 bg-black ${c.circle}`}>
                        <span className={`text-sm font-bold ${c.num}`}>{i + 1}</span>
                      </div>
                    </div>

                    {/* Card */}
                    <div className={`border rounded-lg p-6 ${c.border} ${c.bg}`}>
                      <span className={`text-xs tracking-widest uppercase font-semibold block mb-3 ${c.label}`}>
                        {week.week}
                      </span>
                      <h3 className={`text-base font-bold mb-4 ${c.title}`}>
                        {week.phase}
                      </h3>
                      <ul className="space-y-2.5 mb-5">
                        {week.activities.map((act, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-white/70 text-sm font-light">
                            <i className="ri-arrow-right-s-line text-white/40 text-sm shrink-0 mt-0.5"></i>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${c.badge}`}>
                        <i className="ri-flag-line text-xs"></i>
                        <span>{week.outcome}</span>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          ) : isMd ? (
            /* Tablet: 2x2 grid */
            <div className="grid grid-cols-2 gap-5">
              {weeks.map((week, i) => {
                const colors = [
                  { border: 'border-sky-500/40', bg: 'bg-sky-500/10', circle: 'border-sky-500/60', num: 'text-sky-300', label: 'text-sky-400/80', title: 'text-sky-300', badge: 'border-sky-500/30 text-sky-300/80 bg-sky-500/10' },
                  { border: 'border-amber-400/50', bg: 'bg-amber-400/10', circle: 'border-amber-400/70', num: 'text-amber-400', label: 'text-amber-400/80', title: 'text-amber-400', badge: 'border-amber-400/30 text-amber-400/80 bg-amber-400/10' },
                  { border: 'border-amber-400/50', bg: 'bg-amber-400/10', circle: 'border-amber-400/70', num: 'text-amber-400', label: 'text-amber-400/80', title: 'text-amber-400', badge: 'border-amber-400/30 text-amber-400/80 bg-amber-400/10' },
                  { border: 'border-emerald-500/40', bg: 'bg-emerald-500/10', circle: 'border-emerald-500/60', num: 'text-emerald-400', label: 'text-emerald-400/80', title: 'text-emerald-400', badge: 'border-emerald-500/30 text-emerald-400/80 bg-emerald-500/10' },
                ];
                const c = colors[i];
                return (
                <div key={i} className={`border rounded-lg p-6 ${c.border} ${c.bg}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 bg-black ${c.circle}`}>
                      <span className={`text-sm font-bold ${c.num}`}>{i + 1}</span>
                    </div>
                    <span className={`text-xs tracking-widest uppercase font-semibold ${c.label}`}>
                      {week.week}
                    </span>
                  </div>
                  <h3 className={`text-base font-bold mb-4 ${c.title}`}>
                    {week.phase}
                  </h3>
                  <ul className="space-y-2.5 mb-5">
                    {week.activities.map((act, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-white/70 text-sm font-light">
                        <i className="ri-arrow-right-s-line text-white/40 text-sm shrink-0 mt-0.5"></i>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${c.badge}`}>
                    <i className="ri-flag-line text-xs"></i>
                    <span>{week.outcome}</span>
                  </div>
                </div>
                );
              })}
            </div>
          ) : (
            /* Mobile: Vertical stack */
            <div className="space-y-4">
              {weeks.map((week, i) => {
                const colors = [
                  { border: 'border-sky-500/40', bg: 'bg-sky-500/10', circle: 'border-sky-500/60', num: 'text-sky-300', label: 'text-sky-400/80', title: 'text-sky-300', badge: 'border-sky-500/30 text-sky-300/80 bg-sky-500/10' },
                  { border: 'border-amber-400/50', bg: 'bg-amber-400/10', circle: 'border-amber-400/70', num: 'text-amber-400', label: 'text-amber-400/80', title: 'text-amber-400', badge: 'border-amber-400/30 text-amber-400/80 bg-amber-400/10' },
                  { border: 'border-amber-400/50', bg: 'bg-amber-400/10', circle: 'border-amber-400/70', num: 'text-amber-400', label: 'text-amber-400/80', title: 'text-amber-400', badge: 'border-amber-400/30 text-amber-400/80 bg-amber-400/10' },
                  { border: 'border-emerald-500/40', bg: 'bg-emerald-500/10', circle: 'border-emerald-500/60', num: 'text-emerald-400', label: 'text-emerald-400/80', title: 'text-emerald-400', badge: 'border-emerald-500/30 text-emerald-400/80 bg-emerald-500/10' },
                ];
                const c = colors[i];
                return (
                <div key={i} className={`border rounded-lg p-5 ${c.border} ${c.bg}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-9 h-9 flex items-center justify-center rounded-full border-2 bg-black ${c.circle}`}>
                      <span className={`text-sm font-bold ${c.num}`}>{i + 1}</span>
                    </div>
                    <span className={`text-xs tracking-widest uppercase font-semibold ${c.label}`}>
                      {week.week}
                    </span>
                  </div>
                  <h3 className={`text-base font-bold mb-3 ${c.title}`}>
                    {week.phase}
                  </h3>
                  <ul className="space-y-2 mb-4">
                    {week.activities.map((act, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-white/70 text-sm font-light">
                        <i className="ri-arrow-right-s-line text-white/40 text-sm shrink-0 mt-0.5"></i>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${c.badge}`}>
                    <i className="ri-flag-line text-xs"></i>
                    <span>{week.outcome}</span>
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Promise Box */}
        <div ref={promiseRef} className="mt-12 md:mt-16 rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0">
            {/* Promises - Green glow */}
            <div className="p-8 md:p-10 border border-emerald-500/30 bg-emerald-500/[0.04] rounded-lg md:rounded-none md:rounded-l-lg relative">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-lg md:rounded-none md:rounded-l-lg shadow-[0_0_40px_rgba(16,185,129,0.08)] pointer-events-none"></div>
              <h4 className="text-xs tracking-widest uppercase text-emerald-400 font-semibold mb-6 relative z-10">
                코칭이 약속하는 것
              </h4>
              <ul className="space-y-3 relative z-10">
                {promises.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/85 font-light">
                    <div className="w-6 h-6 flex items-center justify-center shrink-0 rounded-full bg-emerald-500/15">
                      <i className="ri-check-line text-emerald-400 text-sm"></i>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Not Promises - Red glow */}
            <div className="p-8 md:p-10 border border-red-500/30 bg-red-500/[0.04] rounded-lg md:rounded-none md:rounded-r-lg relative">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-lg md:rounded-none md:rounded-r-lg shadow-[0_0_40px_rgba(239,68,68,0.08)] pointer-events-none"></div>
              <h4 className="text-xs tracking-widest uppercase text-red-400 font-semibold mb-6 relative z-10">
                코칭이 약속하지 않는 것
              </h4>
              <ul className="space-y-3 relative z-10">
                {notPromises.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/60 font-light">
                    <div className="w-6 h-6 flex items-center justify-center shrink-0 rounded-full bg-red-500/15">
                      <i className="ri-close-line text-red-400 text-sm"></i>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 pt-10 md:pt-12 border-t border-white/10 flex justify-center">
          <button
            onClick={() => handleScroll('#contact')}
            className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-xs tracking-widest uppercase font-semibold hover:bg-amber-400 transition-all duration-300 cursor-pointer whitespace-nowrap group rounded-full"
          >
            <span>4주 코칭 진단 신청하기</span>
            <i className="ri-arrow-right-line text-base group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>

      </div>
    </section>
  );
}