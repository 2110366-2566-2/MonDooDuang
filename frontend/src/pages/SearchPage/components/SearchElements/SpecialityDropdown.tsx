import SpecialityIcon from "../Icons/speciality-icon.svg"
import { Specialities, specialitiesName } from "./SpecialityType"

export default function SpecialityDropdown({ fortuneTellerSpeciality, onSelected }: any) {
  return (
    <div className="w-full flex flex-col">
      {Object.values(Specialities).map((speciality, index) => {
        return (
          <div
            className={`flex flex-row ${
              fortuneTellerSpeciality == speciality ? "bg-[#B9B9B9]/90" : "bg-white/90"
            } justify-center justify-items-center items-center p-[5px] ${
              index < Object.keys(specialitiesName).length - 1 ? "border-b-2 border-black/10" : ""
            } ${
              index === 0
                ? "rounded-t-xl"
                : index === Object.keys(specialitiesName).length - 1
                  ? "rounded-b-xl"
                  : ""
            } hover:${
              fortuneTellerSpeciality == speciality ? "bg-[#B9B9B9]/90" : "bg-[#E9E9E9]/90"
            } shadow-lg`}
            onClick={() => {
              onSelected(speciality)
            }}
          >
            <p
              key={index}
              className="text-black text-base font-sans font-medium w-4/5 flex items-center justify-items-center justify-center"
            >
              {specialitiesName[speciality]}
            </p>
            <img src={SpecialityIcon} alt="Speciality Icon" className="h-5 w-5 mb-1" />
          </div>
        )
      })}
    </div>
  )
}
