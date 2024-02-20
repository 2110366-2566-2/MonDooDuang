import { environment } from "../../../common/constants/environment"

export const FortuneTellerService = {
  
  getFortuneTellerDetail: async(fortunetellerId:string) => {
    const res = await fetch(`${environment.backend.url}/fortuneTeller/detail/${fortunetellerId}`)
    const data = await res.json()
    return data.data
  }
}