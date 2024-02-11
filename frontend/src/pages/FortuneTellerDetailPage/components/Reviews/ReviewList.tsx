import UserIcon from "./UserIcon"
import RatedStar from "../FortuneTellerDetails/RatedStar"
import { ShowedReviewTypes } from "../../types/ShowedReviewTypes"

export default function ReviewList({ reviewItem }: { reviewItem: ShowedReviewTypes }) {

    function timeAgo(timestamp: string): string {
        const date = new Date(timestamp);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 1) {
            const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
            if (diffHours < 1) {
                const diffMinutes = Math.floor(diffTime / (1000 * 60));
                return `${diffMinutes} minutes ago`;
            } else {
                return `${diffHours} hours ago`;
            }
        } else {
            return `${diffDays} days ago`;
        }
    }

    return (
        <div className="flex flex-row items-end min-w-[380px]">
            <UserIcon></UserIcon>
            <div className="flex flex-col">
                <div className="flex flex-col space-y-3 border-[1px] border-white rounded-r-lg rounded-t-lg px-6 py-4 w-[300px] h-[200px]">
                    <div className="flex flex-row space-x-4">
                        <RatedStar></RatedStar>
                        <RatedStar></RatedStar>
                        <RatedStar></RatedStar>
                        <RatedStar></RatedStar>
                        <RatedStar></RatedStar>
                    </div>
                    <div className="text-mdd-link-yellow">คะแนน : {reviewItem.score} / 5</div>
                    <div className="text-wrap text-balance break-words leading-[1.5em] overflow-auto max-h-[3em]">
                    {reviewItem.reviewMessage}
                    </div>
                    <div>{timeAgo(reviewItem.created_at)}</div>
                </div>
                <div>{reviewItem.fName} {reviewItem.lName}</div>
            </div>
        </div>
    )
}