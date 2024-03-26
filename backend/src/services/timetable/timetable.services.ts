import { timetableRepository } from "../../repositories/timetable.repository"

const getTimetable = async (userID: string, status: string, day: number, month: number, year: number) => {
  const timetable = await timetableRepository.getTimetable(userID, status, day, month, year)
  return timetable
}

export const timetableService = {
  getTimetable
}
