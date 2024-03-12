import { Request, Response } from "express"
import { S3Schema } from "../../models/infra/s3.model"
import { s3Service } from "../../services/infra/s3.services"

const uploadProfilePicture = async (req: Request, res: Response) => {
  const s3: S3Schema = {
    userId: req.params.id,
    image: req.body.image
  }

  const data = await s3Service.uploadProfilePicture(s3)

  res.status(200).json({ success: true, data })
}

const downloadProfilePicture = async (req: Request, res: Response) => {
  const s3: S3Schema = {
    userId: req.params.id,
    image: req.body.image
  }

  const data = await s3Service.downloadProfilePicture(s3)

  res.status(200).json({ success: true, data })
}
const deleteProfilePicture = async (req: Request, res: Response) => {
  const s3: S3Schema = {
    userId: req.params.id,
    image: req.body.image
  }

  const data = await s3Service.deleteProfilePicture(s3)

  res.status(200).json({ success: true, data })
}

const updateProfilePicture = async (req: Request, res: Response) => {
  const s3: S3Schema = {
    userId: req.params.id,
    image: req.body.image
  }

  const data = await s3Service.updateProfilePicture(s3)

  res.status(200).json({ success: true, data })
}

const uploadIdCard = async (req: Request, res: Response) => {
  const s3: S3Schema = {
    userId: req.params.id,
    image: req.body.image
  }

  const data = await s3Service.uploadIdCard(s3)

  res.status(200).json({ success: true, data })
}

const downloadIdCard = async (req: Request, res: Response) => {
  const s3: S3Schema = {
    userId: req.params.id,
    image: req.body.image
  }
  const data = await s3Service.uploadIdCard(s3)

  res.status(200).json({ success: true, data })
}

export const s3Controller = {
  uploadProfilePicture,
  downloadProfilePicture,
  deleteProfilePicture,
  updateProfilePicture,
  uploadIdCard,
  downloadIdCard
}
