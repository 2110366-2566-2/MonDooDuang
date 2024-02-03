import express from "express"
import { chatController } from "../controllers/chat/chat.controller"

const router = express.Router()

router.get("/:userId", chatController.getConversationsByUserId)
router.get("/lastMessage/:conversationId/:userId", chatController.getNameWithLastMessage)
export default router
