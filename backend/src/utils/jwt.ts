import jsonwebtoken from "jsonwebtoken"
import { TokenInfoSchema } from "../models/user/user.model"

export const assignToken = (payload: TokenInfoSchema) => {
  const jwtSecret = process.env.JWT_SECRET ?? ""
  return jsonwebtoken.sign({ userId: payload.userId, userType: payload.userType }, jwtSecret)
}
