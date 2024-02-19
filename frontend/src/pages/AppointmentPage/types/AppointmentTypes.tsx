export type Package = {
  packageid: string
  speciality: string
  price: number
  duration: number
}

export type UserInfo = {
  userid: string
  fname: string
  lname: string
  phonenumber: string
  birthdate: string
}

export type FortuneTellerAppointments = {
  appointmentdate: string
  duration: number
}

export interface Fortune {
  packageid: string
  speciality: string
  price: number
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
