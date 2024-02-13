import { CreateUserSchema, RegisterUserSchema, TokenInfoSchema } from "../../models/user/user.model"
import { userRepository } from "../../repositories/user.repository"
import { assignToken } from "../../utils/jwt"
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
      fName: fName,
      lName: lName,
      gender: gender,
      phoneNumber: phoneNumber,
      email: email,
      birthDate: birthDate,
      profilePicture: profilePicture,
      isBanned: false,
      bankName: bankName,
      accountNumber: accountNumber,
      password: hashedPassword,
      userType: "CUSTOMER"
    }

    const newUser = await userRepository.createUser(newUserInfo)

    if (newUser === undefined) {
      return { success: false, message: "Cannot create new user" }
    }

    const tokenInfo: TokenInfoSchema = {
      userId: newUser.userid,
      userType: newUser.usertype,
      userName: newUser.fname + " " + newUser.lname[0] + "."
    }

    const token = assignToken(tokenInfo)
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
      userId: user.userid,
      userType: user.usertype,
      userName: user.fname + " " + user.lname[0] + "."
    }

    const token = assignToken(tokenInfo)
    return { success: true, message: "Successfully log in", data: token }
  }
}
