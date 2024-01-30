import { useState, useEffect } from "react"
import io from "socket.io-client"
import Message from "./Message"

const socket = io("http://localhost:5002")

interface Message {
  username: string
  text: string
  sender: "SELF" | "OTHER"
  isRead: boolean
  timeSent: number
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([])
  const [messageText, setMessageText] = useState<string>("")

  useEffect(() => {
    socket.on("receiveMessage", (message: Message) => {
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
    <div className="App">
      <h1>Real-Time Chat App</h1>
      <div className="messages">
        {messages.map((message, index) => (
          <Message
            key={index}
            username={message.username}
            text={message.text}
            sender={message.sender}
            isRead={message.isRead}
            timeSent={message.timeSent}
          />
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}
