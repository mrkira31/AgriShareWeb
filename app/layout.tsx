import type { Metadata } from "next";
import { AppShell } from "@/components/shell";
import "@fontsource-variable/manrope";
import "@fontsource-variable/playfair-display";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "AgriShare | The Sicilian farming marketplace", template: "%s | AgriShare" },
  description: "Rent farm machinery and cold storage from local owners across Sicily.",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><AppShell>{children}</AppShell></body></html>;
}
