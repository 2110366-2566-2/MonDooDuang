import { environment } from "../../../common/constants/environment"
import { UserSchema } from "../types/RegisterType"

export const RegisterService = {
    createUser: async(formValues: UserSchema) => {
    const response = await fetch(`${environment.backend.url}/user/register`, {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response}
}