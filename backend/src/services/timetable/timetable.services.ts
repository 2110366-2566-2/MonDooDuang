import { timetableRepository } from "../../repositories/timetable.repository"

const getTimetable = async (userID: string) => {
  const timetable = await timetableRepository.getTimetable(userID)
  return timetable
}

export const timetableService = {
  getTimetable
}
