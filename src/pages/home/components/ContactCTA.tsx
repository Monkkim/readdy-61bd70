import { useState, useRef, useEffect } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const typeOptions = [
  { value: 'coaching', label: '4주 코칭', desc: '워크플로우 1개를 같이 만들고 이식받고 싶음' },
  { value: 'outsourcing', label: '맞춤 컨설팅', desc: '여러 시스템 / 복잡한 통합 / 전문가가 만들어주길 원함' },
  { value: 'unknown', label: '아직 모르겠음', desc: '진단으로 어떤 게 맞는지 정하고 싶음' },
];

function AnimatedItem({
  children,
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const initialTransform =
      direction === 'left'
        ? 'translateX(-30px)'
        : direction === 'right'
        ? 'translateX(30px)'
        : 'translateY(30px)';

    el.style.opacity = '0';
    el.style.transform = initialTransform;
    el.style.transition = 'none';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
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
  }, [delay, direction]);

  return <div ref={ref}>{children}</div>;
}

export default function ContactCTA() {
  const [formData, setFormData] = useState({ name: '', contact: '', email: '', type: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [charCount, setCharCount] = useState(0);

  const leftRef = useScrollReveal<HTMLDivElement>({ direction: 'left', delay: 0 });
  const rightRef = useScrollReveal<HTMLDivElement>({ direction: 'right', delay: 150 });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get('type');
    if (typeParam === 'coaching' || typeParam === 'outsourcing') {
      setFormData((prev) => ({ ...prev, type: typeParam }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'message') {
      if (value.length > 500) return;
      setCharCount(value.length);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (charCount > 500) return;
    setStatus('sending');

    try {
      const params = new URLSearchParams();
      params.append('name', formData.name);
      params.append('contact', formData.contact);
      params.append('email', formData.email);
      params.append('type', typeOptions.find((s) => s.value === formData.type)?.label ?? formData.type);
      params.append('message', formData.message);

      const res = await fetch('https://readdy.ai/api/form/d7q2db6l0bai2p3ha820', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', contact: '', email: '', type: '', message: '' });
        setCharCount(0);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const benefitItems = [
    { icon: 'ri-search-eye-line', text: '코칭 vs 컨설팅 적합성 진단' },
    { icon: 'ri-file-list-3-line', text: '자동화 가능 영역 1차 도출' },
    { icon: 'ri-shield-check-line', text: '비용 안내 + Q&A' },
  ];

  return (
    <section id="contact" className="py-16 md:py-28 px-4 md:px-16 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* Left */}
          <div ref={leftRef} className="text-center md:text-left">
            <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-6 font-light">Contact</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-6">
              30분 무료 진단으로<br />
              <span className="text-amber-400">함께 확인해보세요!</span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-10 font-light max-w-sm mx-auto md:mx-0">
              코칭과 컨설팅 중 어떤 방식이 맞는지,<br />
              어떤 솔루션이 필요한지 솔직하게 진단해드립니다
            </p>

            <ul className="space-y-4 mb-10">
              {benefitItems.map((item, i) => (
                <AnimatedItem key={item.text} delay={i * 100}>
                  <li className="flex items-center justify-center md:justify-start gap-4 text-white/70 text-sm font-light">
                    <div className="w-9 h-9 flex items-center justify-center border border-white/10 shrink-0 rounded-full">
                      <i className={`${item.icon} text-base text-white/50`}></i>
                    </div>
                    <span>{item.text}</span>
                  </li>
                </AnimatedItem>
              ))}
            </ul>

            <AnimatedItem delay={300}>
              <div className="pt-8 border-t border-white/10">
                <a
                  href="mailto:michael@davenport.ai.kr"
                  className="flex items-center justify-center md:justify-start gap-4 text-white/50 hover:text-white transition-colors group cursor-pointer"
                >
                  <div className="w-9 h-9 flex items-center justify-center border border-white/10 group-hover:border-white/40 transition-colors rounded-full">
                    <i className="ri-mail-line text-base"></i>
                  </div>
                  <span className="text-sm font-light">michael@davenport.ai.kr</span>
                </a>
              </div>
            </AnimatedItem>
          </div>

          {/* Right - Form */}
          <div ref={rightRef}>
            {status === 'success' ? (
              <AnimatedItem>
                <div className="border border-white/10 p-10 md:p-12 text-center rounded-lg">
                  <i className="ri-check-line text-4xl text-amber-400 mb-4 block"></i>
                  <p className="text-white font-semibold mb-2">감사합니다</p>
                  <p className="text-white/70 text-sm font-light mb-1">빠른 시일내에 연락드리겠습니다</p>
                  <p className="text-white/50 text-sm font-light mb-8">원활한 소통을 위해 아래 카카오톡 방에 들어와 성함을 남겨주세요!</p>
                  <a
                    href="https://open.kakao.com/o/sdIuAY6h"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-amber-400 text-black px-8 py-3 text-sm font-semibold hover:bg-amber-500 transition-colors cursor-pointer rounded-full whitespace-nowrap"
                  >
                    카카오톡 방 들어가기
                  </a>
                  <button
                    onClick={() => setStatus('idle')}
                    className="block mt-8 mx-auto text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors cursor-pointer"
                  >
                    다시 보내기
                  </button>
                </div>
              </AnimatedItem>
            ) : (
              <form
                data-readdy-form
                id="contact-form-v3"
                action="https://readdy.ai/api/form/d7q2db6l0bai2p3ha820"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <AnimatedItem delay={0}>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-white mb-2 font-medium">이름</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="홍길동"
                        className="w-full bg-transparent border-b border-white/50 py-3 text-white text-sm placeholder-white/40 focus:outline-none focus:border-white transition-colors font-light"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-white mb-2 font-medium">연락처</label>
                      <input
                        type="tel"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                        placeholder="010-0000-0000"
                        className="w-full bg-transparent border-b border-white/50 py-3 text-white text-sm placeholder-white/40 focus:outline-none focus:border-white transition-colors font-light"
                      />
                    </div>
                  </div>
                </AnimatedItem>

                <AnimatedItem delay={80}>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-white mb-2 font-medium">이메일</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="example@email.com"
                      className="w-full bg-transparent border-b border-white/50 py-3 text-white text-sm placeholder-white/40 focus:outline-none focus:border-white transition-colors font-light"
                    />
                  </div>
                </AnimatedItem>

                {/* Type Selection - 버튼 카드 방식 */}
                <AnimatedItem delay={160}>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-white mb-3 font-medium">
                      원하는 진행 방식 <span className="text-amber-400">*</span>
                    </label>
                    <div className="flex flex-col gap-2">
                      {typeOptions.map((opt) => {
                        const isSelected = formData.type === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, type: opt.value }))}
                            className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 cursor-pointer flex items-center gap-3 ${
                              isSelected
                                ? 'border-amber-400 bg-amber-400/10'
                                : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                            }`}
                          >
                            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                              isSelected ? 'border-amber-400' : 'border-white/30'
                            }`}>
                              {isSelected && <span className="w-2 h-2 rounded-full bg-amber-400 block"></span>}
                            </span>
                            <span className="flex flex-col">
                              <span className={`text-sm font-medium ${isSelected ? 'text-amber-400' : 'text-white'}`}>{opt.label}</span>
                              <span className="text-xs text-white/50 font-light mt-0.5">{opt.desc}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </AnimatedItem>

                <AnimatedItem delay={240}>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-white mb-2 font-medium">
                      프로젝트에 대해 간단히 설명해주세요!
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      maxLength={500}
                      placeholder="예) 마케팅 대행사 운영 중. 리드 들어오면 자동 자료 발송 + 상담까지 이어지는 워크플로우를 만들고 싶습니다"
                      className="w-full bg-transparent border-b border-white/50 py-3 text-white text-sm placeholder-white/40 focus:outline-none focus:border-white transition-colors resize-none font-light"
                    />
                    <div className={`text-right text-xs mt-1 font-light ${charCount > 500 ? 'text-red-400' : 'text-white/50'}`}>
                      {charCount}/500
                    </div>
                  </div>
                </AnimatedItem>

                <AnimatedItem delay={320}>
                  {status === 'error' && (
                    <p className="text-red-400 text-xs font-light">전송에 실패했습니다. 다시 시도해주세요.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending' || charCount > 500}
                    className="w-full bg-white text-black py-4 text-xs tracking-widest uppercase font-semibold hover:bg-amber-400 transition-all duration-300 cursor-pointer disabled:opacity-50 whitespace-nowrap group flex items-center justify-center gap-3 rounded-full"
                  >
                    <span>{status === 'sending' ? '전송 중...' : '30분 무료 진단 신청하기'}</span>
                    {status !== 'sending' && <i className="ri-arrow-right-line text-base group-hover:translate-x-1 transition-transform"></i>}
                  </button>
                </AnimatedItem>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
