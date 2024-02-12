import { environment } from "../../../common/constants/environment"
import { SpecialityType } from "../types/SpecialityTypes"

export const PackageService = {
  createPackage: async (
    specialityType: SpecialityType,
    description: string,
    duration: number,
    price: number,
    fortunetellerId: string
  ) => {
    const res = await fetch(`${environment.backend.url}/fortune/create-package`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        specialityType,
        description,
        duration,
        price,
        fortunetellerId
      })
    })
    const data = await res.json()
    return { isSuccess: data.success, message: data.message }
  }
}
