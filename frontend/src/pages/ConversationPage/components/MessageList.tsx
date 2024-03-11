import Message from "./Message"
import { useEffect, useRef } from "react"
import { MessageInformation } from "../types/MessageInformation"

export default function MessageList({ messages }: { messages: MessageInformation[] }) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollToBottom() // Scroll to bottom when component first renders
  }, [messages])

  return (
    <div className="flex flex-col overflow-scroll h-screen">
      {messages.map((message, index) => (
        <Message
          key={index}
          message={message.message}
          sender={message.sender}
          timeSent={message.timeSent}
          isRead={message.isRead}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
