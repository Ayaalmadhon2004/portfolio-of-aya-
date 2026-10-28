"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ExternalLink,
  Mail,
  Menu,
  X,
  ChevronRight,
  Calendar,
  MapPin,
  Briefcase,
  Zap,
  Layout,
  Server,
  Terminal,
  Rocket,
  GitBranch,
  Globe,
  Download,
} from "lucide-react";

// ─── Navigation Links ─────────────────────────────────────────────
const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Articles", href: "#articles" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

// ─── Skills Data (mirrors the CV) ─────────────────────────────────
const skillGroups = [
  {
    title: "Frontend",
    icon: <Layout size={20} />,
    items: ["React.js", "Next.js (App & Pages Router)", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "CSS Modules", "Svelte"],
  },
  {
    title: "Backend & Database",
    icon: <Server size={20} />,
    items: ["Node.js", "Express", "Supabase", "Prisma ORM", "PostgreSQL", "RESTful APIs", "Python"],
  },
  {
    title: "State Management",
    icon: <Zap size={20} />,
    items: ["TanStack Query", "Zustand", "Redux Toolkit", "Context API"],
  },
  {
    title: "Performance & SEO",
    icon: <Rocket size={20} />,
    items: ["Core Web Vitals", "Performance Auditing", "Benchmarking", "SSR / SSG / ISR", "SEO"],
  },
  {
    title: "DevOps & Tools",
    icon: <Terminal size={20} />,
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
    icon: <Layout size={24} />,
  },
  {
    title: "Interactive Digital Menu with QR Code Ordering",
    description:
      "A modern digital menu system for restaurants with QR code scanning, real-time ordering, and admin dashboard — built with Next.js and full-stack architecture.",
    link: "https://www.upwork.com/services/product/development-it-an-interactive-digital-menu-with-qr-code-ordering-2084576167400702201",
    icon: <ExternalLink size={24} />,
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

// ─── Components ───────────────────────────────────────────────────

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
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
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-700 transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <button
          className="md:hidden p-2 text-stone-600 hover:text-stone-900"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-stone-100 px-6 py-4 space-y-4 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-stone-600 hover:text-red-700 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center pt-24 pb-16 px-6"
    >
      <div className="max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Open to work
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight tracking-tight">
            Hi, I&apos;m <span className="text-red-700">Aya</span>.
            <br />
            I build web apps for real people.
          </h1>

          <p className="text-lg text-stone-600 leading-relaxed max-w-lg">
            I&apos;m a full stack developer from Palestine. I work with React,
            Next.js, TypeScript and Node.js, and I like problems that matter,
            like a queue app that saves people long waits for food in Gaza. I&apos;m
            just as happy digging into a server to find out why it keeps
            crashing.
          </p>

          <p className="text-sm text-stone-500">
            <MapPin size={14} className="inline -mt-0.5 mr-1" />
            Palestine · Computer Systems Engineering student, graduating Jan 2027
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-700 hover:bg-red-600 text-white font-medium rounded-lg transition-all hover:shadow-lg hover:shadow-red-700/25 active:scale-95"
            >
              Say hello <ChevronRight size={18} />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 hover:border-stone-300 text-stone-700 font-medium rounded-lg transition-all hover:bg-stone-50 active:scale-95"
            >
              See my work
            </a>
            <a
              href="/Aya-Almadhon-CV.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 text-stone-600 hover:text-red-700 font-medium transition-colors"
            >
              <Download size={18} /> Download CV
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-full bg-red-100" aria-hidden />
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-stone-200/50">
              <Image
                src="/assets/aya.jpg"
                alt="Portrait of Aya Almadhon"
                width={320}
                height={320}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            What I work with
          </h2>
          <div className="w-16 h-1 bg-red-700 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="p-5 rounded-2xl border border-stone-100 bg-stone-50/50"
            >
              <div className="flex items-center gap-2 mb-3 text-stone-900 font-semibold">
                <span className="text-red-700">{group.icon}</span>
                {group.title}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full bg-white border border-stone-200 text-sm text-stone-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <h3 className="text-xl font-semibold text-stone-900 mb-6">
            How I work
          </h3>
          <div className="grid md:grid-cols-3 gap-5">
            {howIWork.map((item) => (
              <div key={item.title} className="p-5 rounded-2xl bg-red-50/60">
                <p className="font-semibold text-stone-900 mb-2">{item.title}</p>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-stone-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Things I&apos;ve built
            </h2>
            <div className="w-16 h-1 bg-red-700 rounded-full" />
          </div>
          <a
            href="https://github.com/Ayaalmadhon2004"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-red-700 transition-colors"
          >
            View GitHub <ExternalLink size={16} />
          </a>
        </div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group grid md:grid-cols-2 gap-8 items-center"
            >
              <div
                className={`${
                  index % 2 === 1 ? "md:order-2" : ""
                } group relative aspect-video bg-stone-200 rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-500`}
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} project screenshot`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-stone-900 text-green-400 font-mono text-sm">
                    <Terminal size={40} />
                    <span>$ npx muraqib audit</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white text-stone-900 rounded-lg font-medium text-sm hover:bg-red-50 transition-colors"
                    >
                      Live demo
                    </a>
                  )}
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 backdrop-blur text-white rounded-lg font-medium text-sm hover:bg-white/20 transition-colors"
                  >
                    Source code
                  </a>
                </div>
              </div>

              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <p className="text-sm text-stone-500 font-medium mb-2">
                  {project.category}
                </p>
                <h3 className="text-2xl font-bold text-stone-900 mb-1 group-hover:text-red-700 transition-colors">
                  {project.title}
                </h3>
                <p className="text-red-700 italic mb-3">{project.story}</p>
                <p className="text-stone-600 leading-relaxed mb-4">
                  {project.description}
                </p>
                <p className="text-sm text-stone-500 mb-6">
                  <span className="font-semibold text-stone-700">Tech Stack:</span>{" "}
                  {project.skills}
                </p>
                <div className="flex gap-4">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-red-700 hover:text-red-600 transition-colors"
                    >
                      Live link <ExternalLink size={16} />
                    </a>
                  )}
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    GitHub <GitBranch size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Where I&apos;ve worked
          </h2>
          <div className="w-16 h-1 bg-red-700 rounded-full" />
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative pl-8 md:pl-0 border-l-2 border-stone-200 md:border-l-0 md:grid md:grid-cols-12 md:gap-8"
            >
              <div className="hidden md:block md:col-span-3 text-right pt-2">
                <div className="inline-flex items-center gap-2 text-sm text-stone-500 font-medium">
                  <Calendar size={16} />
                  {exp.period}
                </div>
                <div className="text-sm text-stone-400 mt-1">{exp.type}</div>
              </div>

              <div className="hidden md:flex md:col-span-1 justify-center">
                <div className="w-4 h-4 rounded-full bg-red-700 mt-3 ring-4 ring-red-50" />
              </div>

              <div className="md:col-span-8 pb-8">
                <div className="md:hidden flex items-center gap-2 text-sm text-stone-500 mb-2">
                  <Calendar size={14} />
                  {exp.period} · {exp.type}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase size={20} className="text-red-700" />
                  <h3 className="text-xl font-bold text-stone-900">{exp.role}</h3>
                </div>
                <p className="text-red-700 font-semibold mb-4">{exp.company}</p>
                <ul className="space-y-3">
                  {exp.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-stone-600 leading-relaxed"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-300 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-stone-50 rounded-2xl border border-stone-100">
          <h3 className="text-lg font-bold text-stone-900 mb-2">Education</h3>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <p className="font-semibold text-stone-800">
                Bachelor of Computer Systems Engineering
              </p>
              <p className="text-stone-600">Al-Azhar University</p>
            </div>
            <span className="px-3 py-1 bg-white border border-stone-200 rounded-full text-sm font-medium text-stone-600">
              Expected graduation: Jan 2027
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Articles() {
  return (
    <section id="articles" className="py-20 px-6 bg-stone-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Latest Articles
            </h2>
            <div className="w-16 h-1 bg-red-700 rounded-full" />
          </div>
          <a
            href="https://medium.com/@aya.alaasel123"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-red-700 transition-colors"
          >
            View all on Medium <ExternalLink size={16} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <a
              key={article.title}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 bg-white rounded-2xl border border-stone-100 hover:border-red-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm text-stone-400 font-medium">
                  {article.date}
                </span>
                <span className="w-1 h-1 rounded-full bg-stone-300" />
                <div className="flex gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-stone-100 text-stone-600 text-xs font-medium rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-red-700 transition-colors">
                {article.title}
              </h3>
              <p className="text-stone-600 leading-relaxed mb-4">
                {article.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-red-700 group-hover:gap-3 transition-all">
                Read article <ChevronRight size={16} />
              </span>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a
            href="https://medium.com/@aya.alaasel123"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-red-700 transition-colors"
          >
            View all on Medium <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Services
          </h2>
          <div className="w-16 h-1 bg-red-700 rounded-full" />
          <p className="text-stone-600 mt-4 max-w-2xl">
            Available for freelance work on Upwork and Mostaql. Here are some of
            the specialized services I offer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <a
              key={service.title}
              href={service.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 bg-stone-50 rounded-2xl border border-stone-100 hover:border-red-200 hover:shadow-lg hover:bg-white transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-50 text-red-700 rounded-xl group-hover:bg-red-700 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-red-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-red-700 group-hover:gap-3 transition-all">
                    View on Upwork <ExternalLink size={16} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://www.upwork.com/freelancers/~016362daad477e5a04"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 hover:border-red-300 text-stone-700 font-medium rounded-lg transition-all hover:bg-red-50"
          >
            <Globe size={18} />
            Upwork Profile
          </a>
          <a
            href="https://mostaql.com/u/aya_almadhon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 hover:border-red-300 text-stone-700 font-medium rounded-lg transition-all hover:bg-red-50"
          >
            <Globe size={18} />
            Mostaql Profile
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-stone-50">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
          Let&apos;s build something good together
        </h2>
        <p className="text-lg text-stone-600 mb-10 leading-relaxed">
          Got a project, a role you think I&apos;d be a good fit for, or just a
          question? Send me a message. I&apos;d love to hear what you&apos;re
          working on.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:aya.alaasel123@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-700 hover:bg-red-600 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-red-700/25 active:scale-95"
          >
            <Mail size={20} />
            Email me
          </a>
          <a
            href="https://github.com/Ayaalmadhon2004"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-stone-200 hover:border-stone-300 text-stone-700 font-medium rounded-xl transition-all hover:bg-stone-50 active:scale-95"
          >
            <GitBranch size={20} />
            GitHub
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-stone-500">
          <a
            href="https://www.linkedin.com/in/aya-almadhon2025"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-700 transition-colors"
          >
            LinkedIn
          </a>
          <span className="w-1 h-1 rounded-full bg-stone-300" />
          <a
            href="https://www.upwork.com/freelancers/~016362daad477e5a04"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-700 transition-colors"
          >
            Upwork
          </a>
          <span className="w-1 h-1 rounded-full bg-stone-300" />
          <a
            href="https://mostaql.com/u/aya_almadhon"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-700 transition-colors"
          >
            Mostaql
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 bg-stone-900 text-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-lg font-bold mb-1">Aya Almadhon</p>
          <p className="text-stone-400 text-sm">
            Full Stack Developer · Palestine
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm text-stone-400">
          <a href="https://github.com/Ayaalmadhon2004" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/aya-almadhon2025" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://medium.com/@aya.alaasel123" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Medium</a>
          <a href="mailto:aya.alaasel123@gmail.com" className="hover:text-white transition-colors">Email</a>
        </div>

        <p className="text-stone-500 text-sm">
          © {new Date().getFullYear()} Aya Almadhon
        </p>
      </div>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Articles />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}