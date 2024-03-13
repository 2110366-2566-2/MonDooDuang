import { useContext } from "react"
import { AuthContext } from "../../common/providers/AuthProvider"
import NavBarAdmin from "../../common/components/NavBar/NavBarAdmin"

export default function AdminReportManagementPage() {
  const { username } = useContext(AuthContext)
  return (
    <>
      <NavBarAdmin menuFocus={"reportManagement"} username={username} />
      <div>Report Management Page</div>
    </>
  )
}
