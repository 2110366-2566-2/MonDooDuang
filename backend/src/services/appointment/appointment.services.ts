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
    const user_info = await appointmentRepository.getUserInfo(userId)
    return user_info
  }
}
