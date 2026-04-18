import { useRef, useEffect } from 'react';

export default function Empathy() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = [
      { el: leftRef.current, dir: 'translateX(-30px)', delay: 0 },
      { el: rightRef.current, dir: 'translateX(30px)', delay: 150 },
    ];
    items.forEach(({ el, dir, delay }) => {
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
        { threshold: 0.15 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    });
  }, []);

  return (
    <section className="py-28 px-8 md:px-16 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-center">
          <div ref={leftRef} className="md:col-span-2">
            <div className="w-full aspect-square overflow-hidden bg-gray-100">
              <img
                src="https://ccqmnekxfekgszvryfjh.supabase.co/storage/v1/object/public/MY/picture.png"
                alt="투쏠 AI Director"
                className="w-full h-full object-cover object-top grayscale"
              />
            </div>
          </div>

          <div ref={rightRef} className="md:col-span-3">
            <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-6 font-light">
              Why I Started This
            </p>

            <blockquote className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light mb-8">
              저도 한때, 주말에 들어온 문의 하나 때문에 월요일 오전에
              <br className="hidden md:block" />
              <span className="text-gray-900 font-medium">"이미 다른 업체와 계약했습니다"</span>라는 답장을 받아본 적이 있습니다.
            </blockquote>

            <div className="space-y-3 text-gray-600 text-sm md:text-base leading-relaxed font-light mb-8">
              <p>그때 배웠습니다.</p>
              <p>
                대응 속도는 <span className="text-gray-900 font-medium">'기술' 문제가 아니라 '구조' 문제</span>라는 걸.
              </p>
              <p>사람을 더 갈아 넣는 게 아니라, 구조를 바꿔야 한다는 걸.</p>
            </div>

            <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-gray-500">
              <span className="w-8 h-px bg-gray-300"></span>
              <span className="font-medium">투쏠</span>
              <span className="text-gray-400">· AI Director</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
