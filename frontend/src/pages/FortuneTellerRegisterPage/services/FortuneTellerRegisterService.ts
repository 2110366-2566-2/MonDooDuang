import { environment } from "../../../common/constants/environment"

export const FortuneTellerRegisterService = {
  createFortuneTeller: async (
    fortuneTellerId: string,
    identityCardNumber: string
  ) => {
    const res = await fetch(`${environment.backend.url}/fortuneTeller/create-fortuneTeller`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fortuneTellerId,
        identityCardNumber

      })
    })
    const data = await res.json()
    return { isSuccess: data.success, message: data.message }
  },

  createFortuneTellerRequest: async (fortuneTellerId: string) => {
    const res = await fetch(
      `${environment.backend.url}/fortuneTeller/create-fortuneTeller-request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fortuneTellerId
        })
      }
    )
    const data = await res.json()
    return { isSuccess: data.success, message: data.message }
  },

  updateFortuneTeller: async (
    fortuneTellerId: string,
    identityCardNumber: string
  ) => {
    const res = await fetch(`${environment.backend.url}/fortuneTeller/update-fortuneTeller`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fortuneTellerId,
        identityCardNumber
      })
    })
    const data = await res.json()
    return { isSuccess: data.success, message: data.message }
  },

  getFortuneTellerValid: async (fortuneTellerId: string): Promise<boolean> => {
    const res = await fetch(`${environment.backend.url}/fortuneTeller/checkValid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fortuneTellerId
      })
    })
    const data = await res.json()
    return data.data
  },

  uploadIDCard: async (fortuneTellerId: string, formData: FormData) => {
    const res = await fetch(`${environment.backend.url}/images/id-card/${fortuneTellerId}`, 
      {
        method: "POST",
        body: formData
      })
    const data = await res.json()
    return { isSuccess: data.success, message: data.error }
  }
}