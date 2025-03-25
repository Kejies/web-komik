"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/rating";
import RelatedCard from "@/components/cards/RelatedCard";
type Chapter = {
  link: string;
  chapter: string;
  update: string;
};
type RelatedData = {
  link: string;
  img: string;
  title: string;
  subtitle: string;
  type: string;
  jenis: string;
}[];
type FirstChapter = {
  title: string;
  chapter_url: string;
}
type LastChapter = {
  title: string;
  chapter_url: string;
}
type Data = {
  title: string;
  chapter_list: Chapter[];
  short_sinopsis: string;
  status: string;
  img: string;
  type: string;
  related: RelatedData;
  author: string;
  ilustrator: string;
  ratting: string;
  first_chapter: FirstChapter;
  last_chapter: LastChapter;
  genre: string[];
};

export default function MangaPage() {
  const { slug } = useParams();
  const [getData, setData] = useState<Data | null>(null);
  const rating = parseInt(getData?.ratting || "0", 10);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/detail/${slug}`)
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

  return (
    <>
      {getData ? (
        <ComponentCard title={getData.title} desc={getData.short_sinopsis}>
          {getData.img && (
            <div className="flex flex-col md:flex-row gap-4">
              <Image
                src={getData.img}
                width={200}
                height={300}
                alt={getData.title || "Gambar Komik"}
                quality={100}
                priority={true} 
                className="rounded-lg w-auto h-auto shadow-md mx-auto md:mx-0"
              />
              <div className="flex flex-col gap-2 text-sm md:text-base">
                <p><strong>Status:</strong> {getData.status}</p>
                <p><strong>Jenis Komik:</strong> {getData.type}</p>
                <p><strong>Pengarang:</strong> {getData.author}</p>
                <p><strong>Ilustrator:</strong> {getData.ilustrator}</p>
                <StarRating rating={rating} realRatting={getData.ratting}/>
                <div className="flex flex-wrap gap-2 mt-2">
                  {getData.genre.map((genre, index) => (
                    <Link
                      key={index}
                      href={genre}
                      className="bg-slate-500 text-white px-3 py-1 rounded-full text-xs"
                    >
                      {genre}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          <ComponentCard title="Chapters" className="mt-5 h-[35rem] lg:h-[34rem] flex flex-col">
            <div className="grid grid-cols-2 gap-4 mb-2">
              <Link
                href={`/${getData.first_chapter.chapter_url}`}
                className="flex flex-col items-center w-full p-3 text-lg rounded-md shadow-sm hover:shadow-md transition hover:bg-gray-700/40 bg-yellow-500 text-gray-200"
              >
              <span>First Chapter</span>
                <span className="text-sm">{getData.first_chapter.title}</span>
              </Link>
              <Link
                href={`/${getData.last_chapter.chapter_url}`}
                className="flex flex-col w-full p-3 items-center text-lg rounded-md shadow-sm hover:shadow-md transition hover:bg-gray-700/40 bg-yellow-500 text-gray-200"
                >
                <span>Last Chapter</span>
                <span className="text-sm">{getData.last_chapter.title}</span>
              </Link>
            </div>

            <div className="overflow-y-auto max-h-[22rem] p-2 ">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {getData.chapter_list.map((ch, index) => (
                  <Link
                    key={index}
                    href={`/${ch.link}`}
                    className="border-2 border-white p-2 rounded-md flex flex-col shadow-sm hover:shadow-md transition hover:bg-gray-700/40 text-yellow-500"
                  >
                    <span className="font-semibold">{ch.chapter}</span>
                    <span className="text-xs text-gray-500">{ch.update}</span>
                  </Link>
                ))}
              </div>
            </div>
          </ComponentCard>
          <RelatedCard
          card={getData.related.map((item) => ({
            link: `/${item.link}`,
            title: item.title,
            img: item.img,
          }))}
        />
        </ComponentCard>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </>
  );
}
