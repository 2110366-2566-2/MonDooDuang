import { Request, Response } from "express"
import { userService } from "../../services/user/user.services"
import { LoginUserSchema, RegisterUserSchema } from "../../models/user/user.model"

const loginUser = async (req: Request, res: Response) => {
  const loginUser: LoginUserSchema = {
    email: req.body.email,
    password: req.body.password
  }

  if (req.body.email === undefined || req.body.password === undefined) {
    return res.status(400).json({
      message: "Cannot log in, email or password is missing",
      success: false
    })
  }

  const result = await userService.login(loginUser)
  const isSuccess = result.success

  if (!isSuccess) {
    return res.status(400).json(result)
  } else {
    return res.status(201).json(result)
  }
}

const registerUser = async (req: Request, res: Response) => {
  const registerUser: RegisterUserSchema = {
    email: req.body.email,
    password: req.body.password,
    fName: req.body.fName,
    lName: req.body.lName,
    gender: req.body.gender,
    phoneNumber: req.body.phoneNumber,
    birthDate: req.body.birthDate,
    profilePicture: req.body.profilePicture,
    bankName: req.body.bankName,
    accountNumber: req.body.accountNumber
  }

  if (
    req.body.email === undefined ||
    req.body.password === undefined ||
    req.body.fName === undefined ||
    req.body.lName === undefined ||
    req.body.gender === undefined ||
    req.body.phoneNumber === undefined ||
    req.body.birthDate === undefined ||
    req.body.bankName === undefined ||
    req.body.accountNumber === undefined
  ) {
    return res.status(400).json({
      message: "Cannot register, information is missing",
      success: false
    })
  }

  const result = await userService.createNewUserAndGenerateToken(registerUser)
  const isSuccess = result.success

  if (!isSuccess) {
    return res.status(400).json(result)
  } else {
    return res.status(201).json(result)
  }
}

export const userController = {
  loginUser,
  registerUser
}
