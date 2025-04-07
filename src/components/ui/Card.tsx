/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { PaletteIcon, Star } from "lucide-react";
interface CardProps {
  link: string;
  title: string;
  img: string;
  chapter?: string;
  last_update?: string;
  className?: string;
  type?: string;
  colored?: string;
  ratting?: string;
}

export default function Card({ link, title, img, chapter, last_update, type, colored, ratting, className = "" }: CardProps) {
  return (
    <Link
      href={`${link}`}
      className={`relative bg-neutral-900 rounded-xl overflow-hidden shadow-lg w-44 h-64 transition-transform duration-300 hover:scale-110 hover:shadow-xl ${className}`}
    >
      {colored && (
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
      ) : type === "Manhua" ? (
        <div className="absolute top-2 right-2 text-white text-xs px-2 py-1 rounded-full font-bold">
          <img src="/manhua.png" alt="manhua" width={25} height={25} />
        </div>
      ) : ""}


      <div className="w-full h-56">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>


      {last_update ? (
        <>
          <div className="absolute bottom-12 left-0 bg-red-500 text-white text-[10px] px-2 py-0.5 font-bold">
            {chapter}
          </div>
          {ratting && (
            <div className="absolute bottom-12 right-0 bg-red-500 text-white text-[10px] px-2 py-0.5 font-bold">
              <Star size={12} className="text-yellow-500" fill="currentColor" /> {ratting}
            </div>
          )}
          <div className="absolute bottom-0 w-full text-white text-xs px-2 py-2 font-bold bg-neutral-900 bg-opacity-90">
            <h3 className="truncate w-full" title={title}>
              {title}
            </h3>
            <div className="text-blue-400 font-medium mt-0.5">{last_update}</div>
          </div>
        </>
      ) : (
        <>
          <div className="absolute bottom-8 left-0 bg-red-500 text-white text-[10px] px-2 py-0.5 font-bold">
            {chapter}
          </div>
          {ratting && (
            <div className="absolute bottom-8 right-0 bg-blue-500 text-white text-[10px] px-1 py-0.5 rounded-md font-bold flex items-center gap-1">
              <Star size={12} className="text-yellow-500" fill="currentColor" /> {ratting}
            </div>
          )}
          <div className="absolute bottom-0 w-full text-white text-xs px-2 py-2 font-bold bg-neutral-900 bg-opacity-90">
            <h3 className="truncate w-full" title={title}>
              {title}
            </h3>
            <div className="text-blue-400 font-medium mt-0.5">{last_update}</div>
          </div>
        </>
      )}
    </Link>
  );
}
