import { CloseIcon } from "./Icon"
import ModalOverlay from "./ModalOverlay"

export function FullPicView({
  approvalPic,
  isVisible,
  onClose
}: {
  approvalPic: string
  isVisible: boolean
  onClose: () => void
}) {
  const fullPic = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ maxWidth: "860px", maxHeight: "550px", overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img
              src={approvalPic}
              alt="Profile"
              style={{
                width: "50%",
                height: "50%",
                objectFit: "contain"
              }}
            />
          </div>
        </div>
      </div>
    )
  }
  return (
    <ModalOverlay isVisible={isVisible} onClose={onClose}>
      <div className="w-fit h-auto flex flex-col justify-items-center items-center p-6 bg-zinc-300 space-y-2">
        <button className="justify-self-start self-start" onClick={onClose}>
          <CloseIcon />
        </button>
        {fullPic()}
      </div>
    </ModalOverlay>
  )
}
