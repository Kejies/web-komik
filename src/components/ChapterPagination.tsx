"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { List } from "lucide-react";
import Link from "next/link";

interface ChapterPaginationProps {
    prev_chapter?: string;
    daftar_chapter: string;
    next_chapter?: string;
}

export default function ChapterPagination({
    prev_chapter,
    daftar_chapter,
    next_chapter,
}: ChapterPaginationProps) {
    const router = useRouter()
    const [clickedLinks, setClickedLinks] = useState<string[]>([]);

    useEffect(() => {
        const storedLinks = JSON.parse(localStorage.getItem("clickedLinks") || "[]");
        setClickedLinks(storedLinks);
    }, []);

    const handleClick = (href: string) => {
        if (!clickedLinks.includes(href)) {
            const newClickedLinks = [...clickedLinks, href];
            setClickedLinks(newClickedLinks);
            localStorage.setItem("clickedLinks", JSON.stringify(newClickedLinks));
        }
    };
    const handlePrevious = () => {
        if (prev_chapter) {
            handleClick(prev_chapter)
            router.push(`/baca/${prev_chapter.replace("/", "")}`);
        }
    };

    const handleNext = () => {
        if (next_chapter) {
            handleClick(next_chapter)
            router.push(`/baca/${next_chapter.replace("/", "")}`);
        }
    };
    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 my-4">
            <button
                onClick={handlePrevious}
                disabled={!prev_chapter}
                className={
                    prev_chapter
                        ? "px-4 py-2 bg-base ring-slate-700 ring-1 text-white rounded disabled:text-gray-500 hover:ring-slate-800 w-full md:w-auto"
                        : "px-4 py-2 bg-base ring-slate-700 ring-1 rounded text-gray-500 w-full md:w-auto"
                }
            >
                « Sebelumnya
            </button>
            <Link
                href={`/komik/${daftar_chapter}`}
                className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 flex gap-1 items-center w-full md:w-auto justify-center"
            >
                <List size={18} />
                Semua Chapter
            </Link>
            <button
                onClick={handleNext}
                disabled={!next_chapter}
                className={
                    next_chapter
                        ? "px-4 py-2 bg-base ring-slate-700 ring-1 text-white rounded disabled:text-gray-500 hover:ring-slate-800 w-full md:w-auto"
                        : "px-4 py-2 bg-base ring-slate-700 ring-1 rounded text-gray-500 w-full md:w-auto"
                }
            >
                Selanjutnya »
            </button>
        </div >
    )
}