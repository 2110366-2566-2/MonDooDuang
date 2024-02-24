import { environment } from "../../../common/constants/environment"

export const AppointmentService = {
  getAppointmentsByBothUser: async (firstUserId: string, secondUserId: string) => {
    const response = await fetch(`${environment.backend.url}/appointment/find-appointment-by-both-userId/${firstUserId}/${secondUserId}`)
    const result = await response.json()
    return result.data
  },
 
}
