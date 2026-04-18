import { useEffect, useRef } from 'react';

const steps = [
  {
    number: '01',
    title: '진단 제출',
    subtitle: 'Diagnosis',
    description: '현재 응대 구조와 비즈니스 흐름을 파악하기 위한 간단한 진단서를 제출합니다',
    icon: 'ri-file-list-3-line',
    detail: '약 5분 소요',
  },
  {
    number: '02',
    title: '인터뷰',
    subtitle: 'Interview',
    description: '30분 심층 인터뷰를 통해 핵심 병목 지점과 자동화 가능 영역을 함께 찾아냅니다',
    icon: 'ri-discuss-line',
    detail: '30분 화상 미팅',
  },
  {
    number: '03',
    title: '구축 및 설계',
    subtitle: 'Build & Design',
    description: '비즈니스 맥락에 맞는 AI 응대 시스템을 설계하고 실제 환경에 구축합니다',
    icon: 'ri-settings-4-line',
    detail: '2~4주 소요',
  },
  {
    number: '04',
    title: '전달',
    subtitle: 'Delivery',
    description: '완성된 시스템을 인계하고 운영 가이드와 함께 자립 가능한 구조로 전달합니다',
    icon: 'ri-send-plane-line',
    detail: '전달 및 교육',
  },
];

export default function Process() {
  const headerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
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
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                el.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms`;
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
              }, 50);
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.15 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    });
  }, []);

  return (
    <section id="process" className="py-32 px-8 md:px-16 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="max-w-2xl mb-20">
          <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-5 font-light">
            How It Works
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            진행 방식
            <br />
            <span className="text-white/30">4단계로 완성됩니다</span>
          </h2>
          <p className="text-sm text-white/40 font-light leading-relaxed">
            복잡한 절차 없이, 명확한 단계로 진행됩니다
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* 연결선 - 데스크탑 */}
          <div className="hidden lg:block absolute top-[3.25rem] left-0 right-0 h-px">
            <div className="mx-auto" style={{ marginLeft: '12.5%', marginRight: '12.5%' }}>
              <div className="w-full h-px bg-white/10 relative">
                <div
                  className="absolute top-0 left-0 h-px bg-gradient-to-r from-white/5 via-amber-400/60 to-white/5"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => { stepRefs.current[i] = el; }}
                className="relative group"
              >
                {/* 모바일 연결선 */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden absolute left-[2.6rem] top-[6.5rem] w-px h-12 bg-white/10" />
                )}

                <div className="p-8 lg:p-10 border border-white/0 hover:border-white/10 transition-all duration-500 rounded-sm">
                  {/* 번호 + 아이콘 */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="relative">
                      <div className="w-[3.25rem] h-[3.25rem] flex items-center justify-center border border-white/20 group-hover:border-amber-400/50 transition-colors duration-500 rounded-full bg-white/5">
                        <i className={`${step.icon} text-xl text-white/60 group-hover:text-amber-400 transition-colors duration-500`}></i>
                      </div>
                      {/* 번호 뱃지 */}
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center bg-black border border-white/20 rounded-full text-[9px] font-bold text-white/40 group-hover:text-amber-400 group-hover:border-amber-400/40 transition-colors duration-500">
                        {i + 1}
                      </span>
                    </div>

                    {/* 데스크탑 화살표 */}
                    {i < steps.length - 1 && (
                      <div className="hidden lg:flex flex-1 items-center justify-end pr-2 opacity-20">
                        <i className="ri-arrow-right-line text-white text-sm"></i>
                      </div>
                    )}
                  </div>

                  {/* 텍스트 */}
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-2 font-light">
                      {step.subtitle}
                    </p>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-500">
                      {step.title}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed font-light mb-5">
                      {step.description}
                    </p>
                    <div className="inline-flex items-center gap-2 border border-white/10 px-3 py-1.5 rounded-full">
                      <i className="ri-time-line text-[11px] text-white/30"></i>
                      <span className="text-[11px] text-white/30 font-light tracking-wide">{step.detail}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 pt-16 border-t border-white/10 flex justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-xs tracking-widest uppercase font-semibold hover:bg-amber-400 transition-all duration-300 cursor-pointer whitespace-nowrap group rounded-full"
          >
            <span>진단 제출하기</span>
            <i className="ri-arrow-right-line text-base group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>

      </div>
    </section>
  );
}
