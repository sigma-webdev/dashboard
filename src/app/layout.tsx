import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Management App",
  description:
    "A simple task management application built with Next.js and MongoDB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container mx-auto p-4">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
