import { useState } from "react"
import ExampleModal from "../../common/components/ModalOverlay/ExampleModal"

export default function ExamplePage() {
  const [isExampleModalOpen, setIsExampleModalOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setIsExampleModalOpen(true)}
        className="text-white text-2xl font-noto-sans-eng"
      >
        Example Modal Here!
      </button>
      <div className="h-[200vh] w-1/3 bg-white">Scroll page test</div>
      <ExampleModal
        isVisible={isExampleModalOpen}
        onClose={() => setIsExampleModalOpen(false)}
        message={
          "You can Pass any props and create any Button for your modal, Please also try clicking or scrolling outside the modal!!!"
        }
      />
    </div>
  )
}
