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
  Code2,
  Zap,
  Database,
  Layout,
  Server,
  Cpu,
  Terminal,
  Rocket,
  BarChart3,
  GitBranch,
  Sparkles,
  BrainCircuit,
  Globe,
} from "lucide-react";

// ─── Navigation Links ─────────────────────────────────────────────
const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Articles", href: "#articles" },
  { name: "Contact", href: "#contact" },
];

// ─── Skills Data ──────────────────────────────────────────────────
const technicalSkills = [
  { name: "React JS & Next JS", icon: <Code2 size={18} /> },
  { name: "TypeScript", icon: <Terminal size={18} /> },
  { name: "Tailwind CSS", icon: <Layout size={18} /> },
  { name: "Prisma", icon: <Database size={18} /> },
  { name: "Supabase", icon: <Server size={18} /> },
  { name: "Zustand", icon: <Zap size={18} /> },
  { name: "React Query", icon: <BarChart3 size={18} /> },
  { name: "Redux Toolkit", icon: <Cpu size={18} /> },
  { name: "LLM Integration & AI Pipelines", icon: <BrainCircuit size={18} /> },
  { name: "Web Performance & Core Web Vitals", icon: <Rocket size={18} /> },
  { name: "Node.js & CLI Development", icon: <Terminal size={18} /> },
  { name: "Performance Auditing", icon: <BarChart3 size={18} /> },
  { name: "CI/CD Pipelines", icon: <GitBranch size={18} /> },
];

const softSkills = [
  "Problem Solving",
  "Continuous Growth Mindset",
  "Creativity",
  "Committed",
  "Adaptability",
];

// ─── Projects Data ────────────────────────────────────────────────
const projects = [
  {
    title: "NutriFlow",
    category: "Full Stack | Food Aid Distribution",
    year:"",
    description:
      "A robust meal reservation system to streamline food distribution in Gaza. Features real-time capacity tracking, user-specific meal management, and a fully responsive bilingual UI. Optimized kitchen resource allocation and minimized food waste.",
    skills: "Next.js 14, TypeScript, Supabase, Prisma, Tailwind CSS, PWA, i18n",
    image: "/assets/NutriFlow.png",
    liveLink: "https://gaza-food-project.vercel.app",
    githubLink: "https://github.com/Ayaalmadhon2004/Healthy-Food",
  },
  {
    title: "HospiLink",
    category: "Full Stack | Hospital Management",
    year:"",
    description:
      "Comprehensive hospital management system with real-time patient flow tracking, doctor-specific appointment management, electronic health records integration, and role-based access control. Built with a robust RESTful API.",
    skills: "React.js, Node.js, Express.js, TypeScript, PostgreSQL, Socket.io, Docker, CI/CD",
    image: "/assets/HospiLink.png",
    liveLink: "https://hospi-link-two.vercel.app",
    githubLink: "https://github.com/Ayaalmadhon2004/HospiLink",
  },
  {
    title: "Yoosel Digital Agency",
    category: "Frontend | Marketing Platform",
    year:"",
    description:
      "A modern, desktop-first web platform for a digital marketing agency. Designed to showcase services, success stories, and advanced marketing solutions with interactive tools and smooth animations.",
    skills: "React.js, Next.js, Tailwind CSS, GSAP",
    image: "/assets/oosal.png",
    liveLink: "https://yoosal.vercel.app",
    githubLink: "https://github.com/Ayaalmadhon2004/yosal-company",
  },
  {
    title: "E-Commerce Store",
    category: "Frontend | E-Commerce",
    year:"",
    description:
      "A dynamic, fully responsive e-commerce storefront with fluid UI/UX, smooth hover animations, and interactive card transitions for an immersive shopping experience.",
    skills: "React.js, CSS Animations, Responsive Design, UI/UX",
    image: "/assets/Ecommerce.png",
    liveLink: "https://ecommerce-one-teal-22.vercel.app",
    githubLink: "https://github.com/Ayaalmadhon2004/Ecommerce-",
  },
];

// ─── Experience Data ──────────────────────────────────────────────
const experiences = [
  {
    role: "Full Stack Engineering Trainee",
    company: "Linked Trust",
    period: "Jan 2026 – Mar 2026",
    location: "Remote",
    points: [
      "Engineered the transition from web to mobile using React Native, implementing native-specific features including device sensors and notification systems.",
      "Conducted peer code reviews, providing actionable feedback to ensure maintainable and clean code architecture.",
      "Utilized professional Git workflows to manage complex feature branches within a team environment.",
      "Leveraged Supabase and Next.js to build end-to-end features, focusing on secure authentication and real-time data syncing.",
    ],
  },
  {
    role: "React & Next.js Developer (Advanced Path)",
    company: "Gaza Sky Geeks (GSG)",
    period: "Aug 2025 – Dec 2025",
    location: "Gaza",
    points: [
      "Diagnosed rendering bottlenecks, improving site speed by 10% through strategic use of SSR, SSG, and ISR rendering patterns.",
      "Built robust client and server-side state logic using TanStack Query for caching and Zustand/Recoil for global UI state.",
      "Optimized applications for production-ready deployment, ensuring high SEO rankings and fast Largest Contentful Paint (LCP) metrics.",
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
    title: "How Socket.io Powers Real-Time Apps: From Long Polling to Production",
    date: "31 Jul 2026",
    tags: ["Full Stack", "Backend", "Socket.io", "Node.js", "Design Systems"],
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#about"
          className="text-xl font-bold text-gray-900 tracking-tight hover:text-red-700 transition-colors"
        >
          Aya<span className="text-red-700">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-700 transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <button
          className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 space-y-4 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-gray-600 hover:text-red-700 transition-colors"
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
      className="min-h-screen flex items-center pt-20 pb-16 px-6"
    >
      <div className="max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold tracking-wide uppercase">
            Available for opportunities
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
            Hi, I am <span className="text-red-700">Aya</span>,
            <br />
            Creative Technologist
          </h1>
          
          <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
            Creating smart software from challenges, making your story a success.
            I transform fragile architectures into robust, AI-integrated engines,
            deeply optimizing rendering paths, Web Vitals, and system telemetry.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-700 hover:bg-red-600 text-white font-medium rounded-lg transition-all hover:shadow-lg hover:shadow-red-700/25 active:scale-95"
            >
              Let&apos;s Talk <ChevronRight size={18} />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-medium rounded-lg transition-all hover:bg-gray-50 active:scale-95"
            >
              View My Work
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-gray-200/50">
              <Image
                src="/assets/aya.jpg"
                alt="Aya Ahmad Almadhon" 
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Technical Skills
          </h2>
          <div className="w-16 h-1 bg-red-700 rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {technicalSkills.map((skill) => (
            <div
              key={skill.name}
              className="group flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-red-200 hover:shadow-md transition-all duration-300"
            >
              <div className="text-gray-400 group-hover:text-red-700 transition-colors">
                {skill.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {skill.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Soft Skills
          </h3>
          <div className="flex flex-wrap gap-3">
            {softSkills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-red-50 hover:text-red-600 transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Works
            </h2>
            <div className="w-16 h-1 bg-red-700 rounded-full" />
          </div>
          <a
            href="https://github.com/Ayaalmadhon2004"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-700 transition-colors"
          >
            View GitHub <ExternalLink size={16} />
          </a>
        </div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div
                className={`${
                  index % 2 === 1 ? "md:order-2" : ""
                } group relative aspect-video bg-gray-200 rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium text-sm hover:bg-red-50 transition-colors"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 backdrop-blur text-white rounded-lg font-medium text-sm hover:bg-white/20 transition-colors"
                  >
                    Source Code
                  </a>
                </div>
              </div>

              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-red-700 text-white text-xs font-bold rounded-full">
                    {project.year}
                  </span>
                  <span className="text-sm text-gray-500 font-medium">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-700 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {project.description}
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  <span className="font-semibold text-gray-700">Tech Stack:</span>{" "}
                  {project.skills}
                </p>
                <div className="flex gap-4">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-red-700 hover:text-red-600 transition-colors"
                  >
                    Live Link <ExternalLink size={16} />
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Professional Experience
          </h2>
          <div className="w-16 h-1 bg-red-700 rounded-full" />
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative pl-8 md:pl-0 border-l-2 border-gray-200 md:border-l-0 md:grid md:grid-cols-12 md:gap-8"
            >
              <div className="hidden md:block md:col-span-3 text-right pt-2">
                <div className="inline-flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <Calendar size={16} />
                  {exp.period}
                </div>
                <div className="flex items-center justify-end gap-2 text-sm text-gray-400 mt-1">
                  <MapPin size={14} />
                  {exp.location}
                </div>
              </div>

              <div className="hidden md:flex md:col-span-1 justify-center">
                <div className="w-4 h-4 rounded-full bg-red-700 mt-3 ring-4 ring-red-50" />
              </div>

              <div className="md:col-span-8 pb-8">
                <div className="md:hidden flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Calendar size={14} />
                  {exp.period}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase size={20} className="text-red-700" />
                  <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
                </div>
                <p className="text-red-700 font-semibold mb-4">{exp.company}</p>
                <ul className="space-y-3">
                  {exp.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-gray-600 leading-relaxed"
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

        <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Education</h3>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <p className="font-semibold text-gray-800">
                Bachelor of Computer Systems Engineering
              </p>
              <p className="text-gray-600">Al-Azhar University</p>
            </div>
            <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600">
              Expected Graduation: July 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Articles() {
  return (
    <section id="articles" className="py-20 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Articles
            </h2>
            <div className="w-16 h-1 bg-red-700 rounded-full" />
          </div>
          <a
            href="https://medium.com/@ayaalmadhon"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-700 transition-colors"
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
              className="group block p-6 bg-white rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm text-gray-400 font-medium">
                  {article.date}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <div className="flex gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-700 transition-colors">
                {article.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
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
            href="https://medium.com/@ayaalmadhon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-700 transition-colors"
          >
            View all on Medium <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Let&apos;s build something amazing together
        </h2>
        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
          I&apos;m always interested in hearing about new projects and opportunities.
          Whether you have a question or just want to say hi, feel free to reach out!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:ayaalmadhon2004@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-700 hover:bg-red-600 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-red-700/25 active:scale-95"
          >
            <Mail size={20} />
            Get In Touch
          </a>
          <a
            href="https://github.com/Ayaalmadhon2004"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all active:scale-95"
          >
            <ExternalLink size={20} />
            GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-lg font-bold mb-1">Aya Ahmad Almadhon</p>
          <p className="text-gray-400 text-sm">
            Full-Stack Developer | React , Next And Node.js Specialist
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Ayaalmadhon2004"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <GitBranch size={22} />
          </a>
          <a
            href="https://linkedin.com/in/ayaalmadhon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <ExternalLink size={22} />
          </a>
          <a
            href="mailto:ayaalmadhon2004@gmail.com"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail size={22} />
          </a>
        </div>

        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} All rights reserved.
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
      <Contact />
      <Footer />
    </main>
  );
}