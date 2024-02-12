"use client"

import { DatePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import { CalendarIcon, ClockIcon } from "./Icon"
import React, { useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { GroupedAppointments } from "../types/AppointmentTypes"

const text_shadow = { textShadow: "4px 4px 3px rgba(0, 0, 0, 0.25)" } as React.CSSProperties

export default function DateTimeReserve({
  onDateChange,
  isDateValid,
  onTimeChange,
  isTimeValid,
  duration,
  appointments
}: {
  onDateChange: (value: Dayjs | null) => void
  isDateValid: boolean
  onTimeChange: (value: Dayjs | null) => void
  isTimeValid: boolean
  duration: number
  appointments: GroupedAppointments
}) {
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null)
  const [reserveTime, setReserveTime] = useState<Dayjs | null>(null)
  const [dateTime, setDateTime] = useState<Dayjs | null>(null)
  const errorMessageDate = "Please select Date"
  const errorMessageTime = "Please select Time"

  const checkAvailableTime = (value: dayjs.Dayjs): boolean => {
    if (reserveDate) {
      const day = dayjs(reserveDate).format("YYYY-MM-DD")
      const myDateTime = reserveDate.hour(value.get("hour")).minute(value.get("minute"))

      const myStartTime = myDateTime
      const myStopTime = myDateTime.add(duration, "minutes")

      for (const app of appointments[day] || []) {
        const starttime = dayjs(app.time)
        const stoptime = dayjs(app.time).add(app.duration, "minutes")
        if (
          !(
            myStartTime.isBefore(starttime) &&
            (myStopTime.isBefore(starttime) || myStopTime.isSame(starttime))
          ) &&
          !(
            myStopTime.isAfter(stoptime) &&
            (myStartTime.isAfter(stoptime) || myStartTime.isSame(stoptime))
          )
        ) {
          return false
        }
      }

      return true
    } else {
      return true
    }
  }

  const datePicker = () => {
    return (
      <div className="space-y-8 flex flex-col justify-items-center items-center">
        <div className="flex flex-row space-x-1 justify-items-center items-center">
          <div
            style={text_shadow}
            className="text-center text-white text-[16px] xl:text-[24px] lg:text-[20px] md:text-[18px]  font-normal font-noto-sans leading-[42px]"
          >
            วันที่จอง
          </div>
          <CalendarIcon />
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={reserveDate}
            onChange={(value) => {
              onDateChange(value)
              setReserveDate(value)
            }}
            slotProps={{
              textField: {
                helperText: isDateValid ? "" : errorMessageDate
              }
            }}
            disablePast={true}
            sx={{
              bgcolor: "#DEDEDE",
              borderRadius: "4px ",
              fontWeight: "bold",
              "&:hover": { borderColor: "#DDDDDD", border: 0 }
            }}
          />
        </LocalizationProvider>
      </div>
    )
  }

  const timePicker = () => {
    return (
      <div className="space-y-3">
        <div className="space-y-8 flex flex-col justify-items-center items-center">
          <div className="flex flex-row space-x-1 justify-items-center items-center">
            <div
              style={text_shadow}
              className="text-center text-white text-[16px] xl:text-[24px] lg:text-[20px] md:text-[18px]  font-normal font-noto-sans leading-[42px]"
            >
              เวลาที่จอง
            </div>
            <ClockIcon />
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex flex-row space-x-4 justify-items-center items-center">
              <TimePicker
                value={reserveTime}
                disabled={reserveDate ? false : true}
                slotProps={{
                  textField: {
                    helperText: isTimeValid ? "" : errorMessageTime
                  }
                }}
                onChange={(value) => {
                  onTimeChange(value)
                  setReserveTime(value)
                  if (reserveDate && value) {
                    const datetime = reserveDate
                      .hour(value.hour())
                      .minute(value.minute())
                      .second(value.second())
                    setDateTime(datetime)
                  }
                }}
                shouldDisableTime={(value, view) =>
                  view === "minutes" && !checkAvailableTime(value)
                }
                sx={{
                  bgcolor: "#DEDEDE",
                  borderRadius: "4px ",
                  fontWeight: "bold",
                  "&:hover": { borderColor: "#DDDDDD", border: 0 }
                }}
              />
              {reserveTime ? (
                <div
                  style={text_shadow}
                  className="text-white text-[18px] font-bold font-noto-sans leading-[42px]"
                >
                  ถึง
                </div>
              ) : null}
              {reserveTime ? (
                <TimePicker
                  value={dayjs(dateTime).add(duration, "minutes")}
                  readOnly
                  sx={{
                    bgcolor: "#DEDEDE",
                    borderRadius: "4px ",
                    fontWeight: "bold",
                    "&:hover": { borderColor: "#DDDDDD", border: 0 }
                  }}
                />
              ) : null}
            </div>
          </LocalizationProvider>
        </div>
        <div className="relative w-auto h-auto">
          {reserveTime ? (
            <div className="z-3 absolute  text-[18px] text-yellow-300 font-bold font-noto-sans ">
              * เวลาที่ใช้โดยประมาณ : {duration} นาที
            </div>
          ) : null}

          {reserveTime ? (
            <div
              style={{ filter: "blur(20px)" }}
              className="relative text-[18px] text-yellow-200 font-bold font-noto-sans"
            >
              * เวลาที่ใช้โดยประมาณ : {duration} นาที
            </div>
          ) : null}
        </div>
      </div>
    )
  }
  return (
    <div className="max-w-[730px] flex flex-row space-x-24 px-2">
      {datePicker()}
      {timePicker()}
    </div>
  )
}
