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