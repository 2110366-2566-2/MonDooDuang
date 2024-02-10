import { useState } from "react"
import SearchBar from "./components/SearchBar/SearchBar"
import FortuneTellerSearchModal from "./components/FortuneTellerSearchModal/FortuneTellerSerachModal"

export default function SearchPage() {
  const [searchFortuneTeller, setSearchFortuneTeller] = useState({
    name: "",
    speciality: "",
    minPrice: -1,
    maxPrice: -1,
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    rating: 0
  })
  const [isSubmit, setIsSubmit] = useState(false)

  const ft = {
    name: "DaengDooDuang",
    rating: 4.7,
    minPrice: 100,
    maxPrice: 300,
    image: "https://i.pinimg.com/236x/67/99/96/67999633eca4a4458fb52d556d3f4ff2.jpg",
    // image: null,
    speciality: ["ไพ่ทาโร่", "ไพ่"],
    chat: () => {},
    moreInformation: () => {},
    makeAppointment: () => {}
  }

  return (
    <div className="bg-black relative">
      <div className="h-[5rem]" />
      <div className="grid gap-0 grid-cols-4 justify-items-center mx-8 relative">
        {[...Array(18)].map((_, i) => (
          <FortuneTellerSearchModal key={i} {...ft} />
        ))}
      </div>
      <div className="mt-[22px] absolute w-full top-0">
        <SearchBar
          searchFortuneTeller={searchFortuneTeller}
          setSearchFortuneTeller={setSearchFortuneTeller}
          isSubmit={isSubmit}
          setIsSubmit={setIsSubmit}
        />
      </div>
    </div>
  )
}
