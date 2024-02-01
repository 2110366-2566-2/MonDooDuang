"use client"

import { DatePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { CalendarIcon, ClockIcon } from "./Icon"
// import styles from "./stylesheet/AppointmentPanel.module.css"
import { yellow } from "@mui/material/colors"
import { useState } from "react"
import dayjs, { Dayjs } from "dayjs"

const text_shadow = { textShadow: "4px 4px 3px rgba(0, 0, 0, 0.25)" } as React.CSSProperties

const newTheme = createTheme({
  palette: {
    primary: {
      light: "#edbc41",
      main: "#E9AC12",
      dark: "#E9AC12",
      contrastText: "#fff"
    },
    secondary: {
      main: yellow[700],
      dark: yellow[900]
    }
  }
})

export default function DateTimeReserve({
  onDateChange,
  onTimeChange,
  duration
}: {
  onDateChange: Function
  onTimeChange: Function
  duration: number
}) {
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null)
  const [reserveTime, setReserveTime] = useState<Dayjs | null>(null)
  const [dateTime, setDateTime] = useState<Dayjs | null>(null)

  const datePicker = () => {
    return (
      <div className="space-y-8 flex flex-col justify-items-center items-center">
        <div className="flex flex-row space-x-1 justify-items-center items-center">
          <div
            style={text_shadow}
            className="text-center text-white text-[28px] font-normal font-['Libre Bodoni'] leading-[42px]"
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
              className="text-center text-white text-[28px] font-normal font-['Libre Bodoni'] leading-[42px]"
            >
              เวลาที่จอง
            </div>
            <ClockIcon />
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex flex-row space-x-4 justify-items-center items-center">
              <TimePicker
                value={reserveTime}
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
                  className="text-white text-[18px] font-bold font-['Libre Bodoni'] leading-[42px]"
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
            <div className="z-3 absolute  text-[18px] text-yellow-300 font-bold font-['Libre Bodoni'] ">
              * เวลาที่ใช้โดยประมาณ : {duration} นาที
            </div>
          ) : null}

          <div
            style={{ filter: "blur(20px)" }}
            className="relative text-[18px] text-yellow-200 font-bold font-['Libre Bodoni']"
          >
            * เวลาที่ใช้โดยประมาณ : {duration} นาที
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-row space-x-24">
      <ThemeProvider theme={newTheme}>
        {datePicker()}
        {timePicker()}
      </ThemeProvider>
    </div>
  )
}
