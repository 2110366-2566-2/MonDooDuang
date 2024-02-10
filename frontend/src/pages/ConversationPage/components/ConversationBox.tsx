import { useState, useEffect } from "react"
import io from "socket.io-client"
import MessageList from "./MessageList"
import ConversationFooter from "./ConversationFooter"
import { ConversationService } from "../services/ConversationService"
import { serviceConfig } from "../../../common/services/serviceConfig"
import ConversationHeader from "./ConversationHeader"

const socket = io(serviceConfig.backendBaseUrl)
const mockUserId = "2da1baf4-4291-493b-b8d4-8a6c7d65d6b1"

export interface MessageType {
  message: string
  sender: "SELF" | "OTHER" | "SYSTEM"
  isRead: boolean
  timeSent: number
}

export default function ConversationBox({
  conversationId,
  showReport
}: {
  conversationId: string
  showReport: () => void
}) {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [messageText, setMessageText] = useState<string>("")
  const [name, setName] = useState<string>("")
  const room = conversationId

  useEffect(() => {
    const fetchMessages = async () => {
      if (conversationId) {
        const response = await ConversationService.getMessagesByConversationId(
          conversationId,
          mockUserId
        )
        const messages = await response.json()
        setMessages(messages)
      }
    }
    const fetchName = async () => {
      if (conversationId) {
        const response = await ConversationService.getNameByConversationId(
          conversationId,
          mockUserId
        )
        const data = await response.json()
        setName(data.name)
      }
    }
    fetchName()
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
    if (!messageText.trim()) {
      return
    }
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
      <ConversationHeader name={name} showReport={showReport} />
      <MessageList messages={messages} />
      <div className="mt-auto">
        <ConversationFooter
          messageText={messageText}
          setMessageText={setMessageText}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  )
}
