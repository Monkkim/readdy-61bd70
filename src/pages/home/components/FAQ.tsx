import { useState, useRef, useEffect } from 'react';

const faqCategories = [
  {
    label: '코칭',
    items: [
      {
        q: 'AI 에이전트를 한 번도 다뤄본 적 없는데 따라갈 수 있나요?',
        a: '네, 가능합니다. 그래서 Week 1이 기초 강의로 시작합니다. 1:1 미팅이라 속도를 맞춰 진행하고, 코드를 모르는 분들도 따라올 수 있도록 설계되어 있습니다. 클라이언트 대부분이 자동화 도구를 처음 다루는 비개발자 대표였습니다.',
      },
      {
        q: '4주 안에 사업 전반 자동화가 다 가능한가요?',
        a: '코칭은 워크플로우 1개 또는 에이전트 1개를 같이 만들고 이식하는 데 집중합니다. 그 1개를 만드는 과정에서 자립 역량이 생기면, 다음 자동화는 스스로 시작 가능합니다. 사업 전반 자동화는 컨설팅이 더 적합합니다.',
      },
      {
        q: 'Week 1 강의는 어떤 식으로 진행되나요?',
        a: '1:1 화상 미팅으로 진행됩니다. Claude Code의 기본 개념, 사용법, 어떻게 비즈니스에 활용할지를 당신 사업의 맥락에 맞춰 설명합니다. 동시에 진단을 통해 4주 동안 만들 워크플로우 1개를 함께 정합니다.',
      },
      {
        q: 'Week 2~3 페어 빌드는 어떻게 진행되나요?',
        a: '매주 1회 1:1 미팅에서 함께 빌드합니다. 비동기로도 막힌 부분에 대해 피드백 가능합니다. 외주처럼 일방적으로 받는 게 아니라, 당신이 직접 만들면서 옆에서 안내받는 형태입니다. 평균 시간 투입은 주 4시간 (1:1 미팅 1시간 + 실습 3시간) 정도입니다.',
      },
      {
        q: '4주 후 시스템에 문제가 생기면 누가 책임지나요?',
        a: '4주가 끝나면 운영 권한이 완전히 이전됩니다. 기본적으로 2주간 무료 유지 보수를 받으실 수 있습니다. 큰 변경이나 추가 자동화가 필요하면 별도 프로젝트로 진행 가능합니다.',
      },
      {
        q: '비용은 얼마인가요?',
        a: '비용의 경우 30분 무료 진단을 통해 상황과 범위를 확인한 후 정확한 안내드립니다.',
      },
    ],
  },
  {
    label: '컨설팅',
    items: [
      {
        q: '코칭과 컨설팅 차이가 뭔가요?',
        a: '코칭은 같이 만들면서 운영 역량까지 이식받는 모델이고, 컨설팅은 더 넓은 범위의 자동화를 진단·설계·구축까지 진행하는 모델입니다. 직접 만들고 운영하고 싶다면 코칭이, 시간 여유가 없거나 사업 전반의 복잡한 자동화가 필요하다면 컨설팅이 적합합니다.',
      },
      {
        q: '코칭이나 컨설팅을 진행하지 않는 자동화도 있나요?',
        a: '네, 있습니다. 유튜브 숏츠 자동화, 네이버 블로그 자동 발행, 주식 자동매매는 진행하지 않습니다.',
      },
    ],
  },
];

function FAQItem({ q, a, index, isOpen, onToggle }: {
  q: string; a: string; index: number; isOpen: boolean; onToggle: () => void;
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
              el.style.transition = `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 50}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 50}ms`;
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
        className="w-full flex items-center justify-between py-5 md:py-6 text-left cursor-pointer group focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className={`text-sm md:text-base font-medium leading-snug pr-6 transition-colors duration-300 ${isOpen ? 'text-black' : 'text-gray-700 group-hover:text-black'}`}>
          {q}
        </span>
        <span className={`shrink-0 w-7 h-7 flex items-center justify-center border transition-all duration-300 rounded-full ${isOpen ? 'border-black bg-black text-white rotate-45' : 'border-gray-200 text-gray-400 group-hover:border-gray-400'}`}>
          <i className="ri-add-line text-sm"></i>
        </span>
      </button>
      <div
        ref={bodyRef}
        style={{ maxHeight: '0px', opacity: 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease' }}
      >
        <p className="text-sm text-gray-500 leading-relaxed font-light pb-5 md:pb-6 pr-12">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openKey, setOpenKey] = useState<string | null>(null);
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

  let globalIndex = 0;

  return (
    <section id="faq" className="py-16 md:py-28 px-4 md:px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">

          {/* Left */}
          <div ref={titleRef} className="md:sticky md:top-32 text-center md:text-left">
            <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-4 font-light">FAQ</p>
            <h2 className="text-3xl md:text-5xl font-bold text-black leading-tight mb-6">
              자주 묻는 질문
            </h2>
            <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
              코칭과 컨설팅, 그리고 Claude Code 입문에 대해<br />
              가장 많이 받는 질문들을 모았습니다
            </p>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-3 border border-black text-black px-6 py-3 text-xs tracking-widest uppercase font-semibold hover:bg-black hover:text-white transition-all cursor-pointer whitespace-nowrap group mx-auto md:mx-0 rounded-full"
            >
              <span>직접 문의하기</span>
              <i className="ri-arrow-right-line text-sm group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>

          {/* Right: Accordion */}
          <div>
            {faqCategories.map((cat) => (
              <div key={cat.label}>
                {cat.items.map((item) => {
                  const key = `${cat.label}-${globalIndex}`;
                  const idx = globalIndex++;
                  return (
                    <FAQItem
                      key={key}
                      q={item.q}
                      a={item.a}
                      index={idx}
                      isOpen={openKey === key}
                      onToggle={() => setOpenKey((prev) => (prev === key ? null : key))}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
