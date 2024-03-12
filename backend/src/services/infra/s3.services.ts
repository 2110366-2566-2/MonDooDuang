import { s3Repository } from "../../repositories/s3.repository"
import { S3ObjectSchema } from "../../models/infra/s3.model"
import dotenv from "dotenv"
import fs from "fs"
import S3 from "aws-sdk/clients/s3"

dotenv.config()

const bucketName = process.env.S3_BUCKET_NAME?.toString() ?? ""
const region = process.env.S3_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3Client = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

export const s3Service = {
  uploadProfilePicture: async (s3Object: S3ObjectSchema) => {
    const file = fs.createReadStream(s3Object.image)

    const checkParams = {
      Bucket: bucketName,
      Key: `${s3Object.userId}/profilePicture`
    }

    try {
      await s3Client.headObject(checkParams).promise()
      const result = await s3Repository.updateProfilePicture(s3Object)
      //   const data = await s3Repository.uploadProfilePicture(result.Location)
      return result
    } catch (error) {
      const uploadParams = {
        Bucket: bucketName,
        Body: file,
        Key: `${s3Object.userId}/profilePicture`,
        ACL: "public-read"
      }
      try {
        const result = await s3Client.upload(uploadParams).promise()
        console.log("File uploaded successfully. ", result)
        return uploadParams
      } catch (uploadError) {
        console.error("Error uploading file to S3:", uploadError)
      }
    }
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
