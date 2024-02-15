import { environment } from "../../../common/constants/environment"

export const FortuneTellerRegisterService = {
  createFortuneTellerRegister: async (
    fortunetellerid: string,
    identitycardnumber: string,
    identitycardcopy: string
  ) => {
    const res = await fetch(`${environment.backend.url}/fortuneTeller/create-fortuneTeller`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fortunetellerid,
        identitycardnumber,
        identitycardcopy
      })
    })
    const data = await res.json()
    return { isSuccess: data.success, message: data.message }
  },

  createFortuneTellerRequest: async (fortunetellerid: string) => {
    const res = await fetch(
      `${environment.backend.url}/fortuneTeller/create-fortuneTeller-request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fortunetellerid
        })
      }
    )
    const data = await res.json()
    return { isSuccess: data.success, message: data.message }
  },

  updateFortuneTeller: async (
    fortunetellerid: string,
    identitycardnumber: string,
    identitycardcopy: string
  ) => {
    const res = await fetch(`${environment.backend.url}/fortuneTeller/update-fortuneTeller`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fortunetellerid,
        identitycardnumber,
        identitycardcopy
      })
    })
    const data = await res.json()
    return { isSuccess: data.success, message: data.message }
  },

  getFortuneTellerValid: async (fortunetellerid: string): Promise<boolean> => {
    const res = await fetch(`${environment.backend.url}/fortuneTeller/checkValid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fortunetellerid
      })
    })
    const data = await res.json()
    return data
  }
}