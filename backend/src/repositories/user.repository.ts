import { db } from "../configs/pgdbConnection"
import { UserSchema } from "../models/user/user.model"

export const userRepository = {
  findUser: async (email: string, fName: string, lName: string) => {
    const user = await db.query(
      "SELECT userid, password, usertype FROM user_table WHERE email = $1 OR ( fname = $2 AND lname = $3 )",
      [email, fName, lName]
    )
    return user.rows[0]
  },
  createUser: async (user: UserSchema) => {
    await db.query(
      `INSERT INTO user_table(fName, lName, gender, phoneNumber, email, birthDate, profilePicture, isBanned, bankName, accountNumber, password, userType)
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
    const newUser = await db.query("SELECT userId, usertype FROM user_table WHERE email = $1", [
      user.email
    ])
    return newUser.rows[0]
  }
}
