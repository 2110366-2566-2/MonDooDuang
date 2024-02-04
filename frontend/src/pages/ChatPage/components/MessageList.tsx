import Message from "./Message"
import { MessageType } from "./ChatBox"

interface MessageListProps {
  messages: MessageType[]
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex flex-col">
      {messages.map((message, index) => (
        <Message
          key={index}
          message={message.message}
          sender="SELF"
          isRead={message.isRead}
          timeSent={message.timeSent}
        />
      ))}
    </div>
  )
}
