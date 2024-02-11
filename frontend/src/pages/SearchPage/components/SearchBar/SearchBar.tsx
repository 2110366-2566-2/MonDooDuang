import { useEffect } from "react"
import DateSelector from "../SearchElements/DateSelector"
import PriceSelector from "../SearchElements/PriceSelector"
import RatingSelector from "../SearchElements/RatingSelector"
import SearchBox from "../SearchElements/SearchBox"
import SpecialitySelector from "../SearchElements/SpecialitySelector"
import SubmitButton from "../SearchElements/SubmitButton"
import TimeSelector from "../SearchElements/TimeSelector"

interface Props {
  searchFortuneTeller: any
  setSearchFortuneTeller: (searchFortuneTeller: any) => void
  setIsSubmit: (isSubmit: boolean) => void
}

export default function SearchBar({
  searchFortuneTeller,
  setSearchFortuneTeller,
  setIsSubmit
}: Props) {
  return (
    <div className="flex flex-row gap-[0.2%] justify-between mx-6">
      <SearchBox
        searchFortuneTeller={searchFortuneTeller}
        setSearchFortuneTeller={setSearchFortuneTeller}
        setIsSubmit={setIsSubmit}
      />
      <SpecialitySelector
        searchFortuneTeller={searchFortuneTeller}
        setSearchFortuneTeller={setSearchFortuneTeller}
      />
      <PriceSelector
        searchFortuneTeller={searchFortuneTeller}
        setSearchFortuneTeller={setSearchFortuneTeller}
      />
      <DateSelector
        searchFortuneTeller={searchFortuneTeller}
        setSearchFortuneTeller={setSearchFortuneTeller}
      />
      <TimeSelector
        searchFortuneTeller={searchFortuneTeller}
        setSearchFortuneTeller={setSearchFortuneTeller}
      />
      <RatingSelector
        searchFortuneTeller={searchFortuneTeller}
        setSearchFortuneTeller={setSearchFortuneTeller}
      />
      <SubmitButton setIsSubmit={setIsSubmit} />
    </div>
  )
}
