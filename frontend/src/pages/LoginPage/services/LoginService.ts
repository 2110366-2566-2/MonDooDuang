import { environment } from "../../../common/constants/environment"
import { UserLoginSchema } from "../types/LoginType"

export const LoginService = {
  loginUser: async (formValues: UserLoginSchema) => {
    const response = await fetch(`${environment.backend.url}/user/login`, {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-Type": "application/json"
      }
    })
    return response.json()
  }
}
