import { searchRepository } from "../../repositories/search.repository"
import { SearchSchema } from "../../models/search/search.model"
import { s3Service } from "../infra/s3.services"

export const searchService = {
  searchFortuneteller: async (searchOption: SearchSchema) => {
    const searchData = await searchRepository.searchFortuneteller(searchOption)
    if (!searchData) return null
    const updatedSearchData = await Promise.all(
      searchData.map(async (data) => {
        const fortuneTellerId = data.fortune_teller_id as string
        const profilePicData = await s3Service.downloadProfilePicture(fortuneTellerId)
        if (profilePicData?.ContentType !== undefined && profilePicData.ContentType !== null) {
          data.profile_picture = "data:image/jpg;base64," + profilePicData.Body?.toString("base64")
        } else {
          data.profile_picture = null
        }
        return data
      })
    )
    return updatedSearchData
  }
}
