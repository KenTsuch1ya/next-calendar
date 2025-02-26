import { Suspense } from "react";
import type { Metadata } from "next";
import { Lato } from "next/font/google";

import Header from "@/components/layout/Header";
import "@/styles/globals.css";

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${lato.className}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
