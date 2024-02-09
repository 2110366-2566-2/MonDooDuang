import { useState, useEffect, useRef } from "react"
import DropDownIcon from "../Icons/dropdown-icon.svg"
import DropDownReverseIcon from "../Icons/dropdown-reverse-icon.svg"
import SpecialityDropdown from "./SpecialityDropdown"
import { specialitiesName } from "./SpecialityType"

interface Props {
  searchFortuneTeller: any
  setSearchFortuneTeller: (searchFortuneTeller: any) => void
}

export default function SpecialitySelector({ searchFortuneTeller, setSearchFortuneTeller }: Props) {
  const [openDropDown, setOpenDropDown] = useState(false)
  const selectorRef = useRef<HTMLDivElement>(null)

  const closeDropdown = (event: MouseEvent) => {
    if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
      setOpenDropDown(false)
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown)
    return () => document.removeEventListener("mousedown", closeDropdown)
  }, [])

  return (
    <div
      ref={selectorRef}
      className="w-[12.5%] px-3 rounded-full bg-[#D9D9D9]/[0.75] flex items-center justify-center"
      onClick={() => setOpenDropDown(!openDropDown)}
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
          src={!openDropDown ? DropDownIcon : DropDownReverseIcon}
          alt={`Dropdown${!openDropDown ? "" : " Reverse"} Icon`}
          className="h-3 w-3 ml-1"
        />
      </div>
      {openDropDown && (
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
