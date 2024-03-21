import { useContext } from "react"
import { AuthContext } from "../../common/providers/AuthProvider"

export default function TimetablePage(): JSX.Element {
  const { userId, userType, username } = useContext(AuthContext)
  console.log(userId, userType, username)
  return (
    <div>
    </div>
  )
}