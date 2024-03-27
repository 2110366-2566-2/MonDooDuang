export type Gender = "MALE" | "FEMALE" | "LGBTQA+" | "NOT_TO_SAY"

export interface UserSchema {
  fName: string
  lName: string
  gender: Gender
  phoneNumber: string
  email: string
  birthDate: Date
  profilePicture: string
  isBanned: boolean
  bankName: string
  accountNumber: string
  password: string
}

export interface DatePickerSchema {
  $D: number
  $H: number
  $L: string
  $M: number
  $W: number
  $d: Date
  $isDayjsObject: boolean
  $m: number
  $ms: number
  $s: number
  $u: undefined
  $x: object
  $y: number
}