import { Fragment, useState } from "react"
import CalendarModal from "../../../TimetablePage/components/CalendarModal/CalendarModal"
import ReviewHeaderLine from "../Reviews/ReviewHeaderLine"
import AppointmentListDetail from "../../../TimetablePage/components/AppointmentListModal/AppointmentListDetail"

export default function FortuneTellerTimetable() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const upcomingAppointmentData = [
    {
      "appointment_date": "2024-03-01T17:00:00.000Z",
      "appointment_start_time": "01:45:00",
      "appointment_end_time": "02:45:00",
      "event_role": "FORTUNETELLER",
      "speciality": "ORACLE",
      "customer_fname": "Olivia",
      "customer_lname": "Moore",
      "fortune_teller_name": "Mystic Bob"
    },
    {
      "appointment_date": "2024-03-01T17:00:00.000Z",
      "appointment_start_time": "01:45:00",
      "appointment_end_time": "02:45:00",
      "event_role": "FORTUNETELLER",
      "speciality": "ORACLE",
      "customer_fname": "Olivia",
      "customer_lname": "Moore",
      "fortune_teller_name": "Mystic Bob"
    }
  ]
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