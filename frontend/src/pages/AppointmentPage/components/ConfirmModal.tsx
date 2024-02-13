import ModalOverlay from "../../../common/components/ModalOverlay/ModalOverlay"
import { ConfirmProps } from "../types/AppointmentTypes"

export function ConfirmModal(props: ConfirmProps) {
  const { isVisible, onClose, onConfirm, fortuneTeller, type, price, date, starttime, endtime } =
    props
  return (
    <ModalOverlay isVisible={isVisible} onClose={onClose}>
      <div
        style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
        className="rounded-md z-10 flex flex-col justify-items-center items-center py-4 px-12 space-y-4 font-noto-sans bg-mdd-silver-grey"
      >
        <div className="font-black">คุณต้องการนัดหมายดูดวงนี้ใช่หรือไม่</div>
        <div className="text-xs flex flex-col justify-items-center items-center text-mdd-gray-success-text">
          <div>หมอดู : {fortuneTeller}</div>
          <div>ศาสตร์การดูดวง : {type}</div>
          <div>ราคา : {price} บาท</div>
          <div>
            วันที่ : {date} เวลา : {starttime} - {endtime} น.
          </div>
        </div>
        <div className="flex flex-row justify-items-center items-center space-x-16">
          <button
            style={{ transition: "background-color 0.3s" }}
            className="text-white text-sm cursor-pointer  font-bold rounded-md py-2 px-4 bg-mdd-muted-yellow hover:bg-mdd-muted-yellow-hover"
            onClick={onClose}
          >
            ยกเลิก
          </button>
          <button
            style={{ transition: "background-color 0.3s" }}
            className="text-white text-sm cursor-pointer  font-bold rounded-md py-2 px-4 bg-mdd-muted-green hover:bg-mdd-muted-green-hover"
            onClick={onConfirm}
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </ModalOverlay>
  )
}
