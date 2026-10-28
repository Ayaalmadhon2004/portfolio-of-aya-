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
  Terminal,
  GitBranch,
  Globe,
  Download,
} from "lucide-react";
import {
  Cursor,
  ScrollUI,
  Reveal,
  Magnetic,
  TiltCard,
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
const PAIR = 2;
const TRIPLE = 3;
const FIRST = 1;
const FIRST_OPEN_EXPERIENCE = 0;
const PHOTO_SIZE = 320;

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
    hint: "Freelance work on Upwork and Mostaql",
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

// ─── Skills Data (mirrors the CV) ─────────────────────────────────
const skillGroups = [
  {
    title: "Frontend",
    items: ["React.js", "Next.js (App & Pages Router)", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "CSS Modules", "Svelte"],
  },
  {
    title: "Backend & Database",
    items: ["Node.js", "Express", "Supabase", "Prisma ORM", "PostgreSQL", "RESTful APIs", "Python"],
  },
  {
    title: "State Management",
    items: ["TanStack Query", "Zustand", "Redux Toolkit", "Context API"],
  },
  {
    title: "Performance & SEO",
    items: ["Core Web Vitals", "Performance Auditing", "Benchmarking", "SSR / SSG / ISR", "SEO"],
  },
  {
    title: "DevOps & Tools",
    items: ["Git / GitHub", "GitHub Actions", "CI/CD", "Docker", "Nginx", "Proxmox", "Bash", "Vercel", "Vitest", "CLI Development"],
  },
];

// ─── Projects Data ────────────────────────────────────────────────
type Project = {
  title: string;
  category: string;
  note?: string;
  description: string;
  skills: string;
  image?: string;
  liveLink?: string;
  githubLink: string;
};

const projects: Project[] = [
  {
    title: "NutriFlow",
    category: "Full stack · Food distribution in Gaza",
    note: "made for people in Gaza",
    description:
      "A web app where people can reserve meals and see how busy the queue is, so they spend less time waiting in line. It keeps track of meals over time, works in Arabic and English, and shows how much capacity the kitchen has left.",
    skills: "Next.js, TypeScript, Supabase, Prisma, Tailwind CSS, i18n",
    image: "/assets/NutriFlow.png",
    liveLink: "https://gaza-food-project.vercel.app",
    githubLink: "https://github.com/Ayaalmadhon2004/Healthy-Food",
  },
  {
    title: "HospiLink",
    category: "Full stack · Hospital management",
    description:
      "A dashboard for the day-to-day running of a hospital: bed allocation, patient admissions and incident tracking. Different roles can see and edit different things, all backed by a REST API.",
    skills: "React.js, Node.js, Express.js, TypeScript, PostgreSQL",
    image: "/assets/HospiLink.png",
    liveLink: "https://hospi-link-two.vercel.app",
    githubLink: "https://github.com/Ayaalmadhon2004/HospiLink",
  },
  {
    title: "Muraqib",
    category: "Open source · Node.js / TypeScript CLI",
    note: "built with a team",
    description:
      "A command-line tool that checks a Node.js project for leaked secrets, vulnerable dependencies, missing security headers, Docker mistakes and performance problems. I set up the GitHub Actions pipeline, the tests, and a Git hook that stops you from committing secrets.",
    skills: "Node.js, TypeScript, GitHub Actions, Vitest, Docker",
    githubLink: "https://github.com/Muraqib-Core/muraqib",
  },
  {
    title: "Yoosal Digital Agency",
    category: "Frontend · Marketing website",
    description:
      "A website for a digital marketing agency, with its services, success stories, and some interactive parts and animations.",
    skills: "React.js, Next.js, Tailwind CSS, GSAP",
    image: "/assets/oosal.png",
    liveLink: "https://yoosal.vercel.app",
    githubLink: "https://github.com/Ayaalmadhon2004/yosal-company",
  },
  {
    title: "E-Commerce Store",
    category: "Frontend · Online store",
    description:
      "A responsive store front with hover animations and card transitions.",
    skills: "React.js, CSS Animations, Responsive Design",
    image: "/assets/Ecommerce.png",
    liveLink: "https://ecommerce-one-teal-22.vercel.app",
    githubLink: "https://github.com/Ayaalmadhon2004/Ecommerce-",
  },
];

// ─── Services Data ────────────────────────────────────────────────
const services = [
  {
    title: "Turn your design into a fast Next.js landing page",
    description:
      "I take your Figma or PSD design and build it as a Next.js landing page with Tailwind CSS. It's responsive, good for SEO, and has smooth animations.",
    link: "https://www.upwork.com/services/product/development-it-convert-your-design-into-a-high-performance-next-js-landing-page-2083832498508566892",
  },
  {
    title: "Digital menu with QR code ordering",
    description:
      "A digital menu for restaurants. Customers scan a QR code and order, and the restaurant manages everything from an admin dashboard. Built with Next.js.",
    link: "https://www.upwork.com/services/product/development-it-an-interactive-digital-menu-with-qr-code-ordering-2084576167400702201",
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
      "Localization is not decoration. It's a performance, UX and growth tool. Edge language detection, RTL/LTR rendering, type-safe keys, and ISR caching for global scale without bundle bloat.",
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

function SectionTitle({ title }: { title: string }): React.JSX.Element {
  return (
    <Reveal className="mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-stone-900">{title}</h2>
      <svg
        aria-hidden
        viewBox="0 0 120 12"
        className="draw-line mt-3 h-3 w-28 text-red-700"
      >
        <path
          d="M2 7 C 15 1, 25 11, 40 6 S 65 2, 80 7 S 105 10, 118 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
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
          ? "bg-[var(--paper)]/90 backdrop-blur-md shadow-sm border-b border-stone-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#top"
          className="font-display text-xl font-bold text-stone-900 tracking-tight hover:text-red-700 transition-colors"
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
              <div className="rounded-xl border border-stone-200 bg-white p-2 shadow-xl">
                {moreLinks.map((link) => (
                  <a
                    key={link.id}
                    role="menuitem"
                    href={link.href}
                    onClick={() => setMoreOpen(false)}
                    className="group flex items-center justify-between gap-3 rounded-lg p-3 transition-colors hover:bg-red-50"
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
            className="rounded-lg bg-red-700 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
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
        <div className="overflow-hidden bg-[var(--paper)] shadow-lg">
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
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden bg-[var(--paper)] pt-24 pb-16 px-6"
    >
      <div className="relative max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-14 items-center">
        <div className="order-2 md:order-1 space-y-6">
          <Reveal>
            <p className="font-hand text-2xl text-red-700 -rotate-2 inline-block">
              open to work
            </p>
          </Reveal>

          <Reveal delay={STAGGER_MS}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 leading-[1.1]">
              Hi, I&apos;m{" "}
              <span className="relative inline-block text-red-700">
                Aya
                <svg
                  aria-hidden
                  viewBox="0 0 180 14"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 h-3 w-full"
                >
                  <path
                    className="animate-draw"
                    d="M3 9 C 30 3, 55 12, 90 6 S 150 9, 177 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              , a full stack developer from Palestine.
            </h1>
          </Reveal>

          <Reveal delay={STAGGER_MS * PAIR}>
            <p className="text-lg text-stone-700 leading-relaxed max-w-lg">
              I&apos;m finishing my computer systems engineering degree at
              Al-Azhar University, and I build websites and web apps with React,
              Next.js and Node.js. One of them, NutriFlow, helps people in Gaza
              reserve meals so they spend less time waiting in line.
            </p>
          </Reveal>

          <Reveal delay={STAGGER_MS * TRIPLE}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Magnetic>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-red-700 px-6 py-3 font-medium text-white transition-colors hover:bg-red-600"
                >
                  Say hello <ChevronRight size={ICON_MD} />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-stone-800 px-6 py-[10px] font-medium text-stone-800 transition-colors hover:bg-stone-800 hover:text-white"
                >
                  See my work
                </a>
              </Magnetic>
              <a
                href="/Aya-Almadhon-CV.pdf"
                download
                className="link-sweep inline-flex items-center gap-2 py-1 font-medium text-stone-600 transition-colors hover:text-red-700"
              >
                <Download size={ICON_MD} /> My CV
              </a>
            </div>
          </Reveal>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -left-28 top-2 hidden -rotate-6 md:block"
            >
              <p className="font-hand text-2xl text-stone-600">that&apos;s me!</p>
              <svg viewBox="0 0 80 50" className="ml-10 -mt-1 h-12 w-20 text-stone-500">
                <path
                  className="animate-draw"
                  d="M6 6 C 30 4, 60 14, 70 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  className="animate-draw"
                  d="M58 34 L70 41 L74 27"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="polaroid relative w-72 bg-white p-3 pb-14 shadow-xl md:w-80">
              <span aria-hidden className="tape absolute -top-3 left-6 h-6 w-20 -rotate-6" />
              <span aria-hidden className="tape absolute -top-3 right-6 h-6 w-20 rotate-6" />
              <Image
                src="/assets/aya.jpg"
                alt="Portrait of Aya Almadhon"
                width={PHOTO_SIZE}
                height={PHOTO_SIZE}
                className="aspect-square h-auto w-full object-cover"
                priority
              />
              <p className="font-hand absolute bottom-3 left-0 right-0 text-center text-2xl text-stone-700">
                Aya, Palestine
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About(): React.JSX.Element {
  return (
    <section id="about" className="bg-[var(--paper)] px-6 pb-16 pt-8">
      <div className="mx-auto max-w-3xl">
        <SectionTitle title="A bit about me" />
        <Reveal>
          <div className="space-y-5 text-lg leading-relaxed text-stone-700">
            <p>
              I&apos;m a computer systems engineering student at Al-Azhar
              University, graduating in January 2027, and I&apos;ve been working
              in web development alongside my studies. Over the last year I did
              the React and Next.js advanced path at Gaza Sky Geeks, worked
              part-time on Yoosal&apos;s frontend, interned at Linked Trust, and
              most recently built a platform for Raise the Voices.
            </p>
            <p>
              I like seeing a feature through, from building it to testing it to
              putting it live. When a live site kept crashing at Raise the
              Voices, I didn&apos;t stop at restarting it. I kept digging until I
              found the cause, which was Nginx. I also write about what I learn
              on{" "}
              <a
                href="https://medium.com/@aya.alaasel123"
                target="_blank"
                rel="noopener noreferrer"
                className="link-sweep font-medium text-red-700"
              >
                Medium
              </a>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Skills(): React.JSX.Element {
  return (
    <section id="skills" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <SectionTitle title="Tools I use" />

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={STAGGER_MS * (i % PAIR)}>
              <h3 className="mb-3 border-b border-stone-200 pb-2 text-xl font-semibold text-stone-900">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-stone-300 px-2.5 py-1 text-sm text-stone-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-red-700 hover:bg-red-700 hover:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
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
          <SectionTitle title="Things I've built" />
          <a
            href="https://github.com/Ayaalmadhon2004"
            target="_blank"
            rel="noopener noreferrer"
            className="link-sweep mb-12 hidden md:flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-red-700 transition-colors"
          >
            All my code on GitHub <ExternalLink size={ICON_SM} />
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
                      className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg border-2 border-stone-800 transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4"
                    />
                    <div className="relative aspect-video overflow-hidden rounded-lg border-2 border-stone-800 bg-stone-200">
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
                            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-stone-900 transition-colors hover:bg-red-50"
                          >
                            Live demo
                          </a>
                        )}
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
                        >
                          Source code
                        </a>
                      </div>
                    </div>
                  </TiltCard>
                </div>

                <div className={index % PAIR ? "md:order-1" : ""}>
                  <p className="mb-2 text-sm font-medium text-stone-500">{project.category}</p>
                  <h3 className="mb-2 text-2xl font-bold text-stone-900 transition-colors group-hover:text-red-700">
                    {project.title}
                  </h3>
                  {project.note && (
                    <p className="font-hand mb-2 inline-block -rotate-1 text-2xl text-red-700">
                      {project.note}
                    </p>
                  )}
                  <p className="mb-4 leading-relaxed text-stone-700">{project.description}</p>
                  <p className="mb-6 text-sm text-stone-500">
                    <span className="font-semibold text-stone-700">Made with:</span> {project.skills}
                  </p>
                  <div className="flex gap-5">
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
        <SectionTitle title="Where I've worked" />

        <div ref={listRef} className="relative space-y-6">
          <div aria-hidden className="absolute bottom-0 left-[11px] top-0 w-0.5 bg-stone-200">
            <div ref={fillRef} className="w-full bg-red-700" />
          </div>

          {experiences.map((exp, index) => {
            const open = openIndex === index;
            return (
              <Reveal key={exp.company} delay={STAGGER_MS * index}>
                <div className="relative pl-12">
                  <span className="absolute left-0 top-5 flex h-6 w-6 items-center justify-center rounded-full border-4 border-red-700 bg-white" />

                  <div
                    className={`overflow-hidden rounded-lg border-2 bg-white transition-all duration-300 ${
                      open
                        ? "border-stone-800 shadow-[4px_4px_0_0_#b91c1c]"
                        : "border-stone-200 hover:border-stone-800"
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
                        <span className="font-display block text-lg font-bold text-stone-900">{exp.role}</span>
                        <span className="block font-semibold text-red-700">
                          {exp.company}
                          <span className="ml-2 text-sm font-normal text-stone-500">
                            ({exp.type})
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
                            <li key={point} className="flex gap-3 leading-relaxed text-stone-700">
                              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-700" />
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
          <div className="mt-12 rounded-lg border-2 border-dashed border-stone-300 p-6">
            <h3 className="mb-2 text-lg font-bold text-stone-900">Education</h3>
            <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
              <div>
                <p className="font-semibold text-stone-800">Bachelor of Computer Systems Engineering</p>
                <p className="text-stone-600">Al-Azhar University</p>
              </div>
              <span className="text-sm font-medium text-stone-600">
                Expected graduation: January 2027
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
          <SectionTitle title="Things I've written" />
          <a
            href="https://medium.com/@aya.alaasel123"
            target="_blank"
            rel="noopener noreferrer"
            className="link-sweep mb-12 hidden md:flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-red-700 transition-colors"
          >
            More on Medium <ExternalLink size={ICON_SM} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article, i) => (
            <Reveal key={article.title} delay={STAGGER_MS * i}>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-lg border-2 border-stone-800 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#b91c1c]"
              >
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="text-sm font-medium text-stone-500">{article.date}</span>
                  <span className="text-sm text-stone-400">{article.tags.join(" · ")}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-stone-900 transition-colors group-hover:text-red-700">
                  {article.title}
                </h3>
                <p className="mb-4 leading-relaxed text-stone-700">{article.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-red-700 transition-all group-hover:gap-3">
                  Read it on Medium <ChevronRight size={ICON_SM} />
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
        <SectionTitle title="Work with me" />
        <Reveal>
          <p className="-mt-6 mb-10 max-w-2xl text-lg text-stone-700">
            I take freelance projects on Upwork and Mostaql. These are two of
            the things people hire me for most.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={STAGGER_MS * i}>
              <a
                href={service.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-lg border-2 border-stone-800 bg-stone-50 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#b91c1c]"
              >
                <h3 className="mb-2 text-lg font-bold text-stone-900 transition-colors group-hover:text-red-700">
                  {service.title}
                </h3>
                <p className="mb-4 leading-relaxed text-stone-700">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-red-700 transition-all group-hover:gap-3">
                  See it on Upwork <ExternalLink size={ICON_SM} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="https://www.upwork.com/freelancers/~016362daad477e5a04"
            target="_blank"
            rel="noopener noreferrer"
            className="link-sweep inline-flex items-center gap-2 font-medium text-stone-700 transition-colors hover:text-red-700"
          >
            <Globe size={ICON_MD} />
            My Upwork profile
          </a>
          <a
            href="https://mostaql.com/u/aya_almadhon"
            target="_blank"
            rel="noopener noreferrer"
            className="link-sweep inline-flex items-center gap-2 font-medium text-stone-700 transition-colors hover:text-red-700"
          >
            <Globe size={ICON_MD} />
            My Mostaql profile
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact(): React.JSX.Element {
  return (
    <section id="contact" className="relative overflow-hidden bg-stone-900 py-24 px-6 text-white">
      <div className="relative mx-auto max-w-3xl">
        <Reveal>
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            Want to work together?
          </h2>
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-stone-300">
            Email me about your project, or about a role you think I&apos;d be a
            good fit for. You can also just say hi.
          </p>
        </Reveal>

        <Reveal delay={STAGGER_MS}>
          <div className="relative mb-10 inline-block">
            <a
              href="mailto:aya.alaasel123@gmail.com"
              className="font-display link-sweep inline-block text-2xl font-semibold text-red-400 transition-colors hover:text-red-300 md:text-4xl"
            >
              aya.alaasel123@gmail.com
            </a>
            <div
              aria-hidden
              className="absolute -right-24 -top-10 hidden rotate-6 md:block"
            >
              <p className="font-hand text-2xl text-stone-400">say hi!</p>
              <svg viewBox="0 0 60 40" className="-mt-1 h-8 w-12 text-stone-500">
                <path
                  d="M54 4 C 40 4, 20 12, 8 32 M8 32 L7 20 M8 32 L20 30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row">
            <Magnetic>
              <a
                href="mailto:aya.alaasel123@gmail.com"
                className="inline-flex items-center gap-2 rounded-lg bg-red-700 px-8 py-4 font-medium text-white transition-colors hover:bg-red-600"
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
                className="inline-flex items-center gap-2 rounded-lg border-2 border-stone-500 px-8 py-[14px] font-medium text-white transition-colors hover:border-white"
              >
                <GitBranch size={ICON_LG} />
                GitHub
              </a>
            </Magnetic>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-stone-400">
            <a href="https://www.linkedin.com/in/aya-almadhon2025" target="_blank" rel="noopener noreferrer" className="link-sweep hover:text-white transition-colors">LinkedIn</a>
            <a href="https://www.upwork.com/freelancers/~016362daad477e5a04" target="_blank" rel="noopener noreferrer" className="link-sweep hover:text-white transition-colors">Upwork</a>
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
          <p className="font-display mb-1 text-lg font-bold">
            Aya Almadhon<span className="text-red-600">.</span>
          </p>
          <p className="text-sm text-stone-400">Full stack developer in Palestine</p>
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
      <About />
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
