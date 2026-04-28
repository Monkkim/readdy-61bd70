import { useState, useRef, useEffect } from 'react';

const services = [
  {
    number: '01',
    icon: 'ri-filter-3-line',
    title: 'AI 퍼널 시스템',
    subtitle: '리드 유입 → 자동 응대 → 상담 전환까지',
    target: '마케팅 대행사 / 코치 / 강사 / 1인 브랜드 / 정보성 서비스',
    deliverables: [
      '리드 캡처 + DB 자동 적재',
      '자동 자료 / 메시지 발송 (알림톡 / 이메일 / 카카오)',
      '단계별 후속 트리거 + 분기',
      '상담 / CRM 연동',
    ],
    duration: '2~4주',
  },
  {
    number: '02',
    icon: 'ri-mic-line',
    title: 'Voice Agent',
    subtitle: '전화 응대 0초 대기, 24/7 자동 처리',
    target: '인테리어 / 시공 / 견적 / 부동산 / 의료 / 법무',
    deliverables: [
      'AI 음성 응대 (자연스러운 한국어)',
      '상담 / 예약 / 안내 자동 처리',
      '통화 로그 + CRM 연동',
      '부재중 전화 → 콜백 자동화',
    ],
    duration: '3~5주',
  },
  {
    number: '03',
    icon: 'ri-chat-3-line',
    title: 'CS / Agent System',
    subtitle: '채팅 응대 + 운영 자동화 통합',
    target: '이커머스 / SaaS / 다채널 운영 비즈니스',
    deliverables: [
      '옴니채널 응대 (웹 / 카카오 / 메신저)',
      '리드 자동 분류 + 라우팅',
      '후속 조치 자동화',
      '운영 대시보드',
    ],
    duration: '3~6주',
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
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
      className="border border-gray-300 p-8 md:p-10 rounded-lg hover:border-gray-500 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-6">
        <span className="text-xs tracking-widest font-light text-gray-500">{service.number}</span>
        <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full group-hover:border-black transition-colors">
          <i className={`${service.icon} text-lg text-gray-700 group-hover:text-black transition-colors`}></i>
        </div>
      </div>

      <h3 className="text-xl font-bold text-black mb-1">{service.title}</h3>
      <p className="text-xs text-gray-700 font-light mb-5">{service.subtitle}</p>

      <div className="mb-5">
        <span className="text-[10px] tracking-widest uppercase text-gray-500 font-light block mb-2">대상</span>
        <p className="text-xs text-black font-light">{service.target}</p>
      </div>

      <div className="mb-6">
        <span className="text-[10px] tracking-widest uppercase text-gray-500 font-light block mb-3">프로젝트 산출물</span>
        <ul className="space-y-2">
          {service.deliverables.map((d, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-black font-light">
              <i className="ri-check-line text-gray-500 text-xs shrink-0 mt-0.5"></i>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between pt-5 border-t border-gray-200">
        <div className="flex items-center gap-1.5">
          <i className="ri-time-line text-xs text-gray-500"></i>
          <span className="text-xs text-gray-700 font-light">{service.duration}</span>
        </div>
        <span className="text-xs text-gray-700 font-light group-hover:text-black transition-colors cursor-pointer">
          자세히 보기 →
        </span>
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

  const handleScroll = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-16 md:py-28 px-4 md:px-16 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="mb-12 md:mb-16 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-4 font-light">
            For Outsourcing
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight mb-4">
            맞춤 컨설팅을 진행합니다
          </h2>
          <p className="text-gray-500 text-sm md:text-base font-light max-w-xl mx-auto">
            코칭이 맞지 않거나, 더 큰 시스템이 필요한 경우를 위한<br className="hidden sm:block" />
            전문가가 처음부터 끝까지 진단,설계하는 컨설팅 프로젝트입니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => handleScroll('#contact')}
            className="inline-flex items-center gap-3 border border-black text-black px-8 py-4 text-xs tracking-widest uppercase font-semibold hover:bg-black hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap group rounded-full"
          >
            <span>컨설팅 진단 받기</span>
            <i className="ri-arrow-right-line text-base group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
