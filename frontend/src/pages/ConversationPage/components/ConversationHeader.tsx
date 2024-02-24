import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import SearchIcon from "@mui/icons-material/Search"
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred"
import AppointmentCard from "../../../common/components/AppointmentCard/AppointmentCard"
import { useEffect, useState } from "react"
import { AppointmentService } from "../services/AppointmentService"
import { AppointmentInformation } from "../types/AppointmentInformation"
import { specialityMapper } from "../../../common/types/Package"

export default function ConversationHeader({
  name,
  showReport
}: {
  name: string
  showReport: () => void
}) {
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
          
          return <AppointmentCard date={formattedDate} startTime={startTime} endTime={endTime} speciality={specialityMapper[appointment.speciality]} price={appointment.price} paymentDate={paymentDate} paymentTime={paymentTime}/>
        })
      }
    </div>
  )
}
