import PackageList from "./PackageList"
import { PackageTypes } from "../../types/PackageTypes"

import { FortuneTellerService } from "../../services/FortuneTellerService"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { environment } from "../../../../common/constants/environment"

export default function Packages() {
  const { fid } = useParams<{ fid: string }>()

  let fortuneTellerId = ""
  if (fid) {
    fortuneTellerId = fid
  } else {
    window.location.href = environment.frontend.url + "/search"
  }

  const [fortuneTellerPackage, setFortuneTellerPackage] = useState<PackageTypes[]>()

  useEffect(() => {
    const fetchFortuneTellerPackage = async () => {
      const response = await FortuneTellerService.getPackageByFortuneTellerId(fortuneTellerId)
      const fortuneTellerPackage = await response

      setFortuneTellerPackage(fortuneTellerPackage)
    }
    fetchFortuneTellerPackage()
  }, [])

  return (
    <div className="border-white border-[1px] w-[50%] min-w-[500px] sm:rounded-lg flex justify-center h-fit">
      <table className="w-[98%] max-h-[600px] h-auto">
        <thead className="text-[40px] font-libre-bodoni text-center leading-loose border-b-[1px] border-white">
          Packages
        </thead>
        <tbody className="flex flex-col overflow-x-auto overflow-y-auto">
          {fortuneTellerPackage &&
            fortuneTellerPackage.map((packageItem) => (
              <PackageList packageItem={packageItem}></PackageList>
            ))}
        </tbody>
      </table>
    </div>
  )
}
