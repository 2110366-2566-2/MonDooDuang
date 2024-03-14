import { environment } from "../constants/environment"
import { AppointmentStatusType } from "../types/Appointment"

export const AppointmentService = {
  updateAppointmentStatus: async (
    status: AppointmentStatusType,
    appointmentId: string
  ) => {
    const res = await fetch(`${environment.backend.url}/appointment/update-appointment-status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status,
        appointmentId
      })
    })
    const data = await res.json()
    return { isSuccess: data.success, message: data.message }
  }
}