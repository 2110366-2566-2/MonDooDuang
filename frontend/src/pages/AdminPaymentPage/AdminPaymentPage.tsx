import { useContext } from "react"
import { AuthContext } from "../../common/providers/AuthProvider"
import NavBarAdmin from "../../common/components/NavBar/NavBarAdmin"
import { environment } from "../../common/constants/environment"
import { NextPageIcon } from "../AdminApprovalPage/components/Icon"

export default function AdminPaymentPage() {
  const { username } = useContext(AuthContext)

  const PageNavigation = () => {
    return (
      <div className="flex flex-row justify-items-start items-center space-x-3 font-noto-sans text-xl">
        <div
          className="text-white"
          onClick={() => {
            window.location.href = environment.frontend.url + "/admin/report_management"
          }}
        >
          หน้าหลัก
        </div>
        <NextPageIcon />
        <div className="text-mdd-focus-yellow">การชำระเงิน</div>
      </div>
    )
  }
  return (
    <>
      <NavBarAdmin menuFocus={"adminPayment"} username={username} />
      <div className="px-20 py-8">
        <PageNavigation />
        <div className="w-auto h-auto">
          <div className="flex flex-col justify-items-center items-center space-y-12">
            <div className="mt-10 text-white text-4xl font-noto-sans">การชำระเงิน</div>

            <div className="h-[720px] w-[1000px] py-4 px-12 border-solid border-2 border-white rounded-md space-y-4 overflow-y-auto justify-items-center items-center"/>
          </div>
        </div>
      </div>
    </>
  )
}
