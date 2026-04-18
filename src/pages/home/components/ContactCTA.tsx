import { useState, useRef, useEffect, useCallback } from 'react';

const solutionOptions = [
  { value: '', label: '원하는 솔루션을 선택해주세요' },
  { value: 'ai-sales', label: 'AI Sales System — 리드 즉시 응대 + 맞춤 제안' },
  { value: 'voice-agent', label: 'Voice Agent — 전화 응대 0초 대기' },
  { value: 'chat-crm', label: 'Chat & CRM — 채팅 응대 + 자동 파이프라인' },
  { value: 'consulting', label: '전체 컨설팅 — 어떤 솔루션이 맞는지 모르겠어요' },
];

function CustomSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between border-b border-white/50 py-3 text-sm font-light focus:outline-none focus:border-white transition-colors cursor-pointer group"
      >
        <span className={selected && selected.value ? 'text-white' : 'text-white/40'}>
          {selected && selected.value ? selected.label : '원하는 솔루션을 선택해주세요'}
        </span>
        <i className={`ri-arrow-down-s-line text-white/50 text-base transition-transform duration-300 ${open ? 'rotate-180' : ''}`}></i>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full mt-1 z-50 border border-white/10 overflow-hidden">
          {options.filter((o) => o.value !== '').map((opt, i) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full text-left px-5 py-4 text-sm font-light transition-all duration-200 cursor-pointer flex items-center gap-3 group
                ${value === opt.value
                  ? 'bg-white text-black'
                  : 'bg-[#111] text-white/70 hover:bg-white/10 hover:text-white'
                }
                ${i !== 0 ? 'border-t border-white/5' : ''}
              `}
            >
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${value === opt.value ? 'bg-black' : 'bg-white/20 group-hover:bg-amber-400'}`}></span>
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ContactCTA() {
  const [formData, setFormData] = useState({ name: '', contact: '', email: '', solution: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [charCount, setCharCount] = useState(0);

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = [
      { el: leftRef.current, dir: 'translateX(-40px)', delay: 0 },
      { el: rightRef.current, dir: 'translateX(40px)', delay: 150 },
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
        { threshold: 0.1 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    const solutionLabel = solutionOptions.find((s) => s.value === formData.solution)?.label ?? formData.solution;
    const enrichedMessage = `[원하는 솔루션] ${solutionLabel}\n[연락처] ${formData.contact}\n\n${formData.message}`;
    try {
      const body = new URLSearchParams();
      body.append('name', formData.name);
      body.append('email', formData.email);
      body.append('message', enrichedMessage);
      const res = await fetch('https://readdy.ai/api/form/d7gp1uaispognpoj33o0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', contact: '', email: '', solution: '', message: '' });
        setCharCount(0);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 px-8 md:px-16 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left */}
          <div ref={leftRef}>
            <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-6 font-light">
              Contact
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
              지금 바로 함께하세요!
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-10 font-light max-w-sm">
              30분 무료 진단으로 현재 리드 구조를 점검하고<br />
              맞춤 AI 자동화 방향을 제안해드립니다
            </p>

            <ul className="space-y-4 mb-10">
              {[
                { icon: 'ri-search-eye-line', text: '적합성 확인을 위한 니즈 분석' },
                { icon: 'ri-file-list-3-line', text: 'PainPoint 전반을 검사하는 프로세스 검사' },
                { icon: 'ri-shield-check-line', text: '개선을 위한 1차 솔루션 도출' },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-4 text-white/70 text-sm font-light">
                  <div className="w-9 h-9 flex items-center justify-center border border-white/10 shrink-0">
                    <i className={`${item.icon} text-base text-white/50`}></i>
                  </div>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-3 pt-8 border-t border-white/10">
              <a
                href="mailto:michael@davenport.ai.kr"
                className="flex items-center gap-4 text-white/50 hover:text-white transition-colors group cursor-pointer"
              >
                <div className="w-9 h-9 flex items-center justify-center border border-white/10 group-hover:border-white/40 transition-colors">
                  <i className="ri-mail-line text-base"></i>
                </div>
                <span className="text-sm font-light">michael@davenport.ai.kr</span>
              </a>


            </div>
          </div>

          {/* Right - Form */}
          <div ref={rightRef}>
            {status === 'success' ? (
              <div className="bg-white p-12 text-center">
                <i className="ri-check-line text-4xl text-black mb-4 block"></i>
                <p className="text-black font-semibold mb-2">진단 요청이 전송되었습니다</p>
                <p className="text-black/50 text-sm font-light">24시간 내에 답변드리겠습니다</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-xs tracking-widest uppercase text-black/40 hover:text-black transition-colors cursor-pointer"
                >
                  다시 보내기
                </button>
              </div>
            ) : (
              <form
                data-readdy-form
                id="contact-form"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-white/70 mb-2 font-medium">
                      이름
                    </label>
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
                    <label className="block text-xs tracking-widest uppercase text-white/70 mb-2 font-medium">
                      연락처
                    </label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      required
                      placeholder="010-0000-0000"
                      className="w-full bg-transparent border-b border-white/50 py-3 text-white text-sm placeholder-white/40 focus:outline-none focus:border-white transition-colors font-light"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase text-white/70 mb-2 font-medium">
                    이메일
                  </label>
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

                <div>
                  <label className="block text-xs tracking-widest uppercase text-white/70 mb-2 font-medium">
                    원하는 솔루션
                  </label>
                  <CustomSelect
                    value={formData.solution}
                    onChange={(val) => setFormData((prev) => ({ ...prev, solution: val }))}
                    options={solutionOptions}
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase text-white/70 mb-2 font-medium">
                    프로젝트에 대해 간단히 설명해주세요!
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder={"어떤 업무를 자동화하고 싶으신가요?\n현재 상황과 원하는 결과를 자유롭게 적어주세요."}
                    className="w-full bg-transparent border-b border-white/50 py-3 text-white text-sm placeholder-white/40 focus:outline-none focus:border-white transition-colors resize-none font-light"
                  />
                  <div className={`text-right text-xs mt-1 font-light ${charCount > 500 ? 'text-red-400' : 'text-white/50'}`}>
                    {charCount}/500
                  </div>
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-xs font-light">전송에 실패했습니다. 다시 시도해주세요.</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending' || charCount > 500}
                  className="w-full bg-white text-black py-4 text-xs tracking-widest uppercase font-semibold hover:bg-amber-400 transition-all duration-300 cursor-pointer disabled:opacity-50 whitespace-nowrap group flex items-center justify-center gap-3"
                >
                  <span>{status === 'sending' ? 'Sending...' : '진단 요청 보내기 · 24시간 내 답변'}</span>
                  {status !== 'sending' && <i className="ri-arrow-right-line text-base group-hover:translate-x-1 transition-transform"></i>}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
