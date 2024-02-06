import Message from "./Message"
import { MessageType } from "./ChatBox"
import { useEffect, useRef } from "react"

interface MessageListProps {
  messages: MessageType[]
}

export default function MessageList({ messages }: MessageListProps) {
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
    <div className="overflow-y-auto h-screen flex flex-col">
      {messages.map((message, index) => (
        <Message
          key={index}
          message={message.message}
          sender={message.sender}
          isRead={message.isRead}
          timeSent={message.timeSent}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
