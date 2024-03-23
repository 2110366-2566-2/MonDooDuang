import { useState } from "react"
import AppointmentToggleButton from "./AppointmentToggleButton"
import AppointmentListDetail from "./AppointmentListDetail"

interface AppointmentListModalProps {
  upcomingAppointments: AppointmentData[];
  completedAppointment: AppointmentData[];
}

export default function AppointmentListModal({upcomingAppointments, completedAppointment}: AppointmentListModalProps): JSX.Element {
  const [toggle, setToggle] = useState('upcoming')
  const handleToggle = () => {
    setToggle((toggle === 'upcoming') ? 'completed' : 'upcoming')
  }
  return (
    <div className="w-[55%] h-[100%] my-5 mx-5 p-3">
      <div className="absolute top-5 right-[32px]">
        <AppointmentToggleButton toggle={toggle} handleToggle={handleToggle}/>
      </div>
      <div className="w-full h-[90%] overflow-y-auto">
        {toggle === 'upcoming' && upcomingAppointments.map((appointment, index) => (
          <AppointmentListDetail key={index} {...appointment}/>
        ))}
        {toggle === 'completed' && completedAppointment.map((appointment, index) => (
          <AppointmentListDetail key={index} {...appointment}/>
        ))}
      </div>
    </div>
  )
}