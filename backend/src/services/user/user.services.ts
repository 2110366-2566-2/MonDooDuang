import { Gender } from "../../models/user/user.model"
import { userRepository } from "../../repositories/user.repository"
import { assignToken } from "../../utils/jwt"
const bcrypt = require("bcrypt")

// Business logic here

export const userService = {
  createNewUser: async (body: { email: string, fName: string, lName: string, gender: Gender, phoneNumber: string, birthDate: Date, profilePicture: string, bankName: string, accountNumber: string, password: string}) => {
    const fName = body?.fName
    const lName = body?.lName
    const gender = body?.gender
    const phoneNumber = body?.phoneNumber
    const email = body?.email
    const birthDate = body?.birthDate
    const profilePicture = body?.profilePicture
    const bankName = body?.bankName
    const accountNumber = body?.accountNumber
    const password = body?.password

    if (!(fName && lName && gender && phoneNumber && email && birthDate && bankName && accountNumber && password)) {
      console.log("incomplete info")
      return null
    }

    const user = await userRepository.findUser(email)
    if (user.length > 0) {
      console.log("email is used")
      return null
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await userRepository.createUser(fName, lName, gender, phoneNumber, email, birthDate, profilePicture, false, bankName, accountNumber, hashedPassword, "CUSTOMER")

    if (!newUser) {
      console.log("cannot create new user")
      return null
    }

    const token = assignToken(newUser[0].userid)
    return token
  },
  login: async (body: { email: string, password: string}) => {
    const email = body?.email
    const password = body?.password

    if (!(email && password)) {
      console.log("incomplete info")
      return null
    }

    const user = await userRepository.findUser(email)
    if (user.length <= 0) {
      console.log("this email hasn't registered")
      return null
    }

    const isMatch = await bcrypt.compare(password, user[0].password)
    if(!isMatch) {
      console.log("invalid credentials")
      return null
    }

    const token = assignToken(user[0].userid)
    return token
  }
}
