import NavBarAdmin from "../../common/components/NavBar/NavBarAdmin"
import RootLayout from "../../common/components/RootLayout/RootLayout"
import AdminApprovalPage from "./AdminApprovalPage"

export default function AdminApprovalApp() {
  return (
    //Add providers as needed
    <RootLayout>
        <NavBarAdmin menuFocus={"adminApproval"}/>
        <AdminApprovalPage />
    </RootLayout>
  )
}
