import React from "react"

export interface MessageProps {
  message: string
  sender: "SELF" | "OTHER"
  isRead: boolean
  timeSent: number
}

const Message: React.FC<MessageProps> = ({ message, sender, isRead, timeSent }) => {
  const isSelf = sender === "SELF"
  return (
    <div className={`flex justify-${isSelf ? "end " : "start "} items-center m-1`}>
      <div
        className={`rounded-lg p-4 ${
          isSelf ? "bg-white bg-opacity-84 text-black" : "bg-gray-300 bg-opacity-40 text-white"
        } word-wrap break-words max-w-[939px]`}
      >
        {message}
      </div>
    </div>
  )
}

export default Message
