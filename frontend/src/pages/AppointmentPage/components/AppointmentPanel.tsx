// import styles from './stylesheet/AppointmentPanel.module.css'
import bg from "../../../assets/images/paper.png"
import { EditButton } from "./EditButton"
import {
  CalendarIcon,
  ClockIcon,
  CoinIcon,
  DropDownButton,
  LeftArrow,
  RightArrow,
  UnderLine
} from "./Icon"

export default function AppointmentPanel() {
  const PackageInfo = () => {
    return (
      <div className="space-y-5">
        <div className="flex flex-col justify-items-center items-center space-y-3">
          <div className="flex flex-row justify-items-center items-center space-x-3">
            <LeftArrow />
            <div className="text-white  text-[28px] font-normal font-['Libre Bodoni'] leading-[42px]">
              หมอดู
            </div>
            <RightArrow />
          </div>
          <div className="text-center">
            <span className="text-white text-[28px] font-bold font-['Libre Bodoni'] leading-[42px]">
              DaengDooDaung
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-items-center items-center space-y-4">
          <div className="flex flex-row justify-items-center items-center space-x-3">
            <LeftArrow />
            <div className="text-white  text-[28px] font-normal font-['Libre Bodoni'] leading-[42px]">
              ศาสตร์การดูดวง
            </div>
            <RightArrow />
          </div>
          <div className="flex flex-col justify-items-center text-center items-center">
            <div className="flex flex-row justify-items-center text-center items-center space-x-3">
              <div className="text-white text-2xl font-medium font-['Libre Bodoni'] leading-9">
                ดูดวงไพ่ทาโรต์
              </div>
              <DropDownButton />
            </div>
            <UnderLine />
          </div>
          <div className="flex flex-row justify-items-center text-center items-center space-x-2">
            <CoinIcon />
            <div className="text-center text-white text-2xl font-normal font-['Libre Bodoni'] leading-9">
              ราคา : 300 บาท
            </div>
          </div>
        </div>
      </div>
    )
  }

  const InputField = () => {
    return (
      <div className="flex flex-row space-x-24">
        <div>
          <div className="flex flex-row space-x-1 justify-items-center items-center">
            <div className="text-center text-white text-[28px] font-normal font-['Libre Bodoni'] leading-[42px]">
              วันที่จอง
            </div>
            <CalendarIcon />
          </div>
          <div className="w-fit flex flex-row space-x-1 p-2 relative bg-zinc-300 bg-opacity-75 rounded-xl">
            <div className="relative text-white text-xl font-normal font-['Prompt'] leading-[30px]">
              เลือกวันที่ |
            </div>
            <CalendarIcon />
          </div>
        </div>
        <div>
          <div className="flex flex-row space-x-1 justify-items-center items-center">
            <div className="text-center text-white text-[28px] font-normal font-['Libre Bodoni'] leading-[42px]">
              เวลาที่จอง
            </div>
            <ClockIcon />
          </div>
          <div className="w-fit flex flex-row space-x-1 p-2 relative bg-zinc-300 bg-opacity-75 rounded-xl">
            <div className="relative text-white text-xl font-normal font-['Prompt'] leading-[30px]">
              เลือกเวลา |
            </div>
            <ClockIcon />
          </div>
        </div>
      </div>
    )
  }

  const CustomerInfo = () => {
    return (
      <div className="rounded-xl border border-stone-800 border-opacity-50 px-16 py-4">
        <div className="text-center text-stone-800 text-xl font-bold font-['Libre Bodoni'] underline leading-[30px] mb-3">
          ข้อมูลผู้จอง
        </div>
        <div className="flex flex-col text-white text-base justify-items-center items-start space-y-1">
          <div>ชื่อผู้จอง : ม๋าแดง หมาเด็กของพี่คนสวย</div>
          <div>วันเกิด : 11 ตุลาคม 2545</div>
          <div>เบอร์โทรศัพท์ : 081-234-5678</div>
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
        backgroundPosition: "center",
        width: "100%",
        minHeight: "100vh"
      }}
      className="mt-32 w-auto h-auto p-2.5 flex-col justify-center items-center gap-2.5 inline-flex space-y-5"
    >
      <div className="w-auto h-auto relative">
        <div className="z-3 absolute text-5xl text-white font-bold font-['Libre Bodoni'] leading-[72px]">
          ใบจองการนัดหมายดูดวง
        </div>
        <div
          style={{ filter: "blur(10px)" }}
          className="text-5xl text-white font-bold font-['Libre Bodoni'] leading-[72px]"
        >
          ใบจองการนัดหมายดูดวง
        </div>
      </div>
      <PackageInfo />
      <InputField />
      <CustomerInfo />
      <div className="w-auto flex flex-row space-x-4 justify-items-center items-center">
        <button>ยกเลิก</button>
        <button>ยืนยันการจอง</button>
      </div>
    </div>
  )
}
