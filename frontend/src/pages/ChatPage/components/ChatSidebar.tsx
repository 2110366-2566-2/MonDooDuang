import styled from "styled-components"
import ChatList from "./ChatList"
interface ChatSidebarProps {
  conversationIds: string[]
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  margin: 100px;
`

export default function ChatSidebar({ conversationIds }: ChatSidebarProps) {
  return (
    <Container>
      {conversationIds.map((conversationId) => (
        <ChatList conversationId={conversationId} key={conversationId} />
      ))}
    </Container>
  )
}
