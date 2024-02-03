interface ChatFooterProps {
  messageText: string
  setMessageText: (message: string) => void
  sendMessage: () => void
  room: string
  setRoom: (room: string) => void
  joinRoom: () => void
}

export default function ChatFooter({
  messageText,
  setMessageText,
  sendMessage,
  room,
  setRoom,
  joinRoom
}: ChatFooterProps) {
  return (
    <>
      <div className="input-box">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Enter room name..."
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
    </>
  )
}
