import type { Metadata } from "next";
import NavbarAnime from "@/components/NavbarAnime";


export const metadata: Metadata = {
  title: "Cihuy Anime",
  description: "Cihuy Anime",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavbarAnime />
      {children}
    </div>
  );
}
