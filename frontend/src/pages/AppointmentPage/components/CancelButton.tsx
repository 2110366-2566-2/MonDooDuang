export default function CancelButton({ onClick }: { onClick: Function }) {
  return (
    <div
      className="bg-neutral-400 rounded-[10px] py-2 px-8 text-gray-200 text-lg font-normal font-noto-sans"
      onClick={() => onClick}
    >
      ยกเลิก
    </div>
  )
}
