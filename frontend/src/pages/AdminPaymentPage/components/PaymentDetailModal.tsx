import ModalOverlay from "../../../common/components/ModalOverlay/ModalOverlay"
import { PaymentConfirmProps } from "../types/AdminPaymentTypes"

export function PaymentDetailModal(props: PaymentConfirmProps) {
  const { isVisible, onClose, onConfirm, fullName, bankName, accountNumber } = props
  return (
    <ModalOverlay isVisible={isVisible} onClose={onClose}>
      <div
        style={{ backgroundColor: "#E8E8E8", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
        className="rounded-lg z-10 flex flex-col justify-items-center items-center py-4 px-12 space-y-3 font-noto-sans"
      >
        <div className="flex flex-col justify-items-center items-center">
          <div className="text-lg font-bold">จ่ายเงินให้หมอดู</div>
          <div className="text-xs">{fullName}</div>
          <div className="text-xs">{bankName} {accountNumber}</div>
        </div>
        <img
          src="/mock_qrpayment.png"
          alt="Payment QR code"
          style={{
            width: "50%"
          }}
        />
        <div className="flex flex-col justify-items-center items-center text-mdd-cancel-red text-xs font-medium">
          <div>โปรดระวัง</div>
          <div>หากทำการชำระเงินแล้ว เงินจะถูกโอนไปยังหมอดูทันที</div>
        </div>
        <div className="flex flex-row justify-items-center items-center space-x-16">
          <button
            style={{ transition: "background-color 0.3s" }}
            className="text-white text-sm font-bold rounded-md py-2 px-4 bg-mdd-muted-yellow hover:bg-mdd-muted-yellow-hover"
            onClick={onClose}
          >
            ยกเลิก
          </button>
          <button
            style={{ transition: "background-color 0.3s" }}
            className="text-white text-sm font-bold rounded-md py-2 px-4 bg-mdd-muted-green hover:bg-mdd-muted-green-hover"
            onClick={onConfirm}
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </ModalOverlay>
  )
}
