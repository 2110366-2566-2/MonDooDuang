import ModalOverlay from "../../../common/components/ModalOverlay/ModalOverlay"

type ConfirmProps = {
  fortuneTeller: string
  type: string
  price: number
  date: string
  starttime: string
  endtime: string
  isVisible: boolean
  onClose: () => void
  onConfirm: () => void
}
export function ConfirmModal(props: ConfirmProps) {
  const { isVisible, onClose, onConfirm, fortuneTeller, type, price, date, starttime, endtime } =
    props
  return (
    <ModalOverlay isVisible={isVisible} onClose={onClose}>
      <div
        style={{ backgroundColor: "#E8E8E8", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
        className="rounded-md z-10 flex flex-col justify-items-center items-center py-4 px-12 space-y-4 font-noto-sans"
      >
        <div className="font-black">คุณต้องการนัดหมายดูดวงนี้ใช่หรือไม่</div>
        <div
          style={{ color: "#838383" }}
          className="text-xs flex flex-col justify-items-center items-center"
        >
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
            className="text-white text-sm font-bold rounded-md py-2 px-4 bg-muted-yellow hover:bg-muted-yellow-hover"
            onClick={onClose}
          >
            ยกเลิก
          </button>
          <button
            style={{ transition: "background-color 0.3s" }}
            className="text-white text-sm font-bold rounded-md py-2 px-4 bg-muted-green hover:bg-muted-green-hover"
            onClick={onConfirm}
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </ModalOverlay>
  )
}
