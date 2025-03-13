import { useState, useEffect } from "react";
import ComponentCard from "../common/ComponentCard";
import Card from "../ui/Card"; // Pastikan path-nya benar

type CardItem = {
  link: string;
  title: string;
  img: string;
  chapter: string;
  last_update: string;
};

type CardProps = {
  card: Omit<CardItem, "chapter" | "last_update">[];
};

export default function RelatedCard({ card }: CardProps) {
  const [updatedCard, setUpdatedCard] = useState<CardItem[]>(
    card.map((item) => ({
      ...item,
      chapter: "Loading...",
      last_update: "Loading...",
    }))
  );

  useEffect(() => {
    async function fetchChapters() {
      try {
        const updatedData = await Promise.all(
          card
          .filter((item) => !item.link.includes("596054-night-of-shadows")) 
          .map(async (item) => {
              const link = item.link.replace(/^\/+/, "");
              const url = `${process.env.NEXT_PUBLIC_API_URL}/detail/${link}`;
              console.log("Fetching:", url);
  
              const res = await fetch(url);
              console.log("Response Status:", res.status);
  
              if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
              }
  
              const contentType = res.headers.get("content-type");
              if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Invalid JSON response");
              }
  
              const data = await res.json();
              console.log("Response Data:", data);
  
              const latestChapter = data?.data?.chapter?.[0];
  
              return {
                ...item,
                chapter: latestChapter?.chapter || "Unknown",
                last_update: latestChapter?.update || "Not available",
              };
            })
        );
  
        const finalData: CardItem[] = card.map((item) => {
          if (item.link === "596054-night-of-shadows") {
            return {
              ...item,
              chapter: "Unknown", 
              last_update: "Not available",
            };
          }
          return updatedData.find((updated) => updated.link === item.link) || {
            ...item,
            chapter: "Unknown",
            last_update: "Not available",
          };
        });
  
        setUpdatedCard(finalData);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    }
  
    fetchChapters();
  
  }, [card]);
  
    

  return (
    <ComponentCard title="Related" className="mt-4">
      <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-neutral-900 [&::-webkit-scrollbar-thumb]:bg-yellow-500 p-2 whitespace-nowrap snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-4 lg:w-full">
      {updatedCard
        .filter((item) => !item.link.includes("596054-night-of-shadows")) 
        .map((item) => (
          <div key={item.link} className="snap-start shrink-0 w-[70%] sm:w-[50%] md:w-[40%] lg:w-auto">
            <Card
              title={item.title}
              chapter={item.chapter} 
              link={item.link}
              img={item.img}
              last_update={item.last_update} 
            />
          </div>
      ))}


      </div>
    </ComponentCard>
  );
}
