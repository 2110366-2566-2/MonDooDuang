import { environment } from "../../../common/constants/environment"

export const AdminPaymentService = {
  getEventCompletedAppointments: async () => {
    const response = await fetch(`${environment.backend.url}/appointment/find-event-completed-appointments`)
    const result = await response.json()
    return result.data
  },
  payToFortuneTellerAndUpdateDB: async (amount: number, appointmentId: string) => {
    const response = await fetch(`${environment.backend.url}/admin/pay-to-fortune-teller`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount,
        appointmentId
      })
    })
    const result = await response.json()
    return result.success
  }
}