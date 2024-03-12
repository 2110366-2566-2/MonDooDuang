import { s3Repository } from "../../repositories/s3.repository"
import { S3Schema } from "../../models/infra/s3.model"

export const s3Service = {
  uploadProfilePicture: async (s3: S3Schema) => {
    const data = await s3Repository.uploadProfilePicture(s3)
    return data
  },

  downloadProfilePicture: async (s3: S3Schema) => {
    const data = await s3Repository.downloadProfilePicture(s3)
    return data
  },

  deleteProfilePicture: async (s3: S3Schema) => {
    const data = await s3Repository.deleteProfilePicture(s3)
    return data
  },

  updateProfilePicture: async (s3: S3Schema) => {
    const data = await s3Repository.updateProfilePicture(s3)
    return data
  },

  uploadIdCard: async (s3: S3Schema) => {
    const data = await s3Repository.uploadIdCard(s3)
    return data
  },

  downloadIdCard: async (s3: S3Schema) => {
    const data = await s3Repository.downloadIdCard(s3)
    return data
  }
}
