import "./globals.css";
import type { Metadata } from "next";
import { Bebas_Neue, Poppins } from "next/font/google";
import CustomCursorProvider from "../components/CustomCursor";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});
const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "TiltPenguin",
  description:
    "Tiltpenguin is a solo indie game studio building experimental and story driven games.",
  alternates: {
    canonical: "https://tiltpenguin.com",
  },
  icons: {
    icon: [
      { url: "/icon.svg", media: "(prefers-color-scheme: light)" },
      { url: "/icon.svg", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`bg-tilt-grid min-h-dvh ${bebas.variable} ${poppins.variable} font-body`}
      >
        <CustomCursorProvider>{children}</CustomCursorProvider>
      </body>
    </html>
  );
}
