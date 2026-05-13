import { useEffect, useRef } from "react";

export default function Reveal({ children, delay = 0, as: Tag = "div", className = "", ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver((es) => {
      es.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("in"), delay);
          obs.disconnect();
        }
      });
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <Tag ref={ref} className={`reveal ${className}`} {...rest}>{children}</Tag>;
}
