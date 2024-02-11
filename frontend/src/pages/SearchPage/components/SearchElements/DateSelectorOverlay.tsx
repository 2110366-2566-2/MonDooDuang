import { useState, useEffect, useRef } from "react"
import NextIcon from "../Icons/next-icon.svg"
import BackIcon from "../Icons/back-icon.svg"
interface Props {
  setOpenDateSelector: (openDateSelector: boolean) => void
  selectedStartDate: Date | null
  selectedEndDate: Date | null
  setSelectedStartDate: (selectedStartDate: Date | null) => void
  setSelectedEndDate: (selectedEndDate: Date | null) => void
  clearDate: () => void
}

export default function DateSelectorOverlay({
  setOpenDateSelector,
  selectedStartDate,
  selectedEndDate,
  setSelectedStartDate,
  setSelectedEndDate,
  clearDate
}: Props) {
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"]
  const monthNames = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม"
  ]
  const monthShortNames = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค."
  ]
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate()
  const startingDay = new Date(currentYear, currentMonth - 1, 1).getDay()

  const weeks = []
  let week = []

  for (let i = 0; i < startingDay; i++) {
    week.push(<td key={`empty-${i}`} className="text-center"></td>)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(currentYear, currentMonth - 1, day)
    const isCurrentDay = currentDate.toDateString() === new Date().toDateString()
    const isSelectedStartDate =
      selectedStartDate && currentDate.toDateString() === selectedStartDate.toDateString()
    const isSelectedEndDate =
      selectedEndDate && currentDate.toDateString() === selectedEndDate.toDateString()
    const isWithinRange =
      selectedStartDate &&
      selectedEndDate &&
      currentDate > selectedStartDate &&
      currentDate < selectedEndDate

    week.push(
      <td
        key={day}
        className={`text-center ${
          isSelectedStartDate && isSelectedEndDate !== null ? "bg-yellow-100 rounded-l-full" : ""
        } ${isSelectedEndDate ? "bg-yellow-100 rounded-r-full" : ""}  ${
          isWithinRange && !isSelectedEndDate && !isSelectedStartDate && week.length === 0
            ? "bg-yellow-100 rounded-l-full"
            : ""
        }  ${
          isWithinRange && !isSelectedEndDate && !isSelectedStartDate && week.length === 6
            ? "bg-yellow-100 rounded-r-full"
            : ""
        } ${isWithinRange ? "bg-yellow-100" : ""} text-blck font-sans text-sm w-[24px] h-[34px]`}
        onClick={() => handleDateClick(currentDate)}
      >
        <div
          className={`${
            isSelectedStartDate || isSelectedEndDate
              ? "bg-yellow-400 text-white font-bold"
              : isCurrentDay
              ? "bg-white border border-[#FBBF24] font-bold"
              : ""
          } rounded-full h-full flex items-center justify-center ${
            isCurrentDay && isSelectedStartDate ? "border border-black" : ""
          }`}
        >
          {day}
        </div>
      </td>
    )
    if (week.length === 7) {
      weeks.push(<tr key={weeks.length}>{week}</tr>)
      week = []
    }
  }

  if (week.length > 0) {
    for (let i = week.length; i < 7; i++) {
      week.push(<td key={`empty-${i}`} className="text-center"></td>)
    }
    weeks.push(<tr key={weeks.length}>{week}</tr>)
  }

  const handleDateClick = (date: Date) => {
    if (selectedStartDate === null) {
      setSelectedStartDate(date)
    } else if (selectedStartDate !== null && selectedEndDate === null && date > selectedStartDate) {
      setSelectedEndDate(date)
    }
  }
  useEffect(() => {}, [])
  return (
    <div className="w-[19rem] bg-white/85 bg-opacity-75 rounded-lg shadow-lg px-4 pt-3 pb-2 flex flex-col justify-center justify-items-center items-center">
      <div className="w-full flex flex-row justify-between gap-2 mb-3">
        <div className="w-[50%] text-[#343434] text-[13px] font-sans bg-white rounded-full px-2.5 py-[6px]">
          {`เริ่มต้น : ${
            selectedStartDate
              ? `${selectedStartDate.getDate()} ${monthShortNames[selectedStartDate.getMonth()]} ${(
                  selectedStartDate.getFullYear() + 543
                )
                  .toString()
                  .slice(-2)}`
              : ""
          }`}
        </div>
        <div className="w-[50%] text-[#343434] text-[13px] font-sans bg-white rounded-full px-2.5 py-[6px]">
          {`สิ้นสุด : ${
            selectedEndDate
              ? `${selectedEndDate.getDate()} ${monthShortNames[selectedEndDate.getMonth()]} ${(
                  selectedEndDate.getFullYear() + 543
                )
                  .toString()
                  .slice(-2)}`
              : ""
          }`}
        </div>
      </div>

      <div className="w-full flex justify-between mb-4">
        <div className="text-[#585958]">
          {monthNames[currentMonth - 1]} {currentYear + 543}
        </div>
        <div className="flex flex-row gap-4">
          <img
            src={BackIcon}
            alt="back-icon"
            className="w-3 h-3 translate-y-[5px]"
            onClick={() => {
              setCurrentMonth(currentMonth === 1 ? 12 : currentMonth - 1)
              setCurrentYear(currentMonth === 1 ? currentYear - 1 : currentYear)
            }}
          />
          <img
            src={NextIcon}
            alt="next-icon"
            className="w-3 h-3 translate-y-[5px]"
            onClick={() => {
              setCurrentMonth(currentMonth === 12 ? 1 : currentMonth + 1)
              setCurrentYear(currentMonth === 12 ? currentYear + 1 : currentYear)
            }}
          />
        </div>
      </div>
      <table className="w-[90%] border-separate border-spacing-y-1 justify-items-center">
        <thead>
          <tr>
            {daysOfWeek.map((day) => (
              <th key={day} className="text-center text-[#585958]/90 font-sans text-sm pb-2">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{weeks}</tbody>
      </table>
      <div className="w-full flex justify-end pb-2 gap-5">
        <button className="text-sm text-[#fbb724] font-example-font font-[550]" onClick={clearDate}>
          CLEAR
        </button>
        <button
          className="text-sm text-[#fbb724] font-example-font font-[550]"
          onClick={() => setOpenDateSelector(false)}
        >
          CONFIRM
        </button>
      </div>
    </div>
  )
}
