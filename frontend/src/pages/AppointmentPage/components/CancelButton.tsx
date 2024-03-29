export default function CancelButton({ onCancel }: { onCancel: () => void }) {
  return (
    <div
      className="bg-neutral-400 rounded-[10px] py-2 px-8 text-gray-200 text-lg cursor-pointer font-normal font-noto-sans hover:bg-neural-500"
      onClick={() => onCancel()}
    >
      ยกเลิก
    </div>
  )
}
