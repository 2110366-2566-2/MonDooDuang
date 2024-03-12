import { Request, Response } from "express"
import { SearchSchema } from "../../models/search/search.model"
import { searchService } from "../../services/search/search.services"

const searchFortuneteller = async (req: Request, res: Response) => {
  const searchOption: SearchSchema = {
    name: req.body.name.toLowerCase(),
    speciality: req.body.speciality,
    minPrice: req.body.minPrice,
    maxPrice: req.body.maxPrice,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    rating: req.body.rating
  }

  const data = await searchService.searchFortuneteller(searchOption)

  res.status(200).json({ success: true, data })
}

export const searchController = {
  searchFortuneteller
}
