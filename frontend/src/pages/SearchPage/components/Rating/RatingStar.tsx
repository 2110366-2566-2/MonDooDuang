import Star1 from "../Icons/star-1-icon.svg"
import Star2 from "../Icons/star-2-icon.svg"
import Star3 from "../Icons/star-3-icon.svg"
import Star4 from "../Icons/star-4-icon.svg"
import Star5 from "../Icons/star-5-icon.svg"

import Star1Empty from "../Icons/star-1-empty-icon.svg"
import Star2Empty from "../Icons/star-2-empty-icon.svg"
import Star3Empty from "../Icons/star-3-empty-icon.svg"
import Star4Empty from "../Icons/star-4-empty-icon.svg"
import Star5Empty from "../Icons/star-5-empty-icon.svg"

interface RatingStarProps {
  rating: number
}

export default function RatingStar({ rating }: RatingStarProps): JSX.Element {
  return (
    <div>
      <img src={rating >= 4.5 ? Star5 : Star5Empty} alt="Star 5" className="w-5 h-5 ml-[2px]" />
      <img src={rating >= 3.5 ? Star4 : Star4Empty} alt="Star 4" className="w-5 h-5 ml-1 mt-1" />
      <img
        src={rating >= 2.5 ? Star3 : Star3Empty}
        alt="Star 3"
        className="w-5 h-5 ml-[10px] mt-1"
      />
      <img src={rating >= 1.5 ? Star2 : Star2Empty} alt="Star 2" className="w-5 h-5 ml-[22px] " />
      <img
        src={rating >= 0.5 ? Star1 : Star1Empty}
        alt="Star 1"
        className="w-5 h-5 ml-10 -translate-y-[2px]"
      />
    </div>
  )
}
