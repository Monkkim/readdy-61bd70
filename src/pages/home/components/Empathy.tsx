import { useRef, useEffect, useState } from 'react';

const timeline = [
  { time: '토요일 오후 2:17', label: '문의 도착', desc: '리드가 웹폼을 제출했습니다', status: 'lost' },
  { time: '토요일 오후 2:18', label: '경쟁사 AI 응답', desc: '경쟁사는 1분 안에 맞춤 제안을 보냈습니다', status: 'competitor' },
  { time: '월요일 오전 9:05', label: '당신의 첫 응답', desc: '"안녕하세요, 문의 주셔서 감사합니다..."', status: 'late' },
  { time: '월요일 오전 9:12', label: '리드의 답장', desc: '"이미 다른 업체와 계약했습니다"', status: 'dead' },
];

const facts = [
  { stat: '50%', desc: '리드는 먼저 답한 업체와 계약한다', source: 'Harvard Business Review' },
  { stat: '1시간', desc: '응답이 1시간이 넘으면 리드는 이미 죽은 것', source: 'InsideSales.com' },
  { stat: '42시간', desc: 'B2B 기업의 평균 리드 응답 시간', source: 'HBR Study' },
];

export default function Empathy() {
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const refs = [
      { el: headerRef.current, delay: 0 },
      { el: timelineRef.current, delay: 150 },
      { el: factsRef.current, delay: 300 },
      { el: closingRef.current, delay: 450 },
    ];
    refs.forEach(({ el, delay }) => {
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

  // Timeline step-by-step animation on scroll into view
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let step = 0;
            const interval = setInterval(() => {
              setActiveStep(step);
              step++;
              if (step >= timeline.length) clearInterval(interval);
            }, 600);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const statusColor: Record<string, string> = {
    lost: 'text-white/40 border-white/10',
    competitor: 'text-emerald-400 border-emerald-400/30',
    late: 'text-amber-400 border-amber-400/30',
    dead: 'text-red-400 border-red-400/30',
  };

  const dotColor: Record<string, string> = {
    lost: 'bg-white/20',
    competitor: 'bg-emerald-400',
    late: 'bg-amber-400',
    dead: 'bg-red-400',
  };

  return (
    <section className="py-16 md:py-32 px-4 md:px-16 bg-[#0A0A0A] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="max-w-5xl mb-20 text-center md:text-left">
          <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-6 font-light">
            The Problem
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
            주말에 문의 하나 놓쳐서,<br />
            <span className="text-white/40">월요일 아침에<br className="block md:hidden" /> 메일을 받아봤다면...</span>
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start mb-20">

          {/* Left: Story */}
          <div className="space-y-7 text-white/60 text-[1rem] md:text-[1.322rem] leading-relaxed font-light flex flex-col justify-center md:pt-[15%] text-center md:text-left">
            <p>
              저도 그 메일을 받았습니다
            </p>
            <p>
              영업팀 탓도 해봤고<br className="block md:hidden" /><span className="hidden md:inline">, </span>CRM도 바꿔봤고<br className="block md:hidden" /><span className="hidden md:inline">, </span>알림도 10개 받아봤습니다<br className="block md:hidden" /><br className="block md:hidden" /><span className="text-white/80"> 그런데 계속 놓쳤습니다</span>
            </p>
            <p className="border-l-2 border-white/20 pl-5">
              이건 영업 문제가 아니라<br />
              <span className="text-white text-xl md:text-2xl font-bold">구조 문제입니다</span>
            </p>
            <p>
              사람을 더 갈아 넣는다고<br className="block md:hidden" /> 1분 안에 응답이 어렵습니다<br className="block md:hidden" /><span className="hidden md:inline"> </span>잠잘 때도, 휴가 갔을 때도, 화장실 갔을 때도<br className="block md:hidden" /> 1분 안에 답하는 건<br className="block md:hidden" /> <span className="text-white font-medium">사람으로서는 한계가 있습니다</span>
            </p>
          </div>

          {/* Right: Timeline Infographic */}
          <div ref={timelineRef} className="relative">
            <p className="text-xs tracking-[0.3em] uppercase text-white/20 mb-8 font-light">실제로 일어나는 일</p>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[11px] top-3 bottom-3 w-px bg-white/10"></div>

              <div className="space-y-0">
                {timeline.map((item, i) => (
                  <div
                    key={i}
                    className={`relative flex gap-6 pb-8 last:pb-0 transition-all duration-700 ${
                      activeStep >= i ? 'opacity-100' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    {/* Dot */}
                    <div className="relative z-10 shrink-0 mt-1">
                      <div className={`w-[22px] h-[22px] rounded-full border flex items-center justify-center transition-all duration-500 ${
                        activeStep >= i ? dotColor[item.status] + ' border-transparent' : 'bg-white/5 border-white/10'
                      }`}>
                        {activeStep >= i && item.status === 'dead' && (
                          <i className="ri-close-line text-white text-xs"></i>
                        )}
                        {activeStep >= i && item.status === 'competitor' && (
                          <i className="ri-flashlight-line text-black text-xs"></i>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`flex-1 border rounded-lg p-4 transition-all duration-500 ${
                      activeStep >= i ? statusColor[item.status] + ' bg-white/[0.03]' : 'border-white/5 text-white/20'
                    }`}>
                      <div className="text-[10px] tracking-widest uppercase font-light mb-1 opacity-60">
                        {item.time}
                      </div>
                      <div className="text-sm font-semibold mb-1">{item.label}</div>
                      <div className="text-xs font-light opacity-70">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Facts Bar */}
        <div ref={factsRef} className="grid grid-cols-3 md:grid-cols-3 gap-px bg-white/5 border border-white/5 mb-20">
          {facts.map((fact, i) => (
            <div key={i} className="bg-[#0A0A0A] p-4 md:p-10 text-center md:text-left">
              <div className="text-xl sm:text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight whitespace-nowrap">
                {fact.stat}
              </div>
              <p className="text-[10px] sm:text-xs md:text-sm text-white/50 font-light leading-relaxed mb-2">
                {fact.desc}
              </p>
              <span className="hidden sm:inline text-[10px] tracking-widest uppercase text-white/20 font-light">
                {fact.source}
              </span>
            </div>
          ))}
        </div>

        {/* Closing */}
        <div ref={closingRef} className="text-center max-w-2xl mx-auto flex flex-col items-center">
          <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-8">
            구조를 바꾸면,<br />
            <span className="text-white font-medium">잠잘 때도 리드가 전환됩니다</span>
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 text-xs tracking-widest uppercase font-semibold hover:bg-gray-100 transition-all cursor-pointer whitespace-nowrap group rounded-full"
          >
            <span>30분 무료 진단 받기</span>
            <i className="ri-arrow-right-line text-base group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>

      </div>
    </section>
  );
}
