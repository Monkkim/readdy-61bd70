import { useRef, useEffect, useState } from 'react';

const insights = [
  {
    image: 'https://readdy.ai/api/search-image?query=Abstract%20dark%20minimalist%20visualization%20of%20sound%20waves%20and%20voice%20patterns%2C%20monochrome%20black%20and%20white%2C%20clean%20geometric%20lines%20representing%20audio%20frequency%2C%20futuristic%20AI%20voice%20technology%20concept%2C%20high%20contrast%2C%20elegant%20and%20modern%20design%2C%20no%20text%2C%20pure%20visual%20art&width=560&height=560&seq=twosol-insight-001&orientation=squarish',
    category: 'Voice AI',
    title: '보이스 에이전트가 바꾸는 고객 경험의 미래',
    readTime: '6 min'
  },
  {
    image: 'https://readdy.ai/api/search-image?query=Minimalist%20black%20and%20white%20abstract%20workflow%20diagram%2C%20clean%20geometric%20shapes%20connected%20by%20thin%20lines%2C%20dark%20background%20with%20white%20elements%2C%20modern%20data%20flow%20visualization%2C%20no%20people%2C%20pure%20abstract%20concept%20art%2C%20elegant%20and%20sophisticated%20design&width=560&height=560&seq=twosol-insight-002&orientation=squarish',
    category: 'Automation',
    title: '느린 AI가 빠른 AI보다 나은 이유',
    readTime: '8 min'
  },
  {
    image: 'https://readdy.ai/api/search-image?query=Dark%20minimalist%20abstract%20technology%20background%2C%20subtle%20circuit%20patterns%20and%20neural%20network%20nodes%2C%20deep%20black%20with%20faint%20silver%20lines%2C%20futuristic%20AI%20concept%2C%20monochrome%20palette%2C%20clean%20and%20sophisticated%2C%20no%20text%2C%20pure%20abstract%20visualization&width=560&height=560&seq=twosol-insight-003&orientation=squarish',
    category: 'Strategy',
    title: 'AI 도입 전 반드시 물어야 할 5가지 질문',
    readTime: '5 min'
  },
  {
    image: 'https://readdy.ai/api/search-image?query=Abstract%20black%20and%20white%20minimalist%20API%20connection%20visualization%2C%20clean%20lines%20and%20nodes%20representing%20system%20integration%2C%20dark%20background%2C%20modern%20tech%20concept%2C%20geometric%20and%20elegant%2C%20no%20people%2C%20pure%20abstract%20design&width=560&height=560&seq=twosol-insight-004&orientation=squarish',
    category: 'Integration',
    title: '기존 시스템에 AI를 자연스럽게 녹이는 법',
    readTime: '7 min'
  },
  {
    image: 'https://readdy.ai/api/search-image?query=Minimalist%20dark%20background%20with%20abstract%20human%20and%20machine%20interaction%20concept%2C%20monochrome%20black%20and%20white%2C%20clean%20geometric%20representation%2C%20modern%20AI%20philosophy%20visualization%2C%20sophisticated%20and%20elegant%2C%20no%20text%2C%20pure%20abstract%20art&width=560&height=560&seq=twosol-insight-005&orientation=squarish',
    category: 'Philosophy',
    title: '자동화는 사람을 대체하지 않는다',
    readTime: '9 min'
  }
];

export default function Insights() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScroll);
      return () => scrollElement.removeEventListener('scroll', checkScroll);
    }
  }, []);

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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + (direction === 'left' ? -320 : 320),
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="insights" className="py-32 px-8 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-16 flex items-end justify-between">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-4 font-light">
              Thoughts
            </p>
            <h2 className="text-5xl md:text-6xl font-bold text-black leading-tight">
              Insights
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-10 h-10 flex items-center justify-center border transition-all cursor-pointer ${
                canScrollLeft
                  ? 'border-black text-black hover:bg-black hover:text-white'
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
              }`}
              aria-label="Scroll left"
            >
              <i className="ri-arrow-left-line text-base"></i>
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-10 h-10 flex items-center justify-center border transition-all cursor-pointer ${
                canScrollRight
                  ? 'border-black text-black hover:bg-black hover:text-white'
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
              }`}
              aria-label="Scroll right"
            >
              <i className="ri-arrow-right-line text-base"></i>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4"
          style={{ scrollbarWidth: 'none' }}
        >
          {insights.map((insight, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[280px] bg-white cursor-pointer group overflow-hidden border border-gray-100 hover:border-gray-300 transition-all duration-300"
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                animation: `fadeInUp 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 80 + 200}ms forwards`,
              }}
            >
              <div className="w-full h-[280px] overflow-hidden bg-black">
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="p-6">
                <p className="text-xs tracking-widest uppercase text-gray-400 mb-3 font-light">
                  {insight.category}
                </p>
                <h3 className="text-base font-bold text-black mb-4 leading-snug line-clamp-2">
                  {insight.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-light">{insight.readTime}</span>
                  <i className="ri-arrow-right-line text-black text-base group-hover:translate-x-1 transition-transform"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
