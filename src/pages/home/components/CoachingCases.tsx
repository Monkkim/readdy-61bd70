import { useRef, useEffect, useState } from 'react';

const cases = [
  {
    client: '열끈 마케팅 채대표님',
    industry: '마케팅 대행사',
    built: '마케팅 자료 자동 발송 워크플로우',
    before: [
      '마케팅 자료 수동 발송',
      'DB 관리 분산',
      '상담까지 이어지는 비율 추적 불가',
    ],
    after: [
      'DB 유입 시 자동 자료 발송',
      '단톡방 1,100명 자동 모집',
      '자료 → 상담 전환 자동화',
    ],
    highlight: '단톡방 1,100명 자동 모집',
    quote: '1대1 진단 받아보고 고민 없이 바로 1개월 코칭 결제했습니다. 가격 이상 가치를 받으실 수 있을 겁니다',
    loomUrl: 'https://www.loom.com/embed/fc329282d62c4686bbc1f9486fde7570',
  },
  {
    client: '박영재 대표님',
    industry: '필라테스 베이직',
    built: '알림톡 자동 응대 워크플로우 + n8n 활용 역량',
    before: [
      '외주 견적 60~100만원 부담',
      '유튜브 따라 한 달 헤맴',
      '자동화 변경할 때마다 막힘',
    ],
    after: [
      '알림톡 + n8n 자동화 직접 구축',
      '운영 + 변경까지 직접 가능',
      '추가 외주 비용 0원',
    ],
    highlight: '추가 외주 비용 0원',
    quote: '지금 저한테 필요한 자동화 시스템은 거의 다 배운 것 같아요. 또 자동화가 필요할 때 다시 도움 요청드리려고 합니다',
    loomUrl: 'https://www.loom.com/embed/ab0ea79281434c39884f3237accbb1d9',
  },
];

interface CaseRowProps {
  c: typeof cases[0];
  index: number;
  rowRef: (el: HTMLDivElement | null) => void;
}

function CaseRow({ c, index, rowRef }: CaseRowProps) {
  const isVideoLeft = index % 2 === 0;
  const videoRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const video = (
    <div ref={videoRef} className="w-full md:w-1/2 shrink-0 order-2 md:order-none">
      <div className="relative rounded-lg overflow-hidden" style={{ paddingBottom: '64.47%' }}>
        {shouldLoad ? (
          <iframe
            src={c.loomUrl}
            frameBorder="0"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
            title={`${c.client} 후기 영상`}
            loading="lazy"
          ></iframe>
        ) : (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full">
                <i className="ri-play-circle-line text-2xl text-white/40"></i>
              </div>
              <span className="text-xs text-white/30 font-light">영상 로딩 중...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const info = (
    <div className="w-full md:w-1/2 flex flex-col justify-center px-0 md:px-8 order-1 md:order-none">
      {/* Built */}
      <div className="mb-5">
        <span className="text-[10px] tracking-widest uppercase text-amber-400/70 font-light">만든 것</span>
        <p className="text-sm text-white font-medium mt-1 leading-relaxed">{c.built}</p>
      </div>

      {/* Before / After */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <span className="text-[10px] tracking-widest uppercase text-red-400/70 font-light block mb-2">Before</span>
          <ul className="space-y-1.5">
            {c.before.map((item, j) => (
              <li key={j} className="flex items-start gap-2 text-xs text-white/40 font-light">
                <i className="ri-close-line text-red-400/50 text-xs shrink-0 mt-0.5"></i>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="text-[10px] tracking-widest uppercase text-emerald-400/70 font-light block mb-2">After (4주 후)</span>
          <ul className="space-y-1.5">
            {c.after.map((item, j) => (
              <li key={j} className="flex items-start gap-2 text-xs text-white/70 font-light">
                <i className="ri-check-line text-emerald-400/70 text-xs shrink-0 mt-0.5"></i>
                <span className={item === c.highlight ? 'font-semibold text-white' : ''}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quote */}
      <div className="border-t border-white/10 pt-4">
        <p className="text-base md:text-lg text-white font-medium leading-relaxed mb-3 italic">
          &ldquo;{c.quote}&rdquo;
        </p>
        <span className="text-xs text-white/50 font-light">— {c.client}, {c.industry}</span>
      </div>
    </div>
  );

  return (
    <div
      ref={rowRef}
      className="flex flex-col md:flex-row items-center gap-8 md:gap-0"
    >
      {isVideoLeft ? (
        <>
          {video}
          {info}
        </>
      ) : (
        <>
          {info}
          {video}
        </>
      )}
    </div>
  );
}

export default function CoachingCases() {
  const headerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const allEls: { el: HTMLDivElement | null; delay: number }[] = [
      { el: headerRef.current, delay: 0 },
      ...rowRefs.current.map((el, i) => ({ el, delay: 100 + i * 150 })),
    ];

    allEls.forEach(({ el, delay }) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
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

  return (
    <section id="cases" className="py-16 md:py-28 px-4 md:px-16 bg-[#0A0A0A] text-white overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="mb-12 md:mb-20 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-4 font-light">
            Real Results
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
            실제 받아본 사람들의 후기들
          </h2>
          <p className="text-white/50 text-sm md:text-base font-light max-w-xl mx-auto">
            두 명의 클라이언트가 4주 동안 만든 결과를<br className="hidden sm:block" />
            영상으로 직접 들어보세요
          </p>
        </div>

        {/* Cases */}
        <div className="flex flex-col gap-16 md:gap-24">
          {cases.map((c, i) => (
            <CaseRow
              key={i}
              c={c}
              index={i}
              rowRef={(el) => { rowRefs.current[i] = el; }}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 md:mt-20 flex justify-center">
          <button
            onClick={() => {
              const el = document.querySelector('#contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-3 bg-white text-black px-8 md:px-10 py-4 text-xs tracking-widest uppercase font-semibold hover:bg-amber-400 transition-all duration-300 cursor-pointer whitespace-nowrap group rounded-full"
          >
            <span>어떤 자동화부터 시작할지 진단</span>
            <i className="ri-arrow-right-line text-base group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>

      </div>
    </section>
  );
}
