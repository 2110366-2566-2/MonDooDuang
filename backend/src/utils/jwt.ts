import jsonwebtoken from "jsonwebtoken"
import { TokenInfoSchema } from "../types/jwtToken"
import { environment } from "../configs/environment"

export const JwtUtils = {
  assignToken: (payload: TokenInfoSchema) => {
    return jsonwebtoken.sign(
      { userId: payload.userId, userType: payload.userType, username: payload.username },
      environment.jwt.secret
    )
  },
  verifyToken: (token: string) => {
    try {
      const payload = jsonwebtoken.verify(token, environment.jwt.secret) as TokenInfoSchema
      return { success: true, data: payload }
    } catch (err: any) {
      return { success: false, message: `Token is not valid, ${err}` }
    }
  }
}
