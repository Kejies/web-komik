import Cards from "@/components/cards/NewestCards";
import PopularCards from "@/components/cards/PopularCards";
export default function Home() {
  return (
    <div>
      <PopularCards />
      <Cards />
    </div>
  );
}
