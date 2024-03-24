import express from "express"
import { conversationController } from "../controllers/conversation/conversation.controller"

const router = express.Router()

router.get("/:userId/:role", conversationController.getConversationsByUserId)
router.get(
  "/name-with-lastMessage/:conversationId/:userId",
  conversationController.getNameWithLastMessage
)
router.get(
  "/recieverUserId/:conversationId/:userId/:role",
  conversationController.getRecieverUserIdByConversationId
)
router.get("/messages/:conversationId/:userId", conversationController.getMessagesByConversationId)
router.get("/name/:conversationId/:userId", conversationController.getNameByConversationId)
router.get(
  "/unread-messages/:conversationId/:userId",
  conversationController.getUnreadMessagesByConversationId
)
router.post("/create/:userId/:fortunetellerId", conversationController.createConversation)
export default router
