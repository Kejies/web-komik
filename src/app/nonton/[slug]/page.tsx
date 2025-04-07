"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import { Grip } from "lucide-react";
import Link from "next/link";
type Data = {
  title: string;
  url_video: string;
  episode_prev: string;
  episode_next: string;
  eps_list: string;
  genre: string[];
};


export default function MangaPage() {
  const params = useParams();
  const router = useRouter();
  const slug = Array.isArray(params.slug) ? params.slug.join("-") : params.slug;

  const [getData, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(`http://localhost:5000/api/nontonanime/${slug}`);

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        if (data.data) {
          setData(data.data);
        } else {
          console.error("Unexpected API structure:", data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handlePrevious = () => {
    if (getData?.episode_prev) {
      router.push(`/nonton/${getData.episode_prev.replace("/", "")}`);
    }
  };

  const handleNext = () => {
    if (getData?.episode_next) {
      router.push(`/nonton/${getData.episode_next.replace("/", "")}`);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-blue-500"></div>
      </div>
    );
  }
  return (
    <>
      {getData && (
        <ComponentCard title={getData.title} className="mt-20">
          <div className="flex justify-center items-center w-full px-4 py-6">
            <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-gradient-to-br from-zinc-900 to-gray-800 transition-all duration-500 ease-in-out animate-fadeIn">
              <iframe
                src={getData.url_video}
                width="100%"
                height="100%"
                allowFullScreen
                className="w-full h-full rounded-2xl"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
            <button
              onClick={handlePrevious}
              disabled={!getData.episode_prev}
              className="px-5 py-2 text-white rounded-lg transition-all duration-300 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              « Chapter Sebelumnya
            </button>

            <Link
              href={`/anime-detail/${getData.eps_list}`}
              className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg shadow-md hover:from-indigo-500 hover:to-purple-600 transition-all duration-300 flex items-center gap-1"
            >
              <Grip size={22} />
              Daftar Chapter
            </Link>

            <button
              onClick={handleNext}
              disabled={!getData.episode_next}
              className="px-5 py-2 text-white rounded-lg transition-all duration-300 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Chapter Selanjutnya »
            </button>
          </div>
        </ComponentCard>

      )}
    </>
  );
}
