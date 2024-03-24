import { db } from "../configs/pgdbConnection"
import { CreateUserSchema, UpdateUserSchema, UserDBSchema } from "../models/user/user.model"

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
      WHERE user_id = $1;`,
      [userId]
    )

    return result.rows[0]
  },

  getUserInformation: async (user_id: string) => {
    const user = await db.query<UserDBSchema>(
      "SELECT user_id, email, password, user_type, fname, lname, gender, phone_number, birth_date, profile_picture, bank_name, account_number FROM user_table WHERE user_id = $1",
      [user_id]
    )
    return user.rows[0]
  },

  updateUserInformation: async (user_id: string, user: UpdateUserSchema) => {
    await db.query(
      `UPDATE user_table
      SET fname = $1 ,lname = $2, gender = $3, phone_number =$4 , birth_date = $5, profile_picture = $6, bank_name = $7, account_number = $8
      WHERE user_id = $9`,
      [
        user.fName,
        user.lName,
        user.gender,
        user.phoneNumber,
        user.birthDate,
        user.profilePicture,
        user.bankName,
        user.accountNumber,
        user_id
      ]
    )
    const userUpdate = await db.query<UserDBSchema>(
      "SELECT user_id, email, password, user_type, fname, lname, gender, phone_number, birth_date, profile_picture, bank_name, account_number FROM user_table WHERE user_id = $1",
      [user_id]
    )
    return userUpdate.rows[0]
  }
}
