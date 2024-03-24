import { Request, Response } from "express"
import { conversationService } from "../../services/conversation/conversation.services"

const getConversationsByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const role: "CUSTOMER" | "FORTUNE_TELLER" = req.params.role as "CUSTOMER" | "FORTUNE_TELLER"
  const conversations = await conversationService.getConversationsByUserId(userId, role)
  res.status(200).send(conversations)
}

const getNameWithLastMessage = async (req: Request, res: Response) => {
  const conversationId = req.params.conversationId
  const userId = req.params.userId
  const data = await conversationService.getNameWithLastMessage(conversationId, userId)
  res.status(200).send(data)
}

const getMessagesByConversationId = async (req: Request, res: Response) => {
  const conversationId = req.params.conversationId
  const userId = req.params.userId
  const data = await conversationService.getMessagesByConversationId(conversationId, userId)
  res.status(200).send(data)
}

const getNameByConversationId = async (req: Request, res: Response) => {
  const conversationId = req.params.conversationId
  const userId = req.params.userId
  const data = await conversationService.getNameByConversationId(conversationId, userId)
  res.status(200).send(data)
}

const createConversation = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const fortunetellerId = req.params.fortunetellerId
  const { isSuccess, data } = await conversationService.createConversation(fortunetellerId, userId)
  if (isSuccess) {
    res.status(200).send({ data })
  } else {
    res.status(500).send("Error creating conversation")
  }
}

const getUnreadMessagesByConversationId = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const conversationId = req.params.conversationId
  const data = await conversationService.getUnreadMessagesByConversationId(conversationId, userId)
  res.status(200).send(data)
}

const getRecieverUserIdByConversationId = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const conversationId = req.params.conversationId
  const role: "CUSTOMER" | "FORTUNE_TELLER" = req.params.role as "CUSTOMER" | "FORTUNE_TELLER"
  const data = await conversationService.getRecieverUserIdByConversationId(
    conversationId,
    userId,
    role
  )
  res.status(200).send(data)
}

export const conversationController = {
  getConversationsByUserId,
  getNameWithLastMessage,
  getMessagesByConversationId,
  getNameByConversationId,
  createConversation,
  getUnreadMessagesByConversationId,
  getRecieverUserIdByConversationId
}
