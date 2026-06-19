import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

import "./globals.css";
import MainLayout from "../core/Mainlayouts";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "RestfulBlanket",
  description:
    "Hand-crafted weighted blankets and duvets designed for deeper sleep and relaxation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
