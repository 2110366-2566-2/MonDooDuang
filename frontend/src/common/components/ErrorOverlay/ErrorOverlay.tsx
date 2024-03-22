import ModalOverlay from "../../../common/components/ModalOverlay/ModalOverlay"
import ErrorIcon from "../AppointmentCard/Icon/ErrorIcon"

export function ErrorModal({
  isVisible,
  onClose,
  title,
  info,
  warning
}: {
  isVisible: boolean
  onClose: () => void
  title: string
  info?: string
  warning?: string
}) {
  return (
    <ModalOverlay isVisible={isVisible} onClose={onClose}>
      <div
        style={{ backgroundColor: "#E8E8E8", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
        className="rounded-md z-10 flex flex-col justify-items-center items-center py-4 px-12 space-y-1 font-noto-sans"
      >
        <ErrorIcon/>
        <div className="font-black text-xl font-medium font-noto-sans">{title}</div>
        <div className="text-xs flex flex-col justify-items-center items-center">
          {info ? (
            <div className="text-center text-mdd-gray-success-text">
              {info.split("\n").map((line, index) => (
                <span key={index} style={{ lineHeight: "1" }}>
                  {line}
                  <div className="text-red-500 text-sm"></div>
                </span>
              ))}
            </div>
          ) : null}
          {warning ? (
            <div className="text-center text-mdd-red-success-text">
              โดยท่านต้องชำระเงินภายใน 1 วัน <br />
              หลังได้รับแจ้งเตือนตอบรับคำจอง
            </div>
          ) : null}
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
