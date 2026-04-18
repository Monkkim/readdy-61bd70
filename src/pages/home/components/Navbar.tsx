import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white border-b border-gray-100' : 'bg-transparent'
      }`}
    >
      <div className="px-8 md:px-16 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <span className={`text-xl font-bold tracking-widest uppercase transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}>
            투쏠
          </span>
          <span className={`text-xs tracking-[0.3em] uppercase font-light transition-colors duration-300 ${isScrolled ? 'text-gray-400' : 'text-white/60'}`}>
            AI Director
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {[
            { label: 'Services', to: '/services' },
            { label: 'About', to: '/about' },
            { label: 'Work', to: '/testimonials' },
            { label: 'Insights', to: '/insights' },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`text-xs tracking-widest uppercase font-medium transition-colors duration-300 whitespace-nowrap ${
                isScrolled ? 'text-gray-700 hover:text-black' : 'text-white/80 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="#faq"
            className={`text-xs tracking-widest uppercase font-medium transition-colors duration-300 whitespace-nowrap cursor-pointer ${
              isScrolled ? 'text-gray-700 hover:text-black' : 'text-white/80 hover:text-white'
            }`}
          >
            FAQ
          </a>
          <a
            href="#contact"
            className={`text-xs tracking-widest uppercase font-medium px-6 py-2.5 border transition-all duration-300 whitespace-nowrap cursor-pointer ${
              isScrolled
                ? 'border-black text-black hover:bg-black hover:text-white'
                : 'border-white text-white hover:bg-white hover:text-black'
            }`}
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
            { label: 'Services', to: '/services' },
            { label: 'About', to: '/about' },
            { label: 'Work', to: '/testimonials' },
            { label: 'Insights', to: '/insights' },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className="text-xs tracking-widest uppercase font-medium text-gray-700 hover:text-black transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="#faq"
            onClick={() => setMobileOpen(false)}
            className="text-xs tracking-widest uppercase font-medium text-gray-700 hover:text-black transition-colors whitespace-nowrap cursor-pointer"
          >
            FAQ
          </a>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="text-xs tracking-widest uppercase font-medium px-6 py-2.5 border border-black text-black hover:bg-black hover:text-white transition-all text-center cursor-pointer whitespace-nowrap"
          >
            30분 진단 예약
          </a>
        </div>
      )}
    </nav>
  );
}
