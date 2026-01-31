import type { Metadata } from "next";
import { Nunito_Sans, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const hakuna = localFont({
  src: "../public/fonts/Hakuna.otf",
  variable: "--font-hakuna",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Localbuka",
  description: "Localbuka - Your local marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${nunitoSans.variable} ${jetbrainsMono.variable} ${hakuna.variable} font-sans antialiased`}
        style={{ backgroundColor: "#1a1a1a" }}
      >
        {children}
      </body>
    </html>
  );
}
