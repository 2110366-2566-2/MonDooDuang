import UserIcon from "./UserIcon"
import RatedStar from "../FortuneTellerDetails/RatedStar"
import { ShowedReviewTypes } from "../../types/ShowedReviewTypes"

export default function ReviewList({ reviewItem }: { reviewItem: ShowedReviewTypes }) {

  function timeAgo(timestamp: string): string {
    const date = new Date(timestamp)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
        
    if (diffDays < 1) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
      if (diffHours < 1) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60))
        return `${diffMinutes} minutes ago`
      } else {
        return `${diffHours} hours ago`
      }
    } else {
      return `${diffDays} days ago`
    }
  }

  return (
    <div className="flex flex-row items-end min-w-[380px]">
      <UserIcon></UserIcon>
      <div className="flex flex-col">
        <div className="flex flex-col space-y-3 border-[1px] border-white rounded-r-lg rounded-t-lg px-6 py-4 w-[300px] h-[210px]">
          <div className="flex flex-row space-x-4">
            <RatedStar check = {reviewItem.score == undefined? false :reviewItem.score>0.5}></RatedStar>
            <RatedStar check = {reviewItem.score == undefined? false :reviewItem.score>1.5}></RatedStar>
            <RatedStar check = {reviewItem.score == undefined? false :reviewItem.score>2.5}></RatedStar>
            <RatedStar check = {reviewItem.score == undefined? false :reviewItem.score>3.5}></RatedStar>
            <RatedStar check = {reviewItem.score == undefined? false :reviewItem.score>4.5}></RatedStar>
          </div>
          <div className="text-mdd-focus-yellow font-normal">คะแนน : {reviewItem.score} / 5</div>
          <div className="text-[16px] text-balance break-words leading-[1.5em] overflow-auto max-h-[5em]">
            {reviewItem.reviewMessage}
          </div>
          <div className="font-libre-bodoni text-right">{timeAgo(reviewItem.created_at)}</div>
        </div>
        <div>{reviewItem.fName} {reviewItem.lName}</div>
      </div>
    </div>
  )
}