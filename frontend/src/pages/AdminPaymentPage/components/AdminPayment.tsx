import { DefaultProfilePic } from "../../AdminApprovalPage/components/Icon"
import { AdminPaymentType } from "../types/AdminPaymentTypes"

export default function AdminPayment({
  payment,
  onClickToPay
}: {
  payment: AdminPaymentType
  onClickToPay: (value: AdminPaymentType) => void
}) {
  return (
    <div className="w-[650px] min-h-[140px] bg-white bg-opacity-50 rounded-2xl px-4 py-4 mb-8">
      <div className="flex flex-row justify-between items-center">
        <div className="rounded-full w-[100px] h-[100px]">
          {payment.profilePicture ? (
            <img
              src={payment.profilePicture}
              alt="Profile"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                borderRadius: "50%"
              }}
            />
          ) : (
            <DefaultProfilePic />
          )}
        </div>
        <div className="flex flex-col w-[320px] justify-items-center text-md">
          <div className="text-mdd-focus-yellow">Appointment ID : {payment.appointmentId}</div>
          <div className="text-white">หมอดู : {payment.fortuneTellerName}</div>
          <div className="text-white">ผู้รับบริการ : {payment.customerName}</div>
        </div>
        <div className="flex flex-col sitems-end justify-items-center space-y-3">
          <button
            onClick={() => {
              onClickToPay(payment)
            }}
            style={{ transition: "background-color 0.3s" }}
            className="w-[130px]  py-1 px-2 justify-items-center items-center rounded-[10px] text-gray-200 text-md bg-mdd-muted-green hover:bg-mdd-muted-green-hover"
          >
            <div className="text-center">จ่ายเงินให้หมอดู</div>
          </button>
        </div>
      </div>
    </div>
  )
}
