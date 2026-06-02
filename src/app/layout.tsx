import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Company Brief Agent",
  description: "AI-powered company research briefs for job seekers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
