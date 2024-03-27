import { appointmentRepository } from "../../repositories/appointment.repository"
import { AppointmentSchema, AppointmentStatus } from "../../models/appointment/appointment.model"
import { fortuneTellerRepository } from "../../repositories/fortuneTeller.repository"
import { packageRepository } from "../../repositories/package.repository"
import { userRepository } from "../../repositories/user.repository"
import { scheduleJob } from "node-schedule"
import { notificationRepository } from "../../repositories/notification.repository"
import { s3Service } from "../infra/s3.services"

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
    appointmentService.autoDecline(result.appointmentId, 24, "FORTUNE_TELLER_DECLINED")

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

  getFortuneTellerAppointment: async (fortuneTellerId: string, customerId: string) => {
    const appointments = await appointmentRepository.getFortuneTellerAppointment(fortuneTellerId, customerId)
    return appointments
  },

  getUserInfo: async (userId: string) => {
    const userInfo = await userRepository.getUserInfoForAppointment(userId)
    return userInfo
  },

  autoDeclineAppointment: async (appointmentId: string, status: AppointmentStatus) => {
    // Check if appointment is still CREATED or WAITING_FOR_PAYMENT over 24 hours
    const appointmentStatus = await appointmentRepository.getAppointmentStatus(appointmentId)

    if (
      (appointmentStatus === "CREATED" && status === "FORTUNE_TELLER_DECLINED") ||
      (appointmentStatus === "WAITING_FOR_PAYMENT" && status === "NO_PAYMENT_CANCELED")
    ) {
      await appointmentRepository.updateAppointmentStatus(appointmentId, status)
      if (status === "FORTUNE_TELLER_DECLINED") {
        const notificationId = await notificationRepository.getNotificationIdByAppointmentIdAndType(
          appointmentId,
          "NEW"
        )
        if (notificationId !== null) {
          await notificationRepository.updateNotificationType(notificationId, "HIDDEN")
        }
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

  updateAppointmentStatus: async (appointmentId: string, status: AppointmentStatus) => {
    const isSuccess = await appointmentRepository.updateAppointmentStatus(appointmentId, status)
    if (isSuccess && status === "WAITING_FOR_PAYMENT") {
      // Schedule the auto decline
      appointmentService.autoDecline(appointmentId, 24, "NO_PAYMENT_CANCELED")
    }
    return isSuccess
  },

  getIsReview: async (appointmentId: string, customerId: string) => {
    const isReview = await appointmentRepository.getIsReview(appointmentId, customerId)
    return isReview
  },

  autoDecline: (appointmentId: string, delayHour: number, status: AppointmentStatus) => {
    const declineDate = new Date()
    declineDate.setHours(declineDate.getHours() + delayHour)
    scheduleJob(declineDate, async () => {
      await appointmentService.autoDeclineAppointment(appointmentId, status)
    })
  },

  getEventCompletedAppointments: async () => {
    const appointments = await appointmentRepository.getEventCompletedAppointments()
    if (appointments === null) return null
    const updatedAppointments = await Promise.all(appointments.map(async (appointment) => {
      const fortuneTellerId = appointment.fortuneTellerId as string
      const profilePicData = await s3Service.downloadProfilePicture(fortuneTellerId)
      if (profilePicData && profilePicData.ContentType !== undefined && profilePicData.ContentType !== null) {
        appointment.profilePicture = "data:image/jpg;base64," + profilePicData.Body?.toString("base64")
      }
      return appointment
    }))
    return updatedAppointments
  },

  getAppointmentsByStatus: async (userId: string, status: AppointmentStatus) => {
    const appointments = await appointmentRepository.getAppointmentsByStatus(userId, status)
    appointments.forEach((appointment) => {
      appointment.appointmentDate = new Date(
        (appointment.appointmentDate as Date).setUTCHours(
          (appointment.appointmentDate as Date).getUTCHours() - 7
        )
      )
    })
    return appointments
  }
}
