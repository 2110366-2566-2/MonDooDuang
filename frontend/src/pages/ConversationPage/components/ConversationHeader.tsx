import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import SearchIcon from "@mui/icons-material/Search"
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred"
import BaseAppointmentCard from "../../../common/components/AppointmentCard/BaseAppointmentCard"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppointmentService } from "../services/AppointmentService"
import { AppointmentInformation } from "../types/AppointmentInformation"
import { specialityMapper } from "../../../common/types/Package"
import PaymentIcon from "../../../common/components/AppointmentCard/Icon/paymentIcon"

export default function ConversationHeader({
  name,
  showReport
}: {
  name: string
  showReport: () => void
}) {
  const navigate = useNavigate()

  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState<boolean>(true)
  const [appointments, setAppointments] = useState<AppointmentInformation[]>([])

  useEffect(()=>{
    const fetchAppointments = async () => {
      const appointments = await AppointmentService.getAppointmentsByBothUser('3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da', '0b7cbf76-23f8-4a6a-8ac7-b7f13e3df07d')
      setAppointments(appointments)
    }
    fetchAppointments()
  },[name])

  const toggleNotifications = () => {
    setIsNotificationsEnabled((prev) => !prev)
  }

  const convertDateFormat = (isoDateTimeString: string, duration: number) => {
    const date = new Date(isoDateTimeString)
    
    // Format date as "dd/mm/yyyy"
    const day = date.getUTCDate().toString().padStart(2, '0')
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
    const year = date.getUTCFullYear().toString()
    const formattedDate = `${day}/${month}/${year}`

    // Format time as "HH.MM"
    const hours = date.getUTCHours().toString().padStart(2, '0')
    const minutes = date.getUTCMinutes().toString().padStart(2, '0')
    const startTime = `${hours}.${minutes}`

    // Calculate end time by adding duration in minutes
    const endTimeDate = new Date(date.getTime() + duration * 60000)
    const endTimeHours = endTimeDate.getUTCHours().toString().padStart(2, '0')
    const endTimeMinutes = endTimeDate.getUTCMinutes().toString().padStart(2, '0')
    const endTime = `${endTimeHours}.${endTimeMinutes}`

    // Calculate payment date and time by adding 1 day
    const paymentDate = new Date(date.getTime() + 24 * 60 * 60 * 1000)
    const paymentDay = paymentDate.getUTCDate().toString().padStart(2, '0')
    const paymentMonth = (paymentDate.getUTCMonth() + 1).toString().padStart(2, '0')
    const paymentYear = paymentDate.getUTCFullYear().toString()
    const paymentTimeHours = paymentDate.getUTCHours().toString().padStart(2, '0')
    const paymentTimeMinutes = paymentDate.getUTCMinutes().toString().padStart(2, '0')
    const paymentDateFormatted = `${paymentDay}/${paymentMonth}/${paymentYear}`
    const paymentTimeFormatted = `${paymentTimeHours}.${paymentTimeMinutes}`

    return { formattedDate, startTime, endTime, paymentDate: paymentDateFormatted, paymentTime: paymentTimeFormatted }
  }

  const getWaitingForPaymentInfo = (price:number, paymentDate: string, paymentTime: string) => {
    const content = <><h1 className="text-mdd-yellow600 font-semibold text-[28px]">กำลังรอการชำระเงิน</h1><p className="text-mdd-gray-success-text">ยอดที่ต้องชำระ {price} บาท <br /> สามารถชำระได้จนถึงวันที่ {paymentDate} เวลา {paymentTime} น.</p></>
    const moreContent = "*หากไม่ชำระภายในวันและเวลาที่กำหนด ทางเว็บไซต์ขออนุญาตยกเลิกการนัดหมายดูดวง"
    const button = <button className="h-[37px] rounded-[10px] px-2 text-white bg-mdd-muted-green mx-5" onClick={()=> navigate(`/payment/${price}`)}>ชำระเงินค่าดูดวง</button>
    return { content, moreContent, button }
  }

  return (
    <div className="flex flex-col bg-white bg-opacity-85">
      <div className="h-[60px] flex items-center justify-between p-4">
        <div className="flex items-center">
          <div className="font-bold text-xl mr-2">{name}</div>
          {isNotificationsEnabled ? (
            <VolumeUpIcon onClick={toggleNotifications} />
          ) : (
            
            <VolumeOffIcon onClick={toggleNotifications} />
          )}
        </div>
        <div className="flex items-center">
          <SearchIcon className="mr-2" />
          <ReportGmailerrorredIcon
            onClick={() => {
              showReport()
            }}
          />
        </div>
      </div>
      {
        appointments.map((appointment) => {
          const  { formattedDate, startTime, endTime, paymentDate, paymentTime } = convertDateFormat(appointment.appointmentDate, appointment.duration)
          if(appointment.status === "WAITING_FOR_PAYMENT"){
            const { content, moreContent, button } = getWaitingForPaymentInfo(appointment.price, paymentDate, paymentTime)
            return <BaseAppointmentCard icon={<PaymentIcon/>} content={content} moreContent={moreContent} button={button} formattedDate={formattedDate} startTime={startTime} endTime={endTime} speciality={specialityMapper[appointment.speciality]}/>
          }
        })
      }
    </div>
  )
}
