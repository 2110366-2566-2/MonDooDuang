import { AppointmentStatusType } from "../../../common/types/Appointment"
import { SpecialityType } from "../../../common/types/Package"

export interface AppointmentInformation {
  status: AppointmentStatusType
  customerId: string
  fortuneTellerId: string
  appointmentDate: string
  speciality: SpecialityType
  duration: number
  price: number
}
