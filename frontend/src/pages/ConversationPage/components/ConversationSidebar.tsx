import { useState, useEffect } from "react"
import ConversationList from "./ConversationList"
import { ConversationService } from "../services/ConversationService"

export default function ConversationSidebar({
  onConversationSelect,
  selectedConversationId,
  userId
}: {
  onConversationSelect: (conversationId: string) => void
  selectedConversationId: string | null
  userId: string
}) {
  const [customerConversationIds, setCustomerConversationIds] = useState<string[]>([])
  const [fortuneTellerConversationIds, setFortuneTellerConversationIds] = useState<string[]>([])
  const [filteredConversations, setFilteredConversations] = useState<string[]>([])
  const [selectedMode, setSelectedMode] = useState<"customer" | "fortuneTeller">("customer")
  const handleModeSelect = (mode: "customer" | "fortuneTeller") => {
    setSelectedMode(mode)
  }
  useEffect(() => {
    const fetchConversations = async () => {
      const customerConversationIds = await ConversationService.getCustomerConversationsByUserId(
        userId
      )
      setCustomerConversationIds(customerConversationIds)
      const fortuneTellerConversationIds =
        await ConversationService.getFortuneTellerConversationsByUserId(userId)
      setFortuneTellerConversationIds(fortuneTellerConversationIds)
      setFilteredConversations(customerConversationIds)
    }
    fetchConversations()
  }, [])

  useEffect(() => {
    if (selectedMode === "customer") {
      setFilteredConversations(customerConversationIds)
    } else {
      setFilteredConversations(fortuneTellerConversationIds)
    }
  }, [selectedMode])

  return (
    <div className="overflow-y-auto h-screen flex flex-col items-center justify-start">
      <div className="flex">
        <div
          className={`cursor-pointer p-2 border-b-2 w-[130px] flex justify-center ${
            selectedMode === "customer"
              ? "text-yellow-200 border-yellow-200 font-bold border-b-4"
              : "text-white border-white"
          }`}
          onClick={() => handleModeSelect("customer")}
        >
          ลูกค้า
        </div>
        <div
          className={`cursor-pointer p-2 border-b-2 w-[130px] flex justify-center ${
            selectedMode === "fortuneTeller"
              ? "text-yellow-200 border-yellow-300 font-bold border-b-4"
              : "text-white border-white"
          }`}
          onClick={() => handleModeSelect("fortuneTeller")}
        >
          หมอดู
        </div>
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder={"ค้นหาข้อความและห้องแชท"}
          className="h-[32px] w-[307px] mt-[10px] p-2 rounded-3xl bg-gray-300 text-white placeholder-white"
        />
      </div>
      {filteredConversations.map((conversationId) => (
        <ConversationList
          conversationId={conversationId}
          key={conversationId}
          isSelected={conversationId === selectedConversationId}
          onSelect={() => onConversationSelect(conversationId)}
          userId={userId}
        />
      ))}
    </div>
  )
}
