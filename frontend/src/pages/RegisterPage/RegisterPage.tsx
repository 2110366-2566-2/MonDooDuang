import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import CameraIcon from "./components/Icon/CameraIcon"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { styled } from "@mui/material/styles"
import { MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { MouseEvent, SetStateAction, useEffect, useRef, useState } from "react"
import { Gender, UserSchema } from "./types/RegisterType"
import FortuneTellerRegisterAlert from "./components/FortuneTellerRegisterAlert"
import ConfirmAlert from "./components/ConfirmAlert"
import FailedAlert from "./components/FailedAlert"
import { RegisterService } from "./services/RegisterService"
import { LocalStorageUtils } from "../../common/utils/LocalStorageUtils"
import RootLayout from "../../common/components/RootLayout/RootLayout"
import { jwtDecode } from "jwt-decode"
import { AuthContextType } from "../../common/providers/AuthProvider"

const today = dayjs()
const CustomizedDatePicker = styled(DatePicker)`
  input {
    font-family: "Prompt", "sans-serif";
    color: #ffffff;
    font-size: 20px;
    margin: 0px 14px;
    padding: 6px;
  }
}
`
const CustomizedSelect = styled(Select)`
  border-radius: 10px;

  div {
    font-family: "Prompt", "sans-serif";
    color: #ffffff;
    font-size: 20px;
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
  color: #3b3b3b;
  font-size: 20px;
  border-style: none;

  .menu-select-bank {
    width: 100vw;
  }
`

export default function RegisterPage() {
  const [formValues, setFormValues] = useState<UserSchema>({} as UserSchema)
  const [formError, setFormError] = useState<boolean[]>(Array(9).fill(false))
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewFile, setPreviewFile] = useState<string | null>(null)
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [dateError, setDateError] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)
  const [telError, setTelError] = useState<boolean>(false)
  const [accountNumberError, setAccountNumberError] = useState<boolean>(false)
  const [FTAlert, setFTAlert] = useState<boolean>(false)
  const [CFAlert, setCFAlert] = useState<boolean>(false)
  const [FAlert, setFAlert] = useState<boolean>(false)

  const handleUploadPictureButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "" // Reset the value of the file input
      fileInputRef.current.click()
    }
  }

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    if (fileList && fileList.length > 0) {
      setFile(fileList[0])
    }
  }

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setFormValues({
      ...formValues,
      [name]: value
    })
    if (name === "email") handleEmailChange(value)
    if (name === "phoneNumber") handleTelChange(value)
    if (name === "accountNumber") handleAccountNumberChange(value)
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

  const handleTelChange = (tel: string) => {
    if (/^[0-9]{10}$/.test(tel)) setTelError(false)
    else setTelError(true)
  }

  const handleAccountNumberChange = (accountNumber: string) => {
    if (/^[0-9]{10,15}$/.test(accountNumber)) setAccountNumberError(false)
    else setAccountNumberError(true)
  }

  const checkAllInput = () => {
    const newArray: boolean[] = []
    newArray.push(formValues.fName === undefined || formValues.fName === "")
    newArray.push(formValues.lName === undefined || formValues.lName === "")
    newArray.push(formValues.gender === undefined)
    newArray.push(formValues.phoneNumber === undefined || formValues.phoneNumber === "")
    newArray.push(formValues.email === undefined || formValues.email === "")
    newArray.push(formValues.birthDate === undefined)
    newArray.push(formValues.bankName === undefined || formValues.bankName === "")
    newArray.push(formValues.accountNumber === undefined || formValues.accountNumber === "")
    newArray.push(formValues.password === undefined || formValues.password === "")
    setFormError(newArray)
    return newArray.reduce((sum, bool) => sum && !bool, true)
  }

  const handleSubmitButton = async (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    const sum = checkAllInput()
    if (!sum || dateError || passwordError || emailError || telError || accountNumberError) {
      return
    }
    const data = await RegisterService.createUser(formValues)
    if (data.success === false) {
      setFAlert(true)
      return
    }
    const token = data.data
    if (file !== null) {
      const formData = new FormData()
      formData.append("image", file)

      const decodedToken = jwtDecode<Omit<AuthContextType, "token">>(token)

      const response = await RegisterService.uploadProfilePicture(decodedToken.userId, formData)
      if (!response.isSuccess) {
        alert(response.message)
        return
      }
    }
    LocalStorageUtils.setData("token", token)
    setFTAlert(true)
  }

  useEffect(() => {
    // create the preview
    let objectUrl: SetStateAction<string | null> = null
    if (file) {
      objectUrl = URL.createObjectURL(file)
    }

    setPreviewFile(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  return (
    <RootLayout>
      <div className="top-0 h-full w-full flex flex-col items-center">
        <div className="absolute flex w-[25%]">
          <div className="z-10 w-[30%] bg-gradient-to-l from-black" />
          <div className="z-10 w-[40%] justify-center flex bg-black">
            <img className="mt-7" src="./img/logo.svg" />
          </div>
          <div className="z-10 w-[30%] bg-gradient-to-r from-black" />
        </div>
        <div className="flex mt-24 mb-8 pt-14 pb-10 flex-col items-center text-white w-[90%] border border-white rounded-[30px]">
          <p className="text-3xl font-medium">สร้างบัญชีใหม่</p>
          <form className="flex flex-col w-[80%]">
            <div className="flex mt-5">
              <div className="flex w-[46%] flex-col items-center justify-center gap-2">
                <button
                  className="relative flex items-center justify-center bg-mdd-text-field rounded-full w-[146px] h-[146px]"
                  onClick={handleUploadPictureButtonClick}
                >
                  <input
                    id="fileForm"
                    name="fileForm"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handlePictureChange}
                    className="absolute w-full h-full opacity-0 cursor-pointer"
                  />
                  {previewFile !== null ? (
                    <img src={previewFile} className="h-full w-full rounded-full object-cover" />
                  ) : (
                    <CameraIcon />
                  )}
                </button>
                <p className="text-sm">
                  <span className="text-xl">รูปโปรไฟล์ </span>(ไม่จำเป็น)
                </p>
              </div>
              <div className="relative flex w-[54%] flex-col items-start gap-1">
                <p
                  className={`ml-3 text-xl ${
                    formError[0] ? "text-mdd-invalid-label" : "text-white"
                  }`}
                >
                  ชื่อจริง*
                </p>
                {formError[0] && (
                  <div className="absolute w-full h-10 mt-8 rounded-[10px] border-2 border-mdd-cancel-red pointer-events-none" />
                )}
                <input
                  type="text"
                  id="0"
                  name="fName"
                  required
                  maxLength={100}
                  value={formValues.fName}
                  onChange={handleTextFieldChange}
                  className="px-7 py-2 text-[22px] w-full h-10 rounded-[10px] resize-none bg-mdd-text-field"
                />
                <p
                  className={`ml-3 mt-3 text-xl ${
                    formError[1] ? "text-mdd-invalid-label" : "text-white"
                  }`}
                >
                  นามสกุล*
                </p>
                {formError[1] && (
                  <div className="absolute w-full h-10 mt-[120px] rounded-[10px] border-2 border-mdd-cancel-red pointer-events-none" />
                )}
                <input
                  type="text"
                  id="1"
                  name="lName"
                  required
                  maxLength={100}
                  value={formValues.lName}
                  onChange={handleTextFieldChange}
                  className="px-7 py-2 text-[22px] w-full h-10 rounded-[10px] resize-none bg-mdd-text-field"
                />
              </div>
            </div>
            <div className="flex mt-5 justify-between">
              <div className="relative flex flex-col w-[24%] items-start">
                <p
                  className={`ml-3 text-xl ${
                    dateError || formError[5] ? "text-mdd-invalid-label" : "text-white"
                  }`}
                >
                  วัน เดือน ปี เกิด*
                </p>
                {formError[5] && (
                  <div className="z-10 absolute w-full h-10 mt-7 rounded-[10px] border-2 border-mdd-cancel-red pointer-events-none" />
                )}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <CustomizedDatePicker
                    defaultValue={today}
                    disableFuture
                    views={["year", "month", "day"]}
                    className="h-10 rounded-[10px] resize-none bg-mdd-text-field"
                    format="DD-MM-YYYY"
                    slotProps={{
                      textField: {
                        required: true
                      }
                    }}
                    value={formValues.birthDate}
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
                  className={`ml-3 text-xl ${
                    formError[3] || telError ? "text-mdd-invalid-label" : "text-white"
                  }`}
                >
                  เบอร์โทรศัพท์*
                </p>
                {(formError[3] || telError) && (
                  <div className="absolute w-full h-10 mt-7 rounded-[10px] border-2 border-mdd-cancel-red pointer-events-none" />
                )}
                <input
                  type="tel"
                  id="3"
                  name="phoneNumber"
                  required
                  maxLength={10}
                  value={formValues.phoneNumber}
                  onChange={handleTextFieldChange}
                  className="px-7 py-2 w-full text-[22px] h-10 rounded-[10px] resize-none bg-mdd-text-field"
                />
                {(formError[3] || telError) && (
                  <span className="absolute mt-[72px] text-red-500 text-xs">
                    เบอร์โทรศัพท์ควรเป็นตัวเลขและมี 10 หลัก
                  </span>
                )}
              </div>
              <div className="relative flex w-[45%] flex-col items-start">
                <p
                  className={`ml-3 text-xl ${
                    formError[2] ? "text-mdd-invalid-label" : "text-white"
                  }`}
                >
                  เพศ*
                </p>
                <div className="flex justify-between items-center h-10 w-full">
                  {formError[2] && (
                    <div className="absolute w-[102%] h-10 right-[-1%] rounded-[10px] border-2 border-mdd-cancel-red pointer-events-none" />
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
                      className="w-[25px] h-[25px] appearance-none rounded-full border-2 border-white checked:bg-mdd-focus-yellow"
                    />
                    <label htmlFor="male" className="ml-2 text-xl">
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
                      className="w-[25px] h-[25px] appearance-none rounded-full border-2 border-white checked:bg-mdd-focus-yellow"
                    />
                    <label htmlFor="female" className="ml-2 text-xl">
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
                      className="w-[25px] h-[25px] appearance-none rounded-full border-2 border-white checked:bg-mdd-focus-yellow"
                    />
                    <label htmlFor="LGBTQA+" className="ml-2 text-xl">
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
                      className="w-[25px] h-[25px] appearance-none rounded-full border-2 border-white checked:bg-mdd-focus-yellow"
                    />
                    <label htmlFor="notToSay" className="ml-2 text-xl">
                      ไม่ระบุ
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mt-5 justify-between">
              <div className="relative flex flex-col items-start w-[42%]">
                <p
                  className={`ml-3 text-xl ${
                    formError[4] || emailError ? "text-mdd-invalid-label" : "text-white"
                  }`}
                >
                  อีเมล*
                </p>
                {(formError[4] || emailError) && (
                  <div className="absolute w-full h-10 mt-7 rounded-[10px] border-2 border-mdd-cancel-red pointer-events-none" />
                )}
                <input
                  type="email"
                  id="4"
                  name="email"
                  required
                  maxLength={200}
                  value={formValues.email}
                  onChange={handleTextFieldChange}
                  className="px-7 py-2 text-[22px] w-full h-10 rounded-[10px] resize-none bg-mdd-text-field"
                />
              </div>
              <div className="relative flex flex-col items-start w-[25%]">
                <p
                  className={`ml-3 text-xl ${
                    formError[8] ? "text-mdd-invalid-label" : "text-white"
                  }`}
                >
                  รหัสผ่าน*
                </p>
                {formError[8] && (
                  <div className="absolute w-full h-10 mt-7 rounded-[10px] border-2 border-mdd-cancel-red pointer-events-none" />
                )}
                <input
                  type="password"
                  id="8"
                  name="password"
                  required
                  value={formValues.password}
                  maxLength={100}
                  onChange={(e) => handlePasswordChange(false, e.target.value)}
                  className="px-7 py-2 text-[22px] w-full h-10 rounded-[10px] resize-none bg-mdd-text-field"
                />
              </div>
              <div className="relative flex flex-col items-start w-[25%]">
                <p
                  className={`ml-3 text-xl ${
                    passwordError ? "text-mdd-invalid-label" : "text-white"
                  }`}
                >
                  ยืนยันรหัสผ่าน*
                </p>
                {passwordError && (
                  <div className="absolute w-full h-10 mt-7 rounded-[10px] border-2 border-mdd-cancel-red pointer-events-none" />
                )}
                <input
                  type="password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  required
                  value={confirmPassword}
                  maxLength={100}
                  onChange={(e) => handlePasswordChange(true, e.target.value)}
                  className="px-7 py-2 text-[22px] w-full h-10 rounded-[10px] resize-none bg-mdd-text-field"
                />
                {passwordError && (
                  <span className="absolute mt-[72px] text-red-500 text-xs">รหัสผ่านไม่ตรงกัน</span>
                )}
              </div>
            </div>
            <p className="text-center text-3xl mt-8 font-medium">กรอกข้อมูลบัตร</p>
            <div className="flex justify-between mt-3">
              <div className="relative flex flex-col items-start w-[42%]">
                <p
                  className={`ml-3 text-xl ${
                    formError[7] || accountNumberError ? "text-mdd-invalid-label" : "text-white"
                  }`}
                >
                  เลขที่บัญชี*
                </p>
                {(formError[7] || accountNumberError) && (
                  <div className="absolute w-full h-10 mt-7 rounded-[10px] border-2 border-mdd-cancel-red pointer-events-none" />
                )}
                <input
                  type="string"
                  id="7"
                  name="accountNumber"
                  required
                  maxLength={15}
                  value={formValues.accountNumber}
                  onChange={handleTextFieldChange}
                  className="px-7 py-2 text-[22px] w-full h-10 rounded-[10px] resize-none bg-mdd-text-field [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                {(formError[7] || accountNumberError) && (
                  <span className="absolute mt-[72px] text-red-500 text-xs">
                    เลขที่บัญชีควรเป็นตัวเลขและมี 10-15 หลัก
                  </span>
                )}
              </div>
              <div className="relative flex flex-col items-start w-[54%]">
                <p
                  className={`ml-3 text-xl ${
                    formError[6] ? "text-mdd-invalid-label" : "text-white"
                  }`}
                >
                  ธนาคาร*
                </p>
                {formError[6] && (
                  <div className="z-10 absolute w-full h-10 mt-7 rounded-[10px] border-2 border-mdd-cancel-red pointer-events-none" />
                )}
                <CustomizedSelect
                  name="select-bank"
                  value={formValues.bankName}
                  onChange={handleBankChange}
                  inputProps={{ MenuProps: { disableScrollLock: true } }}
                  required
                  className="w-full h-10 bg-mdd-text-field"
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
                  <CustomizedMenuItem value={"ธนาคารไทยพาณิชย์"}>
                    ธนาคารไทยพาณิชย์
                  </CustomizedMenuItem>
                  <CustomizedMenuItem value={"ธนาคารกรุงศรีอยุธยา"}>
                    ธนาคารกรุงศรีอยุธยา
                  </CustomizedMenuItem>
                  <CustomizedMenuItem value={"ธนาคารเกียรตินาคิน"}>
                    ธนาคารเกียรตินาคิน
                  </CustomizedMenuItem>
                </CustomizedSelect>
              </div>
            </div>
            <div className="mt-8 text-center self-end w-[11%] h-10 rounded-[10px] bg-white flex justify-center">
              <button
                type="submit"
                onClick={(e) => handleSubmitButton(e)}
                className="text-[#3B3B3B] text-xl font-semibold"
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
    </RootLayout>
  )
}
