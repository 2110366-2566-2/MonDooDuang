import { environment } from "../../../common/constants/environment"

export const SearchService = {
  searchFortuneteller: async (searchFortuneTeller: SearchFortuneTeller):Promise<FetchSearchData[] | null>  => {
    const startDate = searchFortuneTeller.startDate?formatDate(new Date(searchFortuneTeller.startDate)):""
    const endDate = searchFortuneTeller.endDate?formatDate(new Date(searchFortuneTeller.endDate)):""

    function formatDate(date: Date): string {
      const year = date.getFullYear()
      const month = ("0" + (date.getMonth() + 1)).slice(-2)
      const day = ("0" + date.getDate()).slice(-2)
      return `${year}-${month}-${day}`
    }

    function formatTime(hours: number, minutes: number): string {
      const formattedHours = ("0" + hours).slice(-2)
      const formattedMinutes = ("0" + minutes).slice(-2)
      return `${formattedHours}:${formattedMinutes}`
    }

    const searchQuery : SearchQuery = {
      name: searchFortuneTeller.name,
      speciality: searchFortuneTeller.speciality,
      minPrice: searchFortuneTeller.minPrice,
      maxPrice: searchFortuneTeller.maxPrice,
      startDate: searchFortuneTeller.startDate ? startDate : "",
      endDate: searchFortuneTeller.endDate ? endDate : "",
      startTime:
        searchFortuneTeller.startHourTime !== -1 && searchFortuneTeller.startMinuteTime !== -1
          ? formatTime(searchFortuneTeller.startHourTime, searchFortuneTeller.startMinuteTime)
          : "",
      endTime:
        searchFortuneTeller.endHourTime !== -1 && searchFortuneTeller.endMinuteTime !== -1
          ? formatTime(searchFortuneTeller.endHourTime, searchFortuneTeller.endMinuteTime)
          : "",
      rating: searchFortuneTeller.rating
    }

    async function fetchData(searchQuery: SearchQuery): Promise<FetchSearchData[] | null> {
      try {
        const res = await fetch(`${environment.backend.url}/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(searchQuery)
        })

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`)
        }
        const data = await res.json()
        return data["data"]
      } catch (error) {
        console.error("Error fetching data:", error)
        return null
      }
    }
    return fetchData(searchQuery)
  }
}
