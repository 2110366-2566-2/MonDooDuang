import { useContext } from "react"
import { AuthContext } from "../../common/providers/AuthProvider"
import { useNavigate } from "react-router-dom"

export default function FortuneTellerAccountPage() {
  const { userId, userType, username } = useContext(AuthContext)

  const navigate = useNavigate()
  if (userType !== "FORTUNE_TELLER") {
    navigate("/search")
    return
  }

  return (
    <div>
      <h1>Fortune Teller Account Page</h1>
    </div>
  )
}
