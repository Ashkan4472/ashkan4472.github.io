import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const sans = Space_Grotesk({ variable: "--font-sans", subsets: ["latin"] });
const mono = Space_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://ashkan.is-a.dev"),
  title: "Ashkan Tofangdar · Software Developer",
  description: "Ashkan Tofangdar, software developer. Web, mobile, AI and games: I build what doesn't exist yet.",
  openGraph: {
    title: "Ashkan Tofangdar · Software Developer",
    description: "Level 9+ Software Developer. Web, mobile, AI sorcery and worldbuilding.",
    url: "https://ashkan.is-a.dev",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#0a0d0b" };

// Set the theme before first paint so there's no flash.
const themeScript = `try{if(localStorage.getItem('theme')==='light')document.documentElement.dataset.theme='light'}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${sans.variable} ${mono.variable} antialiased`}>
        {children}
        <div className="crt" aria-hidden />
      </body>
    </html>
  );
}
