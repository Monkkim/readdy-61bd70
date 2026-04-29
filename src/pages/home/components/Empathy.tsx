import { useRef, useEffect } from 'react';

const wrongPaths = [
  {
    icon: 'ri-money-dollar-circle-line',
    title: '외주에 맡겨봤다',
    items: [
      '건당 60~100만원 부담',
      '한 번 받고 끝, 변경할 때마다 추가 비용',
      '어떻게 작동하는지 모르니 통제 불가',
    ],
    tail: '외주가 나쁜 게 아니라, "직접 운영"이 필요한 단계엔 안 맞습니다',
  },
  {
    icon: 'ri-youtube-line',
    title: '유튜브 보고 따라했다',
    items: [
      '기본 지식이 없으면 따라가기 어려움',
      '막히면 해결 방법 없음',
      '내 사업에 맞춰 응용하기 어려움',
    ],
    tail: '유튜브가 나쁜 게 아니라, 1:1 진단 없이 응용은 어렵습니다',
  },
  {
    icon: 'ri-book-open-line',
    title: '강의를 들었다',
    items: [
      '예제 따라하기는 됨',
      '내 사업에 어떻게 적용할지는 막막',
      '막혔을 때 물어볼 사람 없음',
    ],
    tail: '강의가 나쁜 게 아니라, 내 사업 맥락은 강의에 없습니다',
  },
];

export default function Empathy() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = [
      { el: headerRef.current, delay: 0 },
      { el: cardsRef.current, delay: 150 },
      { el: closingRef.current, delay: 300 },
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
    <section id="empathy" className="py-16 md:py-28 px-4 md:px-16 bg-[#0A0A0A] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-12 md:mb-16 text-center mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-5 font-light">
            The Problem
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            AI 에이전트를 만들려고 했지만,<br />
            <span className="text-white/40">이미 막혔다면</span>
          </h2>
        </div>

        {/* 3 Wrong Paths */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-12 md:mb-16">
          {wrongPaths.map((path, i) => (
            <div
              key={i}
              className="border border-white/10 bg-white/[0.03] p-6 md:p-8 rounded-lg"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full mb-5">
                <i className={`${path.icon} text-lg text-white/50`}></i>
              </div>
              <h3 className="text-sm font-semibold text-white mb-4">
                Way {i + 1}: {path.title}
              </h3>
              <ul className="space-y-2.5 mb-5">
                {path.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-white/50 text-sm font-light">
                    <i className="ri-close-line text-red-400/70 text-base shrink-0 mt-0.5"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-white/30 font-light italic leading-relaxed border-t border-white/5 pt-4">
                {path.tail}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Statement */}
        <div ref={closingRef} className="text-center max-w-3xl mx-auto flex flex-col items-center">
          <p className="text-xl md:text-2xl lg:text-3xl text-white/80 font-light leading-relaxed mb-4">
            AI 자동화는 배우는 게 아니라,<br />
            <span className="text-white font-semibold">내 사업 안에서 작동해야 합니다</span>
          </p>
          <div className="mt-8 md:mt-10">
            <button
              onClick={() => handleScroll('#contact')}
              className="inline-flex items-center gap-3 bg-white text-black px-8 md:px-10 py-4 text-xs tracking-widest uppercase font-semibold hover:bg-amber-400 transition-all cursor-pointer whitespace-nowrap group rounded-full"
            >
              <span>내 사업에 맞는지 30분 진단</span>
              <i className="ri-arrow-right-line text-base group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}