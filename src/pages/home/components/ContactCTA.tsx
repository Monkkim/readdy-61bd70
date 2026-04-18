import { useState, useRef, useEffect } from 'react';

export default function ContactCTA() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (charCount > 500) return;
    setStatus('sending');
    try {
      const body = new URLSearchParams();
      body.append('name', formData.name);
      body.append('email', formData.email);
      body.append('message', formData.message);
      const res = await fetch('https://readdy.ai/api/form/d7gp1uaispognpoj33o0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
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
            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
              함께<br />시작해요
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-12 font-light max-w-sm">
              AI 자동화 도입을 고민하고 있다면, 먼저 이야기를 나눠보세요. 빠른 답변보다 올바른 방향을 함께 찾겠습니다.
            </p>
            <div className="space-y-4">
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
          </div>

          <div ref={rightRef}>
            {status === 'success' ? (
              <div className="border border-white/10 p-12 text-center">
                <i className="ri-check-line text-4xl text-white mb-4 block"></i>
                <p className="text-white font-medium mb-2">메시지가 전송되었습니다</p>
                <p className="text-white/40 text-sm font-light">빠른 시일 내에 연락드리겠습니다.</p>
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
                  <label className="block text-xs tracking-widest uppercase text-white/30 mb-3 font-light">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="어떤 프로젝트를 생각하고 계신가요?"
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
                  <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
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
