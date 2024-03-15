import { Response, Request } from "express"
import { RequestStatus, UserType } from "../../models/request/request.model"
import { requestService } from "../../services/request/request.services"

const updateRequestStatus = async (req: Request, res: Response) => {
  const { requestId, status }: { requestId: string, status: RequestStatus } = req.body
  const result = await requestService.updateRequestStatus(requestId, status)
  if (result.success) return res.status(200).json(result)
  res.status(400).json(result)
}

const getPendingRequest = async (req: Request, res: Response) => {
  const requests = await requestService.getPendingRequest()
  res.status(200).json(requests)
}

const updateUserType = async (req: Request, res: Response) => {
  const { requestId, userType }: { requestId: string, userType: UserType } = req.body
  const result = await requestService.updateUserType(requestId, userType)
  if (result.success) return res.status(200).json(result)
  res.status(400).json(result)
}

export const requestController = {
  updateRequestStatus,
  getPendingRequest,
  updateUserType
}
