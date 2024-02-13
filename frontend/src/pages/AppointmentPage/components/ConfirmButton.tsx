export default function ConfirmButton({ onConfirm }: { onConfirm: () => void }) {
  return (
    <div
      style={{ transition: "background-color 0.3s" }}
      className="rounded-[10px] p-2 text-gray-200 text-lg cursor-pointer font-normal font-noto-sans  bg-mdd-mango-yellow hover:bg-mdd-mango-yellow-hover"
      onClick={() => onConfirm()}
    >
      ยืนยันการจอง
    </div>
  )
}
