import { useState, useEffect, useRef } from "react";

export default function Counter({ to, prefix = "", suffix = "", duration = 1400 }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver((es) => {
      es.forEach(e => {
        if (e.isIntersecting) {
          const start = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - start) / duration);
            const ease = 1 - Math.pow(1 - p, 3);
            setN(to * ease);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration]);
  const isInt = Number.isInteger(to);
  const display = isInt ? Math.round(n).toLocaleString() : n.toFixed(1);
  return <span ref={ref} className="counting">{prefix}{display}{suffix}</span>;
}
