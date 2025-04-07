"use client";
import { useState, useEffect } from "react";
import Card from "../ui/Card";
import ComponentCard from "../common/ComponentCard";

type CardType = {
  link: string;
  title: string;
  jenis: string;
  type: string;
  episode: string;
  image: string;
};

export default function AnimeNewestCards() {
  const [getData, setData] = useState<CardType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:5000/api/anime-terbaru/${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setData(data.data);
          setTotalPages(data.total_pages);
        } else {
          console.error("Unexpected API structure:", data);
        }
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setIsLoading(false));
  }, [currentPage]);
  console.log(getData)

  return (
    <ComponentCard title="Terbaru" className="mt-20">
      {isLoading ? (
        // Loading di tengah
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {getData.length > 0 ? (
              getData.map((card) => (
                <Card key={card.link} title={card.title} chapter={card.episode} link={`nonton/${card.link}`} img={card.image} />
              ))
            ) : (
              <p className="text-center text-gray-500 w-full">Tidak ada data tersedia.</p>
            )}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded disabled:bg-gray-500"
            >
              Previous
            </button>
            <span className="text-white text-sm sm:text-base">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 disabled:bg-gray-500"
            >
              Next
            </button>
          </div>
        </>
      )}
    </ComponentCard>
  );
}
