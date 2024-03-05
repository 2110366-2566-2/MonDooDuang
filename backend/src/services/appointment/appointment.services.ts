import { appointmentRepository } from "../../repositories/appointment.repository"
import { AppointmentSchema } from "../../models/appointment/appointment.model"
import { fortuneTellerRepository } from "../../repositories/fortuneTeller.repository"
import { packageRepository } from "../../repositories/package.repository"
import { userRepository } from "../../repositories/user.repository"

const schedule = require('node-schedule')

export const appointmentService = {
  createAppointment: async (appointment: AppointmentSchema) => {
    appointment.status = "CREATED"

    const result = await appointmentRepository.createAppointment(appointment)

    if (!result.isSuccess) {
      return result.isSuccess
    }

    //Schedule the auto decline
    const declineDate = new Date()
    declineDate.setHours(declineDate.getHours() + 24)
    const job = schedule.scheduleJob(declineDate, () => appointmentService.autoDeclineAppointment(result.appointmentId))

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

    //Check if appointment is still CREATED over 24 hours
    const appointmentStatus = await appointmentRepository.getAppointmentStatus(appointmentId)

    if (appointmentStatus == 'CREATED') {
      appointmentRepository.updateAppointmentStatus(appointmentId, 'FORTUNE_TELLER_DECLINED')

      //Send notification to expiredAppointmentId
      //Call function here
    }
  },

  getAppointmentByBothUserId: async (firstUserId: string, secondUserId: string) => {
    const appointments = await appointmentRepository.getAppointmentByBothUserId(firstUserId, secondUserId)
    appointments.forEach((appointment) => {
      appointment.appointmentDate = new Date((appointment.appointmentDate as Date).setUTCHours((appointment.appointmentDate as Date).getUTCHours() + 14))
    })
    return appointments
  },

  updateAppointmentStatus: async (appointmentId: string, status: string) => {
    const isSuccess = await appointmentRepository.updateAppointmentStatus(appointmentId, status)
    return isSuccess
  }
}
