import Message from "./Message"
import { MessageType } from "./ChatBox"

interface MessageListProps {
  messages: MessageType[]
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <>
      <h1>Real-Time Chat App</h1>
      <div className="messages">
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
    </>
  )
}
