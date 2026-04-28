import { useRef, useEffect } from 'react';

export default function PainBridge() {
  const headerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const compareRef = useRef<HTMLDivElement>(null);
  const bridgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = [
      { el: headerRef.current, delay: 0 },
      { el: quoteRef.current, delay: 150 },
      { el: compareRef.current, delay: 300 },
      { el: bridgeRef.current, delay: 450 },
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
    <section id="pain-bridge" className="py-16 md:py-28 px-4 md:px-16 bg-black text-white overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* Main Headline */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-white">지금 이 순간에도</span>
            <br />
            <span className="text-gray-400">격차는 벌어지고 있습니다</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed mb-4">
            AI 자동화를 운영에 들인 1인 사업자와 그렇지 않은 사업자의
            <br className="hidden sm:block" />
            업무 시간 격차는 평균 주 <span className="text-white font-semibold">6.5시간</span>. 1년이면 <span className="text-white font-semibold">338시간</span>입니다
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-gray-500 text-xs font-light">
            <span>· McKinsey Global Institute 2024 ·</span>
          </div>
        </div>

        {/* Karpathy Quote */}
        <div ref={quoteRef} className="flex flex-col items-center text-center mb-12 md:mb-16">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-6 bg-gray-800">
            <img
              src="https://static.readdy.ai/image/47d5051b6fbde7de04c78dda01d0a9c3/504b9159fc11691927ac4e4963f49ee7.png"
              alt="Andrej Karpathy"
              className="w-full h-full object-cover"
            />
          </div>
          <blockquote className="text-lg md:text-xl font-light text-white/90 max-w-lg leading-relaxed mb-4">
            "프로그래밍을 배울 필요는 없습니다
            <br />
            이제는 AI와 대화하는 법을 배우면 됩니다"
          </blockquote>
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <span className="text-white font-medium">ANDREJ KARPATHY</span>
            <span>―</span>
            <span>전 Tesla AI 디렉터</span>
          </div>
        </div>

        {/* BEFORE / AFTER */}
        <div ref={compareRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16">
          {/* BEFORE */}
          <div className="border border-red-900/50 rounded-lg p-6 md:p-8 bg-red-950/20">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <h3 className="text-xs tracking-widest uppercase text-red-400 font-medium">BEFORE — 지금 당신의 현실</h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-red-400 mb-1">8시간</div>
                <div className="text-xs text-gray-500 font-light">주 반복업무</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-red-400 mb-1">60~100만</div>
                <div className="text-xs text-gray-500 font-light">외주 1회 비용</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-red-400 mb-1">3개월</div>
                <div className="text-xs text-gray-500 font-light">외주 결과 활용 기간</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-red-400 mb-1">0번</div>
                <div className="text-xs text-gray-500 font-light">직접 변경할 수 있는 횟수</div>
              </div>
            </div>
          </div>

          {/* AFTER */}
          <div className="border border-white/20 rounded-lg p-6 md:p-8 bg-white/5">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <h3 className="text-xs tracking-widest uppercase text-white/70 font-medium">AFTER — 4주 코칭 후</h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">1.5시간</div>
                <div className="text-xs text-gray-500 font-light">주 운영시간</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">0원</div>
                <div className="text-xs text-gray-500 font-light">추가 비용</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">영구</div>
                <div className="text-xs text-gray-500 font-light">직접 운영·변경 가능</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">매주</div>
                <div className="text-xs text-gray-500 font-light">스스로 추가 자동화 시도</div>
              </div>
            </div>
          </div>
        </div>

        {/* Solution Bridge */}
        <div ref={bridgeRef} className="text-center">
          <p className="text-white/80 text-base md:text-lg font-light leading-relaxed mb-3">
            학습이 아니라, 직접 만드는 경험이 필요합니다.
          </p>
          <p className="text-white text-lg md:text-xl font-medium leading-relaxed mb-8">
            4주 안에, 당신 사업에 맞는 자동화 1개를 같이 만듭니다.
          </p>

        </div>

      </div>
    </section>
  );
}