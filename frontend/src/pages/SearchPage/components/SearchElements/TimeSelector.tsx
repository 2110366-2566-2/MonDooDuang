import LineIcon from "../Icons/line.svg"
import TimeIcon from "../Icons/time-icon.svg"
interface Props {
  searchFortuneTeller: any
  setSearchFortuneTeller: (searchFortuneTeller: any) => void
}
export default function TimeSelector({ searchFortuneTeller, setSearchFortuneTeller }: Props) {
  return (
    <div className="w-[13%] px-4 rounded-full bg-[#D9D9D9]/[0.75] flex items-center justify-center">
      {" "}
      <div className="w-[80%] flex items-center justify-center">
        <p className="text-white/70 text-base font-sans font-medium truncate">เลือกเวลา</p>
      </div>
      <div className="w-[20%] flex flex-row items-center">
        <img src={LineIcon} alt="line-icon" className="h-8 translate-y-1 mr-1" />
        <img src={TimeIcon} alt="time-icon" className="w-7 h-7 -translate-x-0.5 translate-y-0.5" />
      </div>
    </div>
  )
}
