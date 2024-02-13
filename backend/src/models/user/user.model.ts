export type Gender = "MALE" | "FEMALE" | "LGBTQA+" | "NOT_TO_SAY"
export type UserType = "CUSTOMER" | "FORTUNE_TELLER"

export interface CreateUserSchema {
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
  userType: UserType
}

export interface LoginUserSchema {
  email: string
  password: string
}

export interface RegisterUserSchema {
  fName: string
  lName: string
  gender: Gender
  phoneNumber: string
  email: string
  birthDate: Date
  profilePicture: string
  bankName: string
  accountNumber: string
  password: string
}

export interface TokenInfoSchema {
  userId: string
  userType: UserType
}
