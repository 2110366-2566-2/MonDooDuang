/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express"
import { chatController } from "../controllers/chat/chat.controller"

const router = express.Router()

router.get("/:userId", chatController.getConversationsByUserId)

export default router
