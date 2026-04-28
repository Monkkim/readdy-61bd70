export default function Footer() {
  const socialLinks = [
    { icon: 'ri-youtube-line', href: 'https://www.youtube.com/@ai_tusol', label: 'YouTube' },
    { icon: 'ri-instagram-line', href: 'https://www.instagram.com/ai_tusol', label: 'Instagram' },
    { icon: 'ri-threads-line', href: 'https://www.threads.net/@ai_tusol', label: 'Threads' },
  ];

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-7 h-7 flex items-center justify-center border border-white/20 rounded-full">
              <span className="text-xs font-bold text-white">D</span>
            </div>
            <span className="text-sm font-bold tracking-[0.15em] uppercase text-white">Davenport</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full text-white/40 hover:text-white hover:border-white/30 transition-all cursor-pointer"
                aria-label={s.label}
              >
                <i className={`${s.icon} text-sm`}></i>
              </a>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 space-y-3">
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-white/20 font-light">
            <span>상호명: Davenport</span>
            <span>대표자: 김종솔</span>
            <span>사업자등록번호: 426-39-01313</span>
            <span>주소: 경기도 화성시 동탄 기흥로559, 115호 - 12실(영천동)</span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-white/20 font-light">
              © 2026 Davenport. All rights reserved.
            </p>
            <a
              href="https://readdy.ai/?ref=logo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/20 hover:text-white/40 transition-colors font-light whitespace-nowrap"
            >
              Powered by Readdy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
