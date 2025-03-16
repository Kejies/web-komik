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
  img: string;
};

export default function PopularCards() {
  const [getDataCard, setData] = useState<CardType[]>([]);
  console.log(getDataCard)
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/popular`)
    .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);

        if (data.data && Array.isArray(data.data)) {
          setData(data.data);
        } else {
          console.error("Unexpected API structure:", data);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <ComponentCard title="Popular" className="mt-2">

<div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-neutral-900 [&::-webkit-scrollbar-thumb]:bg-yellow-500 p-2 whitespace-nowrap snap-x snap-mandatory scrollbar-hide flex-nowrap">
  {getDataCard.length > 0 ? (
    getDataCard.map((card) => (
      <div key={card.link} className="snap-start shrink-0 w-[70%] sm:w-[50%] md:w-[40%] lg:w-auto">
        <Card
          title={card.title}
          chapter={card.chapter}
          link={card.link}
          img={card.img}
          last_update={card.last_update}
        />
      </div>
    ))
  ) : (
    <p>Loading...</p>
  )}
</div>
    </ComponentCard>
  );
}
