import { environment } from "../../../common/constants/environment"

type RequestStatus = "PENDING" | "ACCEPTED" | "REJECTED"

export const RequestService = {
  updateRequestStatus: async (requestId: string, status: RequestStatus) => {
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
  }
}