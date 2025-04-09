/* eslint-disable @next/next/no-img-element */
"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import { ArrowUp, Grip } from "lucide-react";
import Link from "next/link";

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
  const router = useRouter();
  const slug = Array.isArray(params.slug) ? params.slug.join("-") : params.slug;
  const [clickedLinks, setClickedLinks] = useState<string[]>([]);
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
    const storedLinks = JSON.parse(localStorage.getItem("clickedLinks") || "[]");
    setClickedLinks(storedLinks);
    fetchData();
  }, [slug]);

  const handleClick = (href: string) => {
    if (!clickedLinks.includes(href)) {
      const newClickedLinks = [...clickedLinks, href];
      setClickedLinks(newClickedLinks);
      localStorage.setItem("clickedLinks", JSON.stringify(newClickedLinks));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePrevious = () => {
    if (getData?.prev_chapter) {
      handleClick(getData.prev_chapter)
      router.push(`/baca/${getData.prev_chapter.replace("/", "")}`);
    }
  };

  const handleNext = () => {
    if (getData?.next_chapter) {
      handleClick(getData.next_chapter)
      router.push(`/baca/${getData.next_chapter.replace("/", "")}`);
    }
  };

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
        <ComponentCard title={getData.title}>
          {/* Navigasi Chapter */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
            <button
              onClick={handlePrevious}
              disabled={!getData.prev_chapter}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:text-gray-500 hover:bg-gray-800"
            >
              « Chapter Sebelumnya
            </button>
            <Link
              href={`/komik/${getData.daftar_chapter}`}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 flex gap-0.5 items-center"
            >
              <Grip size={24} />
              Daftar Chapter
            </Link>
            <button
              onClick={handleNext}
              disabled={!getData.next_chapter}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:text-gray-500 hover:bg-gray-800"
            >
              Chapter Selanjutnya »
            </button>
          </div>


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

          <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
            <button
              onClick={handlePrevious}
              disabled={!getData.prev_chapter}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:text-gray-500 hover:bg-gray-800"
            >
              « Chapter Sebelumnya
            </button>
            <Link
              href={`/komik/${getData.daftar_chapter}`}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 flex gap-0.5 items-center"
            >
              <Grip size={24} />
              Daftar Chapter
            </Link>
            <button
              onClick={handleNext}
              disabled={!getData.next_chapter}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:text-gray-500 hover:bg-gray-800"
            >
              Chapter Selanjutnya »
            </button>
          </div>

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
