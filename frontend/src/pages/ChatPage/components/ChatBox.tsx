import { useState, useEffect } from "react"
import io from "socket.io-client"
import MessageList from "./MessageList"
import ChatFooter from "./ChatFooter"
import { ChatService } from "../services/ChatService"

const socket = io("http://localhost:5002")
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
  const [room, setRoom] = useState<string>("")

  useEffect(() => {
    const fetchMessages = async () => {
      if (conversationId) {
        console.log(conversationId)
        const response = await ChatService.getMessagesByConversationId(conversationId, mockUserId)
        const messages = await response.json()
        console.log(messages)
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

  const sendMessage = () => {
    socket.emit(
      "sendMessage",
      {
        message: messageText,
        sender: "OTHER",
        isRead: false,
        timeSent: Date.now()
      },
      room
    )
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: messageText, sender: "SELF", isRead: true, timeSent: Date.now() }
    ])
    setMessageText("")
  }

  const joinRoom = () => {
    socket.emit("joinRoom", room)
  }

  return (
    <>
      <h1>Real-Time Chat App</h1>
      <MessageList messages={messages} />
      <ChatFooter
        messageText={messageText}
        setMessageText={setMessageText}
        sendMessage={sendMessage}
        room={room}
        setRoom={setRoom}
        joinRoom={joinRoom}
      />
    </>
  )
}
