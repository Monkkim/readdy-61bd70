import { useRef, useEffect } from 'react';

const activities = [
  { icon: 'ri-youtube-line', text: '유튜브 / 인스타 / 쓰레드 투쏠 운영중' },
  { icon: 'ri-customer-service-2-line', text: '현 채널톡 Experts 활동' },
  { icon: 'ri-stack-line', text: '누적 자동화 프로젝트 10+' },
  { icon: 'ri-graduation-cap-line', text: '패스트캠퍼스 n8n x Antigravity 강의 런칭' },
  { icon: 'ri-group-line', text: 'AI Business Club 커뮤니티 운영 (2000+)' },
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
    <section id="about" className="py-16 md:py-32 px-4 md:px-16 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div ref={leftRef} className="text-center md:text-left">
            <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-6 font-light">
              About
            </p>
            <h2 className="text-2xl md:text-6xl font-bold leading-tight mb-6 md:mb-10 whitespace-nowrap">
              안녕하세요 투쏠입니다
            </h2>

            {/* 모바일 전용 사진 */}
            <div className="block md:hidden w-48 mx-auto mb-8 aspect-[4/5] overflow-hidden rounded-lg">
              <img
                src="https://ccqmnekxfekgszvryfjh.supabase.co/storage/v1/object/public/MY/picture.png"
                alt="투쏠 AI Director"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="space-y-5 text-white/60 text-sm leading-relaxed font-light mb-10">
              <p>
                안녕하세요 여러분 <strong className="text-white font-semibold">투쏠</strong>입니다
              </p>
              <p>
                저는 AI가 본격적으로 세상을 뒤흔들기 시작한 이후, 
이 미지의 도구가 우리의 일과 삶을 어떻게 혁신적으로 바꿀 수 있는지 그 실전적인 해답을 찾아가고 있습니다
              </p>
              <p>
                현재 SNS를 통해 막연한 이론에 그치지 않고
당장의 업무와 일상을 AI와 함께 설계해 나가는 구체적인 방법들을 공유하고 있습니다
              </p>
              <p className="text-white font-medium">저와 함께 가보시죠!</p>
            </div>

            <div className="mb-10">
              <h4 className="text-xs tracking-widest uppercase text-white/20 mb-5 font-light">주요 활동</h4>
              <ul className="space-y-3">
                {activities.map((act, i) => (
                  <li key={i} className="flex items-center justify-center md:justify-start gap-3 text-white/60 text-sm font-light">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0">
                      <i className={`${act.icon} text-base text-white/30`}></i>
                    </div>
                    <span>{act.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-row gap-2 justify-center md:justify-start">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-5 py-3 text-[10px] tracking-widest uppercase font-semibold hover:bg-amber-400 transition-all cursor-pointer whitespace-nowrap group rounded-full"
              >
                <span>상담 신청</span>
                <i className="ri-arrow-right-line text-sm group-hover:translate-x-1 transition-transform"></i>
              </a>
              <a
                href="https://www.youtube.com/@ai_tusol"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#FF0000] text-white px-5 py-3 text-[10px] tracking-widest uppercase font-medium hover:bg-[#cc0000] transition-all cursor-pointer whitespace-nowrap rounded-full"
              >
                <i className="ri-youtube-fill text-sm"></i>
                <span>YouTube</span>
              </a>
            </div>
          </div>

          <div ref={rightRef} className="relative hidden md:block">
            <div className="w-full aspect-[4/5] overflow-hidden">
              <img
                src="https://ccqmnekxfekgszvryfjh.supabase.co/storage/v1/object/public/MY/picture.png"
                alt="투쏠 AI Director"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
