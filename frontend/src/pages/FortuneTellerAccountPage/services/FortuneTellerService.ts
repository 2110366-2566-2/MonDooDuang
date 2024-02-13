import { environment } from "../../../common/constants/environment"

export const FortuneTellerService = {
  getFortuneTellerPackage: async(fortunetellerId:string) => {
    const res = await fetch(`${environment.backend.url}/fortuneTeller/package/${fortunetellerId}`)
    const data = await res.json()
    return data
  },

  getFortuneTellerDetail: async(fortunetellerId:string) => {
    const res = await fetch(`${environment.backend.url}/fortuneTeller/detail/${fortunetellerId}`)
    const data = await res.json()
    return data
  },

  // getPackageId: async(fortunetellerId:string, packageId:string) => {
  //   const res = await fetch(`${environment.backend.url}/fortuneTeller/${fortunetellerId}/${packageId}`)
  //   const data = await res.json()
  //   return data
  // },

  updateFortuneTellerDetail: async(fortunetellerId:string, stageName:string, description:string) => { 
    const res = await fetch(`${environment.backend.url}/fortuneTeller/update-detail`,{

    method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fortunetellerId,
        stageName,
        description
      })
    })
    const data = await res.json()
    return { isSuccess: data.success, message: data.message }
  }
}