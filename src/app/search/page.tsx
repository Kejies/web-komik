"use client";
import { Suspense } from "react";
import SearchCard from "@/components/cards/SearchCards";
import PopularCards from "@/components/cards/PopularCards";
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-40">Loading...</div>}>
      <SearchCard className="mt-20" />
      <PopularCards className="mt-2" />
    </Suspense>
  );
}
