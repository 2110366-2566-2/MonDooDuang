import ModalOverlay from "../../../common/components/ModalOverlay/ModalOverlay"

export default function ExampleModal({
  isVisible,
  onClose,
  message
}: {
  isVisible: boolean
  onClose: () => void
  message: string
}) {
  return (
    <ModalOverlay isVisible={isVisible} onClose={onClose}>
      <div
        className="h-[200px] w-[400px] bg-white rounded-2xl 
      flex flex-col justify-center items-center p-6"
      >
        <div className="mb-6  text-center font-noto-sans italic">{message}</div>
        <button className="bg-mdd-grey p-4 rounded-md" onClick={onClose}>
          Modify Dismiss Button Here
        </button>
      </div>
    </ModalOverlay>
  )
}
