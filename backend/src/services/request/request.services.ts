import { RequestStatus } from "../../models/request/request.model"
import { requestRepository } from "../../repositories/request.repository"
import { notificationRepository } from "../../repositories/notification.repository"

export const requestService = {
  updateRequestStatus: async (requestId: string, status: RequestStatus) => {
    const result = await requestRepository.updateRequestStatus(requestId, status)
    if (result.isSuccess) {
      const userId: string = result.fortuneTellerId
      const notificationType = status === "ACCEPTED" ? "VERIFICATION" : "CANCELED_VERIFICATION"
      await notificationRepository.createNotification(userId, notificationType)
    }
    return { success: false, message: "error to change request status" }
  },
  getPendingRequest: async () => {
    return await requestRepository.getPendingRequest()
  }
}
