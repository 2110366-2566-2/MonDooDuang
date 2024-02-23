export default function PriceInput({
  setAmount,
  amount
}: {
  setAmount: React.Dispatch<React.SetStateAction<number>>
  amount: number
}) {
  return (
    <div>
      <input
        className="border text-sm rounded-lg 
        block w-[292px] p-2.5 bg-[#30313d]
        border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 
        focus:border-blue-500"
        type="number"
        onChange={(e) => setAmount(parseInt(e.target.value ?? "0"))}
        value={amount}
      />
    </div>
  )
}
