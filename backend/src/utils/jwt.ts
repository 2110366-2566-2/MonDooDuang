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
    let isVerified = false
    let payload = {} as TokenInfoSchema
    jsonwebtoken.verify(token, environment.jwt.secret, (err, decoded) => {
      if (err) {
        return
      }
      isVerified = true
      payload = decoded as TokenInfoSchema
    })

    return { success: isVerified, data: payload }
  }
}
