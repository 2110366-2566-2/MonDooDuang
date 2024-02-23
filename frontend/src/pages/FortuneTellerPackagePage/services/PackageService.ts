import { environment } from "../../../common/constants/environment"
import { Speciality } from "../types/SpecialityTypes"

export const PackageService = {
  createPackage: async (
    speciality: Speciality,
    description: string,
    duration: number,
    price: number,
    fortuneTellerId: string
  ) => {
    const res = await fetch(`${environment.backend.url}/fortuneTeller/create-package`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        speciality,
        description,
        duration,
        price,
        fortuneTellerId
      })
    })
    const data = await res.json()
    return { isSuccess: data.success, message: data.message }
  }
}
