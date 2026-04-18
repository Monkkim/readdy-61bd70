import { useState, useRef, useEffect } from 'react';

const services = [
  {
    icon: 'ri-robot-2-line',
    number: '01',
    title: 'AI Sales System',
    subtitle: '리드 즉시 응대 + 맞춤 제안',
    description: '문의가 들어오는 순간, AI가 고객의 의도를 파악하고 1:1 맞춤형 제안을 자동 생성합니다 사람이 확인하기도 전에 리드는 이미 응대를 받고 있습니다',
    tags: ['Lead Response', 'Personalization', 'Conversion']
  },
  {
    icon: 'ri-mic-line',
    number: '02',
    title: 'Voice Agent',
    subtitle: '전화 응대 0초 대기',
    description: '고객이 전화하면 AI가 즉시 받습니다 자연스러운 음성으로 상담, 예약, 안내까지 처리 영업시간 외에도 단 한 통의 전화도 놓치지 않습니다',
    tags: ['Voice AI', 'Conversational', '24/7']
  },
  {
    icon: 'ri-chat-3-line',
    number: '03',
    title: 'Chat & CRM',
    subtitle: '채팅 응대 + 자동 파이프라인',
    description: '웹, 카카오, 메신저 어디서든 AI가 실시간 응대합니다 유입된 리드는 자동 분류되고, 최적의 타이밍에 후속 조치가 실행되어 전환까지 이어집니다',
    tags: ['Omnichannel', 'CRM', 'Automation']
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms`;
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
  }, [index]);

  return (
    <div
      ref={ref}
      className={`p-10 md:p-12 cursor-pointer transition-all duration-400 group ${
        hovered ? 'bg-black shadow-[inset_0_0_40px_rgba(0,0,0,0.6),0_8px_32px_rgba(0,0,0,0.18)]' : 'bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06),0_4px_24px_rgba(0,0,0,0.07)]'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start justify-between mb-8">
        <span className={`text-xs tracking-widest font-light transition-colors duration-300 ${hovered ? 'text-white/30' : 'text-gray-300'}`}>
          {service.number}
        </span>
        <div className={`w-10 h-10 flex items-center justify-center transition-colors duration-300 ${hovered ? 'text-white' : 'text-black'}`}>
          <i className={`${service.icon} text-2xl`}></i>
        </div>
      </div>
      <h3 className={`text-2xl font-bold mb-1 transition-colors duration-300 ${hovered ? 'text-white' : 'text-black'}`}>
        {service.title}
      </h3>
      <p className={`text-xs mb-4 transition-colors duration-300 font-medium tracking-wide ${hovered ? 'text-white/50' : 'text-gray-400'}`}>
        {service.subtitle}
      </p>
      <p className={`text-sm leading-relaxed mb-8 transition-colors duration-300 ${hovered ? 'text-white/60' : 'text-gray-500'}`}>
        {service.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className={`text-xs px-3 py-1 border tracking-wider transition-colors duration-300 ${
              hovered ? 'border-white/20 text-white/40' : 'border-gray-200 text-gray-400'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
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
    <section id="services" className="py-32 px-8 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-4 font-light">
              What I Do
            </p>
            <h2 className="text-5xl md:text-6xl font-bold text-black leading-tight">
              Services
            </h2>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
