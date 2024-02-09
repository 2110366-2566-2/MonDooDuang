import { Request, Response } from "express"
import { userService } from "../../services/user/user.services"

export const loginUser = async (req: Request, res: Response) => {
  const token = await userService.login(req.body)
  if (token === null) {
    res.status(400).json({
      message: "Cannot log in",
      succuss: false
    })
  } else {
    const options = {
      expires: new Date(Date.now()+ parseInt(process.env.JWT_COOKIE_EXPIRE || "30")*24*60*60*10000),
      httpOnly: true
    }
    res.status(201).cookie('token',token, options).json
    ({
      message: "Successfully logged in",
      success: true,
      token
    })
  }
}

export const registerUser = async (req: Request, res: Response) => {
  const token = await userService.createNewUser(req.body)
  if (token === null) {
    res.status(400).json({
      message: "Cannot register new user",
      succuss: false
    })
  } else {
    const options = {
      expires: new Date(Date.now()+ parseInt(process.env.JWT_COOKIE_EXPIRE || "30")*24*60*60*10000),
      httpOnly: true
    }
    res.status(201).cookie('token',token, options).json
    ({
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