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
  updateToFortuneTellerTypeAndVerified: async (requestId: string) => {
    const updateType = await requestRepository.updateFortuneTellerType(requestId)
    if (!updateType.isSuccess) {
      return { success: false, message: "error to change user type" }
    }

    const updateVerified = await requestRepository.updateFortuneTellerVerified(requestId)
    if (! updateVerified.isSuccess) {
      return { success: false, message: "error to change fortune teller verify" }
    }
    return { success: true, message: "user type and fortune teller verify have been changed" }
  }
}
