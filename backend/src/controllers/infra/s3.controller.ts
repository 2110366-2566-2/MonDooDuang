import { Request, Response } from "express"
import { S3ObjectSchema } from "../../models/infra/s3.model"
import { s3Service } from "../../services/infra/s3.services"

const uploadProfilePicture = async (req: Request, res: Response) => {
  if (!req.file?.buffer) {
    return res.status(400).json({ success: false, error: "No file uploaded" })
  }
  const s3Object: S3ObjectSchema = {
    userId: req.params.id,
    image: req.file.buffer
  }

  await s3Service.uploadProfilePicture(s3Object)

  res.status(200).json({ success: true, message: "Profile picture uploaded" })
}

const downloadProfilePicture = async (req: Request, res: Response) => {
  const data = await s3Service.downloadProfilePicture(req.params.id)
  if (data && data.ContentType !== undefined && data.ContentType !== null) {
    res.set("Content-Type", data.ContentType)
    res.status(200).json({ success: true, data: "data:image/jpg;base64," + data.Body?.toString("base64") })
  } else {
    res.status(404).json({ success: false, error: "File not found" })
  }
}

const deleteProfilePicture = async (req: Request, res: Response) => {
  await s3Service.deleteProfilePicture(req.params.id)
  res.status(200).json({ success: true, message: "Profile picture deleted" })
}

const uploadIdCard = async (req: Request, res: Response) => {
  if (!req.file?.buffer) {
    return res.status(400).json({ success: false, error: "No file uploaded" })
  }
  const s3Object: S3ObjectSchema = {
    userId: req.params.id,
    image: req.file.buffer
  }

  await s3Service.uploadIdCard(s3Object)

  res.status(200).json({ success: true, message: "ID card uploaded" })
}

const downloadIdCard = async (req: Request, res: Response) => {
  const data = await s3Service.downloadIdCard(req.params.id)
  if (data && data.ContentType !== undefined && data.ContentType !== null) {
    res.set("Content-Type", data.ContentType)
    res.status(200).json({ success: true, data: "data:image/jpg;base64," + data.Body?.toString("base64") })
  } else {
    res.status(404).json({ success: false, error: "File not found" })
  }
}

export const s3Controller = {
  uploadProfilePicture,
  downloadProfilePicture,
  deleteProfilePicture,
  uploadIdCard,
  downloadIdCard
}
