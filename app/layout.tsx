import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Aya Ahmad Almadhon | Full Stack Developer",
  description:
    "Full Stack Developer specializing in React, Next.js, TypeScript,Node.js and high-performance web applications. Building scalable, AI-integrated solutions.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Web Performance",
    "Prisma",
    "Supabase",
  ],
  authors: [{ name: "Aya Ahmad Almadhon", url: "https://portfolio-of-aya.vercel.app" }],
  creator: "Aya Ahmad Almadhon",
  openGraph: {
    title: "Aya Ahmad Almadhon | Full Stack Developer",
    description: "Creating smart software from challenges, making your story a success.",
    url: "https://portfolio-of-aya.vercel.app",
    siteName: "Aya Almadhon Portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Aya Ahmad Almadhon",
              "url": "https://portfolio-of-aya.vercel.app",
              "jobTitle": "Full Stack Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              },
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "Al-Azhar University"
              },
              "knowsAbout": [
                "React.js",
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Full Stack Development",
                "Web Performance",
                "Core Web Vitals",
                "Prisma",
                "Supabase",
                "Node.js"
              ],
              "sameAs": [
                "https://github.com/Ayaalmadhon2004",
                "https://www.linkedin.com/in/aya-almadhon2025",
                "https://medium.com/@aya.alaasel123"
              ]
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}