import type { Metadata } from "next";
import { Inter_Tight, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

const interTight = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Azura.finance — Launch. Trade. Connect.",
  description:
    "The fastest memecoin launchpad on BNB Chain. Launch your token, trade with confidence, and connect with a thriving community — powered by Azura protocol.",
  keywords: ["DeFi", "BNB Chain", "memecoin", "launchpad", "token launch", "Azura"],
  openGraph: {
    title: "Azura.finance — Launch. Trade. Connect.",
    description: "The fastest memecoin launchpad on BNB Chain.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body className="h-full overflow-hidden">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
