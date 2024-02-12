import PackageList from "./PackageList"
import { PackageTypes } from "../../types/PackageTypes"

import { FortuneTellerService } from "../../services/FortuneTellerService"
import { useEffect, useState } from "react"

export default function Packages() {

  const [fortuneTellerPackage, setFortuneTellerPackage] = useState<PackageTypes[]>()
  
  const mockUserId = "3a1a96da-1cb0-4b06-bba5-5db0a9dbd4da"
  
  useEffect(() => {
    const fetchFortuneTellerPackage = async () => {
      const response = await FortuneTellerService.getPackagebyFortuneTellerId(mockUserId)
      const fortuneTellerPackage = await response

      setFortuneTellerPackage(fortuneTellerPackage)

    }
    fetchFortuneTellerPackage()
  }, [])

  let packageItems = null
  if(fortuneTellerPackage !== undefined){
    packageItems = fortuneTellerPackage.map((packageItem) => <PackageList packageItem = {packageItem}></PackageList>)   
  }

  return (
    <div className="border-white border-[1px] w-[50%] min-w-[500px] sm:rounded-lg flex justify-center h-fit">
      <table className="w-[98%] max-h-[600px] h-auto">
        <thead className="text-[40px] font-libre-bodoni text-center leading-loose border-b-[1px] border-white">Packages</thead>
        <tbody className="flex flex-col overflow-x-auto overflow-y-auto">
          {packageItems}
        </tbody>
      </table>
    </div>
  )
}