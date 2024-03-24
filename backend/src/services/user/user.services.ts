import {
  CreateUserSchema,
  RegisterUserSchema,
  UpdateUserSchema
} from "../../models/user/user.model"
import { userRepository } from "../../repositories/user.repository"
import { TokenInfoSchema } from "../../types/jwtToken"
import { JwtUtils } from "../../utils/jwt"
import bcrypt from "bcrypt"

export const userService = {
  createNewUserAndGenerateToken: async (body: RegisterUserSchema) => {
    const fName = body.fName
    const lName = body.lName
    const gender = body.gender
    const phoneNumber = body.phoneNumber
    const email = body.email
    const birthDate = body.birthDate
    const profilePicture = body.profilePicture
    const bankName = body.bankName
    const accountNumber = body.accountNumber
    const password = body.password

    const user = await userRepository.findUser(email, fName, lName)
    if (user !== undefined) {
      return { success: false, message: "This user has registered" }
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUserInfo: CreateUserSchema = {
      fName,
      lName,
      gender,
      phoneNumber,
      email,
      birthDate,
      profilePicture,
      isBanned: false,
      bankName,
      accountNumber,
      password: hashedPassword,
      userType: "CUSTOMER"
    }

    const newUser = await userRepository.createUser(newUserInfo)

    if (newUser === undefined) {
      return { success: false, message: "Cannot create new user" }
    }

    const tokenInfo: TokenInfoSchema = {
      userId: newUser.user_id,
      userType: newUser.user_type,
      username: newUser.fname + " " + newUser.lname[0] + "."
    }

    const token = JwtUtils.assignToken(tokenInfo)
    return { success: true, message: "Successfully create new user", data: token }
  },
  login: async (body: { email: string, password: string }) => {
    const email = body.email
    const password = body.password

    const user = await userRepository.findUser(email, "", "")
    if (user === undefined) {
      return { success: false, message: "This email hasn't registered" }
    }

    const collectedPassword: string = user.password

    const isMatch = await bcrypt.compare(password, collectedPassword)
    if (!isMatch) {
      return { success: false, message: "Invalid credentials" }
    }

    const tokenInfo: TokenInfoSchema = {
      userId: user.user_id,
      userType: user.user_type,
      username: user.fname + " " + user.lname[0] + "."
    }

    const token = JwtUtils.assignToken(tokenInfo)
    return { success: true, message: "Successfully log in", data: token }
  },

  getUserInformation: async (userId: string) => {
    const UserInformation = await userRepository.getUserInformation(userId)
    if (UserInformation === null) return null
    return {
      userId: UserInformation.user_id,
      fName: UserInformation.fname,
      lName: UserInformation.lname,
      gender: UserInformation.gender,
      phoneNumber: UserInformation.phone_number,
      email: UserInformation.email,
      birthDate: UserInformation.birth_date,
      profilePicture: UserInformation.profile_picture,
      bankName: UserInformation.bank_name,
      accountNumber: UserInformation.account_number,
      userType: UserInformation.user_type
    }
  },

  updateUserInformation: async (userId: string, body: UpdateUserSchema) => {
    const fName = body.fName
    const lName = body.lName
    const gender = body.gender
    const phoneNumber = body.phoneNumber
    const birthDate = body.birthDate
    const profilePicture = body.profilePicture
    const bankName = body.bankName
    const accountNumber = body.accountNumber

    const userInfo: UpdateUserSchema = {
      fName,
      lName,
      gender,
      phoneNumber,
      birthDate,
      profilePicture,
      bankName,
      accountNumber
    }

    const updatedUser = await userRepository.updateUserInformation(userId, userInfo)

    if (updatedUser === undefined) {
      return { success: false, message: "Cannot update information" }
    }
    return { success: true, message: "Successfully update information" }
  }
}
