import { useRef, useEffect } from 'react';

const testimonials = [
  {
    name: '마케팅 B사',
    role: 'Marketing Agency',
    text: '불필요한 반복적 업무를 간소화하기 위해 메이크 활용에 관심있으신 분들은 꼭!! 이분께 의뢰하시길 바랍니다. 원하는 솔루션을 구현해주시는 것은 물론이거니와, 친절하고 신속한 상담에 정말 감동하지 않을 수 없습니다.',
    tag: 'Automation'
  },
  {
    name: '정책자금 R사',
    role: 'Finance Sector',
    text: '너무너무 친절하게 하나하나 다 알려주십니다. 완전 강추강추!!',
    tag: 'Consulting'
  },
  {
    name: '전시관리 D사',
    role: 'Exhibition Management',
    text: '요청한 요구사항을 완벽하게 이해하시고, 예상보다 훨씬 빠른 시간 내에 작업을 완료해주셨습니다. 커뮤니케이션도 원활했고, 중간중간 진행 상황을 공유해주셔서 안심하고 기다릴 수 있었습니다.',
    tag: 'Integration'
  },
  {
    name: '에이전트 구매 고객',
    role: 'Verified Client',
    text: '늦은시간인데도 대응해주시고 감사합니다. AI를 잘 활용할 수 있게 만들어주셔서 감사합니다. 또 좋은 에이전트 만들어주시면 구매할께요!',
    tag: 'Voice Agent'
  },
  {
    name: '마케팅 J사',
    role: 'Marketing Firm',
    text: '요청한 것 이상의 결과물이 완성 되었네요. 대단한 능력자세요. 감사합니다. 사업성과가 기대됩니다.',
    tag: 'AI Sales'
  },
  {
    name: '미디어 W사',
    role: 'Media Company',
    text: '저희가 원하는 기능을 n8n으로 구현/판매해주셔서 진심으로 감사드립니다. 친절하게 가이드까지 잘 해주시니 최고인것 같습니다.',
    tag: 'n8n'
  }
];

const allTestimonials = [...testimonials, ...testimonials];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="w-[220px] md:w-[320px] bg-white border border-gray-100 p-4 md:p-6 flex flex-col gap-3 shrink-0 hover:border-gray-300 transition-all duration-300 group">
      <span className="text-[9px] md:text-xs tracking-widest uppercase border border-gray-200 text-gray-400 px-2 py-0.5 self-start font-light">
        {t.tag}
      </span>
      <p className="text-gray-700 text-xs md:text-sm leading-relaxed flex-grow font-light line-clamp-4">
        &ldquo;{t.text}&rdquo;
      </p>
      <div className="pt-3 border-t border-gray-100">
        <div className="font-semibold text-black text-xs md:text-sm">{t.name}</div>
        <div className="text-[10px] md:text-xs text-gray-400 mt-0.5 font-light">{t.role}</div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const titleRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const track1WrapRef = useRef<HTMLDivElement>(null);
  const track2WrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = [
      { el: titleRef.current, delay: 0 },
      { el: track1WrapRef.current, delay: 150 },
      { el: track2WrapRef.current, delay: 280 },
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
                el.style.transition = `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
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
    <section id="testimonials" className="py-16 md:py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div ref={titleRef} className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-4 font-light">
              Client Reviews
            </p>
            <h2 className="text-5xl md:text-6xl font-bold text-black leading-tight">
              Work
            </h2>
          </div>
          <p className="text-gray-400 max-w-xs text-sm font-light leading-relaxed">
            함께한 클라이언트들의 실제 경험을 공유합니다.
          </p>
        </div>
      </div>

      {/* Marquee row 1 - left */}
      <div ref={track1WrapRef} className="relative w-full mb-6 group">
        <div className="absolute top-0 left-0 w-24 md:w-40 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 md:w-40 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div
          ref={track1Ref}
          className="flex gap-5 w-max px-4"
          style={{
            animation: 'marqueeLeft 40s linear infinite',
          }}
          onMouseEnter={() => { if (track1Ref.current) track1Ref.current.style.animationPlayState = 'paused'; }}
          onMouseLeave={() => { if (track1Ref.current) track1Ref.current.style.animationPlayState = 'running'; }}
        >
          {allTestimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* Marquee row 2 - right */}
      <div ref={track2WrapRef} className="relative w-full group">
        <div className="absolute top-0 left-0 w-24 md:w-40 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 md:w-40 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div
          ref={track2Ref}
          className="flex gap-5 w-max px-4"
          style={{
            animation: 'marqueeRight 40s linear infinite',
          }}
          onMouseEnter={() => { if (track2Ref.current) track2Ref.current.style.animationPlayState = 'paused'; }}
          onMouseLeave={() => { if (track2Ref.current) track2Ref.current.style.animationPlayState = 'running'; }}
        >
          {[...allTestimonials].reverse().map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
