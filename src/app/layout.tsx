import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const satoshi = localFont({
  src: "../../public/fonts/Satoshi/Satoshi-Regular.woff2",
  variable: "--font-satoshi",
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vestor — Community-Voted AI Project Launchpad on Solana",
  description:
    "Submit, vote on, and fund AI project launches on Solana. The crowd picks the winner, funds it, and receives the token supply at launch.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} ${orbitron.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
