import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import CameraIcon from "./components/Icon/CameraIcon"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { styled } from "@mui/material/styles"
import { MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useState } from "react"
import { Gender, UserSchema } from "./types/RegisterType"
import FortuneTellerRegisterAlert from "./components/FortuneTellerRegisterAlert"
import ConfirmAlert from "./components/ConfirmAlert"
import FailedAlert from "./components/FailedAlert"
import { RegisterService } from "./services/RegisterService"
import { setLocalStorage } from "../../common/services/LocalStorage"

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
  const [formValues, setFormValues] = useState<UserSchema>({})
  const [formError, setFormError] = useState<boolean[]>(Array(9).fill(false))
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [dateError, setDateError] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)
  const [FTAlert, setFTAlert] = useState<boolean>(false)
  const [CFAlert, setCFAlert] = useState<boolean>(false)
  const [FAlert, setFAlert] = useState<boolean>(false)

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setFormValues({
      ...formValues,
      [name]: value
    })
    if (name == "email") handleEmailChange(value)
  }

  const handlePasswordChange = (isConfirm: boolean, password: string) => {
    if (!isConfirm) {
      setFormValues({
        ...formValues,
        password: password
      })
      if (password === confirmPassword) setPasswordError(false)
      else setPasswordError(true)
    } else {
      setConfirmPassword(password)
      if (password === formValues.password) setPasswordError(false)
      else setPasswordError(true)
    }
  }

  const handleBankChange = (event: SelectChangeEvent) => {
    setFormValues({
      ...formValues,
      bankName: event.target.value
    })
  }

  const handleEmailChange = (email: string) => {
    if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
      setEmailError(false)
    else setEmailError(true)
  }

  const checkAllInput = () => {
    const newArray = [...formError]
    newArray[0] =
      Object.entries(formValues).find(([key]) => key === "fName") === undefined ||
      Object.entries(formValues).find(([key, value]) => key === "fName" && value === "") !==
        undefined
    newArray[1] =
      Object.entries(formValues).find(([key]) => key === "lName") === undefined ||
      Object.entries(formValues).find(([key, value]) => key === "lName" && value === "") !==
        undefined
    newArray[2] =
      Object.entries(formValues).find(([key]) => key === "gender") === undefined ||
      Object.entries(formValues).find(([key, value]) => key === "gender" && value === "") !==
        undefined
    newArray[3] =
      Object.entries(formValues).find(([key]) => key === "phoneNumber") === undefined ||
      Object.entries(formValues).find(([key, value]) => key === "phoneNumber" && value === "") !==
        undefined
    newArray[4] =
      Object.entries(formValues).find(([key]) => key === "email") === undefined ||
      Object.entries(formValues).find(([key, value]) => key === "email" && value === "") !==
        undefined
    newArray[5] =
      Object.entries(formValues).find(([key]) => key === "birthDate") === undefined ||
      Object.entries(formValues).find(([key, value]) => key === "birthDate" && value === "") !==
        undefined
    newArray[6] =
      Object.entries(formValues).find(([key]) => key === "bankName") === undefined ||
      Object.entries(formValues).find(([key, value]) => key === "bankName" && value === "") !==
        undefined
    newArray[7] =
      Object.entries(formValues).find(([key]) => key === "accountNumber") === undefined ||
      Object.entries(formValues).find(([key, value]) => key === "accountNumber" && value === "") !==
        undefined
    newArray[8] =
      Object.entries(formValues).find(([key]) => key === "password") === undefined ||
      Object.entries(formValues).find(([key, value]) => key === "password" && value === "") !==
        undefined
    setFormError(newArray)
    return newArray.reduce((sum, bool) => sum && !bool, true)
  }

  const handleSubmitButton = async (event) => {
    event.preventDefault()
    const sum = checkAllInput()
    if (!sum || dateError || passwordError || emailError) {
      console.log("info not complete")
      return
    }
    const res = await RegisterService.createUser(formValues)
    const data = await res.json()
    if (data.success === undefined) {
      setFAlert(true)
      return
    }
    setLocalStorage(data)
    setFTAlert(true)
  }

  return (
    <div className="h-[100%] w-[100%] bg-black flex flex-col items-center">
      <div className="absolute flex w-[30%]">
        <div className="z-10 w-[30%] bg-gradient-to-l from-black" />
        <div className="z-10 w-[40%] justify-center flex bg-black">
          <img className="mt-7" src="./img/logo.svg" />
        </div>
        <div className="z-10 w-[30%] bg-gradient-to-r from-black" />
      </div>
      <div className="flex mt-24 mb-8 pt-14 pb-10 flex-col items-center text-white w-[95%] border border-white rounded-[30px]">
        <p className="text-[38px] font-medium">สร้างบัญชีใหม่</p>
        <form className="flex flex-col w-[85%]">
          <div className="flex mt-5">
            <div className="flex w-[46%] flex-col items-center justify-center gap-2">
              <div className="flex items-center justify-center bg-mdd-text-field rounded-full w-[146px] h-[146px]">
                <CameraIcon />
              </div>
              <p>
                <span className="text-2xl">รูปโปรไฟล์ </span>(ไม่จำเป็น)
              </p>
            </div>
            <div className="relative flex w-[54%] flex-col items-start gap-1">
              <p
                className={`ml-3 text-2xl ${
                  formError[0] ? "text-mdd-invalid-label" : "text-white"
                }`}
              >
                ชื่อจริง*
              </p>
              {formError[0] && (
                <div className="absolute w-full h-[50px] mt-9 rounded-[10px] border-2 border-mdd-invalid-field pointer-events-none" />
              )}
              <input
                type="text"
                id="0"
                name="fName"
                required
                maxLength={100}
                value={formValues?.fName}
                onChange={handleTextFieldChange}
                className="px-7 py-2 text-[22px] w-full h-[50px] rounded-[10px] resize-none bg-mdd-text-field"
              />
              <p
                className={`ml-3 mt-3 text-2xl ${
                  formError[1] ? "text-mdd-invalid-label" : "text-white"
                }`}
              >
                นามสกุล*
              </p>
              {formError[1] && (
                <div className="absolute w-full h-[50px] mt-[138px] rounded-[10px] border-2 border-mdd-invalid-field pointer-events-none" />
              )}
              <input
                type="text"
                id="1"
                name="lName"
                required
                maxLength={100}
                value={formValues?.lName}
                onChange={handleTextFieldChange}
                className="px-7 py-2 text-[22px] w-full h-[50px] rounded-[10px] resize-none bg-mdd-text-field"
              />
            </div>
          </div>
          <div className="flex mt-8 justify-between">
            <div className="relative flex flex-col w-[24%] items-start">
              <p
                className={`ml-3 text-2xl ${
                  dateError || formError[5] ? "text-mdd-invalid-label" : "text-white"
                }`}
              >
                วัน เดือน ปี เกิด*
              </p>
              {formError[5] && (
                <div className="absolute w-full h-[50px] mt-8 rounded-[10px] border-2 border-mdd-invalid-field pointer-events-none" />
              )}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CustomizedDatePicker
                  defaultValue={today}
                  disableFuture
                  views={["year", "month", "day"]}
                  className="h-[50px] rounded-[10px] resize-none bg-mdd-text-field"
                  format="DD-MM-YYYY"
                  slotProps={{
                    textField: {
                      required: true
                    }
                  }}
                  value={formValues?.birthDate}
                  onChange={(d) => {
                    d?.$d.setHours(7, 0, 0)
                    setFormValues({
                      ...formValues,
                      birthDate: d?.$d
                    })
                  }}
                  onAccept={() => {
                    setDateError(false)
                  }}
                  onError={() => {
                    setDateError(true)
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className="relative flex w-[24%] flex-col items-start">
              <p
                className={`ml-3 text-2xl ${
                  formError[3] ? "text-mdd-invalid-label" : "text-white"
                }`}
              >
                เบอร์โทรศัพท์*
              </p>
              {formError[3] && (
                <div className="absolute w-full h-[50px] mt-8 rounded-[10px] border-2 border-mdd-invalid-field pointer-events-none" />
              )}
              <input
                type="tel"
                id="3"
                name="phoneNumber"
                required
                maxLength={20}
                value={formValues?.phoneNumber}
                onChange={handleTextFieldChange}
                className="px-7 py-2 w-full text-[22px] h-[50px] rounded-[10px] resize-none bg-mdd-text-field"
              />
            </div>
            <div className="relative flex w-[45%] flex-col items-start">
              <p
                className={`ml-3 text-2xl ${
                  formError[2] ? "text-mdd-invalid-label" : "text-white"
                }`}
              >
                เพศ*
              </p>
              <div className="flex justify-between items-center h-[50px] w-full">
                {formError[2] && (
                  <div className="absolute w-[102%] h-[50px] right-[-1%] rounded-[10px] border-2 border-mdd-invalid-field pointer-events-none" />
                )}
                <div className="flex items-center">
                  <input
                    id="male"
                    type="radio"
                    name="gender"
                    value="MALE"
                    required
                    onChange={() => {
                      setFormValues({
                        ...formValues,
                        gender: "MALE" as Gender
                      })
                    }}
                    className="w-[25px] h-[25px] appearance-none rounded-full border-2 border-white checked:bg-mdd-yellow-radio-button"
                  />
                  <label htmlFor="male" className="ml-2 text-2xl">
                    ชาย
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="female"
                    type="radio"
                    name="gender"
                    value="FEMALE"
                    required
                    onChange={() => {
                      setFormValues({
                        ...formValues,
                        gender: "FEMALE" as Gender
                      })
                    }}
                    className="w-[25px] h-[25px] appearance-none rounded-full border-2 border-white checked:bg-mdd-yellow-radio-button"
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
                    value="LGBTQA+"
                    required
                    onChange={() => {
                      setFormValues({
                        ...formValues,
                        gender: "LGBTQA+" as Gender
                      })
                    }}
                    className="w-[25px] h-[25px] appearance-none rounded-full border-2 border-white checked:bg-mdd-yellow-radio-button"
                  />
                  <label htmlFor="LGBTQA+" className="ml-2 text-2xl">
                    LGBTQIA+
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="notToSay"
                    type="radio"
                    name="gender"
                    value="NOT_TO_SAY"
                    required
                    onChange={() => {
                      setFormValues({
                        ...formValues,
                        gender: "NOT_TO_SAY" as Gender
                      })
                    }}
                    className="w-[25px] h-[25px] appearance-none rounded-full border-2 border-white checked:bg-mdd-yellow-radio-button"
                  />
                  <label htmlFor="notToSay" className="ml-2 text-2xl">
                    ไม่ระบุ
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-5 justify-between">
            <div className="relative flex flex-col items-start w-[42%]">
              <p
                className={`ml-3 text-2xl ${
                  formError[4] || emailError ? "text-mdd-invalid-label" : "text-white"
                }`}
              >
                อีเมล*
              </p>
              {(formError[4] || emailError) && (
                <div className="absolute w-full h-[50px] mt-8 rounded-[10px] border-2 border-mdd-invalid-field pointer-events-none" />
              )}
              <input
                type="email"
                id="4"
                name="email"
                required
                maxLength={200}
                value={formValues?.email}
                onChange={handleTextFieldChange}
                className="px-7 py-2 text-[22px] w-full h-[50px] rounded-[10px] resize-none bg-mdd-text-field"
              />
            </div>
            <div className="relative flex flex-col items-start w-[25%]">
              <p
                className={`ml-3 text-2xl ${
                  formError[8] ? "text-mdd-invalid-label" : "text-white"
                }`}
              >
                รหัสผ่าน*
              </p>
              {formError[8] && (
                <div className="absolute w-full h-[50px] mt-8 rounded-[10px] border-2 border-mdd-invalid-field pointer-events-none" />
              )}
              <input
                type="password"
                id="8"
                name="password"
                required
                value={formValues?.password}
                onChange={(e) => handlePasswordChange(false, e.target.value)}
                className="px-7 py-2 text-[22px] w-full h-[50px] rounded-[10px] resize-none bg-mdd-text-field"
              />
            </div>
            <div className="relative flex flex-col items-start w-[25%]">
              <p
                className={`ml-3 text-2xl ${
                  passwordError ? "text-mdd-invalid-label" : "text-white"
                }`}
              >
                ยืนยันรหัสผ่าน*
              </p>
              {passwordError && (
                <div className="absolute w-full h-[50px] mt-8 rounded-[10px] border-2 border-mdd-invalid-field pointer-events-none" />
              )}
              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                required
                value={confirmPassword}
                onChange={(e) => handlePasswordChange(true, e.target.value)}
                className="px-7 py-2 text-[22px] w-full h-[50px] rounded-[10px] resize-none bg-mdd-text-field"
              />
            </div>
          </div>
          <p className="text-center tex text-[38px] mt-8 font-medium">กรอกข้อมูลบัตร</p>
          <div className="flex justify-between mt-2">
            <div className="relative flex flex-col items-start w-[42%]">
              <p
                className={`ml-3 text-2xl ${
                  formError[7] ? "text-mdd-invalid-label" : "text-white"
                }`}
              >
                เลขที่บัญชี*
              </p>
              {formError[7] && (
                <div className="absolute w-full h-[50px] mt-8 rounded-[10px] border-2 border-mdd-invalid-field pointer-events-none" />
              )}
              <input
                type="string"
                id="7"
                name="accountNumber"
                required
                maxLength={100}
                value={formValues?.accountNumber}
                onChange={handleTextFieldChange}
                className="px-7 py-2 text-[22px] w-full h-[50px] rounded-[10px] resize-none bg-mdd-text-field [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div className="relative flex flex-col items-start w-[54%]">
              <p
                className={`ml-3 text-2xl ${
                  formError[6] ? "text-mdd-invalid-label" : "text-white"
                }`}
              >
                ธนาคาร*
              </p>
              {formError[6] && (
                <div className="absolute w-full h-[50px] mt-8 rounded-[10px] border-2 border-mdd-invalid-field pointer-events-none" />
              )}
              <CustomizedSelect
                name="select-bank"
                value={formValues.bankName}
                onChange={handleBankChange}
                required
                className="w-full h-[50px] bg-mdd-text-field"
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
          <div className="mt-8 text-center self-end w-[11%] h-[50px] rounded-[10px] bg-white">
            <button
              type="submit"
              onClick={(e) => handleSubmitButton(e)}
              className="my-3 text-[#3B3B3B] text-2xl font-semibold"
            >
              เสร็จสิ้น
            </button>
          </div>
        </form>
      </div>
      {FTAlert && (
        <FortuneTellerRegisterAlert
          FTAlert={FTAlert}
          setFTAlert={setFTAlert}
          setCFAlert={setCFAlert}
        />
      )}
      {CFAlert && <ConfirmAlert CFAlert={CFAlert} setCFAlert={setCFAlert} />}
      {FAlert && <FailedAlert FAlert={FAlert} setFAlert={setFAlert} />}
    </div>
  )
}
