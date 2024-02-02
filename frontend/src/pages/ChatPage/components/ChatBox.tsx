import { useState, useEffect } from "react"
import io from "socket.io-client"
import MessageList from "./MessageList"
import ChatFooter from "./ChatFooter"

const socket = io("http://localhost:5002")

export interface MessageType {
  username: string
  text: string
  sender: "SELF" | "OTHER"
  isRead: boolean
  timeSent: number
}

export default function ChatBox() {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [messageText, setMessageText] = useState<string>("")

  useEffect(() => {
    socket.on("receiveMessage", (message: MessageType) => {
      console.log("CHECK", message)
      setMessages((prevMessages) => [...prevMessages, message])
    })
    return () => {
      socket.off("receiveMessage")
    }
  }, [])

  const sendMessage = () => {
    socket.emit("sendMessage", {
      username: "Not You",
      text: messageText,
      sender: "OTHER",
      isRead: false,
      timeSent: Date.now()
    })
    setMessages((prevMessages) => [
      ...prevMessages,
      { username: "You", text: messageText, sender: "SELF", isRead: true, timeSent: Date.now() }
    ])
    setMessageText("")
  }

  return (
    <>
      <h1>Real-Time Chat App</h1>
      <MessageList messages={messages} />
      <ChatFooter
        messageText={messageText}
        setMessageText={setMessageText}
        sendMessage={sendMessage}
      />
    </>
  )
}
