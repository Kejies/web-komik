import { Star } from "lucide-react";

type RatingProps = {
  rating: number;
  realRatting: string;
};

export default function StarRating({ rating, realRatting }: RatingProps) {
  const maxStars = 5;
  const scaledRating = (rating / 10) * maxStars;
  const fullStars = Math.floor(scaledRating); 
  const hasHalfStar = scaledRating % 1 !== 0;

  return (
    <div className="flex items-center gap-1">
      {[...Array(maxStars)].map((_, index) => (
        <span key={index} className="relative">
          <Star
            size={24}
            className="text-gray-400"
            fill="none"
          />
          {index < fullStars && (
            <Star
              size={24}
              className="absolute top-0 left-0 text-yellow-400"
              fill="currentColor"
            />
          )}
          {index === fullStars && hasHalfStar && (
            <Star
              size={24}
              className="absolute top-0 left-0 text-yellow-400"
              fill="currentColor"
              style={{ clipPath: "inset(0 50% 0 0)" }} // Setengah bintang
            />
          )}
        </span>
      ))}
      <span className="ml-2 text-gray-600">{realRatting}</span>
    </div>
  );
}
