import RatingStarIcon from "../Icons/rating-star-icon.svg"
import TopIcon from "../Icons/top-icon.svg"
import BottomIcon from "../Icons/bottom-icon.svg"

interface Props {
  searchFortuneTeller: any
  setSearchFortuneTeller: (searchFortuneTeller: any) => void
}
export default function RatingSelector({ searchFortuneTeller, setSearchFortuneTeller }: Props) {
  interface Rating {
    [key: number]: string
  }
  const ratingLabel: Rating = {
    0: "ทั้งหมด",
    1: "1 ดาวขึ้นไป",
    2: "2 ดาวขึ้นไป",
    3: "3 ดาวขึ้นไป",
    4: "4 ดาวขึ้นไป",
    5: "5 ดาวเท่านั้น"
  }

  return (
    <div className="w-[15%] pl-3 pr-1 rounded-full bg-[#D9D9D9]/[0.75] flex flex-row items-center justify-between">
      <p className="text-white/70 text-base font-sans font-medium">ระดับดาว</p>
      <img src={RatingStarIcon} alt="rating-star-icon" className="w-[20px] h-[20px] mr-1" />
      <div className="w-[55%] h-[75%] flex flex-row items-center justify-between rounded-full bg-[#D9D9D9]/[0.6] pl-1 pr-2 shadow-lg ">
        <p className="w-[90%] text-white text-sm font-sans font-medium flex items-center justify-items-center justify-center">
          {ratingLabel[searchFortuneTeller.rating]}
        </p>
        <div className="w-[10%] flex flex-col items-center">
          <img
            src={TopIcon}
            alt="top-icon"
            className="w-[11px] h-[11px] drop-shadow-md"
            onClick={() =>
              setSearchFortuneTeller({
                ...searchFortuneTeller,
                rating: Math.min(5, searchFortuneTeller.rating + 1)
              })
            }
          />
          <img
            src={BottomIcon}
            alt="bottom-icon"
            className="w-[11px] h-[11px] drop-shadow-md"
            onClick={() => {
              setSearchFortuneTeller({
                ...searchFortuneTeller,
                rating: Math.max(0, searchFortuneTeller.rating - 1)
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}
