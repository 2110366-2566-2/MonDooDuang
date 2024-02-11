import { environment } from "../../../common/constants/environment"
import { FortuneTellerDetailTypes } from "../types/FortuneTellerDetailTypes"
import { PackageTypes } from "../types/PackageTypes"

export const FortuneTellerService = {

  getFortuneTellerbyId: async(fortuneTellerId: string):Promise<FortuneTellerDetailTypes> => {
    const res = await fetch(`${environment.backend.url}/fortuneteller/detail-page/${fortuneTellerId}`)
    const data = await res.json()

    return data.data
  },

  getPackagebyFortuneTellerId: async(fortuneTellerId: string):Promise<PackageTypes[]> => {
    const res = await fetch(`${environment.backend.url}/fortuneteller/package/${fortuneTellerId}`)
    const data = await res.json()

    return data.data
  }
}