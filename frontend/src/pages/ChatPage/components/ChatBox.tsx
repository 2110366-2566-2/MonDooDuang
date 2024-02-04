import { useState, useEffect } from "react"
import io from "socket.io-client"
import MessageList from "./MessageList"
import ChatFooter from "./ChatFooter"
import { ChatService } from "../services/ChatService"
import { serviceConfig } from "../../../common/services/serviceConfig"
import ChatHeader from "./ChatHeader"

const socket = io(serviceConfig.backendBaseUrl)
const mockUserId = "2da1baf4-4291-493b-b8d4-8a6c7d65d6b1"

export interface MessageType {
  message: string
  sender: "SELF" | "OTHER"
  isRead: boolean
  timeSent: number
}

export default function ChatBox({ conversationId }: { conversationId: string }) {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [messageText, setMessageText] = useState<string>("")
  const room = conversationId

  useEffect(() => {
    const fetchMessages = async () => {
      if (conversationId) {
        const response = await ChatService.getMessagesByConversationId(conversationId, mockUserId)
        const messages = await response.json()
        setMessages(messages)
      }
    }
    fetchMessages()
  }, [conversationId])

  useEffect(() => {
    socket.on("receiveMessage", (message: MessageType) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })
    return () => {
      socket.off("receiveMessage")
    }
  }, [])

  useEffect(() => {
    socket.emit("joinRoom", room)
  }, [room])

  const sendMessage = () => {
    socket.emit(
      "sendMessage",
      {
        message: messageText,
        sender: "OTHER",
        isRead: false,
        timeSent: Date.now()
      },
      room,
      mockUserId
    )
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: messageText, sender: "SELF", isRead: true, timeSent: Date.now() }
    ])
    setMessageText("")
  }

  return (
    <div className="relative flex flex-col h-screen">
      <ChatHeader name={"พอตเตอร์"} />
      <MessageList messages={messages} />
      <div className="mt-auto">
        <ChatFooter
          messageText={messageText}
          setMessageText={setMessageText}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  )
}
