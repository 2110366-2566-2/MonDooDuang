import styled from "styled-components"

interface ChatListProps {
  profilePicture: string
  username: string
  message: string
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

export default function ChatList({ profilePicture, username, message }: ChatListProps) {
  return (
    <Container>
      <Picture />
      <ContentContainer>
        <p>{username}</p>
        <p>{message}</p>
      </ContentContainer>
    </Container>
  )
}
