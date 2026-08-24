import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Arif Emin Köklü",
  description: "Arif Emin Köklü'nün Portfolyosu",
  icons: {
    icon: '/images/avatar.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="j9sYk7iyS10wDbxGU7Kxrl1lZYkLaChmgu7FiqOz8TU" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} h-full w-full`}>
        {children}
      </body>
    </html>
  );
}
