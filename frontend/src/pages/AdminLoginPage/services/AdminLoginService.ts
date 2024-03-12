import { environment } from "../../../common/constants/environment"
import { AdminLoginSchema } from "../types/AdminLoginType"

export const LoginService = {
  loginAdmin: async (formValues: AdminLoginSchema) => {
    const response = await fetch(`${environment.backend.url}/admin/login`, {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-Type": "application/json"
      }
    })
    return response.json()
  }
}
