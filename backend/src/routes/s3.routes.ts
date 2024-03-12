import express from "express"
import { s3Controller } from "../controllers/infra/s3.controller"

const router = express.Router()
router.route("/profile-picture/:id")
  .get(s3Controller.downloadProfilePicture)
  .post(s3Controller.uploadIdCard)
  .put(s3Controller.updateProfilePicture)
  .delete(s3Controller.deleteProfilePicture)
router.route("/id-card/:id")
  .get(s3Controller.downloadIdCard)
  .post(s3Controller.uploadIdCard)

export default router
