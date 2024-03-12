import { db } from "../configs/pgdbConnection"
import { AdminSchema } from "../models/admin/admin.model"

export const adminRepository = {
  findAdmin: async (email: string) => {
    const user = await db.query<AdminSchema>(
      "SELECT admin_id, password FROM admin WHERE email = $1",
      [email]
    )
    return user.rows[0]
  }
}
