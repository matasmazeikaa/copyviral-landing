import type { Metadata } from "next";
import { Outfit, DM_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "CopyViral - AI-Powered Viral Video Editor",
  description:
    "Copy viral videos with AI. Automatically analyze and recreate trending video styles, cuts, and pacing. Transform any reference video into your own masterpiece.",
  keywords: [
    "video editor",
    "AI video",
    "viral videos",
    "video editing",
    "content creation",
  ],
  openGraph: {
    title: "CopyViral - AI-Powered Viral Video Editor",
    description:
      "Copy viral videos with AI. Automatically analyze and recreate trending video styles.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${dmMono.variable} font-sans antialiased`}
        style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
