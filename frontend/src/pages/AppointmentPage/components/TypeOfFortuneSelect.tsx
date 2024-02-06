import { useState } from "react"
import { CoinIcon, LeftArrow, RightArrow, UnderLine } from "./Icon"
import { Select, MenuItem } from "@mui/material"
const text_shadow = { textShadow: "4px 4px 3px rgba(0, 0, 0, 0.25)" } as React.CSSProperties
interface Fortune {
  id: string
  typeName: string
  price: number
  duration: number
}
export function TypeOfFortuneSelect({
  typeJson,
  fortuneTeller,
  onPackageChange
}: {
  typeJson: Fortune[]
  fortuneTeller: string
  onPackageChange: Function
}) {
  //fetching
  //const typeJsonReady = await typeJson

  const [price, setPrice] = useState(typeJson[0].price)
  const [type, setType] = useState(typeJson[0].id) //setId
  const dropdown = () => {
    return (
      <div className="flex flex-col justify-items-center text-center items-center">
        <Select
          placeholder="เลือกประเภทของการดูดวง"
          label="เลือกประเภทของการดูดวง"
          value={type}
          variant="standard"
          name="typeOfFortune"
          id="typeOfFortune"
          autoWidth
          onChange={(value) => {
            setType(value.target.value)
            const selectedFortune = typeJson.find((type) => type.id === value.target.value) || null
            setPrice(selectedFortune? selectedFortune.price:0)
            onPackageChange({
              id: value.target.value,
              typeName: selectedFortune ? selectedFortune.typeName : "",
              price: selectedFortune ? selectedFortune.price : 0,
              duration: selectedFortune ? selectedFortune.duration : 0
            })
          }}
        >
          {typeJson.map((type: Fortune) => (
            <MenuItem value={type.id}>{type.typeName}</MenuItem>
          ))}
        </Select>
        <UnderLine />
      </div>
    )
  }
  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-items-center items-center space-y-3">
        <div className="flex flex-row justify-items-center items-center space-x-3">
          <LeftArrow />
          <div
            style={text_shadow}
            className="text-white text-[16px] xl:text-[24px] lg:text-[20px] md:text-[18px]  font-normal font-['Libre Bodoni'] leading-[42px]"
          >
            หมอดู
          </div>
          <RightArrow />
        </div>
        <div className="text-center">
          <span
            style={text_shadow}
            className="text-white text-[16px] xl:text-[24px] lg:text-[20px] md:text-[18px]  font-bold font-['Libre Bodoni']"
          >
            {fortuneTeller}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-items-center items-center space-y-4">
        <div className="flex flex-row justify-items-center items-center space-x-3">
          <LeftArrow />
          <div
            style={text_shadow}
            className="text-white  text-[16px] xl:text-[24px] lg:text-[20px] md:text-[18px]  font-normal font-['Libre Bodoni']"
          >
            ศาสตร์การดูดวง
          </div>
          <RightArrow />
        </div>

        {dropdown()}

        {/* price */}
        <div className="flex flex-row justify-items-center text-center items-center space-x-2">
          <CoinIcon />
          <div
            style={text_shadow}
            className="text-center text-white text-[16px] xl:text-[24px] lg:text-[20px] md:text-[18px]  font-normal font-['Libre Bodoni'] "
          >
            ราคา : {price} บาท
          </div>
        </div>
      </div>
    </div>
  )
}
