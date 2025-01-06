import type { Metadata } from "next";
import { Inter, Poppins, Rubik_Mono_One } from "next/font/google";
import "./globals.css";
import Header from "./_layout/Header";
import Footer from "./_layout/Footer";
import QueryProviderWrapper from "@/lib/tanstack/components/QueryProviderWrapper";

const rubik_mono_one = Rubik_Mono_One({
  weight: ["400"],
  variable: "--font-display",
  subsets: ["latin"],
});
const inter = Inter({
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  subsets: ["latin"],
});
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-headings",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RebelBase",
  description:
    "RebelBase serves as a hub for gaming enthusiasts, offering personalized recommendations, trending titles, and curated lists across various genres and platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik_mono_one.variable} ${inter.variable} ${poppins.variable} font-body`}
      >
        <QueryProviderWrapper>
          <Header />

          {children}
        </QueryProviderWrapper>

        <Footer />
      </body>
    </html>
  );
}
