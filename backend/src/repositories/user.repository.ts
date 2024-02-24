import { db } from "../configs/pgdbConnection"
import { CreateUserSchema, UserDBSchema } from "../models/user/user.model"

export const userRepository = {
  findUser: async (email: string, fName: string, lName: string) => {
    const user = await db.query<UserDBSchema>(
      "SELECT user_id, password, user_type, fname, lname FROM user_table WHERE email = $1 OR ( fname = $2 AND lname = $3 )",
      [email, fName, lName]
    )
    return user.rows[0]
  },
  createUser: async (user: CreateUserSchema) => {
    await db.query(
      `INSERT INTO user_table(fname, lname, gender, phone_number, email, birth_date, profile_picture, is_banned, bank_name, account_number, password, user_type)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [
        user.fName,
        user.lName,
        user.gender,
        user.phoneNumber,
        user.email,
        user.birthDate,
        user.profilePicture,
        user.isBanned,
        user.bankName,
        user.accountNumber,
        user.password,
        user.userType
      ]
    )
    const newUser = await db.query<UserDBSchema>(
      "SELECT user_id, user_type, fname, lname FROM user_table WHERE email = $1",
      [user.email]
    )
    return newUser.rows[0]
  },

  getUserInfoForAppointment: async (userId: string) => {
    const result = await db.query(
      `SELECT user_id,fname,lname,phone_number,birth_date
      FROM user_table
      WHERE user_id = $1;`, [userId]
    )

    return result.rows[0]
  }
}
