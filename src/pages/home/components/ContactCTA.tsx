import { useState, useRef, useEffect } from 'react';

const painOptions = [
  { id: 'slow', label: '리드 응답 속도가 느리다' },
  { id: 'offhours', label: '야간·주말 문의를 놓친다' },
  { id: 'quality', label: '리드 품질이 들쭉날쭉해서 영업팀이 힘들다' },
  { id: 'integration', label: '기존 CRM/채널톡과 통합이 안 된다' },
  { id: 'other', label: '기타 (아래 메시지에 직접 작성)' },
];

const promises = [
  '현재 리드 응답 구조 진단',
  '업무 맞춤 AI 자동화 제안서 발송',
  '맞지 않으면 솔직히 말씀드립니다',
];

const trustLines = [
  '개인정보는 상담 외 사용 안 함 · 종료 후 즉시 파기',
  '맞지 않으면 솔직히 말씀드리고 대안을 추천',
  '상담료 없음 · 영업 전화 없음 · DB 판매 없음',
];

export default function ContactCTA() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [pains, setPains] = useState<string[]>([]);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'message') {
      if (value.length > 500) return;
      setCharCount(value.length);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePain = (id: string) => {
    setPains((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (charCount > 500) return;
    setStatus('sending');
    const painLabels = pains
      .map((id) => painOptions.find((p) => p.id === id)?.label)
      .filter(Boolean)
      .join(' / ');
    const enrichedMessage = painLabels
      ? `[현재 가장 큰 병목] ${painLabels}\n\n${formData.message}`
      : formData.message;
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
        setFormData({ name: '', email: '', message: '' });
        setPains([]);
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
          <div ref={leftRef}>
            <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-6 font-light">
              Contact
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
              30분 진단 예약
            </h2>
            <ul className="space-y-3 mb-8">
              {promises.map((p) => (
                <li key={p} className="flex items-start gap-3 text-white/70 text-sm font-light">
                  <i className="ri-checkbox-circle-line text-white/40 mt-0.5"></i>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="text-white/50 text-sm leading-relaxed mb-10 font-light max-w-sm">
              빠른 답변보다 올바른 방향을 함께 찾겠습니다.
              <br />
              <span className="text-white/30">(영업 전화 · DB 판매 · 스팸 메일 절대 없음)</span>
            </p>

            <div className="mb-10 p-5 border border-white/10 bg-white/[0.02]">
              <p className="text-xs tracking-widest uppercase text-white/40 mb-3 font-light">Calendly로도 바로 예약 가능</p>
              <p className="text-white/30 text-xs font-light leading-relaxed">
                {/* TODO: Calendly 계정 확정 후 iframe 임베드로 교체 */}
                곧 Calendly 위젯이 이 자리에 노출될 예정입니다.
                지금은 아래 폼 제출 또는 <span className="text-white/60">우측 하단 채널톡</span>으로 바로 문의하실 수 있습니다.
              </p>
            </div>

            <div className="space-y-4 mb-10">
              <a
                href="mailto:michael@davenport.ai.kr"
                className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 flex items-center justify-center border border-white/10 group-hover:border-white/40 transition-colors">
                  <i className="ri-mail-line text-base"></i>
                </div>
                <span className="text-sm font-light">michael@davenport.ai.kr</span>
              </a>
              <a
                href="https://www.youtube.com/@ai_tusol"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 flex items-center justify-center border border-white/10 group-hover:border-white/40 transition-colors">
                  <i className="ri-youtube-line text-base"></i>
                </div>
                <span className="text-sm font-light">유튜브 @ai_tusol</span>
              </a>
              <a
                href="https://www.threads.com/@ai_tusol"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 flex items-center justify-center border border-white/10 group-hover:border-white/40 transition-colors">
                  <i className="ri-at-line text-base"></i>
                </div>
                <span className="text-sm font-light">쓰레드 @ai_tusol</span>
              </a>
            </div>

            <ul className="space-y-2.5 pt-8 border-t border-white/10">
              {trustLines.map((line) => (
                <li key={line} className="flex items-start gap-3 text-white/50 text-xs font-light leading-relaxed">
                  <i className="ri-shield-check-line text-white/40 mt-0.5 text-sm"></i>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div ref={rightRef}>
            {status === 'success' ? (
              <div className="border border-white/10 p-12 text-center">
                <i className="ri-check-line text-4xl text-white mb-4 block"></i>
                <p className="text-white font-medium mb-2">진단 요청이 전송되었습니다</p>
                <p className="text-white/40 text-sm font-light">24시간 내에 답변드리겠습니다.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors cursor-pointer"
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
                <div>
                  <label className="block text-xs tracking-widest uppercase text-white/30 mb-3 font-light">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="이름을 입력하세요"
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white transition-colors font-light"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-white/30 mb-3 font-light">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="이메일을 입력하세요"
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white transition-colors font-light"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase text-white/30 mb-4 font-light">
                    현재 가장 큰 병목은? (복수 선택)
                  </label>
                  <div className="space-y-2.5">
                    {painOptions.map((opt) => {
                      const active = pains.includes(opt.id);
                      return (
                        <label
                          key={opt.id}
                          className="flex items-start gap-3 cursor-pointer group"
                        >
                          <span
                            className={`mt-0.5 w-4 h-4 shrink-0 border flex items-center justify-center transition-colors ${
                              active ? 'bg-white border-white' : 'border-white/30 group-hover:border-white/60'
                            }`}
                          >
                            {active && <i className="ri-check-line text-black text-xs"></i>}
                          </span>
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={active}
                            onChange={() => togglePain(opt.id)}
                          />
                          <span className={`text-sm font-light transition-colors ${active ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}>
                            {opt.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase text-white/30 mb-3 font-light">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder={"어떤 비즈니스 문제를 풀고 계신가요?\n(월 문의 수, 현재 응답시간, 기존에 시도한 방법 등이 있으면 함께 적어주세요)"}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white transition-colors resize-none font-light"
                  />
                  <div className={`text-right text-xs mt-1 font-light ${charCount > 500 ? 'text-red-400' : 'text-white/20'}`}>
                    {charCount}/500
                  </div>
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-xs font-light">전송에 실패했습니다. 다시 시도해주세요.</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending' || charCount > 500}
                  className="w-full bg-white text-black py-4 text-xs tracking-widest uppercase font-semibold hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap group flex items-center justify-center gap-3"
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
