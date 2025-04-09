"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Favorite = {
  link_chapter: string;
  daftar_chapter: string;
};

type Komik = {
  title: string;
  img: string;
  chapters: {
    title: string;
    updated_at?: string;
    endpoint: string;
  }[];
};

export default function FavoritePage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [komikData, setKomikData] = useState<Record<string, Komik>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      const parsed: Favorite[] = JSON.parse(stored);
      setFavorites(parsed);

      const uniqueSlugs = [...new Set(parsed.map(f => f.daftar_chapter))];
      Promise.all(
        uniqueSlugs.map(slug =>
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/detail/${slug}`)
            .then(res => res.json())
            .then(data => ({ [slug]: data.data }))
        )
      ).then(results => {
        const merged = Object.assign({}, ...results);
        setKomikData(merged);
      });
    }
  }, []);

  // Group favorite episodes by komik
  const grouped = favorites.reduce<Record<string, Favorite[]>>((acc, fav) => {
    if (!acc[fav.daftar_chapter]) acc[fav.daftar_chapter] = [];
    acc[fav.daftar_chapter].push(fav);
    return acc;
  }, {});

  const toggleExpand = (slug: string) => {
    setExpanded(prev => ({ ...prev, [slug]: !prev[slug] }));
  };

  return (
    <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
      {Object.entries(grouped).map(([slug, episodes]) => {
        const komik = komikData[slug];
        if (!komik) return null;

        const isOpen = expanded[slug] ?? false;
        const episodesToShow = isOpen ? episodes : episodes.slice(0, 3);

        return (
          <div
            key={slug}
            className="flex justify-between bg-neutral-900 rounded-xl overflow-hidden shadow-lg w-80 h-64 max-w-[100rem]">
            <Image
              src={komik.img}
              alt={komik.title}
              width={100}
              height={140}
              className="rounded-md object-cover shadow-lg w-44 h-full"
            />

            <div className="flex flex-col justify-between flex-1">
              <h2 className="text-white font-semibold text-base mb-2 line-clamp-1">
                {komik.title}
              </h2>
              <div className="space-y-1 text-sm">
                {episodesToShow.map((ep, i) => {
                  const endpoint = ep.link_chapter;
                  const fullChapter = endpoint.split("/").pop()?.replace(/-/g, " ") || "";
                  return (
                    <div key={i} className="flex justify-between items-center">
                      <Link
                        href={`/baca/${endpoint}`}
                        className="text-white hover:text-blue-400 flex items-center gap-2"
                      >
                        <span className="w-2 h-2 bg-red-500 rounded-full" />
                        Ch. {fullChapter}
                      </Link>
                      {/* Optional: waktu update jika tersedia */}
                      {/* <span className="text-xs text-gray-400">2 hari lalu</span> */}
                    </div>
                  );
                })}
                {episodes.length > 3 && (
                  <button
                    onClick={() => toggleExpand(slug)}
                    className="text-xs text-gray-400 hover:text-white mt-1"
                  >
                    {isOpen ? "Sembunyikan" : "Lihat Semua"}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}


