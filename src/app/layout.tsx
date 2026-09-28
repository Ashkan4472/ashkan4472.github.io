import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Silkscreen } from "next/font/google";
import "./globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });
const display = Instrument_Serif({ variable: "--font-display", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const pixel = Silkscreen({ variable: "--font-pixel", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ashkan.is-a.dev"),
  title: "Ashkan Tofangdar · Software Developer",
  description:
    "Ashkan Tofangdar, software developer. Web, mobile, AI and games: I build what doesn't exist yet.",
  openGraph: {
    title: "Ashkan Tofangdar · Software Developer",
    description: "Level 9+ Software Developer. Web, mobile, AI sorcery and worldbuilding.",
    url: "https://ashkan.is-a.dev",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090d",
};

// Set the theme before first paint so there's no flash.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.dataset.theme='light'}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${sans.variable} ${mono.variable} ${display.variable} ${pixel.variable} antialiased`}>
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
