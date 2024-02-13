import ModalOverlay from "../../../common/components/ModalOverlay/ModalOverlay"
import { ConfirmProps } from "../types/AdminApprovalTypes"

export function ConfirmModal(props: ConfirmProps) {
  const { isVisible, onClose, onConfirm, fortuneTeller, type } = props
  return (
    <ModalOverlay isVisible={isVisible} onClose={onClose}>
      <div
        style={{ backgroundColor: "#E8E8E8", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
        className="rounded-md z-10 flex flex-col justify-items-center items-center py-4 px-12 space-y-3 font-noto-sans"
      >
        {type == "APPROVE" ? (
          <div className="font-bold text-mdd-sand-yellow text-2xl">อนุญาตให้</div>
        ) : (
          <div className="font-bold text-mdd-cancel-red text-2xl">ยกเลิกคำขอให้</div>
        )}

        <div className="font-zinc-500 flex flex-col justify-items-center items-center">
          <div className=" text-lg font-light">'{fortuneTeller}'</div>
          <div className="text-lg font-bold">เป็นหมอดูใช่หรือไม่</div>
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
