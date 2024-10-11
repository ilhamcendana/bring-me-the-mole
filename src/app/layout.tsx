import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import BackgroundGame from "../components/misc/BackgroundGame/BackgroundGame";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Bring Me The Mole",
  description: "Let's see if your clicking mouse game can beat this game.",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  userScalable:false,
  maximumScale:1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BackgroundGame  />
        {children}
      </body>
    </html>
  );
}
