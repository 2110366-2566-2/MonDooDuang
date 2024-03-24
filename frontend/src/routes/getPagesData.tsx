import { RouteProps } from "react-router-dom"
import LoginApp from "../pages/LoginPage/LoginApp"
import RegisterApp from "../pages/RegisterPage/RegisterApp"
import FortuneTellerRegisterApp from "../pages/FortuneTellerRegisterPage/FortuneTellerRegisterApp"
import AccountApp from "../pages/AccountPage/AccountApp"
import FortuneTellerAccountApp from "../pages/FortuneTellerAccountPage/FortuneTellerAccountApp"
import FortuneTellerPackageApp from "../pages/FortuneTellerPackagePage/FortuneTellerPackageApp"
import SearchApp from "../pages/SearchPage/SearchApp"
import ConversationApp from "../pages/ConversationPage/ConversationApp"
import AppointmentApp from "../pages/AppointmentPage/AppointmentApp"
import AdminApprovalApp from "../pages/AdminApprovalPage/AdminApprovalApp"
import FortuneTellerDetailApp from "../pages/FortuneTellerDetailPage/FortuneTellerDetailApp"
import PaymentApp from "../pages/PaymentPage/PaymentApp"
import PaymentCompletedApp from "../pages/PaymentCompletedPage/PaymentCompletedApp"
import AdminLoginApp from "../pages/AdminLoginPage/AdminLoginApp"
import ExampleApp from "../pages/ExamplePage/ExampleApp"
import AdminReportManagementApp from "../pages/AdminReportManagementPage/AdminReportManagementApp"
import AdminPaymentApp from "../pages/AdminPaymentPage/AdminPaymentApp"

export const getPagesData = (stripePromise: any) =>
  [
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
      path: "/fortuneteller/:fid",
      element: <FortuneTellerDetailApp />
    },
    {
      path: "/conversation/:cid?",
      element: <ConversationApp />
    },
    {
      path: "/conversation",
      element: <ConversationApp />
    },
    {
      path: "/appointment/:fid/:pid",
      element: <AppointmentApp />
    },
    {
      path: "/admin/fortuneteller_approvals",
      element: <AdminApprovalApp />
    },
    {
      path: "/admin/report_management",
      element: <AdminReportManagementApp />
    },
    {
      path: "/admin/payment",
      element: <AdminPaymentApp />
    },
    {
      path: "/admin/login",
      element: <AdminLoginApp />
    },
    {
      path: "/payment/:payAmount",
      element: <PaymentApp stripePromise={stripePromise} />
    },
    {
      path: "/payment/completed",
      element: <PaymentCompletedApp />
    },
    {
      path: "/example",
      element: <ExampleApp />
    }
  ] as unknown as RouteProps[]
