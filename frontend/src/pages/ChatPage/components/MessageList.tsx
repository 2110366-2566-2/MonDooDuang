import Message from "./Message"
import { MessageType } from "./ChatBox"

interface MessageListProps {
  messages: MessageType[]
}

export default function MessageList({ messages }: MessageListProps) {
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
    </div>
  )
}
