/* eslint-disable @next/next/no-img-element */
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Link from "next/link";
import { Bookmark } from "lucide-react";
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
  colored: string;
  last_update: string;
  chapter: string;
}[];

type FirstChapter = {
  title: string;
  chapter_url: string;
};

type LastChapter = {
  title: string;
  chapter_url: string;
};

type Data = {
  title: string;
  chapter_list: Chapter[];
  sinopsis: string;
  status: string;
  img: string;
  type: string;
  released: string;
  related: RelatedData;
  author: string;
  artist: string;
  ratting: string;
  first_chapter: FirstChapter;
  last_chapter: LastChapter;
  genre: string[];
  href: string;
};
type Bookmark = {
  href: string;
  title: string;
  img: string;
  status: string;
  ratting: string;
  sinopsis: string;
};
export default function MangaPage() {
  const { slug } = useParams();
  const [getData, setData] = useState<Data | null>(null);
  const rating = parseInt(getData?.ratting || "0", 10);
  const [clickedLinks, setClickedLinks] = useState<string[]>([]);
  const [bookMarks, setBookMarks] = useState<Bookmark[]>([]);
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
    const storedLinks = JSON.parse(localStorage.getItem("clickedLinks") || "[]");
    setClickedLinks(storedLinks);
    const storedBookmarks = JSON.parse(localStorage.getItem("bookMarks") || "[]");
    const validBookmarks: Bookmark[] = storedBookmarks.filter((item: Bookmark | null) => item !== null);
    setBookMarks(validBookmarks);
  }, [slug]);

  const handleClick = (href: string) => {
    if (!clickedLinks.includes(href)) {
      const newClickedLinks = [...clickedLinks, href];
      setClickedLinks(newClickedLinks);
      localStorage.setItem("clickedLinks", JSON.stringify(newClickedLinks));
    }
  };
  const isBookmarked = bookMarks.some((item) => item.href === getData?.href);

  const handleBookmark = () => {
    if (!getData) return;

    let newBookmarks;
    if (isBookmarked) {
      newBookmarks = bookMarks.filter((item) => item.href !== getData.href);
    } else {
      newBookmarks = [...bookMarks, getData];
    }

    setBookMarks(newBookmarks);
    localStorage.setItem("bookMarks", JSON.stringify(newBookmarks));
  };

  return (
    <>
      {getData ? (
        <ComponentCard title={getData.title} className="mt-20">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Cover Image */}
            <div className="flex flex-col items-center">
              <img
                src={getData.img}
                alt={getData.title}
                className="rounded-lg w-60 h-auto shadow-md"
              />
              <button
                className="mt-4 bg-blue-600 px-4 py-2 text-white rounded-md shadow-md hover:bg-blue-700 flex items-center gap-2"
                onClick={handleBookmark}
              >
                <Bookmark size={16} fill={isBookmarked ? "currentColor" : ""} />
                <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
              </button>
              <div className="mt-3">
                <StarRating rating={rating} realRatting={getData.ratting} />
              </div>
            </div>

            {/* Info Section */}
            <div className="text-gray-200 text-sm md:text-lg">
              <p className="mb-3 text-lg font-semibold">Sinopsis</p>
              <p className="text-gray-400 mb-4">{getData.sinopsis}</p>

              <p><strong>Status:</strong> {getData.status}</p>
              <p><strong>Tipe:</strong> {getData.type}</p>
              <p><strong>Rilis:</strong> {getData.released}</p>
              <p><strong>Author:</strong> {getData.author}</p>
              <p><strong>Artist:</strong> {getData.artist}</p>

              {/* Genre */}
              <div>
                <p className="font-semibold">Genre:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {getData.genre.map((genre, index) => (
                    <Link
                      key={index}
                      href={`/genre/${genre}`}
                      className="bg-neutral-700 text-white px-3 py-1 rounded-md text-xs hover:text-blue-700"
                    >
                      {genre}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <ComponentCard title="Chapters" className="mt-5 h-[35rem] lg:h-[34rem] flex flex-col">
            <div className="grid grid-cols-2 gap-4 mb-2">
              <Link
                href={`/baca/${getData.first_chapter.chapter_url}`}
                className="flex flex-col items-center w-full p-3 text-lg rounded-md shadow-sm hover:shadow-md transition hover:bg-gray-700/40 bg-blue-500 text-gray-200"
              >
                <span>First Chapter</span>
                <span className="text-sm">{getData.first_chapter.title}</span>
              </Link>
              <Link
                href={`/baca/${getData.last_chapter.chapter_url}`}
                className="flex flex-col w-full p-3 items-center text-lg rounded-md shadow-sm hover:shadow-md transition hover:bg-gray-700/40 bg-blue-500 text-gray-200"
              >
                <span>Last Chapter</span>
                <span className="text-sm">{getData.last_chapter.title}</span>
              </Link>
            </div>

            <div className="overflow-y-auto max-h-[22rem] p-2">
              <div className="divide-y divide-gray-700 border border-gray-700 rounded-md">
                {getData.chapter_list.map((ch, index) => (
                  <Link
                    key={index}
                    href={`/baca/${ch.link}`}
                    onClick={() => handleClick(ch.link)}
                    className={`flex items-center justify-between px-4 py-3 text-sm md:text-base transition-colors
                      ${clickedLinks.includes(ch.link)
                        ? "bg-gray-700/50 text-gray-400 hover:bg-gray-800/50"
                        : "hover:bg-gray-900/50 text-white"}
                    `}
                  >
                    <span className="font-semibold">{ch.chapter}</span>
                    <span className="text-xs text-gray-500">{ch.update}</span>
                  </Link>
                ))}
              </div>
            </div>
          </ComponentCard>
          <RelatedCard card={getData.related.map((item) => ({
            link: `/${item.link}`,
            title: item.title,
            img: item.img,
            colored: item.colored,
            type: item.type,
            last_update: item.last_update,
            chapter: item.chapter,
          }))} />
        </ComponentCard>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </>
  );
}
