import { environment } from "../../../common/constants/environment"

export const TimetableService = {
  getTimetable: async (day: number , month: number, year: number, userId: string, status: string):Promise<AppointmentData[] | null>  => {
    const query = {
      day: day,
      month: month,
      year: year
    }
    try {
      const res = await fetch(`${environment.backend.url}/timetable/${userId}?status=${status}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(query)
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
}