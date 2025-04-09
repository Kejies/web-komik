"use client";
import { useState, useEffect } from "react";
import CardV2 from "@/components/ui/CardV2";
import ComponentCard from "@/components/common/ComponentCard";
import Pagination from "@/components/pagination";

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

export default function NewestCards() {
    const [getData, setData] = useState<CardType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/manhua/`)
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

    return (
        <ComponentCard title="Manhua" className="mt-20">
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

                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
                </>
            )}
        </ComponentCard>
    );
}
