import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="mb-4">
              <span className="text-xl font-bold tracking-widest uppercase text-black">투쏠</span>
              <span className="text-xs tracking-[0.3em] uppercase font-light text-gray-400 ml-3">AI Director</span>
            </div>
            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xs">
              느린 AI를 추구합니다.<br />
              보이스 에이전트 기반 AI 자동화 설계.
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase text-gray-400 mb-6 font-light">Navigation</h4>
            <ul className="space-y-3">
              {[
                { label: 'Services', to: '/services' },
                { label: 'About', to: '/about' },
                { label: 'Work', to: '/testimonials' },
                { label: 'Insights', to: '/insights' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-gray-500 hover:text-black transition-colors font-light whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase text-gray-400 mb-6 font-light">Contact</h4>
            <a
              href="mailto:michael@davenport.ai.kr"
              className="text-sm text-gray-500 hover:text-black transition-colors font-light block mb-3"
            >
              michael@davenport.ai.kr
            </a>
            <p className="text-xs text-gray-300 font-light">
              AI 자동화 프로젝트 문의 환영합니다
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-300 font-light">
            © 2026 투쏠. All rights reserved.
          </p>
          <a
            href="https://readdy.ai/?ref=logo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-300 hover:text-gray-500 transition-colors font-light whitespace-nowrap"
          >
            Powered by Readdy
          </a>
        </div>
      </div>
    </footer>
  );
}
