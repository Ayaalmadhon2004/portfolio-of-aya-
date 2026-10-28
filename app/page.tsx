"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ExternalLink,
  Mail,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  ArrowUpRight,
  Calendar,
  MapPin,
  Layout,
  Server,
  Zap,
  Terminal,
  Rocket,
  GitBranch,
  Globe,
  Download,
} from "lucide-react";
import {
  Cursor,
  ScrollUI,
  Reveal,
  CountUp,
  Magnetic,
  TiltCard,
  Typewriter,
  Wave,
} from "./components/Effects";

// ─── Layout constants ─────────────────────────────────────────────
const ICON_XS = 14;
const ICON_SM = 16;
const ICON_MD = 18;
const ICON_LG = 20;
const ICON_XL = 24;
const ICON_HERO = 40;
const STAGGER_MS = 100;
const SCROLLED_AFTER_PX = 20;
const TIMELINE_ANCHOR = 0.6;
const PERCENT = 100;
const HALF = 0.5;
const DOUBLE = 2;
const TRIPLE = 3;
const PAIR = 2;
const FIRST = 1;
const PAD_WIDTH = 2;
const FIRST_OPEN_EXPERIENCE = 0;

const pad = (index: number): string =>
  String(index + FIRST).padStart(PAD_WIDTH, "0");

// ─── Navigation ───────────────────────────────────────────────────
const mainLinks = [
  { name: "About", href: "#about", id: "about" },
  { name: "Skills", href: "#skills", id: "skills" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Experience", href: "#experience", id: "experience" },
];

const moreLinks = [
  {
    name: "Articles",
    href: "#articles",
    id: "articles",
    hint: "Things I wrote on Medium",
  },
  {
    name: "Services",
    href: "#services",
    id: "services",
    hint: "Freelance work on Upwork & Mostaql",
  },
];

const contactLink = { name: "Contact", href: "#contact", id: "contact" };

const sectionIds = [
  "about",
  "skills",
  "projects",
  "experience",
  "articles",
  "services",
  "contact",
];

// ─── Hero data ────────────────────────────────────────────────────
const heroWords = ["web apps", "dashboards", "CLI tools", "things that help"];

const marqueeItems = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Prisma",
  "Supabase",
  "Tailwind CSS",
  "PostgreSQL",
  "Docker",
  "Nginx",
  "GitHub Actions",
  "Svelte",
];

const ROLES_AND_PROGRAMS = 4;
const PROJECTS_SHOWN = 5;
const ARTICLES_WRITTEN = 2;

const stats = [
  { value: ROLES_AND_PROGRAMS, label: "roles & programs" },
  { value: PROJECTS_SHOWN, label: "projects to show" },
  { value: ARTICLES_WRITTEN, label: "articles written" },
];

// ─── Skills Data (mirrors the CV) ─────────────────────────────────
const skillGroups = [
  {
    title: "Frontend",
    icon: <Layout size={ICON_LG} />,
    items: ["React.js", "Next.js (App & Pages Router)", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "CSS Modules", "Svelte"],
  },
  {
    title: "Backend & Database",
    icon: <Server size={ICON_LG} />,
    items: ["Node.js", "Express", "Supabase", "Prisma ORM", "PostgreSQL", "RESTful APIs", "Python"],
  },
  {
    title: "State Management",
    icon: <Zap size={ICON_LG} />,
    items: ["TanStack Query", "Zustand", "Redux Toolkit", "Context API"],
  },
  {
    title: "Performance & SEO",
    icon: <Rocket size={ICON_LG} />,
    items: ["Core Web Vitals", "Performance Auditing", "Benchmarking", "SSR / SSG / ISR", "SEO"],
  },
  {
    title: "DevOps & Tools",
    icon: <Terminal size={ICON_LG} />,
    items: ["Git / GitHub", "GitHub Actions", "CI/CD", "Docker", "Nginx", "Proxmox", "Bash", "Vercel", "Vitest", "CLI Development"],
  },
];

const howIWork = [
  {
    title: "I follow things through",
    text: "At Yoosal I didn't just build the screens. I tested them, kept the team talking, and shipped them to production.",
  },
  {
    title: "I stay until I find the cause",
    text: "When a live site kept crashing, I traced it back to Nginx and fixed the real problem instead of restarting it again.",
  },
  {
    title: "I build for real people",
    text: "My favourite projects start with a real need, like cutting the long physical waits for food distribution in Gaza.",
  },
];

// ─── Projects Data ────────────────────────────────────────────────
type Project = {
  title: string;
  category: string;
  story: string;
  description: string;
  skills: string;
  image?: string;
  liveLink?: string;
  githubLink: string;
};

const projects: Project[] = [
  {
    title: "NutriFlow",
    category: "Full Stack · Food distribution in Gaza",
    story: "Built to make getting a meal less of a waiting game.",
    description:
      "A meal reservation platform that shows live queue and capacity information so people spend less time waiting in person. It tracks meals over time, runs in Arabic and English, and helps kitchens plan so less food goes to waste.",
    skills: "Next.js, TypeScript, Supabase, Prisma, Tailwind CSS, i18n",
    image: "/assets/NutriFlow.png",
    liveLink: "https://gaza-food-project.vercel.app",
    githubLink: "https://github.com/Ayaalmadhon2004/Healthy-Food",
  },
  {
    title: "HospiLink",
    category: "Full Stack · Hospital management",
    story: "Hospital staff need clear information fast, so I designed around that.",
    description:
      "A hospital management dashboard covering bed allocation, patient admissions and incident tracking. Role-based modules give each user only what they need, on top of a well-structured REST API.",
    skills: "React.js, Node.js, Express.js, TypeScript, PostgreSQL",
    image: "/assets/HospiLink.png",
    liveLink: "https://hospi-link-two.vercel.app",
    githubLink: "https://github.com/Ayaalmadhon2004/HospiLink",
  },
  {
    title: "Muraqib",
    category: "Open source · Node.js / TypeScript CLI",
    story: "A teammate for the boring-but-important security checks.",
    description:
      "A CLI toolkit I co-developed that audits Node.js projects for leaked secrets, vulnerable dependencies, missing HTTP security headers, Docker misconfigurations and performance issues. It ships with GitHub Actions CI, Vitest tests and Git hooks that block commits containing secrets.",
    skills: "Node.js, TypeScript, GitHub Actions, Vitest, Docker",
    githubLink: "https://github.com/Muraqib-Core/muraqib",
  },
  {
    title: "Yoosal Digital Agency",
    category: "Frontend · Marketing platform",
    story: "Where I learned to turn a design into something that feels alive.",
    description:
      "A desktop-first website for a digital marketing agency that presents services and success stories with interactive tools and smooth animations.",
    skills: "React.js, Next.js, Tailwind CSS, GSAP",
    image: "/assets/oosal.png",
    liveLink: "https://yoosal.vercel.app",
    githubLink: "https://github.com/Ayaalmadhon2004/yosal-company",
  },
  {
    title: "E-Commerce Store",
    category: "Frontend · E-commerce",
    story: "A playground for micro-interactions.",
    description:
      "A responsive storefront with smooth hover animations and interactive card transitions, built to make browsing feel effortless.",
    skills: "React.js, CSS Animations, Responsive Design",
    image: "/assets/Ecommerce.png",
    liveLink: "https://ecommerce-one-teal-22.vercel.app",
    githubLink: "https://github.com/Ayaalmadhon2004/Ecommerce-",
  },
];

// ─── Services Data ────────────────────────────────────────────────
const services = [
  {
    title: "Convert Your Design into a High-Performance Next.js Landing Page",
    description:
      "Transform your Figma/PSD design into a blazing-fast, SEO-friendly Next.js landing page with Tailwind CSS, smooth animations, and full responsiveness.",
    link: "https://www.upwork.com/services/product/development-it-convert-your-design-into-a-high-performance-next-js-landing-page-2083832498508566892",
    icon: <Layout size={ICON_XL} />,
  },
  {
    title: "Interactive Digital Menu with QR Code Ordering",
    description:
      "A modern digital menu system for restaurants with QR code scanning, real-time ordering, and admin dashboard — built with Next.js and full-stack architecture.",
    link: "https://www.upwork.com/services/product/development-it-an-interactive-digital-menu-with-qr-code-ordering-2084576167400702201",
    icon: <ExternalLink size={ICON_XL} />,
  },
];

// ─── Experience Data (mirrors the CV) ─────────────────────────────
const experiences = [
  {
    role: "Full Stack Developer",
    type: "Full-time",
    company: "Raise the Voices",
    period: "Aug 2026 – Oct 2026",
    points: [
      "Built a full-stack platform with Svelte, Python and a database, and deployed it on Proxmox servers behind Nginx.",
      "Found and fixed the root cause of recurring Nginx crashes, which stabilized the live site.",
    ],
  },
  {
    role: "Frontend Developer",
    type: "Part-time",
    company: "Yoosal",
    period: "Jan 2026 – Jun 2026",
    points: [
      "Turned UI/UX designs into responsive React interfaces and connected them to backend APIs.",
      "Owned testing, cross-team communication and production deployments with clean release practices.",
      "Structured features in modules so the frontend stays organized and easy to scale.",
    ],
  },
  {
    role: "Full Stack Engineering Intern",
    type: "Internship",
    company: "Linked Trust",
    period: "Jan 2026 – May 2026",
    points: [
      "Built and shipped end-to-end full-stack features in agile cycles with peer reviews, testing and constant feedback.",
      "Managed team Git workflows and kept the architecture maintainable across collaborative feature branches.",
    ],
  },
  {
    role: "React & Next.js Developer (Advanced Path)",
    type: "Program",
    company: "Gaza Sky Geeks (GSG)",
    period: "Jul 2025 – Dec 2025",
    points: [
      "Built SEO-optimized Next.js apps using SSR, SSG and ISR, and managed server and global state with TanStack Query and Zustand.",
    ],
  },
];

// ─── Articles Data ───────────────────────────────────────────────
const articles = [
  {
    title: "Why Building a Scalable i18n System in Next.js is a Game Changer",
    date: "15 Jul 2026",
    tags: ["i18n", "Next.js", "Architecture"],
    excerpt:
      "Localization is not decoration — it's a performance, UX, and growth tool. Edge language detection, RTL/LTR rendering, type-safe keys, and ISR caching for global scale without bundle bloat.",
    link: "https://medium.com/@aya.alaasel123/at-first-i-thought-multi-language-support-was-just-an-extra-feature-e74dee169391",
  },
  {
    title: "Build Real App: From Developer Screen Into Live App",
    date: "31 Jul 2026",
    tags: ["Full Stack", "Backend", "Socket.io", "Node.js"],
    excerpt:
      "A deep dive into Socket.io architecture: Engine.io transport layer, HTTP long polling, automatic WebSocket upgrade, namespaces, rooms, Redis adapter scaling, sticky sessions, and JWT middleware authentication.",
    link: "https://medium.com/@aya.alaasel123/how-socket-io-powers-real-time-apps-from-long-polling-to-production",
  },
];

// ─── Hooks ────────────────────────────────────────────────────────

function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);

  return active;
}

// ─── Small shared pieces ──────────────────────────────────────────

function SectionTitle({
  index,
  title,
}: {
  index: string;
  title: string;
}): React.JSX.Element {
  return (
    <Reveal className="mb-12">
      <p className="font-mono text-sm text-red-700 mb-2">{index} /</p>
      <h2 className="text-3xl md:text-4xl font-bold text-stone-900">{title}</h2>
      <div className="draw-line mt-4 flex items-center gap-2">
        <span className="h-1 w-16 rounded-full bg-red-700" />
        <span className="h-1 w-3 rounded-full bg-red-300" />
        <span className="h-1 w-1 rounded-full bg-red-200" />
      </div>
    </Reveal>
  );
}

// ─── Components ───────────────────────────────────────────────────

function Navbar(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const active = useActiveSection(sectionIds);
  const moreActive = moreLinks.some((link) => link.id === active);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLLED_AFTER_PX);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMoreOpen(false);
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const linkClass = (id: string): string =>
    `group relative text-sm font-medium transition-colors ${
      active === id ? "text-red-700" : "text-stone-600 hover:text-stone-900"
    }`;
  const underlineClass = (id: string): string =>
    `absolute -bottom-1 left-0 h-0.5 bg-red-700 transition-all duration-300 ${
      active === id ? "w-full" : "w-0 group-hover:w-full"
    }`;

  return (
    <nav
      className={`fixed top-1 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-stone-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#about"
          className="text-xl font-bold text-stone-900 tracking-tight hover:text-red-700 transition-colors"
        >
          Aya<span className="text-red-700">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {mainLinks.map((link) => (
            <a key={link.id} href={link.href} className={linkClass(link.id)}>
              {link.name}
              <span className={underlineClass(link.id)} />
            </a>
          ))}

          <div
            ref={moreRef}
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen(!moreOpen)}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                moreActive ? "text-red-700" : "text-stone-600 hover:text-stone-900"
              }`}
            >
              More
              <ChevronDown
                size={ICON_SM}
                className={`transition-transform duration-300 ${
                  moreOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              role="menu"
              className={`absolute right-0 top-full pt-3 w-64 transition-all duration-200 ${
                moreOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible translate-y-2 opacity-0"
              }`}
            >
              <div className="rounded-2xl border border-stone-100 bg-white p-2 shadow-xl">
                {moreLinks.map((link) => (
                  <a
                    key={link.id}
                    role="menuitem"
                    href={link.href}
                    onClick={() => setMoreOpen(false)}
                    className="group flex items-center justify-between gap-3 rounded-xl p-3 transition-colors hover:bg-red-50"
                  >
                    <span>
                      <span className="block text-sm font-semibold text-stone-900">
                        {link.name}
                      </span>
                      <span className="block text-xs text-stone-500">
                        {link.hint}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={ICON_SM}
                      className="text-stone-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red-700"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a
            href={contactLink.href}
            className="rounded-full bg-red-700 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-red-600 hover:shadow-lg hover:shadow-red-700/25"
          >
            {contactLink.name}
          </a>
        </div>

        <button
          className="md:hidden p-2 text-stone-600 hover:text-stone-900"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={ICON_XL} /> : <Menu size={ICON_XL} />}
        </button>
      </div>

      <div
        className={`md:hidden grid transition-[grid-template-rows] duration-300 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden bg-white shadow-lg">
          <div className="px-6 py-4 space-y-4">
            {[...mainLinks, ...moreLinks, contactLink].map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block text-base font-medium transition-colors ${
                  active === link.id ? "text-red-700" : "text-stone-600"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero(): React.JSX.Element {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent): void => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", String(((e.clientX - r.left) / r.width - HALF) * DOUBLE));
    el.style.setProperty("--my", String(((e.clientY - r.top) / r.height - HALF) * DOUBLE));
  };

  return (
    <section
      id="about"
      ref={ref}
      onMouseMove={onMove}
      className="relative min-h-screen flex items-center overflow-hidden bg-[var(--paper)] pt-24 pb-16 px-6"
    >
      {/* Decorative shapes (move gently with the pointer) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-24 -right-24 transition-transform duration-300 ease-out"
          style={{ transform: "translate(calc(var(--mx,0) * -30px), calc(var(--my,0) * -30px))" }}
        >
          <div className="animate-blob h-[28rem] w-[28rem] bg-red-100/80 blur-2xl" />
        </div>
        <div
          className="absolute -bottom-32 -left-24 transition-transform duration-300 ease-out"
          style={{ transform: "translate(calc(var(--mx,0) * 24px), calc(var(--my,0) * 24px))" }}
        >
          <div className="animate-blob h-96 w-96 bg-amber-100/90 blur-2xl [animation-delay:-4s]" />
        </div>
        <div
          className="absolute top-32 left-6 hidden md:block transition-transform duration-300 ease-out"
          style={{ transform: "translate(calc(var(--mx,0) * 14px), calc(var(--my,0) * 14px))" }}
        >
          <div className="dots-bg h-32 w-32 opacity-30" />
        </div>
        <div
          className="absolute top-1/4 left-[46%] hidden md:block transition-transform duration-300 ease-out"
          style={{ transform: "translate(calc(var(--mx,0) * 40px), calc(var(--my,0) * 40px))" }}
        >
          <div className="animate-float h-14 w-14 rounded-full border-4 border-red-300" />
        </div>
        <div
          className="absolute bottom-24 left-[8%] hidden md:block transition-transform duration-300 ease-out"
          style={{ transform: "translate(calc(var(--mx,0) * 34px), calc(var(--my,0) * 34px))" }}
        >
          <svg viewBox="0 0 40 40" className="animate-float h-10 w-10 text-red-400 [animation-delay:-2s]">
            <path d="M20 4v32M4 20h32" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>
        <div
          className="absolute bottom-16 right-[44%] hidden lg:block transition-transform duration-300 ease-out"
          style={{ transform: "translate(calc(var(--mx,0) * -20px), calc(var(--my,0) * -20px))" }}
        >
          <svg viewBox="0 0 120 24" className="h-6 w-28 text-red-400">
            <path
              className="animate-draw"
              d="M2 12 Q 17 0 32 12 T 62 12 T 92 12 T 118 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div
          className="absolute top-40 right-[12%] hidden md:block transition-transform duration-300 ease-out"
          style={{ transform: "translate(calc(var(--mx,0) * 28px), calc(var(--my,0) * 28px))" }}
        >
          <svg viewBox="0 0 40 40" className="animate-spin-slow h-8 w-8 text-red-300">
            <path d="M20 4 L36 34 H4 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 space-y-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Open to work
            </div>
          </Reveal>

          <Reveal delay={STAGGER_MS}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight tracking-tight">
              Hi, I&apos;m <span className="text-red-700">Aya</span>{" "}
              <span aria-hidden className="animate-wave-hand">👋</span>
              <span className="block min-h-[1.2em]">
                I build <Typewriter words={heroWords} />
              </span>
              <span className="block">for real people.</span>
            </h1>
          </Reveal>

          <Reveal delay={STAGGER_MS * DOUBLE}>
            <p className="text-lg text-stone-600 leading-relaxed max-w-lg">
              I&apos;m a full stack developer from Palestine. I work with React,
              Next.js, TypeScript and Node.js, and I like problems that matter,
              like a queue app that saves people long waits for food in Gaza.
              I&apos;m just as happy digging into a server to find out why it
              keeps crashing.
            </p>
          </Reveal>

          <Reveal delay={STAGGER_MS * DOUBLE}>
            <p className="text-sm text-stone-500">
              <MapPin size={ICON_XS} className="inline -mt-0.5 mr-1" />
              Palestine · Computer Systems Engineering student, graduating Jan 2027
            </p>
          </Reveal>

          <Reveal delay={STAGGER_MS * TRIPLE}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Magnetic>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-700 hover:bg-red-600 text-white font-medium rounded-full transition-colors hover:shadow-lg hover:shadow-red-700/25"
                >
                  Say hello <ChevronRight size={ICON_MD} />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 hover:border-red-300 text-stone-700 font-medium rounded-full transition-colors hover:bg-red-50"
                >
                  See my work
                </a>
              </Magnetic>
              <a
                href="/Aya-Almadhon-CV.pdf"
                download
                className="link-sweep inline-flex items-center gap-2 py-1 text-stone-600 hover:text-red-700 font-medium transition-colors"
              >
                <Download size={ICON_MD} /> Download CV
              </a>
            </div>
          </Reveal>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative h-72 w-72 md:h-96 md:w-96">
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              className="animate-spin-slow absolute -inset-8 h-[calc(100%+4rem)] w-[calc(100%+4rem)] text-red-300"
            >
              <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
            </svg>
            <div
              aria-hidden
              className="animate-blob absolute inset-0 translate-x-4 translate-y-4 bg-red-200 [animation-delay:-3s]"
            />
            <div className="animate-blob relative h-full w-full overflow-hidden border-4 border-white shadow-2xl shadow-stone-300/50">
              <Image
                src="/assets/aya.jpg"
                alt="Portrait of Aya Almadhon"
                width={384}
                height={384}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <span
              aria-hidden
              className="animate-float absolute -left-6 top-10 rounded-full bg-white px-3 py-1 text-xs font-semibold text-stone-700 shadow-lg"
            >
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-red-700" />
              React
            </span>
            <span
              aria-hidden
              className="animate-float absolute -right-4 top-1/3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-stone-700 shadow-lg [animation-delay:-2s]"
            >
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-red-700" />
              Next.js
            </span>
            <span
              aria-hidden
              className="animate-float absolute -bottom-2 left-8 rounded-full bg-white px-3 py-1 text-xs font-semibold text-stone-700 shadow-lg [animation-delay:-4s]"
            >
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-red-700" />
              Node.js
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee(): React.JSX.Element {
  const row = (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {marqueeItems.map((item) => (
        <React.Fragment key={item}>
          <span className="whitespace-nowrap text-lg font-semibold text-white">{item}</span>
          <span aria-hidden className="text-red-500">✦</span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden bg-[var(--paper)] py-6" aria-hidden>
      <div className="-rotate-1 scale-[1.03] overflow-hidden bg-stone-900 py-4">
        <div className="animate-marquee flex w-max">
          {row}
          {row}
        </div>
      </div>
    </div>
  );
}

function Stats(): React.JSX.Element {
  return (
    <div className="grid grid-cols-3 divide-x divide-stone-200 rounded-2xl border border-stone-200 bg-white py-6 mb-16">
      {stats.map((stat) => (
        <div key={stat.label} className="px-2 text-center">
          <p className="text-4xl md:text-5xl font-bold text-red-700">
            <CountUp to={stat.value} />
          </p>
          <p className="mt-1 text-xs md:text-sm text-stone-500">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

function Skills(): React.JSX.Element {
  return (
    <section id="skills" className="relative overflow-hidden py-20 px-6 bg-white">
      <div aria-hidden className="dots-bg absolute right-4 top-24 hidden h-40 w-40 opacity-20 md:block" />
      <div className="relative max-w-5xl mx-auto">
        <Reveal>
          <Stats />
        </Reveal>

        <SectionTitle index="01" title="What I work with" />

        <div className="grid md:grid-cols-2 gap-5">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={STAGGER_MS * (i % PAIR)}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-stone-100 bg-stone-50/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg">
                <span className="absolute left-0 top-0 h-1 w-0 bg-red-700 transition-all duration-500 group-hover:w-full" />
                <div className="mb-3 flex items-center gap-2 font-semibold text-stone-900">
                  <span className="text-red-700 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                    {group.icon}
                  </span>
                  {group.title}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-stone-200 bg-white px-3 py-1 text-sm text-stone-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-red-700 hover:bg-red-700 hover:text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <SectionTitle index="02" title="How I work" />
          <div className="grid md:grid-cols-3 gap-6">
            {howIWork.map((item, i) => (
              <Reveal key={item.title} delay={STAGGER_MS * i}>
                <div
                  className={`relative h-full overflow-hidden rounded-3xl bg-red-50/70 p-6 transition-transform duration-300 hover:rotate-0 hover:-translate-y-1 ${
                    i % PAIR ? "rotate-1" : "-rotate-1"
                  }`}
                >
                  <span className="outline-number absolute -right-1 -top-3 text-7xl font-black">
                    {pad(i)}
                  </span>
                  <p className="relative mb-2 pt-6 font-semibold text-stone-900">{item.title}</p>
                  <p className="relative text-sm leading-relaxed text-stone-600">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects(): React.JSX.Element {
  return (
    <section id="projects" className="py-20 px-6 bg-stone-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between">
          <SectionTitle index="03" title="Things I've built" />
          <a
            href="https://github.com/Ayaalmadhon2004"
            target="_blank"
            rel="noopener noreferrer"
            className="link-sweep mb-12 hidden md:flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-red-700 transition-colors"
          >
            View GitHub <ExternalLink size={ICON_SM} />
          </a>
        </div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <Reveal key={project.title}>
              <div className="group grid md:grid-cols-2 gap-10 items-center">
                <div className={index % PAIR ? "md:order-2" : ""}>
                  <TiltCard className="relative">
                    <div
                      aria-hidden
                      className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border-2 border-red-700/60 transition-transform duration-300 group-hover:translate-x-5 group-hover:translate-y-5"
                    />
                    <div className="relative aspect-video overflow-hidden rounded-2xl border border-stone-200 bg-stone-200 shadow-sm">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={`${project.title} project screenshot`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-stone-900 font-mono text-sm text-green-400">
                          <Terminal size={ICON_HERO} />
                          <span>
                            $ npx muraqib audit
                            <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 bg-green-400 animate-[blink_1s_steps(1)_infinite]" />
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-within:opacity-100">
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-900 transition-colors hover:bg-red-50"
                          >
                            Live demo
                          </a>
                        )}
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
                        >
                          Source code
                        </a>
                      </div>
                    </div>
                  </TiltCard>
                </div>

                <div className={`relative ${index % PAIR ? "md:order-1" : ""}`}>
                  <span className="outline-number pointer-events-none absolute -top-14 -left-2 text-8xl font-black">
                    {pad(index)}
                  </span>
                  <p className="relative mb-2 text-sm font-medium text-stone-500">{project.category}</p>
                  <h3 className="relative mb-1 text-2xl font-bold text-stone-900 transition-colors group-hover:text-red-700">
                    {project.title}
                  </h3>
                  <p className="relative mb-3 italic text-red-700">{project.story}</p>
                  <p className="relative mb-4 leading-relaxed text-stone-600">{project.description}</p>
                  <p className="relative mb-6 text-sm text-stone-500">
                    <span className="font-semibold text-stone-700">Tech Stack:</span> {project.skills}
                  </p>
                  <div className="relative flex gap-5">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-sweep inline-flex items-center gap-2 text-sm font-medium text-red-700 hover:text-red-600 transition-colors"
                      >
                        Live link <ExternalLink size={ICON_SM} />
                      </a>
                    )}
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-sweep inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
                    >
                      GitHub <GitBranch size={ICON_SM} />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience(): React.JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(FIRST_OPEN_EXPERIENCE);
  const listRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const list = listRef.current;
      const fill = fillRef.current;
      if (!list || !fill) return;
      const r = list.getBoundingClientRect();
      const p = Math.min(
        Math.max((window.innerHeight * TIMELINE_ANCHOR - r.top) / r.height, 0),
        FIRST
      );
      fill.style.height = `${p * PERCENT}%`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="experience" className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <SectionTitle index="04" title="Where I've worked" />

        <div ref={listRef} className="relative space-y-6">
          <div aria-hidden className="absolute bottom-0 left-[11px] top-0 w-0.5 bg-stone-200">
            <div ref={fillRef} className="w-full bg-red-700" />
          </div>

          {experiences.map((exp, index) => {
            const open = openIndex === index;
            return (
              <Reveal key={exp.company} delay={STAGGER_MS * index}>
                <div className="relative pl-12">
                  <span className="absolute left-0 top-5 flex h-6 w-6 items-center justify-center rounded-full border-4 border-red-700 bg-white">
                    {open && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-700/40" />
                    )}
                  </span>

                  <div
                    className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                      open
                        ? "border-red-200 shadow-lg"
                        : "border-stone-200 hover:border-red-200 hover:shadow-md"
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`exp-${index}`}
                      onClick={() => setOpenIndex(open ? null : index)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    >
                      <span>
                        <span className="block text-lg font-bold text-stone-900">{exp.role}</span>
                        <span className="block font-semibold text-red-700">
                          {exp.company}
                          <span className="ml-2 rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-500">
                            {exp.type}
                          </span>
                        </span>
                        <span className="mt-1 flex items-center gap-1.5 text-sm text-stone-500">
                          <Calendar size={ICON_XS} />
                          {exp.period}
                        </span>
                      </span>
                      <ChevronDown
                        size={ICON_XL}
                        className={`shrink-0 text-stone-400 transition-transform duration-300 ${
                          open ? "rotate-180 text-red-700" : ""
                        }`}
                      />
                    </button>

                    <div
                      id={`exp-${index}`}
                      className={`grid transition-[grid-template-rows] duration-500 ${
                        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <ul className="space-y-3 px-5 pb-5">
                          {exp.points.map((point) => (
                            <li key={point} className="flex gap-3 leading-relaxed text-stone-600">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-300" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-12 rounded-2xl border border-stone-100 bg-stone-50 p-6">
            <h3 className="mb-2 text-lg font-bold text-stone-900">Education</h3>
            <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
              <div>
                <p className="font-semibold text-stone-800">Bachelor of Computer Systems Engineering</p>
                <p className="text-stone-600">Al-Azhar University</p>
              </div>
              <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-sm font-medium text-stone-600">
                Expected graduation: Jan 2027
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Articles(): React.JSX.Element {
  return (
    <section id="articles" className="py-20 px-6 bg-stone-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between">
          <SectionTitle index="05" title="Latest Articles" />
          <a
            href="https://medium.com/@aya.alaasel123"
            target="_blank"
            rel="noopener noreferrer"
            className="link-sweep mb-12 hidden md:flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-red-700 transition-colors"
          >
            View all on Medium <ExternalLink size={ICON_SM} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article, i) => (
            <Reveal key={article.title} delay={STAGGER_MS * i}>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block h-full overflow-hidden rounded-3xl border border-stone-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
              >
                <span
                  aria-hidden
                  className="absolute right-0 top-0 h-14 w-14 rounded-bl-[100%] bg-red-50 transition-all duration-500 group-hover:h-24 group-hover:w-24 group-hover:bg-red-100"
                />
                <div className="relative mb-4 flex flex-wrap items-center gap-3">
                  <span className="text-sm font-medium text-stone-400">{article.date}</span>
                  <span className="h-1 w-1 rounded-full bg-stone-300" />
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="relative mb-3 pr-10 text-xl font-bold text-stone-900 transition-colors group-hover:text-red-700">
                  {article.title}
                </h3>
                <p className="relative mb-4 leading-relaxed text-stone-600">{article.excerpt}</p>
                <span className="relative inline-flex items-center gap-2 text-sm font-medium text-red-700 transition-all group-hover:gap-3">
                  Read article <ChevronRight size={ICON_SM} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services(): React.JSX.Element {
  return (
    <section id="services" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <SectionTitle index="06" title="Services" />
        <Reveal>
          <p className="-mt-6 mb-10 max-w-2xl text-stone-600">
            Available for freelance work on Upwork and Mostaql. Here are some of
            the specialized services I offer.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={STAGGER_MS * i}>
              <a
                href={service.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-3xl border border-stone-100 bg-stone-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:bg-white hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-red-50 p-3 text-red-700 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-red-700 group-hover:text-white">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-bold text-stone-900 transition-colors group-hover:text-red-700">
                      {service.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-stone-600">{service.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-red-700 transition-all group-hover:gap-3">
                      View on Upwork <ExternalLink size={ICON_SM} />
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <a
              href="https://www.upwork.com/freelancers/~016362daad477e5a04"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-6 py-3 font-medium text-stone-700 transition-colors hover:border-red-300 hover:bg-red-50"
            >
              <Globe size={ICON_MD} />
              Upwork Profile
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="https://mostaql.com/u/aya_almadhon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-6 py-3 font-medium text-stone-700 transition-colors hover:border-red-300 hover:bg-red-50"
            >
              <Globe size={ICON_MD} />
              Mostaql Profile
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

function Contact(): React.JSX.Element {
  return (
    <section id="contact" className="relative overflow-hidden bg-stone-900 py-24 px-6 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="animate-blob absolute -left-32 top-0 h-96 w-96 bg-red-700/25 blur-3xl" />
        <div className="animate-blob absolute -right-24 bottom-0 h-80 w-80 bg-red-500/20 blur-3xl [animation-delay:-5s]" />
        <svg viewBox="0 0 100 100" className="animate-spin-slow absolute right-[8%] top-16 hidden h-40 w-40 text-red-500/40 md:block">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
        </svg>
        <div className="dots-bg absolute bottom-10 left-[6%] hidden h-24 w-24 opacity-20 md:block" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="mb-4 font-mono text-sm text-red-400">07 / contact</p>
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            Let&apos;s build something good together
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-stone-300">
            Got a project, a role you think I&apos;d be a good fit for, or just a
            question? Send me a message. I&apos;d love to hear what you&apos;re
            working on.
          </p>
        </Reveal>

        <Reveal delay={STAGGER_MS}>
          <a
            href="mailto:aya.alaasel123@gmail.com"
            className="link-sweep mb-10 inline-block text-xl font-semibold text-red-400 transition-colors hover:text-red-300 md:text-3xl"
          >
            aya.alaasel123@gmail.com
          </a>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Magnetic>
              <a
                href="mailto:aya.alaasel123@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-red-700 px-8 py-4 font-medium text-white transition-colors hover:bg-red-600 hover:shadow-lg hover:shadow-red-700/30"
              >
                <Mail size={ICON_LG} />
                Email me
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://github.com/Ayaalmadhon2004"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-stone-600 px-8 py-4 font-medium text-white transition-colors hover:border-white hover:bg-white/10"
              >
                <GitBranch size={ICON_LG} />
                GitHub
              </a>
            </Magnetic>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-stone-400">
            <a href="https://www.linkedin.com/in/aya-almadhon2025" target="_blank" rel="noopener noreferrer" className="link-sweep hover:text-white transition-colors">LinkedIn</a>
            <span className="h-1 w-1 rounded-full bg-stone-600" />
            <a href="https://www.upwork.com/freelancers/~016362daad477e5a04" target="_blank" rel="noopener noreferrer" className="link-sweep hover:text-white transition-colors">Upwork</a>
            <span className="h-1 w-1 rounded-full bg-stone-600" />
            <a href="https://mostaql.com/u/aya_almadhon" target="_blank" rel="noopener noreferrer" className="link-sweep hover:text-white transition-colors">Mostaql</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer(): React.JSX.Element {
  return (
    <footer className="border-t border-stone-800 bg-stone-950 px-6 py-10 text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="mb-1 text-lg font-bold">
            Aya Almadhon<span className="text-red-600">.</span>
          </p>
          <p className="text-sm text-stone-400">Full Stack Developer · Palestine</p>
        </div>

        <div className="flex items-center gap-6 text-sm text-stone-400">
          <a href="https://github.com/Ayaalmadhon2004" target="_blank" rel="noopener noreferrer" className="link-sweep hover:text-white transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/aya-almadhon2025" target="_blank" rel="noopener noreferrer" className="link-sweep hover:text-white transition-colors">LinkedIn</a>
          <a href="https://medium.com/@aya.alaasel123" target="_blank" rel="noopener noreferrer" className="link-sweep hover:text-white transition-colors">Medium</a>
          <a href="mailto:aya.alaasel123@gmail.com" className="link-sweep hover:text-white transition-colors">Email</a>
        </div>

        <p className="text-sm text-stone-500">© {new Date().getFullYear()} Aya Almadhon</p>
      </div>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────────────
export default function Home(): React.JSX.Element {
  return (
    <main className="min-h-screen">
      <Cursor />
      <ScrollUI />
      <Navbar />
      <Hero />
      <Marquee />
      <Wave bg="bg-[var(--paper)]" fill="text-white" />
      <Skills />
      <Wave bg="bg-white" fill="text-stone-50" />
      <Projects />
      <Wave bg="bg-stone-50" fill="text-white" flip />
      <Experience />
      <Wave bg="bg-white" fill="text-stone-50" />
      <Articles />
      <Wave bg="bg-stone-50" fill="text-white" flip />
      <Services />
      <Wave bg="bg-white" fill="text-stone-900" />
      <Contact />
      <Footer />
    </main>
  );
}
