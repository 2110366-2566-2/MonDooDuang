import ReportModal from "./components/ReportModal"
import ConversationSidebar from "./components/ConversationSidebar"
import ConversationBox from "./components/ConversationBox"
import NavBar from "../../common/components/NavBar/NavBar"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../common/providers/AuthProvider"
import { ConversationService } from "./services/ConversationService"
import { useParams } from "react-router-dom"
import { MessageInformation } from "./types/MessageInformation"
import { environment } from "../../common/constants/environment"
import { io } from "socket.io-client"

const socket = io(environment.backend.url)

export default function ConversationPage() {
  const { cid } = useParams<{ cid: string }>()
  const [isShowReport, setIsShowReport] = useState(false)
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(cid || null)
  const { userId, userType, username } = useContext(AuthContext)
  const [isSystemReport, setIsSystemReport] = useState(false)
  const [selectedUserType, setSelectedUserType] = useState<"CUSTOMER" | "FORTUNE_TELLER">(
    "CUSTOMER"
  )
  const [messages, setMessages] = useState<MessageInformation[]>([])
  const [messageText, setMessageText] = useState<string>("")
  const [name, setName] = useState<string>("")

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await ConversationService.getMessagesByConversationId(
        selectedConversationId,
        userId
      )
      setMessages(messages)
    }
    const fetchName = async () => {
      if (selectedConversationId) {
        const data = await ConversationService.getNameByConversationId(
          selectedConversationId,
          userId
        )
        setName(data.name)
      }
    }
    fetchName()
    fetchMessages()
  }, [selectedConversationId])

  useEffect(() => {
    socket.on("receiveMessage", (message: MessageInformation) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })
    return () => {
      socket.off("receiveMessage")
    }
  }, [])

  useEffect(() => {
    socket.emit("joinRoom", selectedConversationId)
  }, [selectedConversationId])

  const sendMessage = () => {
    if (!messageText.trim()) {
      return
    }
    if (!selectedConversationId) {
      return
    }
    socket.emit(
      "sendMessage",
      {
        message: messageText,
        sender: "OTHER",
        isRead: false,
        timeSent: Date.now()
      },
      selectedConversationId,
      userId
    )
    setMessages([
      ...messages,
      { message: messageText, sender: "SELF", isRead: true, timeSent: Date.now() }
    ])
    setMessageText("")
  }

  const handleConversationSelect = async (conversationId: string) => {
    setSelectedConversationId(conversationId)

    const userTypeInConversation = await ConversationService.getUserTypeInConversation(
      conversationId,
      userId
    )
    setSelectedUserType(userTypeInConversation)
  }

  const showReport = () => {
    setIsShowReport(true)
  }

  const systemReport = (selectReportMode: boolean) => {
    setIsSystemReport(selectReportMode)
  }

  return (
    <>
      <NavBar
        isFortuneTeller={userType === "FORTUNE_TELLER"}
        menuFocus={"conversation"}
        username={username}
        userId={userId}
      />
      <div className="flex h-screen">
        <div className="w-1/4">
          <ConversationSidebar
            onConversationSelect={handleConversationSelect}
            selectedConversationId={selectedConversationId}
            userId={userId}
            userType={userType}
            messages={messages}
          />
        </div>
        <div className="w-3/4 bg-black bg-opacity-40 border border-white">
          <ConversationBox
            conversationId={selectedConversationId}
            showReport={showReport}
            systemReport={systemReport}
            userType={selectedUserType}
            name={name}
            messages={messages}
            messageText={messageText}
            setMessageText={setMessageText}
            sendMessage={sendMessage}
          />
        </div>
        <ReportModal
          isShowReport={isShowReport}
          setIsShowReport={setIsShowReport}
          isCustomer={selectedUserType === "CUSTOMER"}
          userId={userId}
          conversationId={selectedConversationId}
          isSystemReport={isSystemReport}
        />
      </div>
    </>
  )
}
