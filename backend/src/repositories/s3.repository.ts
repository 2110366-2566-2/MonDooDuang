import { db } from "../configs/pgdbConnection"
import { S3ObjectSchema } from "../models/infra/s3.model"

export const s3Repository = {
  uploadProfilePicture: async (s3Object: S3ObjectSchema) => {
    const { userId, image } = s3Object
    const query = ""
    const result = await db.query(query)
    if (result.rows.length === 0) return null
    return result.rows
  },

  downloadProfilePicture: async (s3Object: S3ObjectSchema) => {
    const { userId, image } = s3Object
    const query = ""
    const result = await db.query(query)
    if (result.rows.length === 0) return null
    return result.rows
  },

  deleteProfilePicture: async (s3Object: S3ObjectSchema) => {
    const { userId, image } = s3Object
    const query = ""
    const result = await db.query(query)
    if (result.rows.length === 0) return null
    return result.rows
  },

  updateProfilePicture: async (s3Object: S3ObjectSchema) => {
    const { userId, image } = s3Object
    const query = ""
    const result = await db.query(query)
    if (result.rows.length === 0) return null
    return result.rows
  },

  uploadIdCard: async (s3Object: S3ObjectSchema) => {
    const { userId, image } = s3Object
    const query = ""
    const result = await db.query(query)
    if (result.rows.length === 0) return null
    return result.rows
  },

  downloadIdCard: async (s3Object: S3ObjectSchema) => {
    const { userId, image } = s3Object
    const query = ""
    const result = await db.query(query)
    if (result.rows.length === 0) return null
    return result.rows
  }
}
