import { RequestStatus } from "../../models/request/request.model"
import { requestRepository } from "../../repositories/request.repository"
import { notificationRepository } from "../../repositories/notification.repository"
import { s3Service } from "../infra/s3.services"

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
    const requests = await requestRepository.getPendingRequest()
    const updatedRequests = await Promise.all(requests.map(async (request) => {
      const fortuneTellerId = request.fortuneTellerId?.toString() ?? ""
      const profilePicData = await s3Service.downloadProfilePicture(fortuneTellerId as string)
      if (profilePicData && profilePicData.ContentType !== undefined && profilePicData.ContentType !== null) {
        request.profilePic = "data:image/jpg;base64," + profilePicData.Body?.toString("base64")
      }
      const idCardData = await s3Service.downloadIdCard(fortuneTellerId as string)
      if (idCardData && idCardData.ContentType !== undefined && idCardData.ContentType !== null) {
        request.approvalPic = "data:image/jpg;base64," + idCardData.Body?.toString("base64")
      }
      return request
    }))
    return updatedRequests
  }
}
