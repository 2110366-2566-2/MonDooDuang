import { senderType } from "../types/MessageInformation"

export default function Message({
  message,
  sender,
  timeSent
}: {
  message: string
  sender: senderType
  timeSent: number
}) {
  return sender === "SYSTEM" ? (
    <>
      <div className="flex justify-center m-1">
        <div className="rounded-2xl p-4 bg-gray-300 bg-opacity-70 text-white h-[2px] text-xs flex justify-center items-center">
          {message}
        </div>
      </div>
    </>
  ) : (
    <div
      className={`flex ${
        sender === "SELF" ? "flex-row" : "flex-row-reverse"
      } justify-end items-end m-1`}
    >
      <span className="mx-2 text-xs text-white">
        {new Date(timeSent).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit"
        })}
      </span>
      <div
        className={`rounded-lg p-4 ${
          sender === "SELF"
            ? " bg-white bg-opacity-84 text-black"
            : " bg-gray-300 bg-opacity-40 text-white"
        } word-wrap break-words max-w-[939px]`}
      >
        {message}
      </div>
    </div>
  )
}
