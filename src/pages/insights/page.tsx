import { useRef, useEffect, useState } from 'react';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';

const insights = [
  {
    image: 'https://readdy.ai/api/search-image?query=Modern%20business%20strategy%20planning%20with%20charts%20and%20graphs%20on%20digital%20tablet%2C%20professional%20workspace%20with%20coffee%20and%20notebook%2C%20minimalist%20desk%20setup%2C%20natural%20lighting%2C%20business%20analytics%20concept%2C%20clean%20contemporary%20style%2C%20warm%20tones&width=560&height=560&seq=insight-001&orientation=squarish',
    category: 'Strategy',
    title: '5 Key Strategies for Scaling Your Business in 2025',
    readTime: '8 min read'
  },
  {
    image: 'https://readdy.ai/api/search-image?query=Diverse%20business%20team%20collaboration%20in%20modern%20office%2C%20professionals%20brainstorming%20around%20conference%20table%2C%20sticky%20notes%20and%20whiteboard%2C%20engaged%20discussion%2C%20contemporary%20workspace%2C%20natural%20window%20light%2C%20team%20leadership%20concept&width=560&height=560&seq=insight-002&orientation=squarish',
    category: 'Leadership',
    title: 'Building High-Performance Teams That Execute',
    readTime: '6 min read'
  },
  {
    image: 'https://readdy.ai/api/search-image?query=Executive%20decision%20making%20concept%20with%20businessman%20analyzing%20data%20on%20laptop%2C%20modern%20office%20interior%2C%20professional%20workspace%2C%20focused%20concentration%2C%20business%20intelligence%20dashboard%2C%20contemporary%20style%2C%20soft%20lighting&width=560&height=560&seq=insight-003&orientation=squarish',
    category: 'Growth',
    title: 'The Art of Making Bold Business Decisions',
    readTime: '10 min read'
  },
  {
    image: 'https://readdy.ai/api/search-image?query=Work%20life%20balance%20concept%20with%20professional%20woman%20meditating%20in%20modern%20office%2C%20peaceful%20workspace%2C%20plants%20and%20natural%20elements%2C%20mindfulness%20in%20business%2C%20wellness%20at%20work%2C%20serene%20atmosphere%2C%20warm%20natural%20lighting&width=560&height=560&seq=insight-004&orientation=squarish',
    category: 'Mindset',
    title: 'Developing a Growth Mindset for Business Success',
    readTime: '7 min read'
  },
  {
    image: 'https://readdy.ai/api/search-image?query=Business%20transformation%20concept%20with%20digital%20innovation%2C%20futuristic%20technology%20interface%2C%20modern%20corporate%20environment%2C%20professional%20analyzing%20data%20visualization%2C%20contemporary%20workspace%2C%20blue%20and%20orange%20accent%20lighting&width=560&height=560&seq=insight-005&orientation=squarish',
    category: 'Innovation',
    title: 'Navigating Digital Transformation as a Leader',
    readTime: '9 min read'
  }
];

export default function InsightsPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-8 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-6xl font-bold text-white mb-6">
            Latest <span className="text-orange-500">Insights</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our collection of articles, strategies, and thought leadership to help you grow your business and develop as a leader.
          </p>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-24 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="font-serif text-4xl font-bold text-gray-900">
              Featured Articles
            </h2>
            
            <div className="flex gap-3">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all cursor-pointer ${
                  canScrollLeft 
                    ? 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white' 
                    : 'border-gray-300 text-gray-300 cursor-not-allowed'
                }`}
                aria-label="Scroll left"
              >
                <i className="ri-arrow-left-line text-xl"></i>
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all cursor-pointer ${
                  canScrollRight 
                    ? 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white' 
                    : 'border-gray-300 text-gray-300 cursor-not-allowed'
                }`}
                aria-label="Scroll right"
              >
                <i className="ri-arrow-right-line text-xl"></i>
              </button>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide" 
            style={{ scrollbarWidth: 'none' }}
          >
            {insights.map((insight, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[280px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="w-full h-[280px] overflow-hidden">
                  <img
                    src={insight.image}
                    alt={insight.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                    {insight.category}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 leading-snug line-clamp-2">
                    {insight.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{insight.readTime}</span>
                    <i className="ri-arrow-right-line text-orange-500 text-xl group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-orange-50 mb-8">
            Let's discuss how these insights can be applied to your unique situation.
          </p>
          <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
            Schedule a Consultation
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
