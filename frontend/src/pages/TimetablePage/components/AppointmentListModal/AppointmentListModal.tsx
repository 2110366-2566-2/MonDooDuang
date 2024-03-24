import { useState, Fragment } from "react"
import AppointmentToggleButton from "./AppointmentToggleButton"
import AppointmentListDetail from "./AppointmentListDetail"

interface AppointmentListModalProps {
  toggle: string;
  handleToggle: () => void;
  upcomingAppointments: AppointmentData[];
  completedAppointment: AppointmentData[];
}

export default function AppointmentListModal({toggle, handleToggle, upcomingAppointments, completedAppointment}: AppointmentListModalProps): JSX.Element {
  const AppList = (status: string) => { 
    const App = status === 'upcoming' ? upcomingAppointments : completedAppointment
    let prevDate: string | null = null

    return App.map((appointment, index) => {
      const currentDate = appointment.appointment_date
      const renderDate = (prevDate === null || prevDate !== currentDate)
  
      if (renderDate) {
        prevDate = currentDate
        return (
          <Fragment key={index}>
            <p className="text-white font-light">{new Date(currentDate).toLocaleDateString('th-TH', { weekday: 'long' })}ที่ {new Date(currentDate).toLocaleDateString('th-TH', {year: 'numeric', month: 'long', day: 'numeric'})}</p>
            <AppointmentListDetail {...appointment} event_status={status} />
          </Fragment>
        )
      } else {
        return (
          <AppointmentListDetail key={index} {...appointment} event_status={status} />
        )
      }
    })
  }

  return (
    <div className="w-[55%] h-[100%] mt-10 mb-5 mr-5 p-3">
      <div className="absolute top-5 right-[32px]">
        <AppointmentToggleButton toggle={toggle} handleToggle={handleToggle}/>
      </div>
      {toggle === 'upcoming' && upcomingAppointments.length === 0 && (
        <div className="w-full h-[90%] flex items-center justify-center pt-12">
          <p className="text-white text-2xl">ไม่มีนัดหมายที่กำลังจะถึง</p>
        </div>)}
      {toggle === 'completed' && completedAppointment.length === 0 && (
        <div className="w-full h-[90%] flex items-center justify-center pt-12">
          <p className="text-white text-2xl">ไม่มีนัดหมายที่เสร็จสิ้นแล้ว</p>
        </div>)}
      <div className="w-full max-h-screen overflow-y-auto">
        {toggle === 'upcoming' && AppList('upcoming')}
        {toggle === 'completed' && AppList('completed')}
      </div>
    </div>
  )
}