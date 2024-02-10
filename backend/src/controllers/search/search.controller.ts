import { Request, Response } from "express"
import { SearchSchema } from "../../models/search/search.model"
import { searchService } from "../../services/search/search.services"

const searchFortuneteller = async (req: Request, res: Response) => {
  const searchOption: SearchSchema = {
    name: req.body.name,
    speciality: req.body.speciality,
    minPrice: req.body.minPrice,
    maxPrice: req.body.maxPrice,
    startDate: req.body.startDate + " " + req.body.startTime,
    endDate: req.body.endDate + " " + req.body.endTime,
    rating: req.body.rating
  }

  // const searchOption: SearchSchema = {
  //   name: "",
  //   speciality: "THAI",
  //   minPrice: 55,
  //   maxPrice: 75,
  //   startDate: "2024-02-20 14:00:00",
  //   endDate: "2024-02-20 15:00:00",
  //   rating: 0
  // }

  const data = await searchService.searchFortuneteller(searchOption)

  res.status(200).json({ success: true, data })
}

export const searchController = {
  searchFortuneteller
}
