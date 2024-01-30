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

const mockData = [
  { pictureProfile: "APic", username: "A", message: "Hello" },
  { pictureProfile: "BPic", username: "B", message: "Hi" }
]

export default function ChatSidebar({ conversationIds }: ChatSidebarProps) {
  // Receive all conversationId
  // Get username + lastest msg
  // Show
  return (
    <Container>
      {mockData.map((data) => (
        <ChatList
          profilePicture={data.pictureProfile}
          username={data.username}
          message={data.message}
        />
      ))}
    </Container>
  )
}
