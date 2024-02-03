type Gender = 'MALE'|'FEMALE'|'LGBTQA+'|'NOT_TO_SAY'
type UserType = 'CUSTOMER'|'FORTUNE_TELLER'

export interface UserSchema {
  userId: {
    type: string
    required: true
  }
  fName: {
    type: string
    required: true
  }
  lName: {
    type: string
    required: true
  }
  gender: {
    type: Gender
    requir4ed: true
  }
  phoneNumber: {
    type: string
    required: true
  }
  email: {
    type: string
    required: true
  }
  birthDate: {
    type: Date
    required: true
  }
  profilePicture: {
    type: string
    required: false
  }
  isBanned: {
    type: boolean
    default: false
    required: true
  }
  bankName: {
    type: string
    required: true
  }
  accountNumber: {
    type: string
    required: true
  }
  password: {
    type: string
    required: true
  }
  userType: {
    type: UserType
    required: true
  }
}
