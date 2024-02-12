import DateSelector from "../SearchElements/DateSelector/DateSelector"
import PriceSelector from "../SearchElements/PriceSelector/PriceSelector"
import RatingSelector from "../SearchElements/RatingSelector/RatingSelector"
import SearchBox from "../SearchElements/SearchBox/SearchBox"
import SpecialitySelector from "../SearchElements/SpecialitySelector/SpecialitySelector"
import SubmitButton from "../SearchElements/SubmitButton/SubmitButton"
import TimeSelector from "../SearchElements/TimeSelector/TimeSelector"

interface SearchBarProps {
  searchFortuneTeller: SearchFortuneTeller
  setSearchFortuneTeller: (searchFortuneTeller: SearchFortuneTeller) => void
  setIsSubmit: (isSubmit: boolean) => void
}

export default function SearchBar({
  searchFortuneTeller,
  setSearchFortuneTeller,
  setIsSubmit
}: SearchBarProps): JSX.Element{
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
