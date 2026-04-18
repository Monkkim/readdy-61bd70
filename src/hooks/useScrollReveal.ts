import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement>(
  options: { delay?: number; direction?: 'up' | 'left' | 'right' } = {}
) {
  const ref = useRef<T>(null);
  const { delay = 0, direction = 'up' } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const initialTransform =
      direction === 'left'
        ? 'translateX(-40px)'
        : direction === 'right'
        ? 'translateX(40px)'
        : 'translateY(40px)';

    el.style.opacity = '0';
    el.style.transform = initialTransform;
    el.style.transition = 'none';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.transition = `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
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
  }, [delay, direction]);

  return ref;
}
