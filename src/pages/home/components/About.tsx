import { useRef, useEffect } from 'react';

const activities = [
  { icon: 'ri-youtube-line', text: '유튜브 / 인스타 / 쓰레드 투쏠 운영중' },
  { icon: 'ri-customer-service-2-line', text: '현 채널톡 Experts 활동' },
  { icon: 'ri-stack-line', text: '누적 자동화 프로젝트 50+' },
  { icon: 'ri-graduation-cap-line', text: '패스트캠퍼스 n8n × Antigravity 강의 런칭' },
  { icon: 'ri-group-line', text: 'AI Business Club 커뮤니티 운영 (2,000+)' },
];

export default function About() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = [
      { el: leftRef.current, delay: 0, dir: 'translateX(-40px)' },
      { el: rightRef.current, delay: 150, dir: 'translateX(40px)' },
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
    <section id="about" className="py-16 md:py-28 px-4 md:px-16 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div ref={leftRef} className="text-center md:text-left">
            <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-6 font-light">
              About
            </p>
            <h2 className="text-2xl md:text-5xl font-bold leading-tight mb-6 md:mb-10">
              안녕하세요 투쏠입니다
            </h2>

            {/* 모바일 전용 사진 */}
            <div className="block md:hidden w-48 mx-auto mb-8 aspect-[4/5] overflow-hidden rounded-lg">
              <img
                src="https://ccqmnekxfekgszvryfjh.supabase.co/storage/v1/object/public/MY/picture.png"
                alt="투쏠"
                className="w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="space-y-5 text-white/60 text-sm leading-relaxed font-light mb-10">
              <p>
                저는 AI가 본격적으로 세상을 뒤흔들기 시작한 이후, 이 미지의 도구가 우리의 일과 삶을 어떻게 혁신적으로 바꿀 수 있는지 그 실전적인 해답을 찾아가고 있습니다.
              </p>
              <p>
                20개 이상의 자동화 프로젝트를 직접 구축하면서, 외주의 한계를 봤습니다. 결과물은 받지만 운영은 못 한다는 한계입니다. 강의의 한계도 봤습니다. 배우긴 하지만 내 사업에 적용은 못 한다는 한계입니다
              </p>
              <p>
                그래서 코칭이라는 모델을 만들었습니다. 
AI 기초 강의부터 같이 만들기, 사업에 이식, 직접 운영까지 4주 동안 함께하는 코칭입니다
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
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-5 py-3 text-[10px] tracking-widest uppercase font-semibold hover:bg-amber-400 transition-all cursor-pointer whitespace-nowrap group rounded-full"
              >
                <span>30분 진단 신청</span>
                <i className="ri-arrow-right-line text-sm group-hover:translate-x-1 transition-transform"></i>
              </a>
              <a
                href="https://www.youtube.com/@ai_tusol"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#FF0000] text-white px-5 py-3 text-[10px] tracking-widest uppercase font-medium hover:bg-[#cc0000] transition-all cursor-pointer whitespace-nowrap rounded-full"
              >
                <i className="ri-youtube-fill text-sm"></i>
                <span>YouTube 보러가기</span>
              </a>
            </div>
          </div>

          <div ref={rightRef} className="relative hidden md:block">
            <div className="w-full aspect-[4/5] overflow-hidden rounded-lg">
              <img
                src="https://ccqmnekxfekgszvryfjh.supabase.co/storage/v1/object/public/MY/picture.png"
                alt="투쏠"
                className="w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
