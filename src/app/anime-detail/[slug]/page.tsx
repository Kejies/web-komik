/* eslint-disable @next/next/no-img-element */
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import StarRating from "@/components/rating";

type episodeFL = {
    link: string;
    episode: string;
    title: string;
};
type episodeList = {
    link: string;
    episode: string;
    title: string;
    epsupdate: string;
};

type relatedAnime = {
    link: string;
    image: string;
    title: string;
    category: string;
    ratting: string;
    jenis: string;
    colored: string;
    epsupdate: string;
}[];

type genre = {
    title: string;
    link: string;
};


type Data = {
    title: string;
    episodeList: episodeList[];
    episodeFL: episodeFL[];
    sinopsis: string;
    status: string;
    image: string;
    type: string;
    released: string;
    relatedAnime: relatedAnime[];
    duration: string;
    studios: string;
    ratting: string;
    epsupdate: string;
    genre: genre;
    href: string;
};
type Bookmark = {
    href: string;
    title: string;
    image: string;
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
    console.log(`http://localhost:5000/api/detail/${slug}`)
    useEffect(() => {
        fetch(`http://localhost:5000/api/detail/${slug}`)
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
                        <div className="flex flex-col items-center">
                            <img
                                src={getData.image}
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

                            <p><strong>Duration:</strong> {getData.duration}</p>
                            <p><strong>Studios:</strong> {getData.studios}</p>
                            <p><strong>Rilis:</strong> {getData.released}</p>

                            {/* Genre */}
                            <div>
                                <p className="font-semibold">Genre:</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {/* {getData.genre.map((gen) => (
                    <Link
                      key={gen.link}
                      href={`/genre/${gen.link}`}
                      className="bg-neutral-700 text-white px-3 py-1 rounded-md text-xs hover:text-blue-700"
                    >
                      {gen.title}
                    </Link>
                  ))} */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <ComponentCard title="Chapters" className="mt-5 h-[35rem] lg:h-[34rem] flex flex-col">
                        <div className="grid grid-cols-2 gap-4 mb-2">
                            {getData.episodeFL.map((eps, index) => (

                                <Link
                                    key={index}
                                    href={`/nonton/${eps.link}`}
                                    className="flex flex-col items-center w-full p-3 text-lg rounded-md shadow-sm hover:shadow-md transition hover:bg-gray-700/40 bg-blue-500 text-gray-200"
                                >
                                    <span>{eps.title}</span>
                                    <span className="text-sm">{eps.episode}</span>
                                </Link>
                            ))}

                        </div>

                        <div className="overflow-y-auto max-h-[22rem] p-2">
                            <div className="divide-y divide-gray-700 border border-gray-700 rounded-md">
                                {getData.episodeList.map((eps, index) => (
                                    <Link
                                        key={index}
                                        href={`/nonton/${eps.link}`}
                                        onClick={() => handleClick(eps.link)}
                                        className={`flex items-center justify-between px-4 py-3 text-sm md:text-base transition-colors
          ${clickedLinks.includes(eps.link)
                                                ? "bg-gray-800 text-gray-400"
                                                : "hover:bg-gray-700/50 text-white"}
        `}
                                    >
                                        <span className="font-medium">{eps.title}</span>
                                        <span className="text-xs text-gray-500">{eps.epsupdate}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </ComponentCard>
                    {/* <RelatedCard card={getData.relatedAnime.map((item) => ({
            link: `anime-detail${item.link}`,
            title: item.title,
            img: item.image,
            last_update: item.category,
            chapter: item.ratting,
          }))} /> */}
                </ComponentCard>
            ) : (
                <p className="text-center text-gray-500">Loading...</p>
            )}
        </>
    );
}
