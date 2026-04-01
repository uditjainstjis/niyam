import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Niyam - Daily Wisdom & Principles",
  description: "Discover daily niyams (principles) to guide your life with wisdom and purpose. Get inspired with timeless teachings delivered beautifully.",
};

export default function RootLayout({ children }) {
  const setThemeScript = `(() => {
    try {
      const theme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (theme === 'dark' || (!theme && prefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      // ignore
    }
  })();`;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Inline script to initialize theme before React hydration to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: setThemeScript }} />
        {children}
      </body>
    </html>
  );
}
