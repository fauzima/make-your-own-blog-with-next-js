import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ThemeContextProvider from "@/helpers/ThemeContext";
import { Tinos } from "next/font/google";

export const metadata: Metadata = {
  title: "The Blog",
  description: "The Blog",
};

const tinos = Tinos({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeContextProvider>
        <body
          className={`${tinos.className} min-h-screen bg-neutral-200 text-neutral-800 antialiased transition-colors ease-in-out hover:cursor-default dark:bg-neutral-800 dark:text-neutral-200`}
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
          </div>
        </body>
      </ThemeContextProvider>
    </html>
  );
}
