import { environment } from "../../../common/constants/environment"
import { AppointmentStatusType } from "../../../common/types/Appointment"

export const AppointmentService = {
  getAppointmentsByBothUser: async (firstUserId: string, secondUserId: string) => {
    const response = await fetch(`${environment.backend.url}/appointment/find-appointment-by-both-userId/${firstUserId}/${secondUserId}`)
    const result = await response.json()
    return result.data
  },

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
  },

  getStageNameFromAppointment: async ( fortuneTellerId: string ) => {
    const res = await fetch(`${environment.backend.url}/appointment/stageName/${fortuneTellerId}`)
    const result = await res.json()
    return result.data
  },

  getIsReview: async (appointmentId: string, customerId: string) => {
    const res = await fetch(`${environment.backend.url}/appointment/getIsReview/${appointmentId}/${customerId}`)
    const result = await res.json()
    return result.data
  },
  
}
