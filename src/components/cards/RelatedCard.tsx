import { useState, useEffect } from "react";
import ComponentCard from "../common/ComponentCard";
import Card from "../ui/Card";

type CardItem = {
  link: string;
  title: string;
  img: string;
  chapter: string;
  last_update: string;
  colored: string;
  type: string;
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
          card.map(async (item) => {
            const link = item.link.replace(/^\/+/, "");
            const url = `${process.env.NEXT_PUBLIC_API_URL}/detail/${link}`;

            try {
              const res = await fetch(url);

              if (!res.ok) {
                console.warn(`HTTP error for ${item.link}: ${res.status}`);
                return { ...item, chapter: "Unknown", last_update: "Not available" };
              }

              const contentType = res.headers.get("content-type");
              if (!contentType || !contentType.includes("application/json")) {
                console.warn(`Invalid JSON response for ${item.link}`);
                return { ...item, chapter: "Unknown", last_update: "Not available" };
              }

              const data = await res.json();
              console.log("Response Data:", data);

              const latestChapter = data?.data?.chapter_list?.[0];

              return {
                ...item,
                chapter: latestChapter?.chapter || "Unknown",
                last_update: latestChapter?.update || "Not available",
              };
            } catch (fetchError) {
              console.error("Fetch error:", fetchError);
              return { ...item, chapter: "Unknown", last_update: "Not available" };
            }
          })
        );

        setUpdatedCard(updatedData);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    }

    fetchChapters();
  }, [card]);

  return (
    <ComponentCard title="Related" className="mt-4">
      <div className="flex overflow-x-auto whitespace-nowrap snap-x snap-mandatory [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-neutral-900 [&::-webkit-scrollbar-thumb]:bg-blue-500 scrollbar-hide flex-nowrap gap-4 lg:gap-5">
        {updatedCard.map((item) => (
          <div key={item.link} className="snap-start shrink-0 w-full sm:w-[50%] md:w-[40%] lg:w-auto mb-4">
            <Card
              title={item.title || ""}
              chapter={item.chapter || ""}
              link={`komik/${item.link}` || ""}
              img={item.img || ""}
              last_update={item.last_update.replace(/\s*yang/, "") || ""}
              colored={item.colored}
              type={item.type}
            />
          </div>
        ))}
      </div>
    </ComponentCard>
  );
}
