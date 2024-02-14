import ReviewList from "./ReviewList"
import ReviewHeaderLine from "./ReviewHeaderLine"
import { ShowedReviewTypes } from "../../types/ShowedReviewTypes"

import { FortuneTellerService } from "../../services/FortuneTellerService"
import { useEffect, useState } from "react"

export default function Reviews() {

  const [fortuneTellerReview, setFortuneTellerReview] = useState<ShowedReviewTypes[]>()
  
  const mockUserId = "0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d"
  
  useEffect(() => {
    const fetchFortuneTellerReview = async () => {
      const response = await FortuneTellerService.getReviewByFortuneTellerId(mockUserId)
      const fortuneTellerReview = response

      setFortuneTellerReview(fortuneTellerReview)

    }
    fetchFortuneTellerReview()
  }, [])

  let reviewItems = null
  if(fortuneTellerReview !== undefined){
    reviewItems = fortuneTellerReview.map((reviewItem) => <ReviewList reviewItem = {reviewItem}></ReviewList>)   
  }

  return (
    <div>
      <div className="flex flex-row items-center space-x-4 pb-4">
        <div className="font-libre-bodoni text-[36px]">Reviews</div>
        <ReviewHeaderLine></ReviewHeaderLine>
      </div>
      <div className="flex flex-row  scroll-smooth overflow-auto space-x-4">
        {reviewItems}
      </div>
      <div className="flex flex-row space-x-2 items-center justify-end">
        <div className="text-[16px] font-libre-bodoni underline underline-offset-2">Swipe left to see more</div>
        <div className="text-[36px] text-mdd-link-yellow">&gt;</div>
      </div>
    </div>
  )
}