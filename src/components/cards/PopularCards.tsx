"use client";
import { useState, useEffect } from "react";
import Card from "../ui/Card";
import ComponentCard from "../common/ComponentCard";

type CardType = {
  link: string;
  title: string;
  jenis: string;
  type: string;
  chapter: string;
  last_update: string;
  colored: string;
  img: string;
  ratting: string;
};
interface props {
  className?: string;
}

export default function PopularCards({ className = "" }: props) {
  const [getDataCard, setData] = useState<CardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/popular`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setData(data.data);
        } else {
          console.error("Unexpected API structure:", data);
        }
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <ComponentCard title="Popular" className={`${className}`}>
      {isLoading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="flex overflow-x-auto whitespace-nowrap snap-x snap-mandatory [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-neutral-900 [&::-webkit-scrollbar-thumb]:bg-blue-500 scrollbar-hide flex-nowrap gap-4 lg:gap-5">
          {getDataCard.length > 0 ? (
            getDataCard.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                chapter={card.chapter}
                link={`komik/${card.link}`}
                img={card.img}
                last_update={card.last_update}
                colored={card.colored}
                type={card.type}
                ratting={card.ratting}
                className="snap-start shrink-0 w-full sm:w-[50%] md:w-[40%] lg:w-auto mb-5"
              />
            ))
          ) : (
            <p className="text-center text-gray-500 w-full">Tidak ada data tersedia.</p>
          )}
        </div>



      )
      }
    </ComponentCard >
  );
}
