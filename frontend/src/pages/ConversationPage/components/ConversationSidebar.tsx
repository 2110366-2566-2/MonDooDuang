import ConversationList from "./ConversationList"

export default function ConversationSidebar({
  conversationIds,
  onConversationSelect,
  selectedConversationId,
  userId
}: {
  conversationIds: string[]
  onConversationSelect: (conversationId: string) => void
  selectedConversationId: string | null
  userId: string
}) {
  return (
    <div className="overflow-y-auto h-screen flex flex-col items-center justify-start">
      <div className="relative">
        <input
          type="text"
          placeholder={"ค้นหาข้อความและห้องแชท"}
          className="h-[32px] w-[307px] mt-[10px] p-2 rounded-3xl bg-gray-300 text-white placeholder-white"
        />
      </div>
      {conversationIds.map((conversationId) => (
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
