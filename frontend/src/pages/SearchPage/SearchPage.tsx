import { useContext, useEffect, useState } from "react"
import SearchBar from "./components/SearchBar/SearchBar"
import FortuneTellerSearchModal from "./components/FortuneTellerSearchModal/FortuneTellerSerachModal"
import { SearchService } from "./services/SearchService"
import { Specialities, specialitiesName } from "./types/SpecialityType"
import { environment } from "../../common/constants/environment"
import NavBar from "../../common/components/NavBar/NavBar"
import { ConversationService } from "./services/ConversationService"
import { AuthContext } from "../../common/providers/AuthProvider"

export default function SearchPage(): JSX.Element {
  const { userId, userType, username } = useContext(AuthContext)
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
          const transformedData = await Promise.all(
            (data as FetchSearchData[]).map(transformFetchDataToSearchValue)
          )
          setSearchValue(transformedData)
          setSearchFound(true)
        } else {
          console.log("No data found")
          setSearchFound(false)
          const allData = await SearchService.searchFortuneteller(defaultSearch)
          const transformedAllData = await Promise.all(
            (allData as FetchSearchData[]).map(transformFetchDataToSearchValue)
          )
          setSearchValue(transformedAllData)
        }
        setIsSubmit(false)
        setInitPage(false)
      }
      fetchData()
    }
  }, [isSubmit, initPage])

  const transformFetchDataToSearchValue = async (
    fetchSearchData: FetchSearchData
  ): Promise<SearchValue> => {
    return {
      name: fetchSearchData.stage_name ?? fetchSearchData.fname,
      rating:
        fetchSearchData.total_review === 0
          ? 0
          : fetchSearchData.total_score / fetchSearchData.total_review,
      minPrice: fetchSearchData.min_price,
      maxPrice: fetchSearchData.max_price,
      image: fetchSearchData.profile_picture,
      speciality: specialitiesName[fetchSearchData.speciality as Specialities],
      chat: async () => {
        const { conversationId } = await ConversationService.createConversation(
          userId,
          fetchSearchData.fortune_teller_id
        )
        window.location.href = `${environment.frontend.url}/conversation/${conversationId}`
      },
      moreInformation: () => {
        window.location.href =
          environment.frontend.url + "/fortuneteller/" + fetchSearchData.fortune_teller_id
      },
      makeAppointment: () => {
        window.location.href =
          environment.frontend.url +
          "/appointment" +
          "/" +
          fetchSearchData.fortune_teller_id +
          "/" +
          fetchSearchData.package_id_list[0]
      },
      package_id_list: fetchSearchData.package_id_list.split(","),
      fortunetellerid: fetchSearchData.fortune_teller_id
    }
  }
  return (
    <div>
      <NavBar
        isFortuneTeller={userType === "FORTUNE_TELLER"}
        menuFocus={"search"}
        username={username}
        userId={userId}
      />
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
