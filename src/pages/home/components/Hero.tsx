import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: '55%', label: '60초 응답 시 클로징률' },
  { value: '60초', label: 'AI 응답 목표 속도' },
  { value: '11×', label: '업계 평균 대비 클로징 차이' },
];

// ECG 심전도 라인 효과
function ECGLine() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* 상단 ECG 라인 */}
      <svg
        className="absolute w-full"
        style={{ top: '78%', left: 0, height: '120px', opacity: 0.35 }}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ecgGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="30%" stopColor="white" stopOpacity="0.6" />
            <stop offset="70%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <filter id="glow1">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* 이동하는 글로우 마스크 */}
          <mask id="revealMask1">
            <rect x="0" y="0" width="100%" height="100%" fill="black" />
            <rect
              x="-30%"
              y="0"
              width="60%"
              height="100%"
              fill="white"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                from="-600 0"
                to="1800 0"
                dur="3.5s"
                repeatCount="indefinite"
              />
            </rect>
          </mask>
        </defs>

        {/* 베이스 희미한 라인 */}
        <polyline
          points="0,60 180,60 220,60 240,20 260,100 280,10 300,110 320,60 360,60 540,60 580,60 600,20 620,100 640,10 660,110 680,60 720,60 900,60 940,60 960,20 980,100 1000,10 1020,110 1040,60 1080,60 1260,60 1300,60 1320,20 1340,100 1360,10 1380,110 1400,60 1440,60"
          fill="none"
          stroke="url(#ecgGrad1)"
          strokeWidth="1"
          opacity="0.2"
        />

        {/* 애니메이션 라인 */}
        <polyline
          points="0,60 180,60 220,60 240,20 260,100 280,10 300,110 320,60 360,60 540,60 580,60 600,20 620,100 640,10 660,110 680,60 720,60 900,60 940,60 960,20 980,100 1000,10 1020,110 1040,60 1080,60 1260,60 1300,60 1320,20 1340,100 1360,10 1380,110 1400,60 1440,60"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          filter="url(#glow1)"
          mask="url(#revealMask1)"
        />
      </svg>

      {/* 하단 ECG 라인 - 다른 타이밍 */}
      <svg
        className="absolute w-full"
        style={{ top: '88%', left: 0, height: '100px', opacity: 0.2 }}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow2">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <mask id="revealMask2">
            <rect x="0" y="0" width="100%" height="100%" fill="black" />
            <rect x="-30%" y="0" width="60%" height="100%" fill="white">
              <animateTransform
                attributeName="transform"
                type="translate"
                from="-600 0"
                to="1800 0"
                dur="4.5s"
                begin="1.5s"
                repeatCount="indefinite"
              />
            </rect>
          </mask>
        </defs>

        <polyline
          points="0,50 200,50 230,50 250,25 265,75 280,10 295,90 310,50 350,50 550,50 580,50 600,25 615,75 630,10 645,90 660,50 700,50 900,50 930,50 950,25 965,75 980,10 995,90 1010,50 1050,50 1250,50 1280,50 1300,25 1315,75 1330,10 1345,90 1360,50 1440,50"
          fill="none"
          stroke="white"
          strokeWidth="1"
          filter="url(#glow2)"
          mask="url(#revealMask2)"
        />
      </svg>

      {/* 글로우 닷 - 상단 라인 위를 달리는 점 */}
      <svg
        className="absolute w-full"
        style={{ top: '78%', left: 0, height: '120px' }}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="dotGrad">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <filter id="dotGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="0" cy="60" r="5" fill="white" filter="url(#dotGlow)" opacity="0.9">
          <animateMotion
            dur="3.5s"
            repeatCount="indefinite"
            path="M0,0 L180,0 L220,0 L240,-40 L260,40 L280,-50 L300,50 L320,0 L360,0 L540,0 L580,0 L600,-40 L620,40 L640,-50 L660,50 L680,0 L720,0 L900,0 L940,0 L960,-40 L980,40 L1000,-50 L1020,50 L1040,0 L1080,0 L1260,0 L1300,0 L1320,-40 L1340,40 L1360,-50 L1380,50 L1400,0 L1440,0"
          />
        </circle>
      </svg>

      <style>{`
        @keyframes ecgFade {
          0%, 100% { opacity: 0; }
          10%, 90% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function useTypingEffect(text: string, startDelay: number = 800, speed: number = 60) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, startDelay, speed]);

  return { displayed, done };
}

export default function Hero() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  const line1 = '60초 안에 응답하면';
  const line2 = '계약 성공 확률이 55% 상승합니다';
  const SPEED = 95;
  const { displayed: typed1, done: done1 } = useTypingEffect(line1, 500, SPEED);
  const { displayed: typed2, done: done2 } = useTypingEffect(line2, 500 + line1.length * SPEED + 400, SPEED);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const elements = [
      { el: badgeRef.current, delay: 0 },
      { el: headingRef.current, delay: 150 },
      { el: subRef.current, delay: 300 },
      { el: statsRef.current, delay: 450 },
      { el: ctaRef.current, delay: 600 },
    ];

    elements.forEach(({ el, delay }) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = 'none';
      const timer = setTimeout(() => {
        el.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay + 100);
      return () => clearTimeout(timer);
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <img
        src="https://readdy.ai/api/search-image?query=Abstract%20dark%20minimalist%20background%20with%20soft%20light%20rays%20and%20geometric%20lines%2C%20deep%20black%20and%20charcoal%20tones%2C%20subtle%20glowing%20particles%20floating%20in%20darkness%2C%20futuristic%20AI%20technology%20concept%2C%20ultra%20clean%20and%20modern%20aesthetic%2C%20cinematic%20dark%20atmosphere%2C%20high%20contrast%20monochrome%20with%20faint%20silver%20highlights%2C%20no%20people%2C%20pure%20abstract%20art&width=1920&height=1080&seq=twosol-hero-bg-001&orientation=landscape"
        alt="AI Background"
        className="absolute inset-0 w-full h-full object-cover object-top opacity-40"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90"></div>

      {/* ECG 심전도 라인 효과 */}
      <ECGLine />

      {/* 상승 파티클 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <style>{`
          @keyframes riseUp1 {
            0% { transform: translateY(100vh) scaleX(1); opacity: 0; }
            10% { opacity: 0.15; }
            90% { opacity: 0.08; }
            100% { transform: translateY(-20vh) scaleX(1); opacity: 0; }
          }
          @keyframes riseUp2 {
            0% { transform: translateY(100vh); opacity: 0; }
            10% { opacity: 0.2; }
            90% { opacity: 0.05; }
            100% { transform: translateY(-20vh); opacity: 0; }
          }
          @keyframes riseGlow {
            0% { transform: translateY(80vh); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 0.6; }
            100% { transform: translateY(-10vh); opacity: 0; }
          }
          .rise-line-1 { animation: riseUp1 6s ease-in infinite; }
          .rise-line-2 { animation: riseUp1 8s ease-in infinite 1.5s; }
          .rise-line-3 { animation: riseUp1 7s ease-in infinite 3s; }
          .rise-line-4 { animation: riseUp2 9s ease-in infinite 0.8s; }
          .rise-line-5 { animation: riseUp2 6.5s ease-in infinite 4s; }
          .rise-line-6 { animation: riseUp1 10s ease-in infinite 2.2s; }
          .rise-glow-1 { animation: riseGlow 7s ease-in infinite 0.5s; }
          .rise-glow-2 { animation: riseGlow 9s ease-in infinite 3.5s; }
          .rise-glow-3 { animation: riseGlow 8s ease-in infinite 1.8s; }
        `}</style>

        {/* 얇은 수직 라인들 */}
        <div className="rise-line-1 absolute bottom-0 w-px bg-gradient-to-t from-transparent via-white/20 to-transparent" style={{ left: '12%', height: '35vh' }}></div>
        <div className="rise-line-2 absolute bottom-0 w-px bg-gradient-to-t from-transparent via-white/15 to-transparent" style={{ left: '28%', height: '45vh' }}></div>
        <div className="rise-line-3 absolute bottom-0 w-px bg-gradient-to-t from-transparent via-amber-400/20 to-transparent" style={{ left: '45%', height: '40vh' }}></div>
        <div className="rise-line-4 absolute bottom-0 w-px bg-gradient-to-t from-transparent via-white/10 to-transparent" style={{ left: '62%', height: '50vh' }}></div>
        <div className="rise-line-5 absolute bottom-0 w-px bg-gradient-to-t from-transparent via-white/18 to-transparent" style={{ left: '78%', height: '38vh' }}></div>
        <div className="rise-line-6 absolute bottom-0 w-px bg-gradient-to-t from-transparent via-amber-400/15 to-transparent" style={{ left: '90%', height: '42vh' }}></div>

        {/* 글로우 오브 */}
        <div className="rise-glow-1 absolute w-1 h-1 rounded-full bg-white/60" style={{ left: '12%', bottom: 0, filter: 'blur(2px)' }}></div>
        <div className="rise-glow-2 absolute w-1 h-1 rounded-full bg-amber-400/70" style={{ left: '45%', bottom: 0, filter: 'blur(2px)' }}></div>
        <div className="rise-glow-3 absolute w-1 h-1 rounded-full bg-white/50" style={{ left: '78%', bottom: 0, filter: 'blur(2px)' }}></div>

        {/* 하단 안개 그라디언트 */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white/[0.03] to-transparent"></div>
      </div>

      <div className="relative z-10 w-full px-8 md:px-16 py-40">
        <div className="max-w-5xl">
          <h1 ref={headingRef} className="text-[2.75rem] md:text-[3.575rem] lg:text-[4.4rem] font-bold text-white leading-tight mb-6 tracking-tight">
            {typed1}
            {!done1 && (
              <span className="inline-block w-[3px] h-[0.85em] bg-white align-middle ml-1 animate-pulse rounded-sm" />
            )}
            {done1 && (
              <>
                <br />
                <span className="text-white">
                  {(() => {
                    const highlight = '55% 상승합니다';
                    const prefix = '계약 성공 확률이 ';
                    const fullText = prefix + highlight;
                    if (typed2.length <= prefix.length) {
                      return (
                        <>
                          <span className="text-white">{typed2}</span>
                          {!done2 && <span className="inline-block w-[3px] h-[0.85em] bg-white align-middle ml-1 animate-pulse rounded-sm" />}
                        </>
                      );
                    }
                    const highlightTyped = typed2.slice(prefix.length);
                    return (
                      <>
                        <span className="text-white">{prefix}</span>
                        <span className="text-amber-400">{highlightTyped}</span>
                        {!done2 && <span className="inline-block w-[3px] h-[0.85em] bg-amber-400 align-middle ml-1 animate-pulse rounded-sm" />}
                      </>
                    );
                  })()}
                </span>
              </>
            )}
          </h1>

          <p ref={subRef} className="text-base md:text-lg text-white/50 mb-6 max-w-2xl leading-relaxed font-light">
            업계 평균 응답 시간은 <span className="text-white/80 font-medium">42시간</span>{' '}
            60초 내 응답 시 클로징률 <span className="text-white/80 font-medium">55%</span> 업계 평균의 <span className="text-white/80 font-medium">11배</span>
            <br />저희는 <span className="text-white/80 font-medium">즉각 응대</span>에서 시작해 <span className="text-white/80 font-medium">매출 전환</span>까지 이어지는 <span className="text-amber-400 font-medium">AI 시스템을 설계</span>합니다
          </p>

          <div ref={statsRef} className="flex flex-wrap gap-10 mb-14">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">{stat.value}</span>
                <span className="text-xs text-white/30 font-light tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 items-start">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-xs tracking-widest uppercase font-semibold hover:bg-gray-100 transition-all cursor-pointer whitespace-nowrap group rounded-full"
            >
              <span>30분 진단 예약</span>
              <i className="ri-arrow-right-line text-base group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">

        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent animate-pulse"></div>
      </div>
    </section>
  );
}
