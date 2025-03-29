/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { PaletteIcon } from "lucide-react";
interface CardProps {
    link: string;
    title: string;
    img: string;
    chapter: string;
    last_update?: string;
    type?: string;
    colored?: string;
}
export default function CardV2({ link, title, img, chapter, last_update, type, colored }: CardProps) {
    return (
        <Link
            href={`/${link}`}
            className="relative bg-neutral-900 rounded-xl overflow-hidden shadow-lg w-44 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        >
            {colored !== "" && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-black text-[10px] px-1 py-0.5 rounded-md font-bold flex items-center gap-1">
                    <PaletteIcon size={12} /> COLOR
                </div>

            )}
            {type === "Manhwa" ? (
                <div className="absolute top-2 right-2 text-white text-xs px-2 py-1 rounded-full font-bold">
                    <img src="/manhwa.png" alt="manhwa" width={20} height={20} />
                </div>
            ) : type === "Manga" ? (
                <div className="absolute top-2 right-2 text-white text-xs px-2 py-1 rounded-full font-bold">
                    <img src="/manga.png" alt="manga" width={25} height={25} />
                </div>
            ) : (
                <div className="absolute top-2 right-2 text-white text-xs px-2 py-1 rounded-full font-bold">
                    <img src="/manhua.png" alt="manhua" width={25} height={25} />
                </div>
            )}

            {/* Image */}
            <img src={img} alt={title} className="w-full h-80 object-cover" />

            {/* Content */}
            <div className="absolute bottom-0 w-full text-white text-xs px-2 py-2 font-bold bg-neutral-900 bg-opacity-90">
                <h3 className="text-white text-sm font-semibold truncate">{title}</h3>
                <div className="flex justify-between text-xs mt-1">
                    <span className="text-yellow-500 font-medium">{chapter}</span>
                    <span className="text-blue-400 font-medium">{last_update}</span>
                </div>
            </div>
        </Link>

    );
}