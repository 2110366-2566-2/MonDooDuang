import ReviewList from "./ReviewList"
import { ShowedReviewTypes } from "../../types/ShowedReviewTypes"

import { FortuneTellerService } from "../../services/FortuneTellerService"
import { useEffect, useState } from "react"

export default function Reviews() {

    const [fortuneTellerReview, setFortuneTellerReview] = useState<ShowedReviewTypes[]>()
  
    const mockUserId = "0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d"
  
    useEffect(() => {
      const fetchFortuneTellerReview = async () => {
        const response = await FortuneTellerService.getReviewbyFortuneTellerId(mockUserId)
        const fortuneTellerReview = await response

        setFortuneTellerReview(fortuneTellerReview)

      }
      fetchFortuneTellerReview()
    }, [])

    var reviewItems = null
    if(fortuneTellerReview !== undefined){
        reviewItems = fortuneTellerReview.map((reviewItem) => <ReviewList reviewItem = {reviewItem}></ReviewList>);   
    }

    return (
        <div>
            <div>Reviews</div>
            <div className="flex flex-row  scroll-smooth overflow-auto space-x-4">
                {reviewItems}
            </div>
        </div>
    )
}