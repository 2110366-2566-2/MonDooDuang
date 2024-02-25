import { appointmentRepository } from "../../repositories/appointment.repository"
import { AppointmentSchema } from "../../models/appointment/appointment.model"
import { fortuneTellerRepository } from "../../repositories/fortuneTeller.repository"
import { packageRepository } from "../../repositories/package.repository"
import { userRepository } from "../../repositories/user.repository"

export const appointmentService = {
  createAppointment: async (appointment: AppointmentSchema) => {
    appointment.status = "CREATED"

    const isSuccess = await appointmentRepository.createAppointment(appointment)
    return isSuccess
  },

  getFortuneTeller: async (fortuneTellerId: string) => {
    const fortuneTeller = await fortuneTellerRepository.getFortuneTellerStageName(fortuneTellerId)
    return fortuneTeller
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

  autoDeclineAppointment: async () => {

    //get appointment which is still CREATED over 24 hours
    const expiredAppointment = await appointmentRepository.getExpiredAppointment()

    if (expiredAppointment.length !== 0) {
      appointmentRepository.declineAppointment(expiredAppointment)

      //Send notification to the list of expiredAppointmentId
      //Call function here
    }

  }
}
