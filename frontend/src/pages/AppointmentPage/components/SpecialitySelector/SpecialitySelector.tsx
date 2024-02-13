import { useState, useEffect, useRef } from "react"
import DropDownIcon from "../../../SearchPage/components/Icons/dropdown-icon.svg"
import DropDownReverseIcon from "../../../SearchPage/components/Icons/dropdown-reverse-icon.svg"
import SpecialityDropdown from "./SpecialityDropdown"
import { Fortune, Package } from "../../types/AppointmentTypes"
import { UnderLine } from "../Icon"

interface SpecialitySelectorProps {
  selectedSpeciaty: Package
  typeJson: Fortune[]
  setType: (type: Package) => void
}

export default function SpecialitySelector({
  selectedSpeciaty,
  typeJson,
  setType
}: SpecialitySelectorProps): JSX.Element {
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
      className="h-[36px] w-[200px] px-3 rounded-full flex items-center justify-center cursor-pointer"
      onClick={() => setOpenSpecialitySelector(!openSpecialitySelector)}
    >
      <div className="w-[88%] flex flex-col items-center justify-center">
        <p
          className={`${
            selectedSpeciaty.speciality ? "text-white" : "text-white/70"
          } text-base font-sans font-medium truncate`}
        >
          {selectedSpeciaty.speciality ? selectedSpeciaty.speciality : "ศาสตร์การดูดวง"}
        </p>
        <UnderLine />
      </div>
      <div className="w-[10%]">
        <img
          src={!openSpecialitySelector ? DropDownIcon : DropDownReverseIcon}
          alt={`SpecialitySelector${!openSpecialitySelector ? "" : " Reverse"} Icon`}
          className="h-3 w-3 ml-1"
        />
      </div>
      {openSpecialitySelector && (
        <div className="absolute w-[15%] translate-y-[5rem]">
          <SpecialityDropdown
            onSelected={(speciality: Package) => {
              setType(speciality)
            }}
            fortuneTellerSpeciality={selectedSpeciaty}
            typeJson={typeJson}
          />
        </div>
      )}
    </div>
  )
}
