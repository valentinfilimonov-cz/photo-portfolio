import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anastasia Photography",
  description: "Fine art photography portfolio by Anastasia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link className="brand" href="/">
            Anastasia Photography
          </Link>
          <nav className="site-nav" aria-label="Main navigation">
            <Link href="/albums">Albums</Link>
            <Link href="/about">About</Link>
          </nav>
        </header>

        {children}

        <footer className="site-footer">
          <p>Fine art photography portfolio</p>
          <Link href="/admin/index.html">Admin</Link>
        </footer>
      </body>
    </html>
  );
}
