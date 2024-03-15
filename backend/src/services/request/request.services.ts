import { RequestStatus, UserType } from "../../models/request/request.model"
import { requestRepository } from "../../repositories/request.repository"
import { notificationRepository } from "../../repositories/notification.repository"

export const requestService = {
  updateRequestStatus: async (requestId: string, status: RequestStatus) => {
    const result = await requestRepository.updateRequestStatus(requestId, status)
    if (result.isSuccess) {
      const userId: string = result.fortuneTellerId
      const notificationType = status === "ACCEPTED" ? "VERIFICATION" : "CANCELED_VERIFICATION"
      await notificationRepository.createNotification(userId, notificationType)
      return { success: true, message: "request status has been changed" }
    }
    return { success: false, message: "error to change request status" }
  },
  getPendingRequest: async () => {
    return await requestRepository.getPendingRequest()
  },
  updateUserType: async (requestId: string, userType: UserType) => {
    const result = await requestRepository.updateUserType(requestId, userType)
    if (result.isSuccess) {
      // const userId: string = result.fortuneTellerId
      // const notificationType = status === "ACCEPTED" ? "VERIFICATION" : "CANCELED_VERIFICATION"
      // await notificationRepository.createNotification(userId, notificationType)
      return { success: true, message: "user type has been changed" }
    }
    return { success: false, message: "error to change user type" }
  }
}
