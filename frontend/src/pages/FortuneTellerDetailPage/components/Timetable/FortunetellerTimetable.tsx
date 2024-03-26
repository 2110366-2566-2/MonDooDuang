import { Fragment, useEffect, useState } from "react"
import CalendarModal from "../../../TimetablePage/components/CalendarModal/CalendarModal"
import ReviewHeaderLine from "../Reviews/ReviewHeaderLine"
import AppointmentListDetail from "../../../TimetablePage/components/AppointmentListModal/AppointmentListDetail"
import { TimetableService } from "../../../TimetablePage/services/TimetableService"
import { useParams } from "react-router-dom"
import { environment } from "../../../../common/constants/environment"

export default function FortuneTellerTimetable() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [upcomingAppointmentData, setUpcomingAppointmentData]= useState<AppointmentData[]>([])
  const { fid } = useParams()

  if (fid == undefined) {
    window.location.href = environment.frontend.url + "/search"
  }
  const fortuneTellerId = fid ?? ""

  useEffect(() => {
    TimetableService.getTimetable(new Date().getDate(), currentMonth, currentYear, fortuneTellerId, "upcoming").then((data) => {
      if (data) {
        setUpcomingAppointmentData(data.filter((appointment) => appointment.event_role === "FORTUNETELLER"))
      } else {
        setUpcomingAppointmentData([])
      }
    })
  },[currentMonth, currentYear])

  const AppList = () => { 
    let prevDate: string | null = null

    return upcomingAppointmentData.map((appointment, index) => {
      const currentDate = appointment.appointment_date
      const renderDate = (prevDate === null || prevDate !== currentDate)
  
      if (renderDate) {
        prevDate = currentDate
        return (
          <Fragment key={index}>
            <p className="text-white font-light">{new Date(currentDate).toLocaleDateString('th-TH', { weekday: 'long' })}ที่ {new Date(currentDate).toLocaleDateString('th-TH', {year: 'numeric', month: 'long', day: 'numeric'})}</p>
            <AppointmentListDetail {...appointment} event_status="upcoming" />
          </Fragment>
        )
      } else {
        return (
          <AppointmentListDetail key={index} {...appointment} event_status="upcoming" />
        )
      }
    })
  }
  return (
    <div>      
      <div className="flex flex-row items-center space-x-4 pb-4">
        <div className="font-libre-bodoni text-[36px]">Schedule</div>
        <ReviewHeaderLine></ReviewHeaderLine>
      </div>
      <div className="flex flex-row">
        <div className="w-[40%] self-start">
          <CalendarModal currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} currentYear={currentYear} setCurrentYear={setCurrentYear} toggle="upcoming" upcomingAppointments={upcomingAppointmentData} completedAppointment={[]}/>
        </div>
        <div className="w-[55%] h-[406px] overflow-y-auto mr-5">
          {upcomingAppointmentData.length === 0 && (
            <div className="w-full h-[90%] flex items-center justify-center pt-7">
              <p className="
            text-white text-2xl">ไม่มีนัดหมาย</p>
            </div>)}
          {AppList()}
        </div>
      </div>
    </div>
  )
}