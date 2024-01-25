import { RouteProps } from "react-router-dom"
import LoginApp from "../pages/LoginPage/LoginApp"
import RegisterApp from "../pages/RegisterPage/RegisterApp"
import FortuneTellerRegisterApp from "../pages/FortuneTellerRegisterPage/FortuneTellerRegisterApp"
import AccountApp from "../pages/AccountPage/AccountApp"
import FortuneTellerAccountApp from "../pages/FortuneTellerAccountPage/FortuneTellerAccountApp"
import FortuneTellerPackageApp from "../pages/FortuneTellerPackagePage/FortuneTellerPackageApp"
import SearchApp from "../pages/SearchPage/SearchApp"
import ChatApp from "../pages/ChatPage/ChatApp"
import AppointmentApp from "../pages/AppointmentPage/AppointmentApp"
import AdminApprovalApp from "../pages/AdminApprovalPage/AdminApprovalApp"
import FortuneTellerDetailApp from "../pages/FortuneTellerDetailPage/FortuneTellerDetailApp"

const pagesData = [
  {
    path: "/login",
    element: <LoginApp />
  },
  {
    path: "/register",
    element: <RegisterApp />
  },
  {
    path: "/register/fortuneteller",
    element: <FortuneTellerRegisterApp />
  },
  {
    path: "/account",
    element: <AccountApp />
  },
  {
    path: "/account/fortuneteller",
    element: <FortuneTellerAccountApp />
  },
  {
    path: "/account/fortuneteller/package",
    element: <FortuneTellerPackageApp />
  },
  {
    path: "/account/fortuneteller/package/:packageid",
    element: <FortuneTellerPackageApp />
  },
  {
    path: "/search",
    element: <SearchApp />
  },
  {
    path: "/fortuneteller/:fortunetellerid",
    element: <FortuneTellerDetailApp />
  },
  {
    path: "/chat",
    element: <ChatApp />
  },
  {
    path: "/appointment",
    element: <AppointmentApp />
  },
  {
    path: "/admin/fortuneteller_approvals",
    element: <AdminApprovalApp />
  }
] as unknown as RouteProps[]

export default pagesData
