"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

// ─── Tuning constants ─────────────────────────────────────────────

const DEFAULT_VISIBLE_RATIO = 0.15;
const COUNT_VISIBLE_RATIO = 0.5;
const COUNT_DURATION_MS = 1200;
const COUNT_EASE_POWER = 3;
const MAGNET_STRENGTH = 0.3;
const HALF = 0.5;
const TILT_X_DEG = 8;
const TILT_Y_DEG = 10;
const WORD_HOLD_MS = 1800;
const WORD_GAP_MS = 200;
const DELETE_SPEED_MS = 40;
const TYPE_SPEED_MS = 80;
const CURSOR_LAG = 0.16;
const SHOW_TOP_BUTTON_AFTER_PX = 600;

// ─── Hooks ────────────────────────────────────────────────────────

export function useInView<T extends HTMLElement>(threshold = DEFAULT_VISIBLE_RATIO) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, seen] as const;
}

// ─── Reveal on scroll ─────────────────────────────────────────────

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${seen ? "in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Count up ─────────────────────────────────────────────────────

export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [ref, seen] = useInView<HTMLSpanElement>(COUNT_VISIBLE_RATIO);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!seen) return;
    const start = performance.now();
    const duration = COUNT_DURATION_MS;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, COUNT_EASE_POWER))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

// ─── Magnetic wrapper (buttons follow the pointer slightly) ───────

export function Magnetic({
  children,
  strength = MAGNET_STRENGTH,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width * HALF) * strength;
    const y = (e.clientY - r.top - r.height * HALF) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block transition-transform duration-200 ease-out"
    >
      {children}
    </div>
  );
}

// ─── 3D tilt card ─────────────────────────────────────────────────

export function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateX(${(HALF - py) * TILT_X_DEG}deg) rotateY(${(px - HALF) * TILT_Y_DEG}deg) scale(1.02)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Typewriter ───────────────────────────────────────────────────

export function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = words[index];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && text === full) {
      t = setTimeout(() => setDeleting(true), WORD_HOLD_MS);
    } else if (deleting && text === "") {
      t = setTimeout(() => {
        setDeleting(false);
        setIndex((index + 1) % words.length);
      }, WORD_GAP_MS);
    } else {
      t = setTimeout(
        () =>
          setText(
            deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)
          ),
        deleting ? DELETE_SPEED_MS : TYPE_SPEED_MS
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return (
    <span className="text-red-700">
      {text}
      <span className="ml-0.5 inline-block w-[3px] h-[0.9em] translate-y-[0.1em] bg-red-700 animate-[blink_1s_steps(1)_infinite]" />
    </span>
  );
}

// ─── Custom cursor (dot + trailing ring, desktop pointers only) ───

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const ringInner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.body.classList.add("has-cursor");

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) {
        dot.current.style.opacity = "1";
        dot.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (ring.current) ring.current.style.opacity = "1";
      const target = (e.target as Element | null)?.closest("a, button, [data-cursor]");
      ringInner.current?.classList.toggle("cursor-active", !!target);
    };
    const onLeave = () => {
      if (dot.current) dot.current.style.opacity = "0";
      if (ring.current) ring.current.style.opacity = "0";
    };
    const loop = () => {
      rx += (x - rx) * CURSOR_LAG;
      ry += (y - ry) * CURSOR_LAG;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] opacity-0 transition-opacity duration-300"
      >
        <div
          ref={ringInner}
          className="cursor-ring -ml-4 -mt-4 h-8 w-8 rounded-full border-2 border-red-700/70"
        />
      </div>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] opacity-0 transition-opacity duration-300"
      >
        <div className="-ml-1 -mt-1 h-2 w-2 rounded-full bg-red-700" />
      </div>
    </>
  );
}

// ─── Scroll progress bar + back to top ────────────────────────────

export function ScrollUI() {
  const bar = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      setShow(h.scrollTop > SHOW_TOP_BUTTON_AFTER_PX);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        ref={bar}
        aria-hidden
        className="fixed left-0 top-0 z-[60] h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-red-700 to-red-400"
      />
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-red-700 text-white shadow-lg shadow-red-700/30 transition-all duration-300 hover:-translate-y-1 hover:bg-red-600 ${
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}

// ─── Wavy section divider ─────────────────────────────────────────
// `bg` is the colour above the wave, `fill` the colour of the next section.

export function Wave({
  bg,
  fill,
  flip = false,
}: {
  bg: string;
  fill: string;
  flip?: boolean;
}) {
  return (
    <div className={bg} aria-hidden>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={`block h-12 w-full fill-current md:h-20 ${fill} ${flip ? "-scale-x-100" : ""}`}
      >
        <path d="M0,40 C240,90 480,0 720,40 C960,80 1200,10 1440,40 L1440,80 L0,80 Z" />
      </svg>
    </div>
  );
}
