import { useEffect, useState } from "react"
import { CoinIcon, LeftArrow, RightArrow } from "./Icon"
import { Fortune, Package } from "../types/AppointmentTypes"
import SpecialitySelector from "./SpecialitySelector/SpecialitySelector"
const text_shadow = { textShadow: "4px 4px 3px rgba(0, 0, 0, 0.25)" } as React.CSSProperties

export function TypeOfFortuneSelect({
  typeJson,
  fortuneTeller,
  onPackageChange
}: {
  typeJson: Fortune[]
  fortuneTeller: string
  onPackageChange: (value: Package) => void
}) {
  const [price, setPrice] = useState(0)
  const [packageType, setPackageType] = useState<Package>({
    packageid: "",
    speciality: "",
    price: 0,
    duration: 0
  })

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const packages = typeJson
        if (packages.length > 0) {
          setPrice(packages[0].price)
          setPackageType(packages[0])
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchPackages()
  }, [typeJson])

  const SpecialityDropdown = () => {
    return (
      <SpecialitySelector
        selectedSpeciaty={packageType}
        typeJson={typeJson}
        setType={(value: Package) => {
          setPackageType(value)
          setPrice(value.price)
          onPackageChange(value)
        }}
      />
    )
  }
  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-items-center items-center space-y-3">
        <div className="flex flex-row justify-items-center items-center space-x-3">
          <LeftArrow />
          <div
            style={text_shadow}
            className="text-white text-[16px] xl:text-[24px] lg:text-[20px] md:text-[18px]  font-normal font-noto-sans leading-[42px]"
          >
            หมอดู
          </div>
          <RightArrow />
        </div>
        <div className="text-center">
          <span
            style={text_shadow}
            className="text-white text-[16px] xl:text-[24px] lg:text-[20px] md:text-[18px]  font-bold font-noto-sans"
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
            className="text-white  text-[16px] xl:text-[24px] lg:text-[20px] md:text-[18px]  font-normal font-noto-sans"
          >
            ศาสตร์การดูดวง
          </div>
          <RightArrow />
        </div>
        {SpecialityDropdown()}

        {/* price */}
        <div className="flex flex-row justify-items-center text-center items-center space-x-2">
          <CoinIcon />
          <div
            style={text_shadow}
            className="text-center text-white text-[16px] xl:text-[24px] lg:text-[20px] md:text-[18px]  font-normal font-noto-sans "
          >
            ราคา : {price} บาท
          </div>
        </div>
      </div>
    </div>
  )
}
