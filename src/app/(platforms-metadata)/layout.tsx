import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Platforms - RebelBase",
  description:
    "RebelBase serves as a hub for gaming enthusiasts, offering personalized recommendations, trending titles, and curated lists across various genres and platforms.",
};

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return children;
}
