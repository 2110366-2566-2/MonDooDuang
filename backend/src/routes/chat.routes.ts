import express from "express"
import { chatController } from "../controllers/chat/chat.controller"

const router = express.Router()

router.get("/:userId", chatController.getConversationsByUserId)
router.get("/lastMessage/:conversationId/:userId", chatController.getNameWithLastMessage)
router.get("/messages/:conversationId/:userId", chatController.getMessagesByConversationId)
export default router
