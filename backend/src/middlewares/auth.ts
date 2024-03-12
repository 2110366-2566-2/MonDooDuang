import { NextFunction, Request, Response } from "express"
import { JwtUtils } from "../utils/jwt"

export const middleware = {
  protect: (req: Request, res: Response, next: NextFunction) => {
    let token
    if (req.headers.authorization !== undefined && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1]
    }
    if (token === undefined || token === "null" || token === "undefined") {
      return res.status(401).json({ success: false, message: "Unauthorized" })
    }
    const { success } = JwtUtils.verifyToken(token)
    if (!success) {
      return res.status(401).json({ success: false, message: "Unauthorized" })
    }
    next()
  },

  authorize: (userType: "FORTUNE_TELLER" | "ADMIN") => {
    return (req: Request, res: Response, next: NextFunction) => {
      let token
      if (
        req.headers.authorization !== undefined &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1]
      }

      if (token === undefined || token === "null" || token === "undefined") {
        return res.status(401).json({ success: false, message: "Unauthorized" })
      }

      const { success, data, message } = JwtUtils.verifyToken(token)
      if (!success || data === undefined) {
        return res.status(401).json({ success: false, message: `Unauthorized, ${message}` })
      }

      if (data.userType !== userType) {
        return res.status(403).json({
          success: false,
          message: "Forbidden"
        })
      }
      next()
    }
  }
}
