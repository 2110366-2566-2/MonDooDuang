import { useRef } from "react"
interface PriceSelectorProps {
  minPrice: number
  maxPrice: number
  setMinPrice: (minPrice: number) => void
  setMaxPrice: (maxPrice: number) => void
}
export default function PriceSelectorOverlay({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice
}: PriceSelectorProps) {
  return (
    <div className="w-full bg-[#D9D9D9]/[0.75] rounded-lg shadow-lg">
      <div className="flex flex-row justify-evenly">
        <PriceInput title="Minimum Price" value={minPrice} setValue={setMinPrice} />
        <PriceInput title="Maximum Price" value={maxPrice} setValue={setMaxPrice} />
      </div>

      <p className="text-[#E04747] font-normal text-xs px-3 pb-[10px]">
        **ราคาขั้นต่ำต้องน้อยกว่าราคาสูงสุด
        <br />
        โปรดตรวจสอบให้แน่ใจว่ากรอกข้อมูลถูกต้องก่อนดำเนินการต่อ
      </p>
    </div>
  )
}

interface PriceInputProps {
  title: string
  value: number
  setValue: (value: number) => void
}

function PriceInput({ title, value, setValue }: PriceInputProps) {
  const inputPriceBoxRef = useRef<HTMLInputElement>(null)

  const inputFocus = () => {
    inputPriceBoxRef.current?.focus()
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "" || e.target.value === "-" || e.target.value === ".") {
      setValue(-1)
      return
    }
    setValue(parseFloat(e.target.value))
  }

  return (
    <div className="flex flex-col items-center justify-start px-3 py-[0.7rem]">
      <p className="text-[#FFDE6A] text-[18px] font-libre-bodoni font-medium drop-shadow-[1px_1px_2px_#000000] mb-2">
        {title}
      </p>
      <input
        type="number"
        value={value < 0 ? "" : value}
        ref={inputPriceBoxRef}
        onChange={onChange}
        className="w-full h-8 rounded-md bg-white text-gray-600 font-example-font font-medium pl-7"
      />
      <p
        className="absolute text-gray-500 font-example-font font-medium translate-y-[40px] -translate-x-[62px]"
        onClick={inputFocus}
      >
        ฿
      </p>
      {value < 0 ? (
        <p
          className="absolute text-gray-500 font-example-font font-medium translate-y-[40px] -translate-x-[33px]"
          onClick={inputFocus}
        >
          0.00
        </p>
      ) : null}
    </div>
  )
}
