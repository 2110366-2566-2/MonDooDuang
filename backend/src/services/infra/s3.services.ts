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
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region
})

export const s3Service = {
  uploadProfilePicture: async (s3Object: S3ObjectSchema) => {
    const uploadParams = {
      Bucket: bucketName,
      Body: s3Object.image,
      Key: `${s3Object.userId}/profilePicture.jpg`
    }
    console.log(uploadParams)
    s3Client.upload(uploadParams, async (err: any, data: any) => {
      if (err) {
        console.log(err)
      }
      if (data) {
        console.log(data)
      }
    })
  },

  downloadProfilePicture: async (s3Object: S3ObjectSchema) => {
    const fileStream = fs.createWriteStream("../../../uploads/profilePicture.jpeg")
    const downloadParams = {
      Bucket: bucketName,
      Key: `${s3Object.userId}/profilePicture.jpeg`
    }

    s3Client.getObject(downloadParams).createReadStream().pipe(fileStream)

    const data = await s3Repository.downloadProfilePicture(s3Object)
    return data
  },

  deleteProfilePicture: async (s3Object: S3ObjectSchema) => {
    const deleteParams = {
      Bucket: bucketName,
      Key: `${s3Object.userId}/profilePicture`
    }
    const result = await s3Client.deleteObject(deleteParams).promise()
    const data = await s3Repository.deleteProfilePicture(s3Object)
    return data
  },

  updateProfilePicture: async (s3Object: S3ObjectSchema) => {
    const updateParams = {
      Bucket: bucketName,
      Key: `${s3Object.userId}/profilePicture`
    }
    const result = await s3Client.putObject(updateParams).promise()
    const data = await s3Repository.updateProfilePicture(s3Object)
    return data
  },

  uploadIdCard: async (s3Object: S3ObjectSchema) => {
    const file = fs.createReadStream(s3Object.image)

    const uploadParams = {
      Bucket: bucketName,
      Body: file,
      Key: `${s3Object.userId}/idCard`,
      ACL: "public-read"
    }

    const result = await s3Client.putObject(uploadParams).promise()
    const data = await s3Repository.uploadIdCard(s3Object)
    return data
  },

  downloadIdCard: async (s3Object: S3ObjectSchema) => {
    const downloadParams = {
      Bucket: bucketName,
      Key: `${s3Object.userId}/idCard`
    }
    const result = await s3Client.getObject(downloadParams).promise()
    const data = await s3Repository.downloadIdCard(s3Object)
    return data
  }
}
