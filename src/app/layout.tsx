import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { FaBlog } from "react-icons/fa6";

export const metadata: Metadata = {
  title: {
    template: "Blog | %s",
    default: "Blog",
  },
  description: "Blog",
  icons: [`${(<FaBlog />)}`],
  openGraph: {
    images: [
      `https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/11/how-to-write-a-blog-post-760x406.jpeg`,
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen mx-auto flex flex-col hover:cursor-default">
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
