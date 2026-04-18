export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-16">
        <div className="pt-8 border-t border-gray-100 space-y-4">
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-300 font-light">
            <span>상호명: Davenport</span>
            <span>대표자: 김종솔</span>
            <span>사업자등록번호: 426-39-01313</span>
            <span>주소: 경기도 화성시 동탄 기흥로559, 115호 - 12실(영천동)</span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-gray-300 font-light">
              © 2026 Davenport. All rights reserved.
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
      </div>
    </footer>
  );
}
