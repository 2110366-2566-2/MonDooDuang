import ChatSidebar from "./components/ChatSidebar"
import ChatBox from "./components/ChatBox"
import styled from "styled-components"
import { ChatService } from "./services/chatService"
import { useEffect, useState } from "react"
const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: row;
`

export default function ChatPage() {
  const [conver, setConver] = useState<string[]>([""])
  useEffect(() => {
    const fetchConversation = async () => {
      const response = await ChatService.getConversationsByUserId(
        "2da1baf4-4291-493b-b8d4-8a6c7d65d6b1"
      )
      const data = await response.json()
      setConver(data)
    }
    fetchConversation()
  }, [])

  // TODO
  // Receive all conversation related to this userId
  // Get lastest msg + Username of other person and show in sidebar
  // When click on sidebar -> Get all msg  + Joinroom
  return (
    <Container>
      <ChatSidebar conversationIds={["1", "2", "3"]} />
      <ChatBox />
      {conver.map((data) => {
        return <div>{data}</div>
      })}
    </Container>
  )
}
