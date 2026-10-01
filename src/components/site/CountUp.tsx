"use client";

import { useEffect } from "react";

/**
 * Counts every `.stat-num[data-count]` on the page up from zero as it scrolls
 * into view. The server-rendered text is already the final value, so with
 * reduced motion (or no JS) nothing moves and nothing is wrong.
 */
export default function CountUp() {
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const nums = document.querySelectorAll<HTMLElement>(".plh .stat-num[data-count]");
    if (reduce || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        const target = parseFloat(el.dataset.count || "0");
        const decimals = Number(el.dataset.decimals || 0);
        const pre = el.dataset.prefix || "";
        const suf = el.dataset.suffix || "";
        const fmt = (v: number) =>
          pre + v.toLocaleString("en-GB", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suf;
        let start: number | null = null;
        const tick = (ts: number) => {
          if (start === null) start = ts;
          const p = Math.min((ts - start) / 1100, 1);
          el.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = fmt(target);
        };
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.6 });
    nums.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return null;
}
