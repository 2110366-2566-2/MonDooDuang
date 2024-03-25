import { Socket } from "socket.io"
import { conversationRepository } from "../../repositories/conversation.repository"
import { notificationRepository } from "../../repositories/notification.repository"

export interface MessageType {
  message: string
  sender: "SELF" | "OTHER" | "SYSTEM"
  isRead: boolean
  timeSent: number
}

export const conversationService = {
  getConversationsByUserId: async (userId: string, role: "CUSTOMER" | "FORTUNE_TELLER") => {
    const data = await conversationRepository.getConversationsByUserId(userId, role)
    if (data === null) {
      return []
    }

    return data.map((conversation) => conversation.conversation_id)
  },
  getNameWithLastMessage: async (conversationId: string, userId: string) => {
    const data = await conversationRepository.getNameWithLastMessage(conversationId, userId)
    if (data === null) {
      return {
        name: "",
        lastMessage: ""
      }
    }
    data.lastMessage = data.lastMessage === null ? "" : data.lastMessage
    return data
  },
  getMessagesByConversationId: async (conversationId: string, userId: string) => {
    const messages = await conversationRepository.getMessagesByConversationId(
      conversationId,
      userId
    )
    if (messages === null) return []

    const formattedMessages: MessageType[] = []
    let prevTimeSent: number = 0

    messages.forEach((message) => {
      const messageDate = message.created_at
      messageDate.setUTCHours(messageDate.getUTCHours() + 7)
      const currentTimeSent: number = messageDate.getTime()

      const formattedDate: string = new Date(currentTimeSent).toLocaleDateString("th-TH", {
        day: "numeric",
        month: "long"
      })
      if (prevTimeSent === 0 || !conversationService.isSameDay(prevTimeSent, currentTimeSent)) {
        formattedMessages.push({
          message: formattedDate,
          timeSent: currentTimeSent,
          sender: "SYSTEM",
          isRead: true
        })
      }

      formattedMessages.push({
        message: message.message_text,
        timeSent: currentTimeSent,
        sender: message.sender,
        isRead: message.is_read
      })

      prevTimeSent = currentTimeSent
    })
    await conversationService.readMessage(conversationId, userId)

    return formattedMessages
  },
  getNameByConversationId: async (conversationId: string, userId: string) => {
    const data = await conversationRepository.getNameByConversationId(conversationId, userId)
    if (data === null) {
      return {
        name: ""
      }
    }
    return { name: data[0].result }
  },
  createConversation: async (fortunetellerId: string, customerId: string) => {
    const result = await conversationRepository.createConversation(fortunetellerId, customerId)
    return result
  },
  // Socket service
  sendMessage: async (socket: Socket) => {
    socket.on("sendMessage", async (message: MessageType, room: string, senderId: string) => {
      socket.to(room).emit("receiveMessage", message)
      const isSuccess = await conversationRepository.addMessage(room, senderId, message.message)
      if (!isSuccess) {
        console.error("Error sending message")
      }
      // if only 1 unread message -> add to notification + chat notification
      const { otherId }: { otherId: string } = await conversationRepository.getOtherId(
        room,
        senderId
      )
      const unreadMessages = await conversationService.getUnreadMessagesByConversationId(
        room,
        otherId
      )
      if (unreadMessages.count === "1") {
        const result = await notificationRepository.createNotification(otherId, "CHAT")
        if (!result.isSuccess) return
        await notificationRepository.createChatNotification(result.notificationId, room)
      }
    })
  },
  joinRoom: (socket: Socket) => {
    socket.on("joinRoom", async (room: string) => {
      await socket.join(room)
    })
  },
  disconnect: (socket: Socket) => {
    socket.on("disconnect", () => {
      console.log("User disconnected")
    })
  },
  isSameDay: (timestamp1: number, timestamp2: number) => {
    const date1 = new Date(timestamp1) // Convert seconds to milliseconds
    const date2 = new Date(timestamp2) // Convert seconds to milliseconds
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  },
  readMessage: async (conversationId: string, userId: string) => {
    const isSuccess = await conversationRepository.readMessage(conversationId, userId)
    if (!isSuccess) {
      console.error("Error sending message")
    }
  },
  getUnreadMessagesByConversationId: async (conversationId: string, userId: string) => {
    const data = await conversationRepository.getUnreadMessagesByConversationId(
      conversationId,
      userId
    )
    if (data === null) {
      return { count: 0 }
    }
    return { count: data }
  },
  getRecieverUserIdByConversationId: async (
    conversationId: string,
    userId: string,
    role: "CUSTOMER" | "FORTUNE_TELLER"
  ) => {
    const data = await conversationRepository.getReceiverUserIdByConversationId(
      conversationId,
      userId,
      role
    )
    if (data === null) {
      return { recieverUserId: "" }
    }
    return { recieverUserId: data }
  },
  getUserTypeInConversation: async (conversationId: string, userId: string) => {
    const userType = await conversationRepository.getUserTypeInConversation(conversationId, userId)
    return userType
  }
}
