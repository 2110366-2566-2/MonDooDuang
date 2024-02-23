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
  },

  getPakageData: async (
    packageId : string
    ) => {
    const res = await fetch(`${environment.backend.url}/fortuneTeller/get-package/${packageId}`)
    const data = await res.json()
    return data.data
  },

  updatePackage: async(
    packageId : string,
    speciality : Speciality,
    description : string,
    duration : number,
    price : number) => {
      const res = await fetch(`${environment.backend.url}/fortuneTeller/update-package/${packageId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          speciality,
          description,
          duration,
          price
        })
      })
      const data = await res.json()
      return { isSuccess: data.success, message: data.message }
    },

    deletePackage: async(packageId:string) => {
      const res = await fetch(`${environment.backend.url}/fortuneTeller/delete-package/${packageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
       const data = await res.json()
      return { isSuccess: data.success, message: data.message }
    }
    
}
