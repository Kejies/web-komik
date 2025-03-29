import NewestCards from "@/components/cards/NewestCards";
import PopularCards from "@/components/cards/PopularCards";
export default function Home() {
  return (
    <div>
      <PopularCards className="mt-20" />
      <NewestCards className="mt-2" />
    </div>
  );
}