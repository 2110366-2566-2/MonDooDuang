import { useEffect, useState } from "react"
import SearchBar from "./components/SearchBar/SearchBar"
import FortuneTellerSearchModal from "./components/FortuneTellerSearchModal/FortuneTellerSerachModal"
import { SearchService } from "./services/SearchService"
import { Specialities, specialitiesName } from "./components/SearchElements/SpecialityType"
interface SearchValue {
  name: string
  rating: number
  minPrice: number
  maxPrice: number
  image: string | null
  speciality: string[]
  chat: () => void
  moreInformation: () => void
  makeAppointment: () => void
  current_packageid: string
  packageid_list: string[]
  current_speciality: string
  speciality_list: string[]
  fortunetellerid: string
}
interface FetchData {
  current_packageid: string
  current_speciality: string
  fname: string
  fortunetellerid: string
  maxprice: number
  minprice: number
  packageid_list: string
  profilepicture: string | null
  speciality_list: string
  stagename: string | null
  totalreview: number
  totalscore: number
}
export default function SearchPage() {
  const defaultSearch = {
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
  const [searchFortuneTeller, setSearchFortuneTeller] = useState(defaultSearch)
  const [isSubmit, setIsSubmit] = useState(false)
  const [searchFound, setSearchFound] = useState(true)
  const [initPage, setInitPage] = useState(true)
  const [searchValue, setSearchValue] = useState<SearchValue[] | null>(null)

  useEffect(() => {
    if (isSubmit || initPage) {
      const fetchData = async () => {
        const data = await SearchService.search(searchFortuneTeller)
        if (data && (data as FetchData[]).length > 0) {
          setSearchValue((data as FetchData[]).map(transformFetchDataToSearchValue))
          setSearchFound(true)
        } else {
          console.log("No data found")
          setSearchFound(false)
          const allData = await SearchService.search(defaultSearch)
          setSearchValue((allData as FetchData[]).map(transformFetchDataToSearchValue))
        }
        setIsSubmit(false)
        setInitPage(false)
      }
      fetchData()
    }
  }, [isSubmit, initPage])

  const transformFetchDataToSearchValue = (fetchData: FetchData): SearchValue => {
    return {
      name: fetchData.stagename ?? fetchData.fname,
      rating: fetchData.totalreview === 0 ? 0 : fetchData.totalscore / fetchData.totalreview,
      minPrice: fetchData.minprice,
      maxPrice: fetchData.maxprice,
      image: fetchData.profilepicture,
      speciality: fetchData.speciality_list
        .split(",")
        .map((speciality) => specialitiesName[speciality as Specialities]),
      chat: () => {},
      moreInformation: () => {},
      makeAppointment: () => {},
      current_packageid: fetchData.current_packageid.split(",")[0],
      packageid_list: fetchData.packageid_list.split(","),
      current_speciality: fetchData.current_speciality.split(",")[0],
      speciality_list: fetchData.speciality_list.split(","),
      fortunetellerid: fetchData.fortunetellerid
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
