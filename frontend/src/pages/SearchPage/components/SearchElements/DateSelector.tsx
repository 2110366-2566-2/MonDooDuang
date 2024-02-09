import LineIcon from "../Icons/line.svg"
import DateIcon from "../Icons/date-icon.svg"
interface Props {
  searchFortuneTeller: any
  setSearchFortuneTeller: (searchFortuneTeller: any) => void
}
export default function DateSelector({ searchFortuneTeller, setSearchFortuneTeller }: Props) {
  return (
    <div className="w-[13.5%] px-4 rounded-full bg-[#D9D9D9]/[0.75] flex items-center justify-center">
      <div className="w-[80%] flex items-center justify-center">
        <p className="text-white/70 text-base font-sans font-medium truncate">เลือกวันที่</p>
      </div>
      <div className="w-[20%] flex flex-row items-center">
        <img src={LineIcon} alt="line-icon" className="h-8 translate-y-1 mr-1" />
        <img src={DateIcon} alt="date-icon" className="w-[22px] h-[22px]" />
      </div>
    </div>
  )
}
