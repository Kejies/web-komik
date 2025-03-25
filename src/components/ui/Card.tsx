/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
interface CardProps {
    link: string;
    title: string;
    img:string;
    chapter: string;
    last_update?: string;
  }
export default function Card({link, title, img, chapter, last_update}:CardProps){
    return(
      <Link href={`/komik/${link}`} className="relative flex flex-col shadow shadow-slate-600 border border-slate-600 rounded-lg w-[9rem] overflow-hidden hover:bg-slate-200/10 transition-all">
      <div className="relative w-full h-48 overflow-hidden text-white rounded-md">
        <img
          src={img}
          alt="card-image"
          width={224}
          height={384}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-2 flex flex-col gap-1 flex-grow">
        <h6 className="text-gray-200 text-sm font-semibold line-clamp-2 flex-grow">
          {title}
        
        </h6>
        <p className="flex justify-between text-xs font-light mt-auto">
          <span className="text-gray-300">{chapter}</span>
          <span className="text-gray-400">{last_update}</span>
        </p>
      </div>
    </Link>
  );
}