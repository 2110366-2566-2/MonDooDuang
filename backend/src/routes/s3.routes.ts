import express from "express"
import multer from "multer"
import { s3Controller } from "../controllers/infra/s3.controller"

const router = express.Router()
const upload = multer({
  storage: multer.memoryStorage()
})

router
  .route("/profile-picture/:id")
  .post(upload.single("image"), s3Controller.uploadProfilePicture)
  .get(s3Controller.downloadProfilePicture)
  .put(upload.single("image"), s3Controller.updateProfilePicture)
  .delete(upload.single("image"), s3Controller.deleteProfilePicture)
router
  .route("/id-card/:id")
  .get(s3Controller.downloadIdCard, upload.single("image"))
  .post(s3Controller.uploadIdCard, upload.single("image"))

export default router
