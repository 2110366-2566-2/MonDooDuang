import { useState, useEffect} from "react"
import NextIcon from "../../../SearchPage/components/Icons/next-icon.svg"
import BackIcon from "../../../SearchPage/components/Icons/back-icon.svg"
interface CalendarModalProps {
  currentMonth: number;
  setCurrentMonth: (currentMonth: number) => void;
  currentYear: number;
  setCurrentYear: (currentYear: number) => void;
  toggle: string;
  upcomingAppointments: AppointmentData[];
  completedAppointment: AppointmentData[];
}

export default function CalendarModal({
  currentMonth,
  setCurrentMonth,
  currentYear,
  setCurrentYear,
  toggle,
  upcomingAppointments,
}: CalendarModalProps): JSX.Element {
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
      false
    const isSelectedEndDate =
      false
    const isWithinRange =
     false
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
  useEffect(() => {}, [])
  return (
    <div className="w-[40%] h-full self-center">
      <div className="w-[23rem] h-full bg-[#D9D9D9]/70 rounded-xl shadow-lg px-4 pb-2 flex flex-col justify-center justify-items-center items-center">
        <div className="w-[23rem] flex justify-between mb-4 bg-white p-5 rounded-t-xl shadow-lg">
          <div className="text-[#585958] font-semibold">
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
                <th key={day} className="text-center text-white font-sans text-sm pb-2 drop-shadow-[3px_3px_2px_#414141]">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{weeks}</tbody>
        </table>
      </div></div>
  )
}
