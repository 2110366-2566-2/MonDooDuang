import express from "express"
import { searchController } from "../controllers/search/search.controller"

const router = express.Router()
router.post("/", searchController.searchFortuneteller)

export default router
