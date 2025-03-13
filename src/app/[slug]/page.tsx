"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import { ArrowUp, Grip } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
type Data = {
  title: string;
  list: string[];
  back_chapter: string;
  next_chapter: string;
  tema: string;
  genre: string[];
};


export default function MangaPage() {
  const params = useParams();
  const router = useRouter();
  const slug = Array.isArray(params.slug) ? params.slug.join("-") : params.slug;
  const [getData, setData] = useState<Data | null>(null);
  const [showButton, setShowButton] = useState(false);
  const title = 
  getData?.back_chapter === "" 
    ? (getData?.next_chapter === "" ? "Default Title" : getData?.next_chapter) 
    : getData?.back_chapter || "";
  const slicedTitle = title.split("-").slice(0, -2).join("-");
  useEffect(() => {
    if (!slug) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/baca/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setData(data.data);
        } else {
          console.error("Unexpected API structure:", data);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [slug]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handlePrevious = () => {
    if (getData?.back_chapter) {
      router.push(`/${getData.back_chapter.replace("/", "")}`);
    }
  };

  const handleNext = () => {
    if (getData?.next_chapter) {
      router.push(`/${getData.next_chapter.replace("/", "")}`);
    }
  };
  const scrollToTop = () => {
    let scrollPosition = window.scrollY;
    const scrollStep = scrollPosition / 50;

    const smoothScroll = () => {
      if (scrollPosition > 0) {
        scrollPosition -= scrollStep;
        window.scrollTo(0, scrollPosition);
        requestAnimationFrame(smoothScroll);
      }
    };
    requestAnimationFrame(smoothScroll);
  };
  return (
    <>
      {getData ? (
        <ComponentCard title={getData.title}>

          <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
            <button
              onClick={handlePrevious}
              disabled={!getData.back_chapter}
              className="flex px-4 py-2 bg-gray-700 text-white rounded disabled:text-gray-500 hover:bg-gray-800"
            >
                      « Chapter Sebelumnya 
            </button>
            <Link href={`/komik/${slicedTitle}`} className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 flex gap-0.5 items-center"> <Grip size={24}/>Daftar Chapter</Link>
            <button
              onClick={handleNext}
              disabled={!getData.next_chapter}
              className="flex px-4 py-2 bg-gray-700 text-white rounded disabled:text-gray-500 hover:bg-gray-800"
            >
              Chapter Selanjutnya »
            </button>
          </div>

          <div className="flex flex-col items-center">
            {getData.list.map((list, index) => (
              <Image
                key={index}
                src={list}
                width={500}
                height={500}
                alt={getData.title}
                className="w-full md:w-[50rem]"
              />
            ))}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
            <button
              onClick={handlePrevious}
              disabled={!getData.back_chapter}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:text-gray-500 hover:bg-gray-800"
            >
               « Chapter Sebelumnya 
            </button>
            <Link href={`/komik/${slicedTitle}`} className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 flex gap-0.5 items-center"> <Grip size={24}/>Daftar Chapter</Link>
            <button
              onClick={handleNext}
              disabled={!getData.next_chapter}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:text-gray-500 hover:bg-gray-800"
            >
              Chapter Selanjutnya »
            </button>
          {showButton && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 p-3 bg-yellow-400 text-black rounded-full shadow-lg hover:bg-yellow-500 transition-all"
            >
              <ArrowUp size={24} />
            </button>
          )}
                  </div>
          
        </ComponentCard>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
