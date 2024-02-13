import { useState, useEffect } from "react"
import { ConversationService } from "../services/ConversationService"

const mockUserId = "2da1baf4-4291-493b-b8d4-8a6c7d65d6b1"

export default function ConversationList({
  conversationId,
  onSelect,
  isSelected
}: {
  conversationId: string
  onSelect: () => void
  isSelected: boolean
}) {
  const [name, setName] = useState<string>("")
  const [lastMessage, setLastMessage] = useState<string>("")
  useEffect(() => {
    const fetchNameWithLastMessage = async () => {
      if (conversationId && mockUserId) {
        const { name, lastMessage } = await ConversationService.getNameWithLastMessage(
          conversationId,
          mockUserId
        )
        setName(name)
        setLastMessage(lastMessage)
      }
    }
    fetchNameWithLastMessage()
  }, [conversationId, isSelected])

  const truncatedLastMessage =
    lastMessage.length > 22 ? lastMessage.substring(0, 22) + "..." : lastMessage

  return (
    <div
      className={`flex flex-row items-center h-[79px] w-[339px] rounded-md mt-[10px] cursor-pointer ${
        isSelected ? "bg-white bg-opacity-85" : "bg-gray-300 bg-opacity-51"
      }`}
      onClick={onSelect}
    >
      <img
        src="https://media.licdn.com/dms/image/D5603AQHoVH_MPSIu3g/profile-displayphoto-shrink_800_800/0/1685943781433?e=2147483647&v=beta&t=D4ngFEsJ3_eqPW66rEZbf6-otKqeAA0h0hlOymqG3zs"
        alt="Profile Picture"
        className="h-[60px] w-[60px] rounded-full bg-black mx-2"
      />
      <div className={`flex flex-col ml-4 ${isSelected ? "text-black" : "text-white"}`}>
        <p className="text-xl font-semibold">{name}</p>
        <p className="text-sm">{truncatedLastMessage}</p>
      </div>
    </div>
  )
}