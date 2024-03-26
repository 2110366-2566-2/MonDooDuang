import { timetableRepository } from "../../repositories/timetable.repository"

const getTimetable = async (userID: string, status: string, month: number, year: number) => {
  const timetable = await timetableRepository.getTimetable(userID, status, month, year)
  return timetable
}

export const timetableService = {
  getTimetable
}
