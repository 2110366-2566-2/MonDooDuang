import { environment } from "../../../common/constants/environment"
import { UserSchema } from "../../RegisterPage/types/RegisterType"

export const AccountService = {
  getUserInformation: async (userId: string): Promise<UserSchema> => {
    const res = await fetch(`${environment.backend.url}/user/account/${userId}`)
    if (!res.ok) {
      throw new Error("Failed to fetch user information")
    }
    const data = await res.json()
    return data.data
  },

  updateUserInformation: async (userId: string, formValues: UserSchema) => {
    const res = await fetch(`${environment.backend.url}/user/account/${userId}`, {
      method: "PUT",
      body: JSON.stringify(formValues),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (!res.ok) {
      throw new Error("Failed to update user information")
    }
    const data = await res.json()
    return data
  },

  uploadProfilePicture: async (userId: string, formData: FormData) => {
    const res = await fetch(`${environment.backend.url}/images/profile-picture/${userId}`, {
      method: "POST",
      body: formData
    })
    if (!res.ok) {
      throw new Error("Failed to update user information")
    }
    const data = await res.json()
    return data
  },

  getProfilePicture: async (userId: string) => {
    const res = await fetch(`${environment.backend.url}/images/profile-picture/${userId}`)
    if (!res.ok) {
      return null
    }
    const data = await res.json()
    return data.data
  }
}
