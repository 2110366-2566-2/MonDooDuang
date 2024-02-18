import { UserType } from "../models/user/user.model"

export interface TokenInfoSchema {
  userId: string
  userType: UserType
  username: string
}
