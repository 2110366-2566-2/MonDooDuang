import { adminRepository } from "../../repositories/admin.repository"
import { TokenInfoSchema } from "../../types/jwtToken"
import { JwtUtils } from "../../utils/jwt"
import bcrypt from "bcrypt"

export const adminService = {
  login: async (body: { email: string, password: string }) => {
    const email = body.email
    const password = body.password

    const admin = await adminRepository.findAdmin(email)
    if (admin === undefined) {
      return { success: false, message: "This email hasn't registered" }
    }

    const collectedPassword: string = admin.password

    const isMatch = await bcrypt.compare(password, collectedPassword)
    if (!isMatch) {
      return { success: false, message: "Invalid credentials" }
    }

    const tokenInfo: TokenInfoSchema = {
      userId: admin.admin_id,
      userType: "ADMIN",
      username: "admin"
    }

    const token = JwtUtils.assignToken(tokenInfo)
    return { success: true, message: "Successfully log in", data: token }
  }
}
