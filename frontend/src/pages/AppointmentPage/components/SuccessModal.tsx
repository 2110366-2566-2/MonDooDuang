import { SuccessIcon } from "./Icon"
import ModalOverlay from "../../../common/components/ModalOverlay/ModalOverlay"

type SuccessProps = {
  isVisible: boolean
  onClose: () => void
}

export function SuccessModal(props: SuccessProps) {
  const { isVisible, onClose } = props
  return (
    <ModalOverlay isVisible={isVisible} onClose={onClose}>
      <div
        style={{ backgroundColor: "#E8E8E8", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
        className="rounded-md z-10 flex flex-col justify-items-center items-center py-4 px-12 space-y-1 font-noto-sans"
      >
        <SuccessIcon />
        <div className="font-black">ส่งคำขอไปยังหมอดูสำเร็จ</div>
        <div className="text-xs flex flex-col justify-items-center items-center">
          <div className="text-center text-mdd-gray-success-text">
            หากหมอดูตกลงรับการจอง <br />
            ระบบจะแจ้งเตือนให้ท่านทราบ เพื่อดำเนินการชำระเงิน
          </div>
          <div className="text-center text-mdd-red-success-text">
            โดยท่านต้องชำระเงินภายใน 1 วัน <br />
            หลังได้รับแจ้งเตือนตอบรับคำจอง
          </div>
        </div>
        <button
          style={{ transition: "background-color 0.3s" }}
          className="text-white text-sm cursor-pointer font-bold rounded-md py-2 px-4 bg-gray-400 hover:bg-gray-500"
          onClick={() => {
            onClose()
          }}
        >
          ตกลง
        </button>
      </div>
    </ModalOverlay>
  )
}
