import LeftLine from "../Line/LeftLine"
import RightLine from "../Line/RightLine"
import FortuneTellerSearchModal from "../../../SearchPage/components/FortuneTellerSearchModal/FortuneTellerSerachModal"
import { Specialities,specialitiesName } from "../../../SearchPage/types/SpecialityType"
import { useEffect, useState } from "react"
import { FortuneTellerService } from "../../services/FortuneTellerService"

export default function RecommendedFortuneTellers() {
 
  const [recommendPackage, setrecommendPackage] = useState<SearchValue[] | null>(null)
    
  useEffect(() => {
    const fetchData = async () => {
      const data = await FortuneTellerService.getRecommendPackage()
      setrecommendPackage((data as FetchSearchData[]).map(transformFetchDataTorecommendPackage))
    }
    fetchData()
        
  },[])
    
  const transformFetchDataTorecommendPackage = (fetchSearchData: FetchSearchData): SearchValue => {
    return {
      name: fetchSearchData.stagename ?? fetchSearchData.fname,
      rating: fetchSearchData.totalreview === 0 ? 0 : fetchSearchData.totalscore / fetchSearchData.totalreview,
      minPrice: fetchSearchData.minprice,
      maxPrice: fetchSearchData.maxprice,
      image: fetchSearchData.profilepicture,
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
      fortunetellerid: fetchSearchData.fortunetellerid
    }
  }

  return (
    <div>
      <div className="flex flex-row space-x-4 items-center justify-center">
        <LeftLine></LeftLine>
        <div className="font-medium text-[24px]">คุณอาจสนใจหมอดูเหล่านี้</div>
        <RightLine></RightLine>
      </div>
      <div className="flex flex-row w-full scroll-smooth overflow-auto space-x-4">
        <div className="h-[430px] w-full grid gap-0 grid-cols-4 justify-items-center mx-8 -z-0 text-[16px]"> 
          {recommendPackage && recommendPackage.length > 0
            ? recommendPackage.map((fortunetellerInformation, index) => (
              <FortuneTellerSearchModal key={index} {...fortunetellerInformation} />
            ))
            : null}
        </div>
      </div>
    </div>
  )
}