"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Chapter = {
    title: string;
    link: string;
    time: string;
};

type FavoriteCardProps = {
    title: string;
    img: string;
    chapters: Chapter[];
};

export default function FavoriteCard({ title, img, chapters }: FavoriteCardProps) {
    const [showAll, setShowAll] = useState(false);

    const displayedChapters = showAll ? chapters : chapters.slice(0, 3);

    return (
        <div className="flex gap-4 p-3 rounded-md bg-neutral-900 w-full max-w-[520px] shadow-md">
            {/* Cover */}
            <div className="w-[100px] h-[140px] relative shrink-0">
                <Image
                    src={img}
                    alt={title}
                    fill
                    className="rounded-md object-cover shadow-lg"
                />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between w-full">
                {/* Title */}
                <h2 className="text-white text-base font-semibold mb-2 line-clamp-1">{title}</h2>

                {/* Chapters */}
                <div className="flex flex-col gap-1 text-sm">
                    {displayedChapters.map((chap, idx) => (
                        <div key={idx} className="flex justify-between text-gray-300">
                            <Link
                                href={`/baca/${chap.link}`}
                                className="text-red-500 hover:underline truncate max-w-[65%]"
                            >
                                • {chap.title}
                            </Link>
                            <span className="text-xs text-gray-400 whitespace-nowrap">{chap.time}</span>
                        </div>
                    ))}

                    {/* Button "Lihat Semua" */}
                    {chapters.length > 3 && !showAll && (
                        <button
                            onClick={() => setShowAll(true)}
                            className="text-blue-400 hover:underline text-xs mt-2 w-fit"
                        >
                            Lihat semua
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
