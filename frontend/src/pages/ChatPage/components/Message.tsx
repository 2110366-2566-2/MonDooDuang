import React from "react"
import styled from "styled-components"

export interface MessageProps {
  message: string
  sender: "SELF" | "OTHER"
  isRead: boolean
  timeSent: number
}

const Container = styled.div``

const Message: React.FC<MessageProps> = ({ message, sender, isRead, timeSent }) => {
  return (
    <Container>
      <p>{sender}</p>
      <p>{message}</p>
      <p>{isRead}</p>
      <p>{timeSent}</p>
    </Container>
  )
}

export default Message
