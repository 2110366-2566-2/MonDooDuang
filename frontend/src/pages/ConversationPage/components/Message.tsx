import React from "react"

export interface MessageProps {
  message: string
  sender: "SELF" | "OTHER" | "SYSTEM"
  isRead: boolean
  timeSent: number
}

const Message: React.FC<MessageProps> = ({ message, sender, isRead, timeSent }) => {
  return sender === "SELF" ? (
    <div className="flex justify-end">
      <div className="flex items-end m-1">
        <span className="mx-2 text-xs text-white">
          {new Date(timeSent).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit"
          })}
        </span>
        <div className="rounded-lg p-4 bg-white bg-opacity-84 text-black word-wrap break-words max-w-[939px]">
          {message}
        </div>
      </div>
    </div>
  ) : sender == "OTHER" ? (
    <div className="flex justify-start">
      <div className="flex items-end m-1">
        <div className="rounded-lg p-4 bg-gray-300 bg-opacity-40 text-white word-wrap break-words max-w-[939px]">
          {message}
        </div>
        <span className="mx-2 text-xs text-white">
          {new Date(timeSent).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit"
          })}
        </span>
      </div>
    </div>
  ) : (
    <div>
      <div className="flex justify-center m-1">
        <div className="rounded-2xl p-4 bg-gray-300 bg-opacity-70 text-white h-[2px] text-xs flex justify-center items-center">
          {message}
        </div>
      </div>
    </div>
  )
}

export default Message
