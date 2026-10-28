import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-of-aya.vercel.app"),
  title: "Aya Almadhon | Full Stack Developer",
  description:
    "Aya Almadhon is a full stack developer from Palestine building fast, useful web apps with React, Next.js, TypeScript and Node.js.",
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
  authors: [{ name: "Aya Almadhon", url: "https://portfolio-of-aya.vercel.app" }],
  creator: "Aya Almadhon",
  alternates: {
    canonical: "https://portfolio-of-aya.vercel.app",
  },
  openGraph: {
    title: "Aya Almadhon | Full Stack Developer",
    description: "A full stack developer from Palestine building web apps that solve real problems.",
    url: "https://portfolio-of-aya.vercel.app",
    siteName: "Aya Almadhon Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/aya-og.png",
        width: 1200,
        height: 630,
        alt: "Aya Almadhon - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aya Almadhon | Full Stack Developer",
    description: "Full stack developer from Palestine. React, Next.js, TypeScript and Node.js.",
    images: ["/assets/aya-og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="google-site-verification" content="4gZehlHjCZzh5cl0zr56msdLcFvdIu50kexnMyzVEFU" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Aya Almadhon",
              url: "https://portfolio-of-aya.vercel.app",
              jobTitle: "Full Stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Al-Azhar University",
              },
              knowsAbout: [
                "React.js",
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Full Stack Development",
                "Web Performance",
                "Core Web Vitals",
                "Prisma",
                "Supabase",
                "Node.js",
              ],
              sameAs: [
                "https://github.com/Ayaalmadhon2004",
                "https://www.linkedin.com/in/aya-almadhon2025",
                "https://medium.com/@aya.alaasel123",
                "https://www.upwork.com/freelancers/~016362daad477e5a04",
                "https://mostaql.com/u/aya_almadhon",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}