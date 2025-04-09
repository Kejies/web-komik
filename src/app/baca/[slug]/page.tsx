/* eslint-disable @next/next/no-img-element */
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import { ArrowUp } from "lucide-react";
import ChapterPagination from "@/components/ChapterPagination";
import FavButton from "@/components/FavButton";

type Data = {
  title: string;
  content: string[];
  prev_chapter: string;
  daftar_chapter: string;
  next_chapter: string;
  genre: string[];
};

export default function MangaPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug.join("-") : params.slug;
  const [getData, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content/${slug}`);

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        if (data.data) {
          setData(data.data);
        } else {
          console.error("Unexpected API structure:", data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [slug]);


  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-blue-500"></div>
      </div>
    );
  }
  return (
    <>
      {getData && (
        <ComponentCard className="mt-20" titleChapter={getData.title}>
          <div className="bg-base ring-slate-900 ring-2 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="text-white text-base leading-relaxed">
              Selamat membaca komik <span className="font-semibold">{getData.title}</span> bahasa Indonesia. Saksikan kelanjutan cerita yang membawa berbagai nuansa dan pengalaman membaca yang seru.
            </p>
            <FavButton
              link_chapter={slug ?? ""}
              daftar_chapter={getData.daftar_chapter ?? ""}
            />
          </div>
          <ChapterPagination prev_chapter={getData.prev_chapter} daftar_chapter={getData.daftar_chapter} next_chapter={getData.next_chapter} />

          <div className="flex flex-col items-center">
            {getData.content.map((content, index) => (
              <img
                key={index}
                src={content}
                width={800}
                height={600}
                alt={getData.title}
                className="w-full h-auto md:w-[50rem]"
              />
            ))}
          </div>
          <ChapterPagination prev_chapter={getData.prev_chapter} daftar_chapter={getData.daftar_chapter} next_chapter={getData.next_chapter} />
          {showButton && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 p-3 bg-blue-500 text-gray-200 rounded-full shadow-lg hover:bg-blue-600 transition-all"
            >
              <ArrowUp size={24} />
            </button>
          )}
        </ComponentCard>

      )}
    </>
  );
}
