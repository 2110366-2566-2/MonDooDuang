import { Request, Response } from "express"
import { SearchSchema } from "../../models/search/search.model"
import { searchService } from "../../services/search/search.services"

const searchFortuneteller = async (req: Request, res: Response) => {
  const searchOption: SearchSchema = {
    name: "%" + req.body.name.toLowerCase() + "%",
    speciality: req.body.speciality,
    minPrice: req.body.minPrice,
    maxPrice: req.body.maxPrice,
    startDate:
      req.body.startDate === ""
        ? "1-1-1"
        : req.body.startDate + req.body.startTime === ""
          ? ""
          : " " + req.body.startTime,
    endDate:
      req.body.endDate === ""
        ? "5000-1-1"
        : req.body.endDate + req.body.endTime === ""
          ? ""
          : " " + req.body.endTime,
    rating: req.body.rating
  }

  const data = await searchService.searchFortuneteller(searchOption)

  res.status(200).json({ success: true, data })
}

export const searchController = {
  searchFortuneteller
}
