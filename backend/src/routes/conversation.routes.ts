import express from "express"
import { conversationController } from "../controllers/conversation/conversation.controller"

const router = express.Router()

router.get("/:userId", conversationController.getConversationsByUserId)
router.get(
  "/name-with-lastMessage/:conversationId/:userId",
  conversationController.getNameWithLastMessage
)
router.get("/messages/:conversationId/:userId", conversationController.getMessagesByConversationId)
router.get("/name/:conversationId/:userId", conversationController.getNameByConversationId)
export default router
