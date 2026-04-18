import { useRef, useEffect } from 'react';

const industries = [
  '마케팅',
  '피트니스',
  '금융',
  '교육',
  '미디어',
  '전시',
];

export default function TrustBar() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white border-b border-gray-100">
      <div ref={rootRef} className="max-w-7xl mx-auto px-8 md:px-16 py-10">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-center">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-full text-[11px] font-medium tracking-widest uppercase text-gray-700">
              <i className="ri-customer-service-2-line text-sm"></i>
              채널톡 Experts
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-full text-[11px] font-medium tracking-widest uppercase text-gray-700">
              <i className="ri-graduation-cap-line text-sm"></i>
              패스트캠퍼스 강사
            </span>
          </div>

          <div className="flex flex-col items-start md:items-center gap-3">
            <p className="text-xs tracking-widest uppercase text-gray-400 font-light">누적 프로젝트 10+ · 6개 산업군</p>
            <div className="flex flex-wrap gap-2 justify-start md:justify-center">
              {industries.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-[11px] text-gray-600 font-light tracking-wider"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-500 font-light leading-relaxed italic md:text-right">
            "이 사이트의 상담도 채널톡으로 운영합니다 — 우리가 만든 시스템을 우리가 먼저 씁니다."
          </p>
        </div>
      </div>
    </section>
  );
}
