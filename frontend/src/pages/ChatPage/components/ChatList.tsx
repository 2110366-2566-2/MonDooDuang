import { useState, useEffect } from "react"
import styled from "styled-components"
import { ChatService } from "../services/ChatService"

interface ChatListProps {
  conversationId: string
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 79px;
  width: 339px;
  background-color: rgba(217, 217, 217, 0.51);
  border-radius: 10px;
  margin-top: 10px;
`

const Picture = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: #000;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const mockUserId = "2da1baf4-4291-493b-b8d4-8a6c7d65d6b1"

export default function ChatList({ conversationId }: ChatListProps) {
  const [name, setName] = useState<string>("")
  const [lastMessage, setLastMessage] = useState<string>("")
  useEffect(() => {
    const fetchNameWithLastMessage = async () => {
      if (conversationId && mockUserId) {
        const response = await ChatService.getNameWithLastMessage(conversationId, mockUserId)
        const { name, lastMessage } = await response.json()
        setName(name)
        setLastMessage(lastMessage)
      }
    }
    fetchNameWithLastMessage()
  }, [])
  return (
    <Container>
      <Picture />
      <ContentContainer>
        <p>{name}</p>
        <p>{lastMessage}</p>
      </ContentContainer>
    </Container>
  )
}
