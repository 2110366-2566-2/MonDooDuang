import React from "react"
import styled from "styled-components"

interface MessageProps {
  username: string
  text: string
  sender: "SELF" | "OTHER"
  isRead: boolean
  timeSent: number
}

const Container = styled.div``

const Message: React.FC<MessageProps> = ({ username, text, sender, isRead, timeSent }) => {
  return (
    <Container>
      {/* <p>{username}</p> */}
      <p>{sender}</p>
      <p>{text}</p>
      <p>{isRead}</p>
      <p>{timeSent}</p>
    </Container>
  )
}

export default Message
