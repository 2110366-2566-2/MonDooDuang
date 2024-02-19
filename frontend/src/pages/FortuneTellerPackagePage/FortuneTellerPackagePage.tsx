import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../common/providers/AuthProvider"

export default function FortuneTellerPackagePage() {
  const { userId, userType, username } = useContext(AuthContext)

  const navigate = useNavigate()
  if (userType !== "FORTUNE_TELLER") {
    navigate("/search")
    return
  }
  return (
    <div>
      <h1>Fortune Teller Package Page</h1>
    </div>
  )
}
