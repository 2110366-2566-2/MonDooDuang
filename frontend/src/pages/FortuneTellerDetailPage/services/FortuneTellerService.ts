import { environment } from "../../../common/constants/environment"
import { FortuneTellerDetailTypes } from "../types/FortuneTellerDetailTypes"
import { PackageTypes } from "../types/PackageTypes"
import { ShowedReviewTypes } from "../types/ShowedReviewTypes"

export const FortuneTellerService = {

  getFortuneTellerDisplayInfoById: async(fortuneTellerId: string):Promise<FortuneTellerDetailTypes> => {
    const res = await fetch(`${environment.backend.url}/fortuneteller/detail-page/${fortuneTellerId}`)
    const data = await res.json()

    return data.data
  },

  getPackagebyFortuneTellerId: async(fortuneTellerId: string):Promise<PackageTypes[]> => {
    const res = await fetch(`${environment.backend.url}/fortuneteller/package/${fortuneTellerId}`)
    const data = await res.json()

    return data.data
  },

  getReviewbyFortuneTellerId: async(fortuneTellerId: string):Promise<ShowedReviewTypes[]> => {
    const res = await fetch(`${environment.backend.url}/fortuneteller/review/${fortuneTellerId}`)
    const data = await res.json()

    return data.data
  },

  getRecommendPackage: async():Promise<Promise<FetchSearchData[] | null>> => {
    const res = await fetch(`${environment.backend.url}/fortuneteller/recommend`)
    const data = await res.json()

    return data.data
  }
}