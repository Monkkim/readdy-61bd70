import { useRef, useEffect } from 'react';

const examples = [
  {
    icon: 'ri-send-plane-line',
    title: '마케팅 자료 자동 발송',
    flow: '리드가 폼을 제출하면 → 자동으로 자료 메일/알림톡 발송 → 후속 메시지로 상담 유도',
    industries: '마케팅 대행사, 코치, 컨설턴트, 강사',
  },
  {
    icon: 'ri-calendar-check-line',
    title: '예약/문의 자동 응대',
    flow: '고객 문의가 들어오면 → AI가 1차 답변 → 일정 조율 + 캘린더 등록 자동화',
    industries: '필라테스/PT, 미용실, 시공/견적, 학원',
  },
  {
    icon: 'ri-bar-chart-line',
    title: 'SNS 콘텐츠 자동 분석',
    flow: '경쟁사 / 벤치마크 계정 영상을 자동 수집 → AI가 후킹/구조 분석 → 시트로 정리',
    industries: '콘텐츠 크리에이터, 마케터, 1인 미디어',
  },
  {
    icon: 'ri-database-2-line',
    title: '고객 데이터 자동 정리',
    flow: '여러 채널에서 들어온 리드를 → 한 곳에 자동 정리 → 우선순위 자동 분류',
    industries: '영업팀, 부동산, 보험, B2B',
  },
  {
    icon: 'ri-robot-2-line',
    title: 'AI 응대 에이전트',
    flow: '카카오톡/웹 채팅에 들어온 질문에 → 회사 자료 기반 AI 답변 → 사람이 필요할 때만 알림',
    industries: '이커머스, SaaS, 정보성 서비스',
  },
];

export default function WhatYouWillBuild() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = [
      { el: headerRef.current, delay: 0 },
      { el: gridRef.current, delay: 150 },
      { el: footerRef.current, delay: 300 },
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

  return (
    <section id="examples" className="py-16 md:py-28 px-4 md:px-16 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="mb-12 md:mb-16 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-black mb-4 font-light">
            Examples
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight mb-4">
            4주 동안 함께 만들 수 있는 것
          </h2>
          <p className="text-black text-sm md:text-base font-light max-w-xl mx-auto">
            워크플로우 1개 또는 에이전트 1개.<br />
            여러분이 하시는일에 가장 시급한 것부터 시작합니다
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="flex flex-wrap justify-center gap-4 md:gap-5 mb-10 md:mb-12">
          {examples.map((ex, i) => (
            <div
              key={i}
              className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-14px)] border border-gray-300 p-5 md:p-7 rounded-lg hover:border-gray-500 transition-all duration-300 group"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full mb-4 md:mb-5 group-hover:border-black transition-colors">
                <i className={`${ex.icon} text-lg text-black group-hover:text-black transition-colors`}></i>
              </div>
              <h3 className="text-sm font-bold text-black mb-2 md:mb-3">{ex.title}</h3>
              <p className="text-xs text-black font-light leading-relaxed mb-3 md:mb-4">{ex.flow}</p>
              <div className="flex items-center gap-2">
                <i className="ri-building-line text-xs text-black"></i>
                <span className="text-[10px] text-black font-light">{ex.industries}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div ref={footerRef} className="text-center">
          <p className="text-sm text-black font-light">
            위 예시 외에도 당신 사업의 가장 시급한 자동화 1개를<br className="hidden sm:block" />
            <span className="text-black font-medium"> 첫 주에 함께 정합니다</span>
          </p>
        </div>

      </div>
    </section>
  );
}
