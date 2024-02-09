import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import CameraIcon from "./components/Icon/CameraIcon"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { styled } from "@mui/material/styles"
import Frame from "./components/frame"
import { MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useState } from "react"

const today = dayjs()
const CustomizedDatePicker = styled(DatePicker)`
  input {
    font-family: "Prompt", "sans-serif";
    color: #ffffff;
    font-size: 22px;
    margin: 0px 14px;
    padding: 10px;
  }
}
`
const CustomizedSelect = styled(Select)`
  border-radius: 10px;

  div {
    font-family: "Prompt", "sans-serif";
    color: #ffffff;
    font-size: 22px;
    margin-top: 6px;
    margin-left: 16px;
    padding: 10px;
    border-radius: 100px;
  }

  ul {
    border-radius: 100px;
  }
`

const CustomizedMenuItem = styled(MenuItem)`
  font-family: "Prompt", "sans-serif";
  color: #3B3B3B;
  font-size: 22px;
}
`

export default function RegisterPage() {
  const [bank, setBank] = useState<string>("")
  const handleChangeBank = (event: SelectChangeEvent) => {
    setBank(event.target.value as string)
  }

  return (
    <div className="flex justify-center h-[1000px] w-full bg-[#000000]">
      <Frame />
      <div className="absolute flex mt-28 flex-col items-center text-white">
        <p className="text-[38px] font-medium">สร้างบัญชีใหม่</p>
        <form className="flex flex-col">
          <div className="flex mt-5">
            <div className="flex w-[506px] flex-col items-center justify-center gap-2">
              <div className="flex items-center justify-center bg-text-field rounded-full w-[146px] h-[146px]">
                <CameraIcon />
              </div>
              <p>
                <span className="text-2xl">รูปโปรไฟล์ </span>(ไม่จำเป็น)
              </p>
            </div>
            <div className="flex flex-col items-start gap-1">
              <p className="ml-3 text-2xl">ชื่อจริง*</p>
              <input
                type="text"
                id="fname"
                name="fname"
                className="px-7 py-2 text-[22px] w-[584px] h-[50px] rounded-[10px] resize-none bg-text-field"
              />
              <p className="ml-3 mt-3 text-2xl">นามสกุล*</p>
              <input
                type="text"
                id="lname"
                name="lname"
                className="px-7 py-2 text-[22px] w-[584px] h-[50px] rounded-[10px] resize-none bg-text-field"
              />
            </div>
          </div>
          <div className="flex w-[1090px] mt-8 justify-between">
            <div className="flex flex-col items-start">
              <p className="ml-3 text-2xl">วัน เดือน ปี เกิด*</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CustomizedDatePicker
                  defaultValue={today}
                  disableFuture
                  views={["year", "month", "day"]}
                  className="w-[279px] h-[50px] rounded-[10px] resize-none bg-text-field"
                  format="DD-MM-YYYY"
                />
              </LocalizationProvider>
            </div>
            <div className="flex flex-col items-start">
              <p className="ml-3 text-2xl">เบอร์โทรศัพท์*</p>
              <input
                type="tel"
                id="tel"
                name="tel"
                className="px-7 py-2 text-[22px] w-[279px] h-[50px] rounded-[10px] resize-none bg-text-field"
              />
            </div>
            <div className="flex flex-col items-start">
              <p className="ml-3 text-2xl">เพศ*</p>
              <div className="flex w-[460px] justify-between items-center h-[50px]">
                <div className="flex items-center">
                  <input
                    id="male"
                    type="radio"
                    name="gender"
                    className="w-[25px] h-[25px] appearance-none rounded-full border-2 border-white checked:bg-yellow-radio-button"
                  />
                  <label htmlFor="female" className="ml-2 text-2xl">
                    ชาย
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="female"
                    type="radio"
                    name="gender"
                    className="w-[25px] h-[25px] appearance-none rounded-full border-2 border-white checked:bg-yellow-radio-button"
                  />
                  <label htmlFor="female" className="ml-2 text-2xl">
                    หญิง
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="LGBTQA+"
                    type="radio"
                    name="gender"
                    className="w-[25px] h-[25px] appearance-none rounded-full border-2 border-white checked:bg-yellow-radio-button"
                  />
                  <label htmlFor="LGBTQA+" className="ml-2 text-2xl">
                    LGBTQA+
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="preferNotToSay"
                    type="radio"
                    name="gender"
                    className="w-[25px] h-[25px] appearance-none rounded-full border-2 border-white checked:bg-yellow-radio-button"
                  />
                  <label htmlFor="preferNotToSay" className="ml-2 text-2xl">
                    ไม่ระบุ
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-[1090px] mt-5 justify-between">
            <div className="flex flex-col items-start">
              <p className="ml-3 text-2xl">อีเมล*</p>
              <input
                type="email"
                id="email"
                name="email"
                className="px-7 py-2 text-[22px] w-[455px] h-[50px] rounded-[10px] resize-none bg-text-field"
              />
            </div>
            <div className="flex flex-col items-start">
              <p className="ml-3 text-2xl">รหัสผ่าน*</p>
              <input
                type="password"
                id="password"
                name="password"
                className="px-7 py-2 text-[22px] w-[271px] h-[50px] rounded-[10px] resize-none bg-text-field"
              />
            </div>
            <div className="flex flex-col items-start">
              <p className="ml-3 text-2xl">ยืนยันรหัสผ่าน*</p>
              <input
                type="password"
                id="password"
                name="passwordConfirm"
                className="px-7 py-2 text-[22px] w-[271px] h-[50px] rounded-[10px] resize-none bg-text-field"
              />
            </div>
          </div>
          <p className="text-center tex text-[38px] mt-8 font-medium">กรอกข้อมูลบัตร</p>
          <div className="flex w-[1090px] justify-between mt-2">
            <div className="flex flex-col items-start">
              <p className="ml-3 text-2xl">เลขที่บัญชี*</p>
              <input
                type="number"
                id="number"
                name="number"
                className="px-7 py-2 text-[22px] w-[455px] h-[50px] rounded-[10px] resize-none bg-text-field"
              />
            </div>
            <div className="flex flex-col items-start">
              <p className="ml-3 text-2xl">ธนาคาร*</p>
              <CustomizedSelect
                id="select-bank"
                value={bank}
                onChange={handleChangeBank}
                className="w-[581.5px] h-[50px] resize-none bg-text-field"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: "10px"
                    }
                  }
                }}
              >
                <CustomizedMenuItem value={"ธนาคารกรุงเทพ"}>ธนาคารกรุงเทพ</CustomizedMenuItem>
                <CustomizedMenuItem value={"ธนาคารกสิกรไทย"}>ธนาคารกสิกรไทย</CustomizedMenuItem>
                <CustomizedMenuItem value={"ธนาคารกรุงไทย"}>ธนาคารกรุงไทย</CustomizedMenuItem>
                <CustomizedMenuItem value={"ธนาคารไทยพาณิชย์"}>ธนาคารไทยพาณิชย์</CustomizedMenuItem>
                <CustomizedMenuItem value={"ธนาคารกรุงศรีอยุธยา"}>
                  ธนาคารกรุงศรีอยุธยา
                </CustomizedMenuItem>
                <CustomizedMenuItem value={"ธนาคารเกียรตินาคิน"}>
                  ธนาคารเกียรตินาคิน
                </CustomizedMenuItem>
              </CustomizedSelect>
            </div>
          </div>
          <div className="mt-8 text-center self-end w-[123px] h-[50px] rounded-[10px] bg-white">
            <input
              type="submit"
              value="เสร็จสิ้น"
              className="my-3  text-[#3B3B3B] text-2xl font-semibold"
            />
          </div>
        </form>
      </div>
    </div>
  )
}
