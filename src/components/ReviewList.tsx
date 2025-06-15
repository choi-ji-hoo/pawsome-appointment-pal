
import React from "react";
import { Star } from "lucide-react";

const placeholderAvatar =
  "https://api.dicebear.com/8.x/thumbs/svg?seed=Milo&backgroundType=gradientLinear";

type Review = {
  user: string;
  rate: number;
  text: string;
  images?: string[];
};
interface ReviewListProps {
  reviews: Review[];
  treatmentName: string;
}
const ReviewList: React.FC<ReviewListProps> = ({ reviews, treatmentName }) => {
  return (
    <>
      <div className="text-sm font-medium mb-2 mt-3">후기</div>
      <div className="text-center text-gray-600 py-8">
        후디 인스타에서 확인할 수 있습니다!
      </div>
    </>
  );
};
export default ReviewList;
