import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../common/providers/AuthProvider"
import CalendarModal from "./components/CalendarModal/CalendarModal"
import AppointmentListModal from "./components/AppointmentListModal/AppointmentListModal"
import { TimetableService } from "./services/TimetableService"
import NavBar from "../../common/components/NavBar/NavBar"

export default function TimetablePage(): JSX.Element {
  const { userId, userType, username } = useContext(AuthContext)
  const [toggle, setToggle] = useState('upcoming')
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [upcomingAppointmentData, setUpcomingAppointmentData]= useState<AppointmentData[]>([])
  const [completedAppointmentData, setCompletedAppointmentData] = useState<AppointmentData[]>([])

  const handleToggle = () => {
    setToggle((toggle === 'upcoming') ? 'completed' : 'upcoming')
  }

  useEffect(() => {
    TimetableService.getTimetable(-1, currentMonth, currentYear, userId, "upcoming").then((data) => {
      if (data) {
        setUpcomingAppointmentData(data)
      } else {
        setUpcomingAppointmentData([])
      }
    })
    TimetableService.getTimetable(-1, currentMonth, currentYear, userId, "completed").then((data) => {
      if (data) {
        setCompletedAppointmentData(data)
      } else {
        setCompletedAppointmentData([])
      }
    })
  },[currentMonth, currentYear])

  return (
    <>      
      <NavBar
        isFortuneTeller={userType === "FORTUNE_TELLER"}
        menuFocus={"schedule"}
        username={username}
        userId={userId}
      />
      <div className="flex flex-row justify-between">
        <div className="w-[45%] self-start mt-20">
          <CalendarModal currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} currentYear={currentYear} setCurrentYear={setCurrentYear} toggle={toggle} upcomingAppointments={upcomingAppointmentData} completedAppointment={completedAppointmentData}/>
        </div>
        <AppointmentListModal toggle={toggle} handleToggle={handleToggle} upcomingAppointments={upcomingAppointmentData} completedAppointment={completedAppointmentData}/>
      </div>
    </>
  )
}