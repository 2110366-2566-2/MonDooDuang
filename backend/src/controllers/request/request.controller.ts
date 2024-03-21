import { Response, Request } from "express"
import { RequestSchema, RequestStatus } from "../../models/request/request.model"
import { requestService } from "../../services/request/request.services"
import { S3 } from "aws-sdk"
import { s3Service } from "../../services/infra/s3.services"

const updateRequestStatus = async (req: Request, res: Response) => {
  const { requestId, status }: { requestId: string, status: RequestStatus } = req.body
  const result = await requestService.updateRequestStatus(requestId, status)
  if (result.success) return res.status(200).json(result)
  res.status(400).json(result)
}

const getPendingRequest = async (req: Request, res: Response) => {
  const requests = await requestService.getPendingRequest()
  let adjust_req:RequestSchema[] = []
  requests.forEach(req => {
    const getProfilePic = async () => {
      const data = await s3Service.downloadProfilePicture(req.fortuneTellerId)
      return  data && data.ContentType !== undefined && data.ContentType !== null? "data:image/jpg;base64," + data.Body?.toString("base64") :null

    }
    const getIdCard = async () => {
      const data = await s3Service.downloadIdCard(req.fortuneTellerId)
      if (data && data.ContentType !== undefined && data.ContentType !== null) {
        req.approvalPic = "data:image/jpg;base64," + data.Body?.toString("base64")
      }
      
    }
    getProfilePic();
    const profilePic:string = getProfilePic();
    var new_req : RequestSchema = {requestId: req.requestId,
    fortuneTellerId: req.fortuneTellerId,
    stagename: req.stagename,
    identityCardNumber: req.identityCardNumber,
    fullName: req.fullName,
    phoneNumber: req.phoneNumber,
    approvalPic: req.approvalPic,
    profilePic: profilePic}
    adjust_req.push(new_req)
    // getIdCard();
  });
  res.status(200).json(adjust_req)
}

export const requestController = {
  updateRequestStatus,
  getPendingRequest
}
