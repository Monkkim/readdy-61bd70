import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname === '/') {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white border-b border-gray-100' : 'bg-transparent'
      }`}
    >
      <div className="px-8 md:px-16 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 cursor-pointer group">
          {/* 로고 아이콘 */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            {/* 외곽 원 */}
            <div className={`absolute inset-0 rounded-full border transition-colors duration-500 ${isScrolled ? 'border-black/30' : 'border-white/30'}`}></div>
            {/* 내부 D 이니셜 + 파형 */}
            <div className={`relative z-10 flex items-center justify-center w-full h-full transition-colors duration-500`}>
              <span className={`text-sm font-bold tracking-tight transition-colors duration-500 ${isScrolled ? 'text-black' : 'text-white'}`}>D</span>
              {/* 파형 점 3개 */}
              <div className="absolute bottom-1 right-1 flex gap-[2px] items-end">
                <span className={`block w-[2px] h-[4px] rounded-full transition-colors duration-500 ${isScrolled ? 'bg-black/50' : 'bg-white/50'}`}></span>
                <span className={`block w-[2px] h-[6px] rounded-full transition-colors duration-500 ${isScrolled ? 'bg-black/70' : 'bg-white/70'}`}></span>
                <span className={`block w-[2px] h-[3px] rounded-full transition-colors duration-500 ${isScrolled ? 'bg-black/40' : 'bg-white/40'}`}></span>
              </div>
            </div>
          </div>
          {/* 텍스트 */}
          <div className="flex flex-col leading-none">
            <span className={`text-sm font-bold tracking-[0.15em] uppercase transition-colors duration-500 ${isScrolled ? 'text-black' : 'text-white'}`}>
              Davenport
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {[
            { label: 'Services', hash: '#services' },
            { label: 'About', hash: '#about' },
            { label: 'Work', hash: '#testimonials' },
            { label: 'Insights', hash: '#faq' },
            { label: 'FAQ', hash: '#faq' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.hash}
              onClick={(e) => handleAnchorClick(e, item.hash)}
              className={`text-xs tracking-widest uppercase font-medium transition-colors duration-300 whitespace-nowrap cursor-pointer ${
                isScrolled ? 'text-gray-700 hover:text-black' : 'text-white/80 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleAnchorClick(e, '#contact')}
            className="text-xs tracking-widest uppercase font-medium px-6 py-2.5 border border-white bg-white text-black hover:bg-gray-100 transition-all duration-300 whitespace-nowrap cursor-pointer rounded-full"
          >
            30분 진단 예약
          </a>
        </div>

        <button
          className={`md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px transition-all duration-300 ${isScrolled ? 'bg-black' : 'bg-white'} ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-px transition-all duration-300 ${isScrolled ? 'bg-black' : 'bg-white'} ${mobileOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-px transition-all duration-300 ${isScrolled ? 'bg-black' : 'bg-white'} ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-8 py-6 flex flex-col gap-6">
          {[
            { label: 'Services', hash: '#services' },
            { label: 'About', hash: '#about' },
            { label: 'Work', hash: '#testimonials' },
            { label: 'Insights', hash: '#faq' },
            { label: 'FAQ', hash: '#faq' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.hash}
              onClick={(e) => handleAnchorClick(e, item.hash)}
              className="text-xs tracking-widest uppercase font-medium text-gray-700 hover:text-black transition-colors whitespace-nowrap cursor-pointer"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleAnchorClick(e, '#contact')}
            className="text-xs tracking-widest uppercase font-medium px-6 py-2.5 border border-black text-black hover:bg-black hover:text-white transition-all text-center cursor-pointer whitespace-nowrap"
          >
            30분 진단 예약
          </a>
        </div>
      )}
    </nav>
  );
}
