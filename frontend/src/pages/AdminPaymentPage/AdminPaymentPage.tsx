import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../common/providers/AuthProvider"
import NavBarAdmin from "../../common/components/NavBar/NavBarAdmin"
import { environment } from "../../common/constants/environment"
import { NextPageIcon } from "../AdminApprovalPage/components/Icon"
import { PageLine } from "../AdminReportManagementPage/components/Icon"
import { AdminPaymentService } from "./services/AdminPaymentService"
import { AdminPaymentType } from "./types/AdminPaymentTypes"
import AdminPayment from "./components/AdminPayment"
import { PaymentDetailModal } from "./components/PaymentDetailModal"
import { AppointmentService } from "../../common/services/AppointmentService"

export default function AdminPaymentPage() {
  const { username } = useContext(AuthContext)
  const [payments, setPayments] = useState<AdminPaymentType[]>([])
  const [isUpdate, setIsUpdate] = useState(false)
  const [focusPayment, setFocusPayment] = useState<AdminPaymentType>()
  const [isPaymentDetailModalOpen, setIsPaymentDetailModalOpen] = useState(false)

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const results = await AdminPaymentService.getEventCompletedAppointments()

        if (results) {
          setPayments(results)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchPayments()
  }, [isUpdate])

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
            <PageLine />
            <div>
              {payments.length === 0 ? (
                <div className="mt-2 text-white font-noto-sans text-xl text-center self-center justify-self-center">
                  ' ไม่มีการชำระเงินในขณะนี้ '
                </div>
              ) : null}
              {payments.map((payment: AdminPaymentType) => (
                <AdminPayment
                  payment={payment}
                  onClickToPay={(value: AdminPaymentType) => {
                    setFocusPayment(value)
                    setIsPaymentDetailModalOpen(true)
                  }}
                />
              ))}
            </div>
          </div>
          <PaymentDetailModal
            fullName={focusPayment ? focusPayment.fortuneTellerName : ""}
            isVisible={isPaymentDetailModalOpen}
            onClose={() => {
              setIsPaymentDetailModalOpen(false)
            } }
            onConfirm={() => {
              setIsPaymentDetailModalOpen(false)
              if (focusPayment) {
                AppointmentService.updateAppointmentStatus('PAYMENT_COMPLETED', focusPayment.appointmentId)
                console.log("add new payment")
              }
              setIsUpdate(!isUpdate)
            }} 
            bankName={focusPayment ? focusPayment.bankName : ""}
            accountNumber={focusPayment ? focusPayment.accountNumber : ""}
          />
        </div>
      </div>
    </>
  )
}
