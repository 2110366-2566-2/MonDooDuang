import { useRef, useState, useEffect } from "react"

interface Props {
  setOpenTimeSelector: (openTimeSelector: boolean) => void
  startHourTime: number
  endHourTime: number
  setStartHourTime: (startHourTime: number) => void
  setEndHourTime: (endHourTime: number) => void
  startMinuteTime: number
  endMinuteTime: number
  setStartMinuteTime: (startMinuteTime: number) => void
  setEndMinuteTime: (endMinuteTime: number) => void
  clearTime: () => void
}
export default function TimeSelectorOverlay({
  setOpenTimeSelector,
  startHourTime,
  endHourTime,
  setStartHourTime,
  setEndHourTime,
  startMinuteTime,
  endMinuteTime,
  setStartMinuteTime,
  setEndMinuteTime,
  clearTime
}: Props) {
  return (
    <div className="w-[80%] bg-white/[0.9] rounded-lg shadow-lg px-2">
      <div className="flex flex-row justify-between items-center">
        <TimeInput
          title="เวลาเริ่มต้น"
          hourTime={startHourTime}
          minuteTime={startMinuteTime}
          setHourTime={setStartHourTime}
          setMinuteTime={setStartMinuteTime}
        />
        <p className="text-[#585958] text-md font-semibold pt-5">ถึง</p>
        <TimeInput
          title="เวลาสิ้นสุด"
          hourTime={endHourTime}
          minuteTime={endMinuteTime}
          setHourTime={setEndHourTime}
          setMinuteTime={setEndMinuteTime}
        />
      </div>
      <div className="w-full flex justify-end pb-2 pr-5 gap-5">
        <button className="text-sm text-[#fbb724] font-example-font font-[550]" onClick={clearTime}>
          CANCEL
        </button>
        <button
          className="text-sm text-[#fbb724] font-example-font font-[550]"
          onClick={() => setOpenTimeSelector(false)}
        >
          CONFIRM
        </button>
      </div>
    </div>
  )
}

interface TimeInputProps {
  title: string
  hourTime: number
  minuteTime: number
  setHourTime: (hourTime: number) => void
  setMinuteTime: (minuteTime: number) => void
}

function TimeInput({ title, hourTime, minuteTime, setHourTime, setMinuteTime }: TimeInputProps) {
  const [focusHour, setFocusHour] = useState(false)
  const [focusMinute, setFocusMinute] = useState(false)
  const inputHourRef = useRef<HTMLInputElement>(null)
  const inputMinuteRef = useRef<HTMLInputElement>(null)
  const currentDate = new Date()
  const currentHour = (currentDate.getHours() < 10 ? "0" : "") + currentDate.getHours().toString()
  const currentMinute =
    (currentDate.getMinutes() < 10 ? "0" : "") + currentDate.getMinutes().toString()

  const inputHourFocus = () => {
    inputHourRef.current?.focus()
    setFocusHour(true)
  }
  const inputMinuteFocus = () => {
    inputMinuteRef.current?.focus()
    setFocusMinute(true)
  }

  const onHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    let parsedValue = parseInt(value)
    if (!isNaN(parsedValue)) {
      if (parsedValue < 0) {
        setHourTime(0)
      } else if (parsedValue > 23) {
        setHourTime(23)
      } else {
        setHourTime(parsedValue)
      }
    } else {
      setHourTime(-1)
    }
    e.target.value = parsedValue < 10 ? `0${parsedValue}` : parsedValue.toString()
  }
  const onMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    let parsedValue = parseInt(value)
    if (!isNaN(parsedValue)) {
      if (parsedValue < 0) {
        setMinuteTime(0)
      } else if (parsedValue > 59) {
        setMinuteTime(59)
      } else {
        setMinuteTime(parsedValue)
      }
    } else {
      setMinuteTime(-1)
    }
    e.target.value = parsedValue < 10 ? `0${parsedValue}` : parsedValue.toString()
  }

  const closeHourTime = (event: MouseEvent) => {
    if (inputHourRef.current && !inputHourRef.current.contains(event.target as Node)) {
      setFocusHour(false)
    }
  }
  const closeMinuteTime = (event: MouseEvent) => {
    if (inputMinuteRef.current && !inputMinuteRef.current.contains(event.target as Node)) {
      setFocusMinute(false)
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", closeHourTime)
    return () => {
      document.removeEventListener("mousedown", closeHourTime)
    }
  }, [])
  useEffect(() => {
    document.addEventListener("mousedown", closeMinuteTime)
    return () => {
      document.removeEventListener("mousedown", closeMinuteTime)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-between pt-4 pb-2 px-2">
      <p className="text-[#585958] text-md font-semibold mb-2">{title}</p>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col w-[45%] justify-items-center items-center">
          <input
            type="number"
            ref={inputHourRef}
            value={
              hourTime === -1
                ? ""
                : hourTime < 10 && hourTime.toString().length < 2
                ? "0" + hourTime
                : hourTime
            }
            onChange={onHourChange}
            onClick={() => setFocusHour(true)}
            className="w-full h-16 rounded-md bg-white text-3xl font-example-font font-medium text-center focus:outline-none focus:border-[#FBBF24] border-white border-2"
          />
          <p className="text-[#585958] font-normal text-[12px] mt-1">ชั่วโมง</p>
        </div>
        <p className="font-semibold text-5xl -translate-y-[14px]"> : </p>
        <div className="flex flex-col w-[45%] justify-items-center items-center">
          <input
            type="number"
            ref={inputMinuteRef}
            value={
              minuteTime === -1
                ? ""
                : minuteTime < 10 && minuteTime.toString().length < 2
                ? "0" + minuteTime
                : minuteTime
            }
            onChange={onMinuteChange}
            onClick={() => setFocusMinute(true)}
            className="w-full h-16 rounded-md bg-white text-3xl font-example-font font-medium text-center focus:outline-none focus:border-[#FBBF24] border-white border-2"
          />
          <p className="text-[#585958] font-normal text-[12px] mt-1">นาที</p>
        </div>

        <div className="absolute flex flex-row w-[30%] justify-around translate-x-2 -translate-y-[10px]">
          <p
            className={`text-3xl ${
              hourTime !== -1 || focusHour ? "text-transparent" : "text-[#585958]/[0.6]"
            } font-sans`}
            onClick={inputHourFocus}
          >
            {currentHour}
          </p>
          <div className="w-2"></div>
          <p
            className={`text-3xl ${
              minuteTime !== -1 || focusMinute ? "text-transparent" : "text-[#585958]/[0.6]"
            } font-sans`}
            onClick={inputMinuteFocus}
          >
            {currentMinute}
          </p>
        </div>
      </div>
    </div>
  )
}
