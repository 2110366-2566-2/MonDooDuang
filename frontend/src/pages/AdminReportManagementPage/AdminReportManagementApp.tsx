import NavBarAdmin from "../../common/components/NavBar/NavBarAdmin"
import RootLayout from "../../common/components/RootLayout/RootLayout"
import AdminReportManagementPage from "./AdminReportManagementPage"

export default function AdminReportManagementApp() {
  return (
    <RootLayout>
         <NavBarAdmin menuFocus={"reportManagement"} />
        <AdminReportManagementPage/>
    </RootLayout>
  )
}