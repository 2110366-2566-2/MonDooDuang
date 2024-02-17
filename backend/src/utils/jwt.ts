import jsonwebtoken from "jsonwebtoken"
import { TokenInfoSchema } from "../types/jwtToken"
import { environment } from "../configs/environment"

export const assignToken = (payload: TokenInfoSchema) => {
  return jsonwebtoken.sign(
    { userId: payload.userId, userType: payload.userType, userName: payload.userName },
    environment.jwt.secret
  )
}
