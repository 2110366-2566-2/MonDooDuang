import { environment } from "../../../common/constants/environment"

export const FortuneTellerService = {
  
  getFortuneTellerDetail: async(fortuneTellerId:string) => {
    const res = await fetch(`${environment.backend.url}/fortuneTeller/detail/${fortuneTellerId}`)
    const data = await res.json()
    return data.data
  },

  updateFortuneTellerDetail: async(
    fortuneTellerId:string, 
    description:string, 
    stageName:string
    ) => {
      const res = await fetch(`${environment.backend.url}/fortuneTeller/detail/update-detail/${fortuneTellerId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ description, stageName })
    })
    const data = await res.json()
    return { isSuccess: data.success, message: data.message }
  },

  getStageNameValid: async(fortuneTellerId: String, stageName: String): Promise<boolean> => {
    const res = await fetch(`${environment.backend.url}/fortuneTeller/stageNameValid`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ fortuneTellerId, stageName })
  })
    const data = await res.json()
    return data.data
  }

}