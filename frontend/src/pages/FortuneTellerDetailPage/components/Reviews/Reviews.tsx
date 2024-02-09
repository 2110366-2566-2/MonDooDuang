import ReviewList from "./ReviewList"

export default function Reviews() {
    return (
        <div>
            <div>Reviews</div>
            <div className="flex flex-row  scroll-smooth overflow-auto space-x-4">
                <ReviewList></ReviewList>
                <ReviewList></ReviewList>
                <ReviewList></ReviewList>
                <ReviewList></ReviewList>
                <ReviewList></ReviewList>
            </div>
        </div>
    )
}