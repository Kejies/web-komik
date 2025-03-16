"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Card from "@/components/ui/Card";
import ComponentCard from "@/components/common/ComponentCard";

type CardData = {
    url: string;
    title: string;
    chapter: string;
    image: string;
    last_update: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("s") || "";
  
  const [results, setResults] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const validQuery = useMemo(() => query.trim(), [query]);

  useEffect(() => {
    if (!validQuery) {
      setResults([]); 
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/${encodeURIComponent(validQuery)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setResults(data.data);
        } else {
          setResults([]);
          console.error("Unexpected API structure:", data);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setResults([]);
      })
      .finally(() => setIsLoading(false)); 
  }, [validQuery]);

  return (
    <ComponentCard title={`Hasil Pencarian: ${validQuery}`} className="mt-2">
      <div className="container mx-auto p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
          </div>
        ) : results.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada hasil ditemukan.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((card) => (
              <Card
                key={card.url}
                title={card.title}
                chapter={card.chapter}
                link={card.url}
                img={card.image}
                last_update={card.last_update}
              />
            ))}
          </div>
        )}
      </div>
    </ComponentCard>
  );
}
