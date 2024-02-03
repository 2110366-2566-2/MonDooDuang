import { UserSchema } from "../models/user.model"

// Connect to db here
const connection = "CONNECT TO SOME DB"

export const userRepository = {
  find: async (): Promise<UserSchema[]> => {
    return []
  }
}
