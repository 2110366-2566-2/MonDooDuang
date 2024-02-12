import { useState, useEffect, useRef } from "react"
import DropDownIcon from "../../Icons/dropdown-icon.svg"
import DropDownReverseIcon from "../../Icons/dropdown-reverse-icon.svg"
import SpecialityDropdown from "./SpecialityDropdown"
import { specialitiesName } from "../../../types/SpecialityType"

interface SpecialitySelectorProps {
  searchFortuneTeller: SearchFortuneTeller
  setSearchFortuneTeller: (searchFortuneTeller: SearchFortuneTeller) => void
}

export default function SpecialitySelector({ searchFortuneTeller, setSearchFortuneTeller }: SpecialitySelectorProps): JSX.Element {
  const [openSpecialitySelector, setOpenSpecialitySelector] = useState(false)
  const selectorRef = useRef<HTMLDivElement>(null)

  const closeSpecialitySelector = (event: MouseEvent): void => {
    if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
      setOpenSpecialitySelector(false)
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", closeSpecialitySelector)
    return () => document.removeEventListener("mousedown", closeSpecialitySelector)
  }, [])

  return (
    <div
      ref={selectorRef}
      className="h-[36px] w-[12.5%] px-3 rounded-full bg-[#D9D9D9]/[0.75] flex items-center justify-center cursor-pointer"
      onClick={() => setOpenSpecialitySelector(!openSpecialitySelector)}
    >
      <div className="w-[88%] flex items-center justify-center">
        <p
          className={`${
            searchFortuneTeller.speciality ? "text-white" : "text-white/70"
          } text-base font-sans font-medium truncate`}
        >
          {searchFortuneTeller.speciality
            ? specialitiesName[searchFortuneTeller.speciality]
            : "ศาสตร์การดูดวง"}
        </p>
      </div>
      <div className="w-[10%]">
        <img
          src={!openSpecialitySelector ? DropDownIcon : DropDownReverseIcon}
          alt={`SpecialitySelector${!openSpecialitySelector ? "" : " Reverse"} Icon`}
          className="h-3 w-3 ml-1"
        />
      </div>
      {openSpecialitySelector && (
        <div className="absolute w-[15%] translate-y-[8.3rem]">
          <SpecialityDropdown
            onSelected={(speciality: string) => {
              setSearchFortuneTeller({
                ...searchFortuneTeller,
                speciality: speciality
              })
            }}
            fortuneTellerSpeciality={searchFortuneTeller.speciality}
          />
        </div>
      )}
    </div>
  )
}
