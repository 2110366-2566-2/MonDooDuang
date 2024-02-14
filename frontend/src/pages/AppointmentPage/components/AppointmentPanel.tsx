import bg from "../../../assets/images/paper.png"
import CancelButton from "./CancelButton"
import ConfirmButton from "./ConfirmButton"
import { EditButton } from "./EditButton"
import DateTimeReserve from "./DateTimeReserve"
import { useEffect, useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { TypeOfFortuneSelect } from "./TypeOfFortuneSelect"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { yellow } from "@mui/material/colors"
import { ConfirmModal } from "./ConfirmModal"
import { SuccessModal } from "./SuccessModal"
import { AppointmentService } from "../services/AppointmentService"
import { environment } from "../../../common/constants/environment"
import {
  FortuneTellerAppointments,
  GroupedAppointments,
  Package,
  UserInfo
} from "../types/AppointmentTypes"

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

export default function AppointmentPanel({ onCancel }: { onCancel: () => void }) {
  //mock data
  const fortuneTeller = "DaengDooDaung"
  const fortuneTellerId = "3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da"
  const user_id = "84885c07-43d7-42b8-8919-88263a33fc74"
  //

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isValidDate, setIsValidDate] = useState(true)
  const [isValidTime, setIsValidTime] = useState(true)
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null)
  const [reserveTime, setReserveTime] = useState<Dayjs | null>(null)
  const [packageType, setPackageType] = useState<Package>({
    packageid: "",
    speciality: "",
    price: 0,
    duration: 0
  })
  const [packages, setPackages] = useState<Package[]>([])
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userid: "",
    fname: "",
    lname: "",
    phonenumber: "",
    birthdate: ""
  })
  const [appointments, setAppointments] = useState<GroupedAppointments>({})

  const formatDate = (dateString: string): string => {
    const thaiMonths = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม"
    ]

    const date = new Date(dateString)
    const day = date.getUTCDate()
    const month = thaiMonths[date.getUTCMonth()]
    const year = date.getUTCFullYear() + 543

    return `${day} ${month} ${year}`
  }

  const formatPhoneNumber = (phoneNumber: string): string => {
    if (phoneNumber === null || phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
      return "Invalid phone number"
    }

    const formattedNumber = `${phoneNumber.substr(0, 3)}-${phoneNumber.substr(
      3,
      3
    )}-${phoneNumber.substr(6, 4)}`
    return formattedNumber
  }

  const groupAppointmentsByDate = (data: FortuneTellerAppointments[]): GroupedAppointments => {
    return data.reduce((acc, curr) => {
      const plusdate = dayjs(curr.appointmentdate)
        .add(7, "hours")
        .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
      const date = plusdate.split("T")[0]
      const time = plusdate
      if (acc[date]) {
        acc[date].push({
          time,
          duration: curr.duration
        })
      } else {
        acc[date] = [
          {
            time,
            duration: curr.duration
          }
        ]
      }

      return acc
    }, {} as GroupedAppointments)
  }

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const packages = await AppointmentService.getPackages(fortuneTellerId)
        if (packages) {
          setPackages(packages)
          if (packages.length > 0) {
            setPackageType(packages[0])
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchPackages()
  }, [])

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user_info = await AppointmentService.getUserInfo(user_id)
        if (user_info) {
          setUserInfo(user_info)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchUserInfo()
  }, [])

  useEffect(() => {
    const fetchFortuneTellerAppointments = async () => {
      try {
        const appointments = await AppointmentService.getFortuneTellerAppointment(fortuneTellerId)
        if (appointments) {
          setAppointments(groupAppointmentsByDate(appointments))
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchFortuneTellerAppointments()
  }, [])
  const CustomerInfo = () => {
    return (
      <div className="rounded-xl border border-stone-800 border-opacity-50 px-24 py-4">
        <div className="text-center text-stone-800 text-base xl:text-xl lg:text-lg md:text-md font-bold font-noto-sans underline mb-3">
          ข้อมูลผู้จอง
        </div>
        <div className="flex flex-col text-white text-base xl:text-xl lg:text-lg md:text-md justify-items-center items-start space-y-1">
          <div style={text_shadow}>
            ชื่อผู้จอง : {userInfo.fname} {userInfo.lname}
          </div>
          <div style={text_shadow}>วันเกิด : {formatDate(userInfo.birthdate)}</div>
          <div style={text_shadow}>เบอร์โทรศัพท์ : {formatPhoneNumber(userInfo.phonenumber)}</div>
        </div>
        <div className="w-full flex items-end justify-items-end mt-6">
          <div className="flex ml-auto">
            <EditButton
              onNavigate={() => (window.location.href = environment.frontend.url + "/account")}
            />
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
      className="w-auto h-auto py-4 px-8 flex-col justify-center items-center inline-flex space-y-5"
    >
      <div className="relative">
        <div className="z-3 absolute text-2xl xl:text-4xl lg:text-4xl md:text-3xl  text-white font-bold font-noto-sans ">
          ใบจองการนัดหมายดูดวง
        </div>
        <div
          style={{ filter: "blur(10px)" }}
          className="text-2xl xl:text-4xl lg:text-4xl md:text-3xl relative text-white font-bold font-noto-sans "
        >
          ใบจองการนัดหมายดูดวง
        </div>
      </div>
      <ThemeProvider theme={newTheme}>
        <TypeOfFortuneSelect
          typeJson={packages}
          fortuneTeller={fortuneTeller}
          onPackageChange={setPackageType}
        />
        <DateTimeReserve
          onDateChange={(value: Dayjs | null) => {
            setReserveDate(value)
            setIsValidDate(true)
          }}
          onTimeChange={(value: Dayjs | null) => {
            setReserveTime(value)
            setIsValidTime(true)
          }}
          duration={packageType.duration}
          isDateValid={isValidDate}
          isTimeValid={isValidTime}
          appointments={appointments}
        />
      </ThemeProvider>
      <CustomerInfo />
      <div className="w-auto flex flex-row space-x-4 justify-items-center items-center">
        <CancelButton
          onCancel={() => {
            onCancel()
          }}
        />
        <ConfirmButton
          onConfirm={() => {
            if (reserveDate === null) {
              setIsValidDate(false)
            }
            if (reserveTime === null) {
              setIsValidTime(false)
            } else {
              setIsConfirmModalOpen(true)
            }
          }}
        />
      </div>
      <ConfirmModal
        fortuneTeller={fortuneTeller}
        type={packageType.speciality}
        price={packageType.price}
        date={dayjs(reserveDate).format("DD MMM YYYY")}
        starttime={dayjs(reserveTime).format("HH:mm")}
        endtime={dayjs(reserveTime).add(packageType.duration, "minutes").format("HH:mm")}
        isVisible={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => {
          if (reserveDate && reserveTime) {
            const datetime = reserveDate
              .hour(reserveTime.hour())
              .minute(reserveTime.minute())
              .second(reserveTime.second())
            const appointmentDate = dayjs(datetime)
              .subtract(7, "hours")
              .format("YYYY-MM-DD HH:mm:ss")
            AppointmentService.createAppointment(
              packageType.packageid,
              userInfo.userid,
              fortuneTellerId,
              appointmentDate
            )
          }
          setIsConfirmModalOpen(false)
          setIsSuccessModalOpen(true)
        }}
      />
      <SuccessModal
        isVisible={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false)
          window.location.href = environment.frontend.url + "/search"
        }}
      />
    </div>
  )
}
