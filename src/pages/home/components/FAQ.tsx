import { useState, useRef, useEffect } from 'react';

const faqs = [
  {
    q: '실제 비용은 어느 정도이며 ROI는 얼마나 빨리 확인할 수 있나요?',
    a: '프로젝트 규모와 복잡도에 따라 다르지만, 대부분의 클라이언트는 도입 후 1~3개월 내에 리드 전환율 상승과 응대 비용 절감 효과를 체감합니다 초기 상담을 통해 현재 업무 흐름을 진단하고, 예상 ROI를 구체적인 수치로 제시해드립니다'
  },
  {
    q: '구축에는 얼마나 시간이 걸리며 기존 운영에 방해가 되지는 않나요?',
    a: '기본 시스템은 2~4주 내 구축 가능합니다 기존 운영 중단 없이 병렬로 진행하며, 단계적으로 전환하기 때문에 현업에 미치는 영향을 최소화합니다 전환 과정 전반을 함께 관리해드립니다'
  },
  {
    q: '이전에 AI나 자동화를 시도했다가 잘 안 된 경험이 있습니다. 이번에도 단순한 유행은 아닌가요?',
    a: '많은 분들이 같은 경험을 하셨습니다 실패의 대부분은 "빠르게 도입"에 집중하고 비즈니스 맥락을 무시했기 때문입니다 저는 느린 AI 철학으로, 먼저 충분히 이해하고 설계합니다 기술이 아닌 문제 해결에 집중합니다'
  },
  {
    q: '이 시스템으로 직원이 불필요해지지는 않나요? 사람에 대한 영향은 어떻게 관리하나요?',
    a: 'AI는 사람을 대체하는 것이 아니라, 반복적이고 소모적인 업무를 대신합니다 직원들은 더 창의적이고 가치 있는 일에 집중할 수 있게 됩니다 실제로 도입 후 팀 만족도가 올라간 사례가 더 많습니다'
  },
  {
    q: '어떤 종류의 비즈니스에 적합한가요?',
    a: '리드 응대, 고객 상담, 예약, 반복 문의가 발생하는 모든 비즈니스에 적합합니다 특히 B2B 영업, 부동산, 교육, 의료, 법률, 금융 등 응답 속도가 전환율에 직결되는 업종에서 효과가 큽니다'
  },
  {
    q: '구축된 AI 시스템의 소유권은 누구에게 있나요?',
    a: '구축된 모든 시스템의 소유권은 클라이언트에게 있습니다 코드, 워크플로우, 데이터 모두 인계해드리며, 이후 자체 운영이 가능하도록 가이드도 제공합니다 종속 없는 자립형 시스템을 지향합니다'
  },
  {
    q: 'AI 기술 변화가 빠른데 지금 도입하는 것이 위험하지는 않나요?',
    a: '오히려 지금이 가장 좋은 시점입니다 기술이 빠르게 발전할수록, 먼저 도입한 기업이 데이터와 노하우를 축적해 경쟁 우위를 가져갑니다 변화에 유연하게 대응할 수 있는 구조로 설계하기 때문에 기술 변화에도 안정적으로 운영됩니다'
  },
  {
    q: '우리 비즈니스에 AI가 적합한지 어떻게 알 수 있나요?',
    a: '30분 무료 상담을 통해 현재 업무 흐름을 진단해드립니다 적합하지 않다면 솔직하게 말씀드립니다 억지로 도입을 권유하지 않습니다 먼저 이야기를 나눠보세요'
  }
];

function FAQItem({ faq, index, isOpen, onToggle }: {
  faq: typeof faqs[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.transition = `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 60}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 60}ms`;
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

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (isOpen) {
      el.style.maxHeight = el.scrollHeight + 'px';
      el.style.opacity = '1';
    } else {
      el.style.maxHeight = '0px';
      el.style.opacity = '0';
    }
  }, [isOpen]);

  return (
    <div ref={itemRef} className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 md:py-7 text-left cursor-pointer group focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className={`text-sm md:text-base font-medium leading-snug pr-6 transition-colors duration-300 ${isOpen ? 'text-black' : 'text-gray-700 group-hover:text-black'}`}>
          {faq.q}
        </span>
        <span className={`shrink-0 w-7 h-7 flex items-center justify-center border transition-all duration-300 ${isOpen ? 'border-black bg-black text-white rotate-45' : 'border-gray-200 text-gray-400 group-hover:border-gray-400'}`}>
          <i className="ri-add-line text-sm"></i>
        </span>
      </button>
      <div
        ref={bodyRef}
        style={{ maxHeight: '0px', opacity: 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease' }}
      >
        <p className="text-sm text-gray-500 leading-relaxed font-light pb-6 md:pb-7 pr-12">
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-32 px-8 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1fr_2fr] gap-16 md:gap-24 items-start">

          {/* Left: Title */}
          <div ref={titleRef} className="md:sticky md:top-32">
            <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-4 font-light">
              FAQ
            </p>
            <h2 className="text-5xl md:text-6xl font-bold text-black leading-tight mb-6">
              자주 묻는<br />질문
            </h2>
            <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
              AI 자동화 도입에 대해 가장 많이 받는 질문들을 모았습니다
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 border border-black text-black px-6 py-3 text-xs tracking-widest uppercase font-semibold hover:bg-black hover:text-white transition-all cursor-pointer whitespace-nowrap group"
            >
              <span>직접 문의하기</span>
              <i className="ri-arrow-right-line text-sm group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>

          {/* Right: Accordion */}
          <div className="divide-y-0">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
