import { searchRepository } from "../../repositories/search.repository"
import { SearchSchema } from "../../models/search/search.model"

export const searchService = {
  searchFortuneteller: async (searchOption: SearchSchema) => {
    const searchData = await searchRepository.search(searchOption)
    return searchData
  }
}
