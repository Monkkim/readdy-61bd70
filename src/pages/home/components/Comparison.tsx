import { useRef, useEffect } from 'react';

type Cell = {
  icon: string;
  label: string;
  tone: 'good' | 'bad' | 'meh' | 'neutral';
};

type Row = {
  criterion: string;
  tusol: Cell;
  chatbot: Cell;
  si: Cell;
  freelancer: Cell;
};

const toneClass: Record<Cell['tone'], string> = {
  good: 'text-emerald-600',
  bad: 'text-red-400',
  meh: 'text-amber-500',
  neutral: 'text-gray-500',
};

const rows: Row[] = [
  {
    criterion: '응답 속도',
    tusol: { icon: 'ri-flashlight-line', label: '1초', tone: 'good' },
    chatbot: { icon: 'ri-flashlight-line', label: '1초', tone: 'good' },
    si: { icon: 'ri-close-line', label: '보통 없음', tone: 'bad' },
    freelancer: { icon: 'ri-time-line', label: '수동', tone: 'meh' },
  },
  {
    criterion: '비즈니스 맥락 이해',
    tusol: { icon: 'ri-check-double-line', label: '1:1 설계', tone: 'good' },
    chatbot: { icon: 'ri-file-copy-line', label: '템플릿', tone: 'bad' },
    si: { icon: 'ri-subtract-line', label: '중간', tone: 'meh' },
    freelancer: { icon: 'ri-shuffle-line', label: '가변', tone: 'meh' },
  },
  {
    criterion: '시스템 소유권',
    tusol: { icon: 'ri-user-follow-line', label: '클라이언트', tone: 'good' },
    chatbot: { icon: 'ri-cloud-line', label: 'SaaS 종속', tone: 'bad' },
    si: { icon: 'ri-building-line', label: 'SI 종속', tone: 'bad' },
    freelancer: { icon: 'ri-shuffle-line', label: '가변', tone: 'meh' },
  },
  {
    criterion: '통합 범위',
    tusol: { icon: 'ri-links-line', label: '멀티 채널 + API', tone: 'good' },
    chatbot: { icon: 'ri-close-line', label: '제한적', tone: 'bad' },
    si: { icon: 'ri-check-line', label: '광범위', tone: 'good' },
    freelancer: { icon: 'ri-close-line', label: '제한적', tone: 'bad' },
  },
  {
    criterion: '도입 후 관계',
    tusol: { icon: 'ri-handshake-line', label: '지속 파트너십', tone: 'good' },
    chatbot: { icon: 'ri-close-line', label: '계약 뒤 단절', tone: 'bad' },
    si: { icon: 'ri-tools-line', label: '유지보수 계약', tone: 'meh' },
    freelancer: { icon: 'ri-close-line', label: '1회성', tone: 'bad' },
  },
  {
    criterion: '도입 기간',
    tusol: { icon: 'ri-time-line', label: '2~4주', tone: 'good' },
    chatbot: { icon: 'ri-time-line', label: '1주 미만', tone: 'good' },
    si: { icon: 'ri-time-line', label: '3~6개월', tone: 'bad' },
    freelancer: { icon: 'ri-shuffle-line', label: '가변', tone: 'meh' },
  },
];

function CellView({ cell }: { cell: Cell }) {
  return (
    <div className={`flex items-center gap-2 ${toneClass[cell.tone]}`}>
      <i className={`${cell.icon} text-base`}></i>
      <span className="text-sm font-light">{cell.label}</span>
    </div>
  );
}

export default function Comparison() {
  const headerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const footnoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = [
      { el: headerRef.current, delay: 0 },
      { el: tableRef.current, delay: 150 },
      { el: footnoteRef.current, delay: 300 },
    ];
    items.forEach(({ el, delay }) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                el.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
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
    });
  }, []);

  return (
    <section id="comparison" className="py-32 px-8 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="max-w-3xl mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-6 font-light">
            Why Tusol
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            왜 '투쏠'인가
            <br />
            <span className="text-gray-400">— 다른 선택지와의 차이</span>
          </h2>
          <p className="text-gray-500 text-base leading-relaxed font-light">
            AI 응대 솔루션은 많습니다
            당신이 비교해야 할 건 <span className="text-gray-900 font-medium">'기능'이 아니라 '파트너십 구조'</span>입니다
          </p>
        </div>

        <div ref={tableRef} className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-5 pr-4 text-xs tracking-widest uppercase text-gray-400 font-light w-48">
                  비교 항목
                </th>
                <th className="text-left py-5 px-4 text-xs tracking-widest uppercase font-semibold text-black bg-gray-50">
                  투쏠
                </th>
                <th className="text-left py-5 px-4 text-xs tracking-widest uppercase text-gray-400 font-light">
                  챗봇 SaaS<br />
                  <span className="text-[10px] normal-case tracking-wider text-gray-300">(구독형)</span>
                </th>
                <th className="text-left py-5 px-4 text-xs tracking-widest uppercase text-gray-400 font-light">
                  SI 기업
                </th>
                <th className="text-left py-5 px-4 text-xs tracking-widest uppercase text-gray-400 font-light">
                  크몽 · 프리랜서
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.criterion} className="border-b border-gray-100">
                  <td className="py-5 pr-4 text-sm text-gray-700 font-medium">{row.criterion}</td>
                  <td className="py-5 px-4 bg-gray-50">
                    <CellView cell={row.tusol} />
                  </td>
                  <td className="py-5 px-4"><CellView cell={row.chatbot} /></td>
                  <td className="py-5 px-4"><CellView cell={row.si} /></td>
                  <td className="py-5 px-4"><CellView cell={row.freelancer} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div ref={footnoteRef} className="mt-14 border border-gray-200 p-8 md:p-10 bg-gray-50">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-gray-300 bg-white rounded-full">
              <i className="ri-alert-line text-base text-gray-600"></i>
            </div>
            <div className="flex-1">
              <h3 className="text-sm tracking-widest uppercase text-gray-900 font-semibold mb-5">
                투쏠이 맞지 않는 경우
              </h3>
              <ul className="space-y-2.5 text-gray-600 text-sm font-light leading-relaxed mb-6">
                <li>· '싸고 빠른' 챗봇만 필요하다 → <span className="text-gray-900">챗봇 SaaS가 맞습니다</span></li>
                <li>· 대기업 전사 시스템 통합이 목적 → <span className="text-gray-900">SI 기업이 맞습니다</span></li>
                <li>· 한 번 만들어달라는 1회성 외주 → <span className="text-gray-900">프리랜서가 맞습니다</span></li>
              </ul>
              <p className="text-gray-700 text-sm font-medium leading-relaxed">
                우리는 <span className="text-black">'응답 구조를 비즈니스 문맥에 맞게 설계하고, 도입 후에도 함께 가는 파트너'</span>가 필요한 팀을 위한 선택지입니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
