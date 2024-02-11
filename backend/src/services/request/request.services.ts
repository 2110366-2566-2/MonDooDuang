import { RequestStatus } from "../../models/request/request.model"
import { requestRepository } from "../../repositories/request.repository"

export const requestService = {
  updateRequestStatus: async (requestId: string, status: RequestStatus) => {
    const isSuccess = await requestRepository.updateRequestStatus(requestId, status)
    return { success: isSuccess, message: isSuccess ? "success" : "error to change request status" }
  },
  getPendingRequest: async () => {
    return await requestRepository.getPendingRequest()
  }
}
