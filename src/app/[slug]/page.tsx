"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Image from "next/image";

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
  const chapterNumber = slug ? slug.split("-").pop() : "1";

  console.log("Chapter:", chapterNumber);

  const [getData, setData] = useState<Data | null>(null);

  useEffect(() => {
    if (!slug) return;

    fetch(`https://laravel-api-manga-scraper.vercel.app/api/api/baca/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);
        if (data.data) {
          setData(data.data);
        } else {
          console.error("Unexpected API structure:", data);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [slug]);

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

  return (
    <>
      {getData ? (
        <ComponentCard title={getData.title}>

          <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
            <button
              onClick={handlePrevious}
              disabled={!getData.back_chapter}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:bg-gray-500"
            >
              Chapter Sebelumnya
            </button>

            <button
              onClick={handleNext}
              disabled={!getData.next_chapter}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:bg-gray-500"
            >
              Chapter Selanjutnya
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
                className="w-full md:w-[45rem]"
              />
            ))}
          </div>

          {/* ✅ Pagination di Bawah */}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
            <button
              onClick={handlePrevious}
              disabled={!getData.back_chapter}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:bg-gray-500"
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!getData.next_chapter}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:bg-gray-500"
            >
              Next
            </button>
          </div>
          
        </ComponentCard>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
