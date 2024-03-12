import { s3Repository } from "../../repositories/s3.repository"
import { S3ObjectSchema } from "../../models/infra/s3.model"

export const s3Service = {
  uploadProfilePicture: async (s3Object: S3ObjectSchema) => {
    const data = await s3Repository.uploadProfilePicture(s3Object)
    return data
  },

  downloadProfilePicture: async (s3Object: S3ObjectSchema) => {
    const data = await s3Repository.downloadProfilePicture(s3Object)
    return data
  },

  deleteProfilePicture: async (s3Object: S3ObjectSchema) => {
    const data = await s3Repository.deleteProfilePicture(s3Object)
    return data
  },

  updateProfilePicture: async (s3Object: S3ObjectSchema) => {
    const data = await s3Repository.updateProfilePicture(s3Object)
    return data
  },

  uploadIdCard: async (s3Object: S3ObjectSchema) => {
    const data = await s3Repository.uploadIdCard(s3Object)
    return data
  },

  downloadIdCard: async (s3Object: S3ObjectSchema) => {
    const data = await s3Repository.downloadIdCard(s3Object)
    return data
  }
}
