import ComponentCard from "@/components/common/ComponentCard";
import Link from "next/link";

const genres = [
    { name: "Action", count: 0 },
    { name: "Adventure", count: 0 },
    { name: "Comedy", count: 0 },
    { name: "Drama", count: 0 },
    { name: "Ecchi", count: 0 },
    { name: "Fantasy", count: 0 },
    { name: "Harem", count: 0 },
    { name: "Historical", count: 0 },
    { name: "Horror", count: 0 },
    { name: "Martial Arts", count: 0 },
    { name: "Mature", count: 0 },
    { name: "Mystery", count: 0 },
    { name: "Psychological", count: 0 },
    { name: "Reincarnation", count: 0 },
    { name: "Romance", count: 0 },
    { name: "School Life", count: 0 },
    { name: "Sci-Fi", count: 0 },
    { name: "Seinen", count: 0 },
    { name: "Shoujo", count: 0 },
    { name: "Shoujo Ai", count: 0 },
    { name: "Shounen", count: 0 },
    { name: "Slice of Life", count: 0 },
    { name: "Supernatural", count: 0 },
    { name: "Tragedy", count: 0 },
];


export default function GenreList() {
    return (
        <ComponentCard title="Genre" className="mt-20">
            <div className="grid grid-cols-4 gap-2">
                {genres.map((genre, index) => (
                    <Link href={`/genre/${decodeURIComponent(genre.name?.toString() || "").replace(/\s+/g, "-").toLowerCase()}`}
                        key={index}
                        className="flex justify-between items-center bg-neutral-700 hover:bg-neutral-800 text-white px-3 py-2 rounded-md"
                    >
                        <span>{genre.name}</span>
                    </Link>
                ))}
            </div>
        </ComponentCard>
    );
}
