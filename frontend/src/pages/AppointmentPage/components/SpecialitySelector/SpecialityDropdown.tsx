import SpecialityIcon from "../../../SearchPage/components/Icons/speciality-icon.svg"
import { Package } from "../../types/AppointmentTypes"
import { specialitiesName } from "../../../SearchPage/types/SpecialityType"
interface SpecialityDropdownProps {
  fortuneTellerSpeciality: Package
  typeJson: Package[]
  onSelected: (value: Package) => void
}
export default function SpecialityDropdown({
  fortuneTellerSpeciality,
  onSelected,
  typeJson
}: SpecialityDropdownProps): JSX.Element {
  return (
    <div className="w-full flex flex-col">
      {typeJson.map((type, index) => {
        return (
          <div
            key={type.package_id}
            className={`flex flex-row ${
              fortuneTellerSpeciality.speciality == type.speciality
                ? "bg-[#B9B9B9]/90"
                : "bg-white/90"
            } justify-center justify-items-center items-center p-[5px] ${
              index < Object.keys(typeJson).length - 1 ? "border-b-2 border-black/10" : ""
            } ${
              index === 0
                ? "rounded-t-xl"
                : index === Object.keys(typeJson).length - 1
                  ? "rounded-b-xl"
                  : ""
            } hover:${
              fortuneTellerSpeciality.speciality == type.speciality
                ? "bg-[#B9B9B9]/90"
                : "bg-[#E9E9E9]/90"
            } shadow-lg`}
            onClick={() => {
              onSelected(type)
            }}
          >
            <p
              key={index}
              className="text-black text-base font-sans font-medium w-4/5 flex items-center justify-items-center justify-center"
            >
              {specialitiesName[type.speciality]}
            </p>
            <img src={SpecialityIcon} alt="Speciality Icon" className="h-5 w-5 mb-1" />
          </div>
        )
      })}
    </div>
  )
}
