// import styles from './stylesheet/AppointmentPanel.module.css'
import bg from "../../../assets/images/paper.png"
import CancelButton from "./CancelButton"
import ConfirmButton from "./ConfirmButton"
import { EditButton } from "./EditButton"
import DateTimeReserve from "./DateTimeReserve"
import { useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { TypeOfFortuneSelect } from "./TypeOfFortuneSelect"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { yellow } from "@mui/material/colors"
import { ConfirmModal } from "./ConfirmModal"
import { SuccessModal } from "./SuccessModal"

const text_shadow = { textShadow: "4px 4px 3px rgba(0, 0, 0, 0.25)" } as React.CSSProperties
// format("YYYY-MM-DDTHH:mm:ssZ[Z]")
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
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isValidDate, setIsValidDate] = useState(true)
  const [isValidTime, setIsValidTime] = useState(true)
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null)
  const [reserveTime, setReserveTime] = useState<Dayjs | null>(null)
  // const [dateTime, setDateTime] = useState<Dayjs | null>(null)
  const [packageType, setPackageType] = useState(typeOfFortunes[0])

  //const date
  //const time
  const userInfo = {
    name: "ม๋าแดง หมาเด็กของพี่คนสวย",
    birthdate: "11 ตุลาคม 2545",
    tel: "081-234-5678"
  }

  // if (reserveDate && reserveTime) {
  //   const datetime = reserveDate
  //     .hour(reserveTime.hour())
  //     .minute(reserveTime.minute())
  //     .second(reserveTime.second())
  //   // console.log(dayjs(datetime).format("YYYY-MM-DDTHH:mm:ssZ[Z]"))
  // }

  const CustomerInfo = () => {
    return (
      <div className="rounded-xl border border-stone-800 border-opacity-50 px-24 py-4">
        <div className="text-center text-stone-800 text-base xl:text-xl lg:text-lg md:text-md font-bold font-['Libre Bodoni'] underline mb-3">
          ข้อมูลผู้จอง
        </div>
        <div className="flex flex-col text-white text-base xl:text-xl lg:text-lg md:text-md justify-items-center items-start space-y-1">
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
        WebkitBackgroundSize: "auto",
        width: "942px",
        height: "1180px"
      }}
      className="mt-32 w-auto h-auto py-4 px-8 flex-col justify-center items-center inline-flex space-y-5"
    >
      <div className="relative">
        <div className="z-3 absolute text-2xl xl:text-4xl lg:text-4xl md:text-3xl  text-white font-bold font-['Libre Bodoni'] ">
          ใบจองการนัดหมายดูดวง
        </div>
        <div
          style={{ filter: "blur(10px)" }}
          className="text-2xl xl:text-4xl lg:text-4xl md:text-3xl relative text-white font-bold font-['Libre Bodoni'] "
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
          onDateChange={(value: Dayjs) => {
            setReserveDate(value)
            setIsValidDate(true)
            
          }}
          onTimeChange={(value: Dayjs) => {
            setReserveTime(value)
            setIsValidTime(true)
            
          }}
          duration={packageType.duration}
          isDateValid={isValidDate}
          isTimeValid={isValidTime}
        />
      </ThemeProvider>
      <CustomerInfo />
      <div className="w-auto flex flex-row space-x-4 justify-items-center items-center">
        <CancelButton onClick={() => {}} />
        <ConfirmButton
          onClick={() => {
            if (!reserveDate) {
              setIsValidDate(false)
            }
            if (!reserveTime) {
              setIsValidTime(false)
            } else {
              setIsConfirmModalOpen(true)
            }
          }}
        />
      </div>
      <ConfirmModal
        fortuneTeller={fortuneTeller}
        type={packageType.typeName}
        price={packageType.price}
        date={dayjs(reserveDate).format("DD MMM YYYY")}
        starttime={dayjs(reserveTime).format("HH:mm")}
        endtime={dayjs(reserveTime).add(packageType.duration, "minutes").format("HH:mm")}
        isVisible={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => {
          setIsConfirmModalOpen(false)
          setIsSuccessModalOpen(true)
        }}
      />
      <SuccessModal isVisible={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} />
    </div>
  )
}
