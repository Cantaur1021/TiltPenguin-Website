import "./globals.css";
import type { Metadata } from "next";
import { Bebas_Neue, Poppins } from "next/font/google";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const poppins = Poppins({ weight: ["300","400","500","600"], subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "TiltPenguin",
  description: "A scrappy solo studio powered by caffeine and delusion.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-tilt-grid min-h-dvh ${bebas.variable} ${poppins.variable} font-body`}>
        {children}
      </body>
    </html>
  );
}
