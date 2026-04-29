import { useRef, useEffect } from 'react';

const trustItems = [
  { icon: 'ri-instagram-line', text: 'SNS 도합 2.5만 팔로워' },
  { icon: 'ri-stack-line', text: '자동화 프로젝트 15+' },
  { icon: 'ri-graduation-cap-line', text: '패스트캠퍼스 강의 런칭' },
  { icon: 'ri-group-line', text: 'ABC 커뮤니티 2,000+' },
];

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
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
  }, []);

  return (
    <section id="trust" className="py-8 md:py-12 px-4 md:px-16 bg-[#0A0A0A] text-white border-t border-white/5">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Desktop: horizontal row */}
        <div className="hidden md:flex items-center justify-center gap-8 lg:gap-12">
          {trustItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <i className={`${item.icon} text-sm text-white/40`}></i>
              <span className="text-sm text-white/60 font-light whitespace-nowrap">{item.text}</span>
              {i < trustItems.length - 1 && (
                <span className="ml-6 lg:ml-10 text-white/10">|</span>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: 2-row grid or horizontal scroll */}
        <div className="md:hidden flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
          {trustItems.map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <i className={`${item.icon} text-xs text-white/40`}></i>
              <span className="text-xs text-white/50 font-light whitespace-nowrap">{item.text}</span>
              {i < trustItems.length - 1 && (
                <span className="ml-2 text-white/10">·</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}