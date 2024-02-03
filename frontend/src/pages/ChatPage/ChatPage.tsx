import ChatSidebar from "./components/ChatSidebar"
import ChatBox from "./components/ChatBox"
import styled from "styled-components"
import { ChatService } from "./services/ChatService"
import { useEffect, useState } from "react"
const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: row;
`

const mockUserId = "2da1baf4-4291-493b-b8d4-8a6c7d65d6b1"

export default function ChatPage() {
  const [conversationIds, setConversationIds] = useState<string[]>([""])
  useEffect(() => {
    const fetchConversations = async () => {
      const response = await ChatService.getConversationsByUserId(mockUserId)
      const conversationIds = await response.json()
      setConversationIds(conversationIds)
    }
    fetchConversations()
  }, [])

  // TODO
  // Receive all conversation related to this userId
  // Get lastest msg + Username of other person and show in sidebar
  // When click on sidebar -> Get all msg  + Joinroom
  return (
    <Container>
      <ChatSidebar conversationIds={conversationIds} />
      <ChatBox />
    </Container>
  )
}
