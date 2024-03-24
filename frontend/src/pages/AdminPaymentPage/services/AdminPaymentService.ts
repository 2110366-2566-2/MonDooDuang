import { environment } from "../../../common/constants/environment"

export const AdminPaymentService = {
  getEventCompletedAppointments: async () => {
    const response = await fetch(`${environment.backend.url}/appointment/find-event-completed-appointments`)
    const result = await response.json()
    return result.data
  }
}