import express from "express"
import { adminController } from "../controllers/admin/admin.controller"

const router = express.Router()
router.post("/login", adminController.loginAdmin)

export default router
