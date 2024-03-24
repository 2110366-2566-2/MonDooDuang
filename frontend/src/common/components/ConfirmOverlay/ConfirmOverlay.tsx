import ModalOverlay from "../../../common/components/ModalOverlay/ModalOverlay"

export type ConfirmOverlayProps = {
  onClose: () => void
  onConfirm: () => void
  target: string
  type: "APPROVE" | "REJECT"
  title: string
  message: string
  info?: string
  warning?: string
}
export function ConfirmOverlay({
  isVisible,
  confirmProps
}: {
  isVisible: boolean
  confirmProps: ConfirmOverlayProps
}) {
  const { onClose, onConfirm, target, type, title, message, info, warning } = confirmProps
  return (
    <ModalOverlay isVisible={isVisible} onClose={onClose}>
      <div
        style={{ backgroundColor: "#E8E8E8", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
        className="rounded-md z-10 flex flex-col justify-items-center items-center py-4 px-12 space-y-3 font-noto-sans"
      >
        {type == "APPROVE" ? (
          <div className="font-bold text-mdd-sand-yellow text-2xl">{title}</div>
        ) : (
          <div className="font-bold text-mdd-cancel-red text-2xl">{title}</div>
        )}

        <div className="flex flex-col justify-items-center items-center font-noto-sans">
          <div className="text-black  text-lg font-light">'{target}'</div>
          <div className="text-black  text-lg font-bold">{message}</div>
          {warning ? (
            <div className="flex flex-col justify-items-center items-center mt-2 text-red-500 text-sm">
              <div className="text-red-500 text-sm">โปรดระวัง</div>
              {warning.split("\n").map((line, index) => (
                <span key={index} style={{ lineHeight: "1" }}>
                  {line}
                  <div className="text-red-500 text-sm text-center"></div>
                </span>
              ))}
            </div>
          ) : null}
          {info ? (
            <div className="flex flex-col justify-items-center items-center mt-2 text-zinc-500 text-sm">
              {info.split("\n").map((line, index) => (
                <span key={index} style={{ lineHeight: "1" }}>
                  {line}
                  <div className="text-zinc-500 text-sm text-center"></div>
                </span>
              ))}
            </div>
          ) : null}
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
