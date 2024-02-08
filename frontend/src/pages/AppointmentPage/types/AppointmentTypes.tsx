type Package = {
  packageid: string
  speciality: string
  price: number
  duration: number
}

type UserInfo = {
  userid: string
  fname: string
  lname: string
  phonenumber: string
  birthdate: string
}

type FortuneTellerAppointments = {
  appointmentdate: string
  duration: number
}

interface Fortune {
  packageid: string
  speciality: string
  price: number
  duration: number
}
interface GroupedAppointments {
  [date: string]: { time: string; duration: number }[]
}
