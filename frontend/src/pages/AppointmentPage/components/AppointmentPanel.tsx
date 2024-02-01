// import styles from './stylesheet/AppointmentPanel.module.css'
import bg from "../../../assets/images/paper.png"
import CancelButton from "./CancelButton"
import ConfirmButton from "./ConfirmButton"
import { EditButton } from "./EditButton"
import { CoinIcon, DropDownButton, LeftArrow, RightArrow, UnderLine } from "./Icon"
import DateTimeReserve from "./DateTimeReserve"
import { useState } from "react"
import dayjs from "dayjs"

const text_shadow = { textShadow: "4px 4px 3px rgba(0, 0, 0, 0.25)" } as React.CSSProperties

export default function AppointmentPanel() {
  const [reserveDate, setReserveDate] = useState(dayjs())
  const [reserveTime, setReserveTime] = useState(dayjs())
  //mock data
  const fortuneTeller = "DaengDooDaung"
  const typeOfFortune = "ดูดวงไพ่ทาโรต์"
  const price = 300
  const duration = 120
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

  const PackageInfo = () => {
    return (
      <div className="space-y-5">
        <div className="flex flex-col justify-items-center items-center space-y-3">
          <div className="flex flex-row justify-items-center items-center space-x-3">
            <LeftArrow />
            <div
              style={text_shadow}
              className="text-white  text-[28px] font-normal font-['Libre Bodoni'] leading-[42px]"
            >
              หมอดู
            </div>
            <RightArrow />
          </div>
          <div className="text-center">
            <span
              style={text_shadow}
              className="text-white text-[28px] font-bold font-['Libre Bodoni'] leading-[42px]"
            >
              {fortuneTeller}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-items-center items-center space-y-4">
          <div className="flex flex-row justify-items-center items-center space-x-3">
            <LeftArrow />
            <div
              style={text_shadow}
              className="text-white  text-[28px] font-normal font-['Libre Bodoni'] leading-[42px]"
            >
              ศาสตร์การดูดวง
            </div>
            <RightArrow />
          </div>
          <div className="flex flex-col justify-items-center text-center items-center">
            <div className="flex flex-row justify-items-center text-center items-center space-x-3">
              <div
                style={text_shadow}
                className="text-white text-2xl font-medium font-['Libre Bodoni'] leading-9"
              >
                {typeOfFortune}
              </div>
              <DropDownButton />
            </div>
            <UnderLine />
          </div>
          <div className="flex flex-row justify-items-center text-center items-center space-x-2">
            <CoinIcon />
            <div
              style={text_shadow}
              className="text-center text-white text-2xl font-normal font-['Libre Bodoni'] leading-9"
            >
              ราคา : {price} บาท
            </div>
          </div>
        </div>
      </div>
    )
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
      <PackageInfo />
      <DateTimeReserve onDateChange={setReserveDate} onTimeChange={setReserveTime} duration={duration} />
      <CustomerInfo />
      <div className="w-auto flex flex-row space-x-4 justify-items-center items-center">
        <CancelButton />
        <ConfirmButton />
      </div>
    </div>
  )
}
