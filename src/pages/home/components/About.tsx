import { useRef, useEffect } from 'react';

const activities = [
  { icon: 'ri-youtube-line', text: '유튜브 / 쓰레드 투쏠 운영중' },
  { icon: 'ri-customer-service-2-line', text: '현 채널톡 Experts 활동' },
  { icon: 'ri-stack-line', text: '누적 자동화 프로젝트 10+' },
  { icon: 'ri-graduation-cap-line', text: '패스트캠퍼스 n8n x Antigravity 강의 런칭' },
  { icon: 'ri-group-line', text: 'AI Business Club 커뮤니티 운영' },
];

const stats = [
  { value: '느린', label: 'AI 철학' },
  { value: 'Voice', label: 'Agent 전문' },
  { value: '10+', label: '자동화 프로젝트' },
  { value: 'Deep', label: '이해 우선' },
];

export default function About() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = [
      { el: leftRef.current, delay: 0, dir: 'translateX(-40px)' },
      { el: rightRef.current, delay: 150, dir: 'translateX(40px)' },
      { el: statsRef.current, delay: 300, dir: 'translateY(30px)' },
    ];

    items.forEach(({ el, delay, dir }) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = dir;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                el.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
                el.style.opacity = '1';
                el.style.transform = 'translate(0)';
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
    <section id="about" className="py-32 px-8 md:px-16 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div ref={leftRef}>
            <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-6 font-light">
              About
            </p>
            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-10">
              투쏠
            </h2>
            <div className="space-y-5 text-white/60 text-sm leading-relaxed font-light mb-10">
              <p>
                안녕하세요 여러분 <strong className="text-white font-semibold">투쏠</strong>입니다.
              </p>
              <p>
                저는 AI가 본격적으로 세상을 뒤흔들기 시작한 이후, 이 미지의 도구가 우리의 일과 삶을 어떻게 혁신적으로 바꿀 수 있는지 그 실전적인 해답을 찾아가고 있습니다.
              </p>
              <p>
                현재 SNS를 통해 막연한 이론에 그치지 않고, 당장의 업무와 일상을 AI와 함께 설계해 나가는 구체적인 방법들을 공유하고 있습니다.
              </p>
              <p className="text-white font-medium">저와 함께 가보시죠!</p>
            </div>

            <div className="mb-10">
              <h4 className="text-xs tracking-widest uppercase text-white/20 mb-5 font-light">주요 활동</h4>
              <ul className="space-y-3">
                {activities.map((act, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/60 text-sm font-light">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0">
                      <i className={`${act.icon} text-base text-white/30`}></i>
                    </div>
                    <span>{act.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-xs tracking-widest uppercase font-semibold hover:bg-gray-100 transition-all cursor-pointer whitespace-nowrap group"
              >
                <span>상담 신청</span>
                <i className="ri-arrow-right-line text-base group-hover:translate-x-1 transition-transform"></i>
              </a>
              <a
                href="mailto:michael@davenport.ai.kr"
                className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 text-xs tracking-widest uppercase font-medium hover:bg-white hover:text-black transition-all cursor-pointer whitespace-nowrap"
              >
                <i className="ri-mail-line"></i>
                <span>Email</span>
              </a>
            </div>
          </div>

          <div ref={rightRef} className="relative">
            <div className="w-full aspect-[4/5] overflow-hidden">
              <img
                src="https://ccqmnekxfekgszvryfjh.supabase.co/storage/v1/object/public/MY/picture.png"
                alt="투쏠 AI Director"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white text-black p-6 w-44">
              <div className="text-3xl font-bold">AI</div>
              <div className="text-xs tracking-widest uppercase text-gray-500 mt-1">Director</div>
            </div>
          </div>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 mt-28">
          {stats.map((stat, i) => (
            <div key={i} className="bg-black p-8 md:p-10 text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-xs tracking-widest uppercase text-white/30 font-light">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
