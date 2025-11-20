import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FILI - Personal Website",
  description: "Personal website with LOKI hero animation and AI chat interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
