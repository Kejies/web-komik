"use client";
import { Plus, Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface FavButtonProps {
    link_chapter: string;
    daftar_chapter: string;
}

export default function FavButton({ link_chapter, daftar_chapter }: FavButtonProps) {
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        const alreadyFavorited = favorites.some(
            (item: { link_chapter: string }) => item.link_chapter === link_chapter
        );
        setIsFavorited(alreadyFavorited);
    }, [link_chapter]);

    const handleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

        let updatedFavorites;

        if (isFavorited) {
            // Hapus dari favorit
            updatedFavorites = favorites.filter(
                (item: { link_chapter: string }) => item.link_chapter !== link_chapter
            );
            setIsFavorited(false);
        } else {
            // Tambahkan ke favorit
            updatedFavorites = [
                ...favorites,
                { link_chapter, daftar_chapter }
            ];
            setIsFavorited(true);
        }

        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <button
            onClick={handleFavorite}
            className={`flex items-center gap-2 text-sm px-4 py-2 rounded-sm shadow-md transition ring-2 w-full md:w-auto ${isFavorited
                ? "bg-base text-white ring-gray-700 hover:ring-slate-800"
                : "bg-base text-white ring-gray-700 hover:ring-slate-800"
                }`}
        >
            {isFavorited ? <Heart size={16} fill="red" className="text-red-500" /> : <Plus size={16} />}
            {isFavorited ? "Favorit" : "Favorit"}
        </button>
    );
}
