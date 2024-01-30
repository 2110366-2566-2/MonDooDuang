import ChatSidebar from "./components/ChatSidebar"
import ChatBox from "./components/ChatBox"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: row;
`

export default function ChatPage() {
  // TODO
  // Receive all conversation related to this userId
  // Get lastest msg + Username of other person and show in sidebar
  // When click on sidebar -> Get all msg  + Joinroom
  return (
    <Container>
      <ChatSidebar conversationIds={["1", "2", "3"]} />
      <ChatBox />
    </Container>
  )
}
