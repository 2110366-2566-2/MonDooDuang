import { environment } from "../../../common/constants/environment"

type UpdatedStatus = "ACCEPTED" | "REJECTED"
type UserType = "CUSTOMER" | "FORTUNE_TELLER"

export const RequestService = {
  updateRequestStatus: async (requestId: string, status: UpdatedStatus) => {
    const res = await fetch(`${environment.backend.url}/request/update-status`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        requestId,
        status
      })
    })
    const data = await res.json()
    return { isSuccess: data.success, message: data.message }
  },
  getPendingRequest: async() => {
    const res = await fetch(`${environment.backend.url}/request/get-pending`)
    const data = await res.json()
    return data
  },

  updateFortuneTellerTypeAndVerified: async (requestId:string) =>{
    const res = await fetch(`${environment.backend.url}/request/update-fortuneTellerTypeAndVerified`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        requestId
      })
    })
    const data = await res.json()
    return { isSuccess: data.success, message: data.message }
  }
}