import { useEffect, useState } from "react"
import SearchBar from "./components/SearchBar/SearchBar"
import FortuneTellerSearchModal from "./components/FortuneTellerSearchModal/FortuneTellerSerachModal"
import { SearchService } from "./services/SearchService"
import { Specialities, specialitiesName } from "./types/SpecialityType"

export default function SearchPage(): JSX.Element {
  const defaultSearch: SearchFortuneTeller = {
    name: "",
    speciality: "",
    minPrice: -1,
    maxPrice: -1,
    startDate: null,
    endDate: null,
    startHourTime: -1,
    startMinuteTime: -1,
    endHourTime: -1,
    endMinuteTime: -1,
    rating: 0
  }
  const [searchFortuneTeller, setSearchFortuneTeller] = useState<SearchFortuneTeller>(defaultSearch)
  const [isSubmit, setIsSubmit] = useState(false)
  const [searchFound, setSearchFound] = useState(true)
  const [initPage, setInitPage] = useState(true)
  const [searchValue, setSearchValue] = useState<SearchValue[] | null>(null)

  useEffect(() => {
    if (isSubmit || initPage) {
      const fetchData = async () => {
        const data = await SearchService.searchFortuneteller(searchFortuneTeller)
        if (data && (data as FetchSearchData[]).length > 0) {
          setSearchValue((data as FetchSearchData[]).map(transformFetchDataToSearchValue))
          setSearchFound(true)
        } else {
          console.log("No data found")
          setSearchFound(false)
          const allData = await SearchService.searchFortuneteller(defaultSearch)
          setSearchValue((allData as FetchSearchData[]).map(transformFetchDataToSearchValue))
        }
        setIsSubmit(false)
        setInitPage(false)
      }
      fetchData()
    }
  }, [isSubmit, initPage])

  const transformFetchDataToSearchValue = (fetchSearchData: FetchSearchData): SearchValue => {
    return {
      name: fetchSearchData.stage_name ?? fetchSearchData.fname,
      rating:
        fetchSearchData.total_review === 0
          ? 0
          : fetchSearchData.total_score / fetchSearchData.total_review,
      minPrice: fetchSearchData.min_price,
      maxPrice: fetchSearchData.max_price,
      image: fetchSearchData.profile_picture,
      speciality: fetchSearchData.speciality_list
        .split(",")
        .map((speciality) => specialitiesName[speciality as Specialities]),
      chat: () => {},
      moreInformation: () => {},
      makeAppointment: () => {},
      current_packageid: fetchSearchData.current_packageid.split(",")[0],
      packageid_list: fetchSearchData.packageid_list.split(","),
      current_speciality: fetchSearchData.current_speciality.split(",")[0],
      speciality_list: fetchSearchData.speciality_list.split(","),
      fortunetellerid: fetchSearchData.fortune_teller_id
    }
  }
  return (
    <div className="bg-black">
      <div className="sticky pt-5 z-10 top-0">
        <SearchBar
          searchFortuneTeller={searchFortuneTeller}
          setSearchFortuneTeller={setSearchFortuneTeller}
          setIsSubmit={setIsSubmit}
        />
      </div>
      {!searchFound ? (
        <div className="w-full flex flex-row justify-center items-center gap-4 mx-5 my-8">
          <div className="w-[20%] h-[2px] bg-white"></div>
          <p className="text-white text-2xl font-sans font-medium">ไม่พบผลลัพธ์ที่ต้องการ</p>
          <div className="w-[20%] h-[2px] bg-white"></div>
        </div>
      ) : null}
      <div className="overflow-y-scroll h-screen w-full mt-3">
        <div className="grid gap-0 grid-cols-4 justify-items-center mx-8 -z-0">
          {searchValue && searchValue.length > 0
            ? searchValue.map((fortunetellerInformation, index) => (
              <FortuneTellerSearchModal key={index} {...fortunetellerInformation} />
            ))
            : null}
        </div>
      </div>
    </div>
  )
}
