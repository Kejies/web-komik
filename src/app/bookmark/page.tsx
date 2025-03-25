"use client"
import { useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";

export default function Page() {
  const [clickedLinks, setClickedLinks] = useState<string[]>([]);

  useEffect(() => {
    // Ambil data dari localStorage
    const storedLinks = localStorage.getItem("clickedLinks");

    if (storedLinks) {
      setClickedLinks(JSON.parse(storedLinks));
    }
  }, []);

  return (
    <ComponentCard title="Daftar Komik yang dibaca:">
      <ul>
        {clickedLinks.length > 0 ? (
            clickedLinks.map((link, index) => <li key={index} className="text-white">{link}</li>)
        ) : (
            <p>Belum ada link yang diklik.</p>
        )}
      </ul>
    </ComponentCard>
  );
}
