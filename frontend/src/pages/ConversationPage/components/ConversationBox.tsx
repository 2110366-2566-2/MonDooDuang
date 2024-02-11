import { useState, useEffect } from "react"
import io from "socket.io-client"
import MessageList from "./MessageList"
import ConversationFooter from "./ConversationFooter"
import { ConversationService } from "../services/ConversationService"
import { environment } from "../../../common/constants/environment"
import ConversationHeader from "./ConversationHeader"
import { MessageInformation } from "../types/MessageInformation"

const socket = io(environment.backend.url)
const mockUserId = "2da1baf4-4291-493b-b8d4-8a6c7d65d6b1"

export default function ConversationBox({
  conversationId,
  showReport
}: {
  conversationId: string | null
  showReport: () => void
}) {
  const [messages, setMessages] = useState<MessageInformation[]>([])
  const [messageText, setMessageText] = useState<string>("")
  const [name, setName] = useState<string>("")
  const room = conversationId

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await ConversationService.getMessagesByConversationId(
        conversationId,
        mockUserId
      )
      setMessages(messages)
    }
    const fetchName = async () => {
      if (conversationId) {
        const data = await ConversationService.getNameByConversationId(conversationId, mockUserId)
        setName(data.name)
      }
    }
    fetchName()
    fetchMessages()
  }, [conversationId])

  useEffect(() => {
    socket.on("receiveMessage", (message: MessageInformation) => {
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
    setMessages([
      ...messages,
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
