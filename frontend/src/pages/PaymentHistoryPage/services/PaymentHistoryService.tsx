import { environment } from "../../../common/constants/environment"
import { AppointmentStatusType } from "../../../common/types/Appointment"
export const AppointmentService = {
  getAppointmentsByStatus: async (userId: string, status: AppointmentStatusType) => {
    const response = await fetch(
      `${environment.backend.url}/appointment/find-appointments-by-status/${userId}/${status}`
    )
    const result = await response.json()
    return await result.data
  }
}
