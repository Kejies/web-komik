"use client";
import { useParams } from 'next/navigation'
import { useState, useEffect } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import CardV2 from '@/components/ui/CardV2';

type CardType = {
    link: string;
    title: string;
    jenis: string;
    type: string;
    chapter: string;
    last_update: string;
    img: string;
    colored: string;
};

export default function Genre() {
    const { slug } = useParams()
    const [getData, setData] = useState<CardType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const genre = decodeURIComponent(slug?.toString() || "").replace(/\s+/g, "-").toLowerCase();

    useEffect(() => {
        setIsLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/genre/${genre}/page/${currentPage}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success && Array.isArray(data.data)) {
                    console.log("Data komik:", data.data);
                    setData(data.data);
                    setTotalPages(Number(data.total_pages)); // Pastikan total_pages dalam format angka
                } else {
                    console.error("Struktur API tidak sesuai:", data);
                    setData([]);
                    setTotalPages(1); // Default ke 1 jika terjadi error
                }
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setData([]);
                setTotalPages(1);
            })
            .finally(() => setIsLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genre, currentPage]);
    const slugTitle = typeof slug === "string" ? slug : "";
    return (
        <ComponentCard title={`${slugTitle.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}`} className="mt-20">
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
                                <CardV2 key={card.link} title={card.title} chapter={card.chapter} link={`komik/${card.link}`} img={card.img} last_update={card.last_update} colored={card.colored} type={card.type} />
                            ))
                        ) : (
                            <p className="text-center text-gray-500 w-full">Tidak ada data tersedia.</p>
                        )}
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-700 text-white rounded disabled:bg-gray-500"
                        >
                            Previous
                        </button>
                        <span className="text-white text-sm sm:text-base">
                            Halaman {currentPage} dari {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-700 text-white rounded disabled:bg-gray-500"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </ComponentCard>
    );
}
