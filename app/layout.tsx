import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Aya Ahmad Almadhon | Frontend Developer",
  description:
    "Frontend Developer specializing in React, Next.js, and high-performance web applications. Building scalable solutions with AI integration.",
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Web Performance",
  ],
  authors: [{ name: "Aya Ahmad Almadhon" }],
  openGraph: {
    title: "Aya Ahmad Almadhon | Frontend Developer",
    description: "Creating smart software from challenges, making your story a success.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}