import Icon from "../Icons/moreinformation-icon.svg"

interface Information {
  moreInformation: () => void
}

export default function InformationIcon({ moreInformation }: Information) {
  return (
    <button
      onClick={moreInformation}
      className="flex justify-center bg-[#D9D9D9]/[0.51] w-[110px] py-1 rounded-[6px] items-center shadow-sm hover:shadow-xl hover:bg-[#D9D9D9]/[0.71] transition-all duration-200 ease-in-out"
    >
      <img src={Icon} alt="Info Icon" className="bg-contain w-5 h-5 mr-2 flex justify-center" />
      <p className="text-l font-medium text-white">เพิ่มเติม</p>
    </button>
  )
}
