import { SpecialityType } from "../../../common/types/Package"

export interface AppointmentInformation {
  appointmentId: string
  price: number
  speciality: SpecialityType
  duration: number
  appointmentDate: Date
  updatedAt: Date
  stageName: string
}
