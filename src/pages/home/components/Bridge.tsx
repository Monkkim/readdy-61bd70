import { useRef, useEffect } from 'react';

const coachingFits = [
  '워크플로우 1개부터 작게 시작',
  '사업에 이식하고 적용하고 싶음',
  '4주 후 직접 운영하고 싶음',
  'AI 자동화에 입문하고 싶음',
];

const coachingNotFits = [
  '사업 전반 자동화 한 번에',
  '여러 시스템 통합 (3개 이상)',
  '직접 만들 시간이 없음',
  '전문가가 처음부터 끝까지 만들어주길 원함',
  '24/7 장애 대응까지 맡기고 싶음',
];

export default function Bridge() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = [
      { el: headerRef.current, delay: 0 },
      { el: cardsRef.current, delay: 150 },
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

  const handleScroll = (hash: string, type?: string) => {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    if (type) {
      setTimeout(() => {
        const select = document.querySelector('select[name="type"]') as HTMLSelectElement;
        if (select) {
          select.value = type;
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }, 800);
    }
  };

  return (
    <section id="bridge" className="py-16 md:py-28 px-4 md:px-16 bg-white">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="mb-12 md:mb-14 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight mb-4">
            이런 경우엔 코칭이 맞지 않습니다
          </h2>
          <p className="text-gray-500 text-sm md:text-base font-light max-w-xl mx-auto">
            코칭은 워크플로우 1개를 같이 만들고 이식하는 모델입니다.<br />
            아래 경우라면 맞춤 컨설팅이 더 적합합니다
          </p>
        </div>

        {/* Cards — 60:40 asymmetric */}
        <div ref={cardsRef} className="flex flex-col md:flex-row gap-4 md:gap-5">
          {/* Coaching Fits — 60% */}
          <div className="w-full md:w-[60%] border-2 border-black rounded-lg p-6 md:p-10 bg-gradient-to-br from-white to-gray-50/50">
            <div className="flex items-center gap-2 mb-5 md:mb-6">
              <i className="ri-checkbox-circle-line text-black text-xl"></i>
              <h3 className="text-sm font-bold text-black tracking-wide">코칭이 맞는 경우</h3>
            </div>
            <ul className="space-y-3 mb-6 md:mb-8">
              {coachingFits.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-700 font-light">
                  <i className="ri-check-line text-black text-base shrink-0"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleScroll('#contact', 'coaching')}
              className="w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 text-xs tracking-widest uppercase font-semibold hover:bg-gray-800 transition-all cursor-pointer whitespace-nowrap group rounded-full"
            >
              <span>4주 코칭 진단 받기</span>
              <i className="ri-arrow-right-line text-sm group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>

          {/* Not Fits — 40% */}
          <div className="w-full md:w-[40%] border border-gray-200 rounded-lg p-6 md:p-10 bg-gray-50/30">
            <div className="flex items-center gap-2 mb-5 md:mb-6">
              <i className="ri-close-circle-line text-gray-400 text-xl"></i>
              <h3 className="text-sm font-bold text-gray-500 tracking-wide">코칭이 안 맞는 경우</h3>
            </div>
            <ul className="space-y-3 mb-6 md:mb-8">
              {coachingNotFits.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-400 font-light">
                  <i className="ri-close-line text-gray-300 text-base shrink-0"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleScroll('#services')}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-600 py-3.5 text-xs tracking-widest uppercase font-medium hover:border-gray-500 hover:text-gray-800 transition-all cursor-pointer whitespace-nowrap group rounded-full"
            >
              <span>맞춤 컨설팅 보기</span>
              <i className="ri-arrow-down-line text-sm group-hover:translate-y-0.5 transition-transform"></i>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}