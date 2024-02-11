import { Request, Response } from "express"
import { userService } from "../../services/user/user.services"
import { LoginUserSchema, RegisterUserSchema } from "../../models/user/user.model"

export const loginUser = async (req: Request, res: Response) => {
  const loginUser: LoginUserSchema = {
    email: req.body.email,
    password: req.body.password
  }
  const token = await userService.login(loginUser)
  if (token === null) {
    res.status(400).json({
      message: "Cannot log in",
      succuss: false
    })
  } else {
    const options = {
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRE ?? "30") * 24 * 60 * 60 * 10000
      ),
      httpOnly: false
    }
    res.status(201).cookie("token", token, options).json({
      message: "Successfully logged in",
      success: true,
      token
    })
  }
}

export const registerUser = async (req: Request, res: Response) => {
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
  const token = await userService.createNewUser(registerUser)
  if (token === null) {
    res.status(400).json({
      message: "Cannot register new user",
      succuss: false
    })
  } else {
    const options = {
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRE ?? "30") * 24 * 60 * 60 * 10000
      ),
      httpOnly: false
    }
    res.status(201).cookie("token", token, options).json({
      message: "Successfully registered",
      success: true,
      token
    })
  }
}

export const userController = {
  loginUser,
  registerUser
}
