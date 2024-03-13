import { S3ObjectSchema } from "../../models/infra/s3.model"
import S3 from "aws-sdk/clients/s3"
import { environment } from "../../configs/environment"

const bucketName = environment.s3.bucketName
const region = environment.s3.region
const accessKeyId = environment.s3.accessKeyId
const secretAccessKey = environment.s3.secretAccessKey

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
    try {
      await s3Client.upload(uploadParams).promise()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
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
    try {
      await s3Client.deleteObject(deleteParams).promise()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  },

  uploadIdCard: async (s3Object: S3ObjectSchema) => {
    const uploadParams = {
      Bucket: bucketName,
      Body: s3Object.image,
      Key: `${s3Object.userId}/idCard.jpg`
    }
    try {
      await s3Client.upload(uploadParams).promise()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
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
