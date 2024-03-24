import { environment } from "../../../common/constants/environment"
import { UserSchema } from "../../RegisterPage/types/RegisterType"

export const AccountService = {
  getUserInformation: async (userId: string): Promise<UserSchema> => {
    const res = await fetch(`${environment.backend.url}/user/account/${userId}`)
    const data = await res.json()

    return data.data
  },

  updateUserInformation: async (userId: string, formValues: UserSchema) => {
    const response = await fetch(`${environment.backend.url}/user/account/${userId}`, {
      method: "PUT",
      body: JSON.stringify(formValues),
      headers: {
        "Content-Type": "application/json"
      }
    })
    return await response.json()
  }
}
