import ReviewList from "./ReviewList"
import ReviewHeaderLine from "./ReviewHeaderLine"
import { ShowedReviewTypes } from "../../types/ShowedReviewTypes"

import { FortuneTellerService } from "../../services/FortuneTellerService"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { environment } from "../../../../common/constants/environment"

export default function Reviews() {
  const { fid } = useParams<{ fid: string }>()

  let fortuneTellerId = ""
  if (fid) {
    fortuneTellerId = fid
  } else {
    window.location.href = environment.frontend.url + "/search"
  }

  const [fortuneTellerReview, setFortuneTellerReview] = useState<ShowedReviewTypes[]>()

  useEffect(() => {
    const fetchFortuneTellerReview = async () => {
      const response = await FortuneTellerService.getReviewByFortuneTellerId(fortuneTellerId)
      const fortuneTellerReview = response

      setFortuneTellerReview(fortuneTellerReview)
    }
    fetchFortuneTellerReview()
  }, [])

  if (!fortuneTellerReview || fortuneTellerReview.length === 0) {
    return null
  }

  const reviewItems = fortuneTellerReview.map((reviewItem) => (
    <ReviewList reviewItem={reviewItem} />
  ))

  return (
    <div>
      <div className="flex flex-row items-center space-x-4 pb-4">
        <div className="font-libre-bodoni text-[36px]">Reviews</div>
        <ReviewHeaderLine></ReviewHeaderLine>
      </div>
      <div className="flex flex-row  scroll-smooth overflow-auto space-x-4">{reviewItems}</div>
      <div className="flex flex-row space-x-2 items-center justify-end">
        <div className="text-[16px] font-libre-bodoni underline underline-offset-2">
          Swipe left to see more
        </div>
        <div className="text-[36px] text-mdd-focus-yellow">&gt;</div>
      </div>
    </div>
  )
}
