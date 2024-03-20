import express from "express"
import multer from "multer"
import { s3Controller } from "../controllers/infra/s3.controller"

const router = express.Router()
const upload = multer({
  storage: multer.memoryStorage()
})

router.get("/profile-picture/:id", s3Controller.downloadProfilePicture)
router.post("/profile-picture/:id", upload.single("image"), s3Controller.uploadProfilePicture)
router.delete("/profile-picture/:id", s3Controller.deleteProfilePicture)

router.get("/id-card/:id", s3Controller.downloadIdCard)
router.post("/id-card/:id", upload.single("image"), s3Controller.uploadIdCard)
router.delete("/id-card/:id", s3Controller.deleteIdCard)

export default router
