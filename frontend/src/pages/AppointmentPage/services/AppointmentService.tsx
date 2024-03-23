import { environment } from "../../../common/constants/environment"
import {
  FortuneTellerAppointments,
  Package,
  UserInfo,
  fortuneTellerInfo
} from "../types/AppointmentTypes"

export const AppointmentService = {
  createAppointment: async (
    packageId: string,
    customerId: string,
    fortuneTellerId: string,
    appointmentDate: string
  ) => {
    await fetch(`${environment.backend.url}/appointment/create-appointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        packageId,
        customerId,
        fortuneTellerId,
        appointmentDate
      })
    })
    return
  },

  createConversation: async (customerId: string, fortuneTellerId: string) => {
    const res = await fetch(
      `${environment.backend.url}/conversations/create/${customerId}/${fortuneTellerId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    const data = await res.json()
    return { conversationId: data.data }
  },

  getPackages: async (fortuneTellerId: string): Promise<Package[]> => {
    const res = await fetch(
      `${environment.backend.url}/appointment/find-packages/${fortuneTellerId}`
    )
    const data = await res.json()
    return data.data
  },

  getUserInfo: async (userId: string): Promise<UserInfo> => {
    const res = await fetch(`${environment.backend.url}/appointment/find-user/${userId}`)
    const data = await res.json()
    return data.data
  },

  getFortuneTellerAppointment: async (
    fortuneTellerId: string
  ): Promise<FortuneTellerAppointments[]> => {
    const res = await fetch(
      `${environment.backend.url}/appointment/find-appointments/${fortuneTellerId}`
    )
    const data = await res.json()
    return data.data
  },

  getFortuneTeller: async (fortuneTellerId: string): Promise<fortuneTellerInfo> => {
    const res = await fetch(
      `${environment.backend.url}/appointment/find-fortuneteller/${fortuneTellerId}`
    )
    const data = await res.json()
    return data.data
  }
}
