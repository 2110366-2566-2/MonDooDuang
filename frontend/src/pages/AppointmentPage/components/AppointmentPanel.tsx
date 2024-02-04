// import styles from './stylesheet/AppointmentPanel.module.css'
import bg from "../../../assets/images/paper.png"
import CancelButton from "./CancelButton"
import ConfirmButton from "./ConfirmButton"
import { EditButton } from "./EditButton"
import DateTimeReserve from "./DateTimeReserve"
import { useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { TypeOfFortuneSelect } from "./TypeOfForTuneSelect"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { yellow } from "@mui/material/colors"

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
export default function AppointmentPanel() {
  //mock data
  const fortuneTeller = "DaengDooDaung"
  const typeOfFortunes = [
    { id: "01", typeName: "ดูดวงไพ่ทาโรต์", price: 300, duration: 120 },
    { id: "02", typeName: "ดูดวงไพ่ยิปซี", price: 250, duration: 120 }
  ]
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null)
  const [reserveTime, setReserveTime] = useState<Dayjs | null>(null)
  const [packageType, setPackageType] = useState(typeOfFortunes[0])

  //const date
  //const time
  const userInfo = {
    name: "ม๋าแดง หมาเด็กของพี่คนสวย",
    birthdate: "11 ตุลาคม 2545",
    tel: "081-234-5678"
  }
  if (reserveDate && reserveTime) {
    const datetime = reserveDate
      .hour(reserveTime.hour())
      .minute(reserveTime.minute())
      .second(reserveTime.second())
    console.log(dayjs(datetime).format("YYYY-MM-DDTHH:mm:ssZ[Z]"))
  }

  const CustomerInfo = () => {
    return (
      <div className="rounded-xl border border-stone-800 border-opacity-50 px-24 py-4">
        <div className="text-center text-stone-800 text-xl font-bold font-['Libre Bodoni'] underline leading-[30px] mb-3">
          ข้อมูลผู้จอง
        </div>
        <div className="flex flex-col text-white text-base text-lg justify-items-center items-start space-y-1">
          <div style={text_shadow}>ชื่อผู้จอง : {userInfo.name}</div>
          <div style={text_shadow}>วันเกิด : {userInfo.birthdate}</div>
          <div style={text_shadow}>เบอร์โทรศัพท์ : {userInfo.tel}</div>
        </div>
        <div className="w-full flex items-end justify-items-end mt-6">
          <div className="flex ml-auto">
            <EditButton />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        width: "100%",
        minHeight: "100vh"
      }}
      className="mt-32 w-auto h-auto py-4 px-8 flex-col justify-center items-center gap-2.5 inline-flex space-y-5"
    >
      <div className="relative w-auto h-auto">
        <div className="z-3 absolute text-5xl text-white font-bold font-['Libre Bodoni'] leading-[72px]">
          ใบจองการนัดหมายดูดวง
        </div>
        <div
          style={{ filter: "blur(10px)" }}
          className="text-5xl relative text-white font-bold font-['Libre Bodoni'] leading-[72px]"
        >
          ใบจองการนัดหมายดูดวง
        </div>
      </div>
      <ThemeProvider theme={newTheme}>
        <TypeOfFortuneSelect
          typeJson={typeOfFortunes}
          fortuneTeller={fortuneTeller}
          onPackageChange={setPackageType}
        />
        <DateTimeReserve
          onDateChange={setReserveDate}
          onTimeChange={setReserveTime}
          duration={packageType.duration}
        />
      </ThemeProvider>
      <CustomerInfo />
      <div className="w-auto flex flex-row space-x-4 justify-items-center items-center">
        <CancelButton />
        <ConfirmButton />
      </div>
    </div>
  )
}
