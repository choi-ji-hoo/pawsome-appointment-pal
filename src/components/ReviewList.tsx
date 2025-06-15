
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
      <ul className="flex flex-col gap-4 mt-2">
        {reviews.length === 0 && (
          <li className="text-gray-400">아직 후기가 없습니다.</li>
        )}
        {reviews.map((review, i) => (
          <li
            key={i}
            className="rounded-xl px-4 py-3 border flex flex-col bg-[#FCFCFC] shadow-sm"
            style={{ borderRadius: 16, borderWidth: 1, borderColor: "#eee" }}
          >
            <div className="flex items-center gap-2 mb-1">
              {/* 아바타 */}
              <img
                src={placeholderAvatar}
                alt="avatar"
                className="w-7 h-7 rounded-full border bg-gray-100"
              />
              <span className="text-sm font-semibold">{review.user}</span>
              {/* 별점 */}
              <span className="flex items-center text-yellow-500 text-base ml-1">
                {Array(5)
                  .fill(0)
                  .map((_, idx) =>
                    idx < review.rate ? (
                      <Star
                        key={idx}
                        size={15}
                        fill="#FFD700"
                        stroke="#FFD700"
                      />
                    ) : (
                      <Star
                        key={idx}
                        size={15}
                        fill="none"
                        stroke="#FFD700"
                      />
                    )
                  )}
              </span>
              {/* more ... 아이콘 대체: > */}
              <span className="ml-auto text-gray-400 text-lg" aria-label="More">
                ...
              </span>
            </div>
            {/* 리뷰 텍스트 */}
            <span className="text-gray-700 text-[15px] leading-relaxed mb-2">{review.text}</span>
            {/* 첨부 이미지들 */}
            {review.images && review.images.length > 0 && (
              <div className="flex flex-row gap-1 mb-2">
                {review.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="리뷰 이미지"
                    className="rounded-md border object-cover"
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: "#eee",
                    }}
                  />
                ))}
              </div>
            )}
            {/* 진료명 배지 */}
            <div className="mt-1 flex">
              <span className="bg-[#F3F4F6] text-xs px-3 py-1 rounded-md font-semibold text-gray-700">
                {treatmentName}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
export default ReviewList;
