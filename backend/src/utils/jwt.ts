import jsonwebtoken from "jsonwebtoken"
import { TokenInfoSchema } from "../models/user/user.model"
import { environment } from "../configs/environment"

export const assignToken = (payload: TokenInfoSchema) => {
  return jsonwebtoken.sign(
    { userId: payload.userId, userType: payload.userType },
    environment.jwt.secret
  )
}
