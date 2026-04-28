import { useRef, useEffect } from 'react';

const values = [
  {
    emoji: '📚',
    title: '기초부터 같이 시작합니다',
    desc: 'Week 1에 선택한 트랙(Claude Code 또는 n8n)의 기초 강의로 시작합니다. 코드를 한 번도 다뤄본 적 없는 비개발자 대표도 따라올 수 있도록 1:1로 진행됩니다. 동시에 당신 비즈니스를 진단해 무엇을 만들지 함께 정합니다',
  },
  {
    emoji: '🤝',
    title: '2주 동안 페어 빌드합니다',
    desc: 'Week 2~3에 본격적으로 같이 만듭니다. 외주처럼 일방적으로 받는 것도, 강의처럼 예제만 따라하는 것도 아닙니다. 1:1 미팅에서 실제 당신 사업의 데이터와 도구로 함께 빌드합니다',
  },
  {
    emoji: '🌱',
    title: '마지막 주에 이식하고 운영을 넘깁니다',
    desc: 'Week 4에 만든 워크플로우를 당신 사업에 이식합니다. 운영 매뉴얼과 함께 권한이 이전되고, 4주 후엔 당신이 직접 운영합니다. 다음 자동화도 스스로 시작할 수 있게 됩니다',
  },
];

export default function TheCoaching() {
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

  return (
    <section id="coaching" className="py-16 md:py-28 px-4 md:px-16 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="mb-12 md:mb-16 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-4 font-light">
            Main Service
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-black leading-tight mb-4">
            AI 1:1 코칭
          </h2>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="px-4 py-1.5 bg-black text-white text-xs font-medium rounded-full whitespace-nowrap">
              Claude Code 트랙
            </span>
            <span className="text-gray-300 text-sm">/</span>
            <span className="px-4 py-1.5 bg-gray-100 text-black text-xs font-medium rounded-full whitespace-nowrap">
              n8n 트랙
            </span>
          </div>
          <p className="text-gray-500 text-sm md:text-base font-light max-w-xl mx-auto">
            4주 동안 기초 강의 → 같이 빌드 → 사업 이식까지.
          </p>
        </div>

        {/* Value Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className="border border-gray-100 bg-gray-50/50 p-6 md:p-8 rounded-lg hover:border-gray-300 transition-all duration-300"
            >
              <div className="text-3xl mb-5">{v.emoji}</div>
              <h3 className="text-sm font-bold text-black mb-3 leading-snug">{v.title}</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}