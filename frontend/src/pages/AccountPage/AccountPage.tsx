import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import CameraIcon from "../RegisterPage/components/Icon/CameraIcon"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { styled } from "@mui/material/styles"
import { MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { MouseEvent, useState } from "react"
import { Gender, UserSchema } from "../RegisterPage/types/RegisterType"
import EditIcon from "../../assets/FortuneTellerAccountAssets/EditIcon.png"
import { AccountService } from "./services/AccountService"
import RootLayout from "../../common/components/RootLayout/RootLayout"

import { AuthContext } from "../../common/providers/AuthProvider"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

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
  const navigate = useNavigate()
  const { userId, userType } = useContext(AuthContext)
  const [fetchFormValues, setFetchFormValues] = useState<UserSchema>({} as UserSchema)
  const [formValues, setFormValues] = useState<UserSchema>({} as UserSchema)
  const [formError, setFormError] = useState<boolean[]>(Array(9).fill(false))
  const [dateError, setDateError] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)
  const [telError, setTelError] = useState<boolean>(false)
  const [accountNumberError, setAccountNumberError] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const response = await AccountService.getUserInformation(userId)

        setFetchFormValues({
          ...fetchFormValues,
          fName: response.fName,
          lName: response.lName,
          gender: response.gender,
          phoneNumber: response.phoneNumber,
          email: response.email,
          birthDate: response.birthDate,
          profilePicture: response.profilePicture,
          bankName: response.bankName,
          accountNumber: response.accountNumber,
          password: response.password
        })

        setFormValues({
          ...formValues,
          fName: response.fName,
          lName: response.lName,
          gender: response.gender,
          phoneNumber: response.phoneNumber,
          email: response.email,
          birthDate: response.birthDate,
          profilePicture: response.profilePicture,
          bankName: response.bankName,
          accountNumber: response.accountNumber,
          password: response.password
        })
      } catch (error) {
        console.error("Error fetching user information:", error)
        alert("Failed to fetch user information. Please try again.")
        window.location.href = "/search"
      }
    }
    fetchUserInformation()
  }, [isEditing])

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
    newArray.push(false)
    setFormError(newArray)

    return newArray.reduce((sum, bool) => sum && !bool, true)
  }

  const handleSubmitButton = async (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    const sum = checkAllInput()
    if (!sum || dateError || emailError || telError || accountNumberError) {
      return
    }

    try {
      await AccountService.updateUserInformation(userId, formValues)
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating user information:", error)
      alert("Failed to update user information. Please try again.")
    }
  }

  const handleEditButton = async (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    setIsEditing(true)
  }

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
        <div className="flex mt-24 mb-8 pt-8 pb-10 flex-col items-center text-white w-[90%] border border-white rounded-[30px]">
          <div className="w-[100%]">
            <button
              className="cursor-pointer ml-9 leading-normal font-semibold text-2xl"
              onClick={() => (window.location.href = "/search")}
            >
              &lt; กลับสู่หน้าหลัก
            </button>
          </div>
          <div className="relative w-[100%]">
            <p className="text-3xl font-medium text-center">ข้อมูลส่วนตัว</p>
            {isEditing ? (
              <></>
            ) : (
              <div
                onClick={(e) => handleEditButton(e)}
                className="px-4 space-x-1  absolute top-0 right-[10%] flex text-center self-end content-center h-10 rounded-[10px] bg-white flex-wrap"
              >
                <button className="text-[#3B3B3B] text-xl font-semibold">แก้ไข</button>
                <img src={EditIcon} className="size-7 align-middle inline-block" />
              </div>
            )}
          </div>
          <form className="flex flex-col w-[80%]">
            <div className="flex mt-5">
              <div className="flex w-[46%] flex-col items-center justify-center gap-2">
                <div className="flex items-center justify-center bg-mdd-text-field rounded-full w-[146px] h-[146px]">
                  <CameraIcon />
                </div>
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
                  disabled={isEditing ? false : true}
                  required
                  maxLength={100}
                  value={isEditing ? formValues.fName : fetchFormValues.fName}
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
                  disabled={isEditing ? false : true}
                  required
                  maxLength={100}
                  value={isEditing ? formValues.lName : fetchFormValues.lName}
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
                    defaultValue={dayjs(fetchFormValues.birthDate)}
                    disableFuture
                    views={["year", "month", "day"]}
                    className="h-10 rounded-[10px] resize-none bg-mdd-text-field"
                    format="DD-MM-YYYY"
                    slotProps={{
                      textField: {
                        required: true
                      }
                    }}
                    disabled={isEditing ? false : true}
                    value={isEditing ? formValues.birthDate : dayjs(fetchFormValues.birthDate)}
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
                  disabled={isEditing ? false : true}
                  maxLength={10}
                  value={isEditing ? formValues.phoneNumber : fetchFormValues.phoneNumber}
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
                      checked={
                        isEditing
                          ? formValues.gender === "MALE"
                            ? true
                            : undefined
                          : fetchFormValues.gender === "MALE"
                            ? true
                            : false
                      }
                      disabled={isEditing ? false : true}
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
                      checked={
                        isEditing
                          ? formValues.gender === "FEMALE"
                            ? true
                            : undefined
                          : fetchFormValues.gender === "FEMALE"
                            ? true
                            : false
                      }
                      disabled={isEditing ? false : true}
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
                      checked={
                        isEditing
                          ? formValues.gender === "LGBTQA+"
                            ? true
                            : undefined
                          : fetchFormValues.gender === "LGBTQA+"
                            ? true
                            : false
                      }
                      disabled={isEditing ? false : true}
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
                      checked={
                        isEditing
                          ? formValues.gender === "NOT_TO_SAY"
                            ? true
                            : undefined
                          : fetchFormValues.gender === "NOT_TO_SAY"
                            ? true
                            : false
                      }
                      disabled={isEditing ? false : true}
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
                <p className="ml-3 text-xl text-mdd-grey">อีเมล*</p>
                {(formError[4] || emailError) && (
                  <div className="absolute w-full h-10 mt-7 rounded-[10px] border-2 border-mdd-cancel-red pointer-events-none" />
                )}
                <input
                  type="email"
                  id="4"
                  name="email"
                  required
                  disabled
                  maxLength={200}
                  value={isEditing ? formValues.email : fetchFormValues.email}
                  onChange={handleTextFieldChange}
                  className="px-7 py-2 text-[22px] text-mdd-grey w-full h-10 rounded-[10px] resize-none bg-mdd-text-field"
                />
              </div>
              <div className="relative flex flex-col items-start w-[25%]">
                <p className="ml-3 text-xl text-mdd-grey">รหัสผ่าน*</p>
                {formError[8] && (
                  <div className="absolute w-full h-10 mt-7 rounded-[10px] border-2 border-mdd-cancel-red pointer-events-none" />
                )}
                <input
                  type="password"
                  id="8"
                  name="password"
                  disabled
                  maxLength={100}
                  className="px-7 py-2 text-[22px] w-full h-10 rounded-[10px] resize-none bg-mdd-text-field"
                />
              </div>
              <div className="relative flex flex-col items-start w-[25%]">
                <p className="ml-3 text-xl  text-mdd-grey">ยืนยันรหัสผ่าน*</p>
                <input
                  type="password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  disabled
                  maxLength={100}
                  className="px-7 py-2 text-[22px] w-full h-10 rounded-[10px] resize-none bg-mdd-text-field"
                />
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
                  disabled={isEditing ? false : true}
                  maxLength={15}
                  value={isEditing ? formValues.accountNumber : fetchFormValues.accountNumber}
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
                  value={isEditing ? formValues.bankName : String(fetchFormValues.bankName)}
                  disabled={isEditing ? false : true}
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

            {isEditing ? (
              <div className="mt-8 text-center self-end w-[11%] h-10 rounded-[10px] bg-white flex justify-center">
                <button
                  type="submit"
                  onClick={(e) => handleSubmitButton(e)}
                  className="text-[#3B3B3B] text-xl font-semibold"
                >
                  เสร็จสิ้น
                </button>
              </div>
            ) : (
              <></>
            )}

            {!isEditing && userType === "FORTUNE_TELLER" ? (
              <div className="mt-8 text-center self-end w-[11%] h-10 rounded-[10px] bg-white flex justify-center">
                <button
                  className="text-[#3B3B3B] text-xl font-semibold"
                  onClick={() => {
                    navigate("/account/fortuneteller")
                  }}
                >
                  ถัดไป &gt;
                </button>
              </div>
            ) : (
              <></>
            )}

            {!isEditing && userType === "CUSTOMER" ? <div className="mt-8 h-10"></div> : <></>}
          </form>
        </div>
      </div>
    </RootLayout>
  )
}
