export default function ConfirmButton({ onClick }: { onClick: Function }) {
  return (
    <div
      style={{ transition: "background-color 0.3s" }}
      className="rounded-[10px] p-2 text-gray-200 text-lg font-normal bg-mango-yellow hover:bg-mango-yellow-hover"
      onClick={() => onClick()}
    >
      ยืนยันการจอง
    </div>
  )
}
