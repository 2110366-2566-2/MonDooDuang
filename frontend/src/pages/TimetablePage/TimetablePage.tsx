import { useContext } from "react"
import { AuthContext } from "../../common/providers/AuthProvider"
import CalendarModal from "./components/CalendarModal/CalendarModal"
import AppointmentListModal from "./components/AppointmentListModal/AppointmentListModal"

export default function TimetablePage(): JSX.Element {
  const { userId, userType, username } = useContext(AuthContext)
  console.log(userId, userType, username)
  return (
    <div className="flex flex-row">
      <CalendarModal />
      <AppointmentListModal />
    </div>
  )
}