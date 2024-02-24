import { appointmentRepository } from "../../repositories/appointment.repository"
import { AppointmentSchema } from "../../models/appointment/appointment.model"

export const appointmentService = {
  createAppointment: async (appointment: AppointmentSchema) => {
    appointment.status = "CREATED"

    const isSuccess = await appointmentRepository.createAppointment(appointment)
    return isSuccess
  },

  getFortuneTeller: async (fortuneTellerId: string) => {
    const fortuneTeller = await appointmentRepository.getFortuneTeller(fortuneTellerId)
    return fortuneTeller
  },

  getAllFortuneTeller: async () => {
    const fortuneTellers = await appointmentRepository.getAllFortuneTeller()
    return fortuneTellers
  },

  getPackages: async (fortuneTellerId: string) => {
    const packages = await appointmentRepository.getPackages(fortuneTellerId)
    return packages
  },

  getFortuneTellerAppointment: async (fortuneTellerId: string) => {
    const appointments = await appointmentRepository.getFortuneTellerAppointment(fortuneTellerId)
    return appointments
  },

  getUserInfo: async (userId: string) => {
    const userInfo = await appointmentRepository.getUserInfo(userId)
    return userInfo
  },

  getAppointmentByBothUserId: async (firstUserId: string, secondUserId: string) => {
    const appointments = await appointmentRepository.getAppointmentByBothUserId(firstUserId, secondUserId)
    appointments.forEach((appointment) => {
      appointment.appointmentDate = new Date((appointment.appointmentDate as Date).setUTCHours((appointment.appointmentDate as Date).getUTCHours() + 14))
    })
    return appointments
  }
}
