import { useState, useEffect, useRef } from "react"
import LineIcon from "../Icons/line.svg"
import TimeIcon from "../Icons/time-icon.svg"
import TimeSelectorOverlay from "./TimeSelectorOverlay"
interface Props {
  searchFortuneTeller: any
  setSearchFortuneTeller: (searchFortuneTeller: any) => void
}
export default function TimeSelector({ searchFortuneTeller, setSearchFortuneTeller }: Props) {
  const [openTimeSelector, setOpenTimeSelector] = useState(false)
  const selectorRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeTimeSelector = (event: MouseEvent) => {
    if (
      selectorRef.current &&
      !selectorRef.current.contains(event.target as Node) &&
      overlayRef.current &&
      !overlayRef.current.contains(event.target as Node)
    ) {
      setOpenTimeSelector(false)
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", closeTimeSelector)
    return () => {
      document.removeEventListener("mousedown", closeTimeSelector)
    }
  }, [])
  const adjustTime = (
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number
  ) => {
    if (startHour === -1 && startMinute === -1 && endHour === -1 && endMinute === -1) {
      return [-1, -1, -1, -1]
    }
    if (startHour === -1 && startMinute !== -1) {
      startHour = new Date().getHours()
    }
    if (startHour !== -1 && startMinute === -1) {
      startMinute = 0
    }
    if (endHour === -1 && endMinute !== -1) {
      endHour = new Date().getHours()
    }
    if (endHour !== -1 && endMinute === -1) {
      endMinute = 0
    }
    if (startHour === -1) {
      startHour = endHour
      startMinute = endMinute
    }
    if (endHour === -1) {
      endHour = startHour
      endMinute = startMinute
    }

    if (startHour > endHour || (startHour === endHour && startMinute > endMinute)) {
      ;[startHour, startMinute, endHour, endMinute] = [endHour, endMinute, startHour, startMinute]
    }

    return [startHour, startMinute, endHour, endMinute]
  }

  useEffect(() => {
    var adjust = adjustTime(
      searchFortuneTeller.startHourTime,
      searchFortuneTeller.startMinuteTime,
      searchFortuneTeller.endHourTime,
      searchFortuneTeller.endMinuteTime
    )
    setSearchFortuneTeller({
      ...searchFortuneTeller,
      startHourTime: adjust[0],
      startMinuteTime: adjust[1],
      endHourTime: adjust[2],
      endMinuteTime: adjust[3]
    })
  }, [openTimeSelector])
  return (
    <div className="w-[13%] h-[36px]">
      <div
        ref={selectorRef}
        className="px-4 h-[36px] rounded-full bg-[#D9D9D9]/[0.75] flex items-center justify-center"
        onClick={() => setOpenTimeSelector(!openTimeSelector)}
      >
        <div className="w-[80%] flex items-center justify-center">
          {searchFortuneTeller.startHourTime === -1 &&
          searchFortuneTeller.startMinuteTime === -1 &&
          searchFortuneTeller.endHourTime === -1 &&
          searchFortuneTeller.endMinuteTime === -1 ? (
            <p className="text-white/70 text-base font-sans font-medium truncate">เลือกเวลา</p>
          ) : (
            <p className="text-white text-base font-sans font-medium truncate">
              <p className="text-white text-base font-sans font-medium truncate">
                {searchFortuneTeller.startHourTime < searchFortuneTeller.endHourTime ||
                (searchFortuneTeller.startHourTime === searchFortuneTeller.endHourTime &&
                  searchFortuneTeller.startMinuteTime < searchFortuneTeller.endMinuteTime)
                  ? `${
                      searchFortuneTeller.startHourTime < 10
                        ? `0${searchFortuneTeller.startHourTime}`
                        : searchFortuneTeller.startHourTime
                    }:${
                      searchFortuneTeller.startMinuteTime < 10
                        ? `0${searchFortuneTeller.startMinuteTime}`
                        : searchFortuneTeller.startMinuteTime
                    } ถึง ${
                      searchFortuneTeller.endHourTime < 10
                        ? `0${searchFortuneTeller.endHourTime}`
                        : searchFortuneTeller.endHourTime
                    }:${
                      searchFortuneTeller.endMinuteTime < 10
                        ? `0${searchFortuneTeller.endMinuteTime}`
                        : searchFortuneTeller.endMinuteTime
                    }`
                  : `เวลา ${
                      searchFortuneTeller.startHourTime < 10
                        ? `0${searchFortuneTeller.startHourTime}`
                        : searchFortuneTeller.startHourTime
                    }:${
                      searchFortuneTeller.startMinuteTime < 10
                        ? `0${searchFortuneTeller.startMinuteTime}`
                        : searchFortuneTeller.startMinuteTime
                    }`}
              </p>
            </p>
          )}
        </div>
        <div className="w-[20%] flex flex-row items-center">
          <img src={LineIcon} alt="line-icon" className="h-8 translate-y-1 mr-1" />
          <img
            src={TimeIcon}
            alt="time-icon"
            className="w-7 h-7 -translate-x-0.5 translate-y-0.5"
          />
        </div>
      </div>
      {openTimeSelector && (
        <div ref={overlayRef} className="absolute">
          <TimeSelectorOverlay
            setOpenTimeSelector={setOpenTimeSelector}
            startHourTime={searchFortuneTeller.startHourTime}
            endHourTime={searchFortuneTeller.endHourTime}
            setStartHourTime={(startHourTime: number) =>
              setSearchFortuneTeller({ ...searchFortuneTeller, startHourTime: startHourTime })
            }
            setEndHourTime={(endHourTime: number) =>
              setSearchFortuneTeller({ ...searchFortuneTeller, endHourTime: endHourTime })
            }
            startMinuteTime={searchFortuneTeller.startMinuteTime}
            endMinuteTime={searchFortuneTeller.endMinuteTime}
            setStartMinuteTime={(startMinuteTime: number) =>
              setSearchFortuneTeller({ ...searchFortuneTeller, startMinuteTime: startMinuteTime })
            }
            setEndMinuteTime={(endMinuteTime: number) =>
              setSearchFortuneTeller({ ...searchFortuneTeller, endMinuteTime: endMinuteTime })
            }
            clearTime={() => {
              setSearchFortuneTeller({
                ...searchFortuneTeller,
                startHourTime: -1,
                endHourTime: -1,
                startMinuteTime: -1,
                endMinuteTime: -1
              })
              setOpenTimeSelector(false)
            }}
          />
        </div>
      )}
    </div>
  )
}
