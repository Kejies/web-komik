"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Image from "next/image";
type Chapter = {
  url: string;
  chapter: string;
  update: string;
};
type Data = {
  judul: string;
  chapter: Chapter[];
  short_sinopsis: string;
  status: string;
  img: string;
  tema: string;
  genre: string[];
};

export default function MangaPage() {
  const { slug } = useParams();
  const [getData, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/detail/${slug}`)
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

  return (
        <>
      {getData ? (
    <ComponentCard title={getData.judul} desc={getData.short_sinopsis}>
        {getData.img && (
            <div className="flex">
                <Image 
                    src={getData.img} 
                    width={200} 
                    height={300} 
                    alt={getData.judul || "Gambar Manga"} 
                    unoptimized 
                />
                <div className="mx-4">
                    <h1>Status: {getData.status}</h1>
                    <h1>Jenis komik: {getData.status}</h1>
                    <h1>Pengarang: {getData.status}</h1>
                    <h1>Ilustrator: {getData.status}</h1>
                    <h1>Tema: {getData.tema}</h1>
                    <div className="flex flex-row gap-2 items-center">
                        Genre :
                        {/* {getData.genre.map((genre, index) => (
                        <Link key={index} href={genre} className="bg-slate-500 p-1 rounded-xl">{genre}</Link>
                        ))} */}
                    </div>
                </div>
            </div>
        )}
          <h2 className="mt-4 text-lg font-semibold">Chapters:</h2>
          <ul className="mt-2 space-y-2">
            {getData.chapter.map((ch, index) => (
              <li key={index} className="border p-2 rounded-md">
                <a href={`/${ch.url}`} className="text-blue-500 hover:underline">
                  {ch.chapter} - {ch.update}
                </a>
              </li>
            ))}
          </ul>
    </ComponentCard>
      ) : (
          <p>Loading...</p>
        )}
        </>
  );
}
