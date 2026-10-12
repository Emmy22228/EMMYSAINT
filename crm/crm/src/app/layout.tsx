import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const body = Inter({ subsets: ["latin"], variable: "--font-body" });

// Private app: keep it out of search engines.
export const metadata: Metadata = {
  title: { default: "CRM", template: "%s | CRM" },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={body.variable}>
      <body className="font-body min-h-screen">{children}</body>
    </html>
  );
}
