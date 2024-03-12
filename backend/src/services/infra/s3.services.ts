import { S3ObjectSchema } from "../../models/infra/s3.model"
import dotenv from "dotenv"
import S3 from "aws-sdk/clients/s3"

dotenv.config()

const bucketName = process.env.S3_BUCKET_NAME?.toString() ?? ""
const region = process.env.S3_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3Client = new S3({
  accessKeyId,
  secretAccessKey,
  region
})

export const s3Service = {
  uploadProfilePicture: async (s3Object: S3ObjectSchema) => {
    const uploadParams = {
      Bucket: bucketName,
      Body: s3Object.image,
      Key: `${s3Object.userId}/profilePicture.jpg`
    }
    s3Client.upload(uploadParams, async (err: Error | null, data: any) => {
      if (err) {
        console.log(err)
        return false
      }
      return true
    })
  },

  downloadProfilePicture: async (userId: string) => {
    const downloadParams = {
      Bucket: bucketName,
      Key: `${userId}/profilePicture.jpg`
    }
    try {
      const result = await s3Client.getObject(downloadParams).promise()
      return result
    } catch (error) {
      console.log(error)
      return null
    }
  },

  deleteProfilePicture: async (userId: string) => {
    const deleteParams = {
      Bucket: bucketName,
      Key: `${userId}/profilePicture.jpg`
    }
    s3Client.deleteObject(deleteParams, (err: Error | null, data: any) => {
      if (err) {
        console.log(err)
        return false
      }
      return true
    })
  },

  uploadIdCard: async (s3Object: S3ObjectSchema) => {
    const uploadParams = {
      Bucket: bucketName,
      Body: s3Object.image,
      Key: `${s3Object.userId}/idCard.jpg`
    }
    s3Client.upload(uploadParams, async (err: Error | null, data: any) => {
      if (err) {
        console.log(err)
        return false
      }
      return true
    })
  },

  downloadIdCard: async (userId: string) => {
    const downloadParams = {
      Bucket: bucketName,
      Key: `${userId}/idCard.jpg`
    }
    try {
      const result = await s3Client.getObject(downloadParams).promise()
      return result
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
