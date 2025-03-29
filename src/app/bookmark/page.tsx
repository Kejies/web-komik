"use client"
import { useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Card from "@/components/ui/Card";

type Bookmark = {
  href: string;
  title: string;
  img: string;
  status: string;
  ratting: string;
  sinopsis: string;
  chapter?: string;
  colored?: string;
  type?: string;
};

export default function Page() {
  const [bookMarks, setBookMarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookMarks");
    if (storedBookmarks) {
      try {
        setBookMarks(JSON.parse(storedBookmarks) || []);
      } catch (error) {
        console.error("Error parsing bookmarks:", error);
      }
    }
  }, []);

  return (
    <ComponentCard title="Daftar Komik yang ditandai:" className="mt-20">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-11 justify-center">
        {bookMarks.length > 0 ? (
          bookMarks.map((link, index) => (
            <Card
              key={index}
              title={link.title}
              chapter={link.chapter}
              ratting={link.ratting}
              link={`komik/${link.href}`}
              img={link.img}
              type={link.type}
            />
          ))
        ) : (
          <p className="col-span-full text-center">Belum ada komik yang ditandai.</p>
        )}
      </div>
    </ComponentCard>
  );
}
