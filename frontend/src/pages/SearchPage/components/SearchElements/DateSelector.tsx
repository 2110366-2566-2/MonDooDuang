import { useState, useEffect, useRef } from "react"
import LineIcon from "../Icons/line.svg"
import DateIcon from "../Icons/date-icon.svg"
import DateSelectorOverlay from "./DateSelectorOverlay"
interface Props {
  searchFortuneTeller: any
  setSearchFortuneTeller: (searchFortuneTeller: any) => void
}
export default function DateSelector({ searchFortuneTeller, setSearchFortuneTeller }: Props) {
  const [openDateSelector, setOpenDateSelector] = useState(false)
  const selectorRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeDateSelector = (event: MouseEvent) => {
    if (
      selectorRef.current &&
      !selectorRef.current.contains(event.target as Node) &&
      overlayRef.current &&
      !overlayRef.current.contains(event.target as Node)
    ) {
      setOpenDateSelector(false)
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", closeDateSelector)
    return () => {
      document.removeEventListener("mousedown", closeDateSelector)
    }
  }, [])
  useEffect(() => {
    console.log(searchFortuneTeller)
  }, [searchFortuneTeller.startDate, searchFortuneTeller.endDate])
  return (
    <div className="w-[13.5%] h-[36px]">
      <div
        ref={selectorRef}
        className="px-4 h-[36px] rounded-full bg-[#D9D9D9]/[0.75] flex items-center justify-center"
        onClick={() => {
          setOpenDateSelector(!openDateSelector)
        }}
      >
        <div className="w-[80%] flex items-center justify-center">
          <p className="text-white/70 text-base font-sans font-medium truncate">เลือกวันที่</p>
        </div>
        <div className="w-[20%] flex flex-row items-center">
          <img src={LineIcon} alt="line-icon" className="h-8 translate-y-1 mr-1" />
          <img src={DateIcon} alt="date-icon" className="w-[22px] h-[22px]" />
        </div>
      </div>
      {openDateSelector && (
        <div ref={overlayRef} className="absolute -translate-x-[20%] translate-y-2">
          <DateSelectorOverlay
            setOpenDateSelector={setOpenDateSelector}
            selectedStartDate={searchFortuneTeller.startDate}
            selectedEndDate={searchFortuneTeller.endDate}
            setSelectedStartDate={(selectedStartDate) =>
              setSearchFortuneTeller({ ...searchFortuneTeller, startDate: selectedStartDate })
            }
            setSelectedEndDate={(selectedEndDate) =>
              setSearchFortuneTeller({ ...searchFortuneTeller, endDate: selectedEndDate })
            }
            clearDate={() => {
              setSearchFortuneTeller({ ...searchFortuneTeller, startDate: null, endDate: null })
            }}
          />
        </div>
      )}
    </div>
  )
}
