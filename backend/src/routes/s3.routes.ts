import express from "express"
import multer from "multer"
import { s3Controller } from "../controllers/infra/s3.controller"

const router = express.Router()
const upload = multer({ dest: "uploads/" })

router.route("/profile-picture/:id")
  .get(s3Controller.downloadProfilePicture, upload.single("image"))
  .post(s3Controller.uploadIdCard, upload.single("image"))
  .put(s3Controller.updateProfilePicture, upload.single("image"))
  .delete(s3Controller.deleteProfilePicture, upload.single("image"))
router.route("/id-card/:id")
  .get(s3Controller.downloadIdCard, upload.single("image"))
  .post(s3Controller.uploadIdCard, upload.single("image"))

export default router
