import { db } from "../configs/pgdbConnection"
import { Gender, UserType } from "../models/user/user.model"

export const userRepository = {
  findUser: async (email: string, fName: string, lName: string) => {
    const user = await db.query("SELECT userid, password FROM user_table WHERE email = $1 OR ( fname = $2 AND lname = $3 )", [email, fName, lName])
    return user.rows
  },
  createUser: async (
    fName: string,
    lName: string,
    gender: Gender,
    phoneNumber: string,
    email: string,
    birthDate: Date,
    profilePicture: string,
    isBanned: boolean,
    bankName: string,
    accountNumber: string,
    password: string,
    userType: UserType
  ) => {
    await db.query(
      `INSERT INTO user_table(fName, lName, gender, phoneNumber, email, birthDate, profilePicture, isBanned, bankName, accountNumber, password, userType)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [
        fName,
        lName,
        gender,
        phoneNumber,
        email,
        birthDate,
        profilePicture,
        isBanned,
        bankName,
        accountNumber,
        password,
        userType
      ]
    )
    const newUser = await db.query("SELECT userId FROM user_table WHERE email = $1", [email])
    return newUser.rows
  }
}
