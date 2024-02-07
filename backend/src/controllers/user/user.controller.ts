import { Request, Response } from "express"
import { userService } from "../../services/user/user.services"

export const loginUser = (req: Request, res: Response) => {

}

export const registerUser = async (req: Request, res: Response) => {
  const token = await userService.createNewUser(req.body)
  if (token === null) {
    res.status(400).json({
      message: "Cannot register new user",
      code: 400
    })
  } else {
    res.status(201).json({
      message: "User is successfully registerd",
      code: 201,
      data: token
    })
  }
}
