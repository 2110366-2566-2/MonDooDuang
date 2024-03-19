import { appointmentRepository } from "../../repositories/appointment.repository"
import { AppointmentSchema } from "../../models/appointment/appointment.model"
import { fortuneTellerRepository } from "../../repositories/fortuneTeller.repository"
import { packageRepository } from "../../repositories/package.repository"
import { userRepository } from "../../repositories/user.repository"
import { scheduleJob } from "node-schedule"
import { notificationRepository } from "../../repositories/notification.repository"

export const appointmentService = {
  createAppointment: async (appointment: AppointmentSchema) => {
    appointment.status = "CREATED"

    const result: {
      isSuccess: boolean
      appointmentId: string
    } = await appointmentRepository.createAppointment(appointment)

    if (!result.isSuccess) {
      return result.isSuccess
    }

    // Schedule the auto decline
    const declineDate = new Date()
    declineDate.setHours(declineDate.getHours() + 24)
    scheduleJob(declineDate, async () => {
      await appointmentService.autoDeclineAppointment(result.appointmentId)
    })

    // Schedule 10 minutes reminder
    const remindDate = new Date(appointment.appointmentDate)
    remindDate.setHours(remindDate.getHours() + 7)
    remindDate.setMinutes(remindDate.getMinutes() - 10)
    scheduleJob(remindDate, async () => {
      await appointmentService.autoRemindAppointment(
        appointment.customerId,
        appointment.fortuneTellerId,
        result.appointmentId
      )
    })

    return result.isSuccess
  },

  getFortuneTeller: async (fortuneTellerId: string) => {
    const fortuneTeller = await fortuneTellerRepository.getFortuneTellerStageName(fortuneTellerId)
    return {
      fortuneTellerId: fortuneTeller.fortune_teller_id,
      stageName: fortuneTeller.stage_name
    }
  },

  getAllFortuneTeller: async () => {
    const fortuneTellers = await fortuneTellerRepository.getAllFortuneTellerStageName()
    return fortuneTellers
  },

  getPackages: async (fortuneTellerId: string) => {
    const packages = await packageRepository.getPackagesForAppointment(fortuneTellerId)
    return packages
  },

  getFortuneTellerAppointment: async (fortuneTellerId: string) => {
    const appointments = await appointmentRepository.getFortuneTellerAppointment(fortuneTellerId)
    return appointments
  },

  getUserInfo: async (userId: string) => {
    const userInfo = await userRepository.getUserInfoForAppointment(userId)
    return userInfo
  },

  autoDeclineAppointment: async (appointmentId: string) => {
    // Check if appointment is still CREATED over 24 hours
    const appointmentStatus = await appointmentRepository.getAppointmentStatus(appointmentId)

    if (appointmentStatus === "CREATED") {
      await appointmentRepository.updateAppointmentStatus(appointmentId, "FORTUNE_TELLER_DECLINED")
      const notificationId = await notificationRepository.getNotificationIdByAppointmentIdAndType(appointmentId, "NEW")
      if (notificationId !== null) {
        await notificationRepository.updateNotificationType(notificationId, "HIDDEN")
      }
    }
  },

  createReminderNotification: async (userId: string, appointmentId: string) => {
    const result = await notificationRepository.createNotification(userId, "APPOINTMENT")
    if (!result.isSuccess) return
    await notificationRepository.createAppointmentNotification(
      result.notificationId,
      "REMINDER",
      appointmentId
    )
  },

  autoRemindAppointment: async (
    customerId: string,
    fortuneTellerId: string,
    appointmentId: string
  ) => {
    // Check if appointment is still WAITING_FOR_EVENT 10 minutes before the event
    const appointmentStatus = await appointmentRepository.getAppointmentStatus(appointmentId)

    if (appointmentStatus === "WAITING_FOR_EVENT") {
      await appointmentService.createReminderNotification(customerId, appointmentId)
      await appointmentService.createReminderNotification(fortuneTellerId, appointmentId)
    }
  },

  getAppointmentByConversationId: async (conversationId: string) => {
    const appointments = await appointmentRepository.getAppointmentByConversationId(conversationId)
    appointments.forEach((appointment) => {
      appointment.appointmentDate = new Date(
        (appointment.appointmentDate as Date).setUTCHours(
          (appointment.appointmentDate as Date).getUTCHours() + 14
        )
      )
    })
    return appointments
  },

  updateAppointmentStatus: async (appointmentId: string, status: string) => {
    const isSuccess = await appointmentRepository.updateAppointmentStatus(appointmentId, status)
    return isSuccess
  },

  getIsReview: async (appointmentId: string, customerId: string) => {
    const isReview = await appointmentRepository.getIsReview(appointmentId, customerId)
    return isReview
  }
}
