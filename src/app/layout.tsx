import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { QueryProvider } from "@/components/providers/query-provider";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  applicationName: "CommercePulse",
  title: {
    default: "CommercePulse",
    template: "%s | CommercePulse",
  },
  description:
    "Frontend-focused commerce analytics SaaS for orders, inventory, customers, campaigns, insights and store preferences.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
