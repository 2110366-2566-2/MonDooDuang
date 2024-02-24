import { Request, Response } from "express"
import { conversationService } from "../../services/conversation/conversation.services"

const getConversationsByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const conversations = await conversationService.getConversationsByUserId(userId)
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

export const conversationController = {
  getConversationsByUserId,
  getNameWithLastMessage,
  getMessagesByConversationId,
  getNameByConversationId,
  createConversation
}
