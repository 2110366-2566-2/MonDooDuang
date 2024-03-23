import { useContext } from "react"
import { AuthContext } from "../../common/providers/AuthProvider"
import CalendarModal from "./components/CalendarModal/CalendarModal"
import AppointmentListModal from "./components/AppointmentListModal/AppointmentListModal"

export default function TimetablePage(): JSX.Element {
  // const { userId, userType, username } = useContext(AuthContext)
  // console.log(userId, userType, username)
  const appointmentData: AppointmentData[] = [
    {
      "appointment_date": "2024-03-01T17:00:00.000Z",
      "appointment_start_time": "01:45:00",
      "appointment_end_time": "02:45:00",
      "event_role": "FORTUNETELLER",
      "speciality": "ORACLE",
      "customer_fname": "Olivia",
      "customer_lname": "Moore",
      "fortune_teller_name": "Mystic Bob"
    },        {
      "appointment_date": "2024-03-01T17:00:00.000Z",
      "appointment_start_time": "12:45:00",
      "appointment_end_time": "13:45:00",
      "event_role": "CUSTOMER",
      "speciality": "ORACLE",
      "customer_fname": "Bob",
      "customer_lname": "Bamiloye",
      "fortune_teller_name": "Mystic Bob"
    },{
      "appointment_date": "2024-03-12T17:00:00.000Z",
      "appointment_start_time": "01:45:00",
      "appointment_end_time": "02:45:00",
      "event_role": "FORTUNETELLER",
      "speciality": "ORACLE",
      "customer_fname": "Olivia",
      "customer_lname": "Moore",
      "fortune_teller_name": "Mystic Bob"
    },        {
      "appointment_date": "2024-03-20T17:00:00.000Z",
      "appointment_start_time": "12:45:00",
      "appointment_end_time": "13:45:00",
      "event_role": "CUSTOMER",
      "speciality": "ORACLE",
      "customer_fname": "Bob",
      "customer_lname": "Bamiloye",
      "fortune_teller_name": "Alice"
    }]

  return (
    <div className="flex flex-row justify-between">
      <CalendarModal />
      <AppointmentListModal upcomingAppointments={appointmentData} completedAppointment={appointmentData}/>
    </div>
  )
}