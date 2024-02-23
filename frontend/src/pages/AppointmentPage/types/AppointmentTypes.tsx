export type Package = {
  package_id: string
  speciality: string
  price: number
  duration: number
}

export type UserInfo = {
  user_id: string
  fname: string
  lname: string
  phone_number: string
  birth_date: string
}

export type FortuneTellerAppointments = {
  appointment_date: string
  duration: number
}

export interface GroupedAppointments {
  [date: string]: { time: string; duration: number }[]
}

export type ConfirmProps = {
  fortuneTeller: string
  type: string
  price: number
  date: string
  starttime: string
  endtime: string
  isVisible: boolean
  onClose: () => void
  onConfirm: () => void
}

export type fortuneTellerInfo = {
  fortuneTellerId: string
  stagename: string
}
