import { environment } from "../../../common/constants/environment"
import { UserSchema } from "../types/RegisterType"

export const RegisterService = {
  createUser: async (formValues: UserSchema) => {
    const response = await fetch(`${environment.backend.url}/user/register`, {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-Type": "application/json"
      }
    })
    return await response.json()
  },
  uploadProfilePicture: async (userId: string, formData: FormData) => {
    const res = await fetch(`${environment.backend.url}/images/profile-picture/${userId}`, 
      {
        method: "POST",
        body: formData
      })
    const data = await res.json()
    return { isSuccess: data.success, message: data.error }
  }
}
